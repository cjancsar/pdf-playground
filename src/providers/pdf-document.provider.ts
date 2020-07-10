import * as pdfjsLib from 'pdfjs-dist';
//@ts-ignore
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { SUPPORTED_FORM_FIELD_TYPES, DEFAULT_SCALE } from '../constants';
import { FIELD_SELECTOR_LIST } from '../config/fw4-2020/fw4-2020-field-mapping.config';
import { last, flatten, uniq, isNumber } from 'lodash';
import path from 'path';
import { FieldConfiguration } from './field-configuration.provider';
import { IFormConfiguration } from 'src/interfaces/form-configuraton';

export class PDFDocument {
  public supportedAnnotations: any[] = [];

  constructor(
    private readonly documentUrl: string,
    private readonly formFieldMappingMap: Map<string, IFormConfiguration>,
    private readonly existingData: any,
    private readonly containerId: string
  ) {
    // Using the fixed version CDN due to issues with `parcel` and static file handling (that I don't care about).
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js';
  }

  private get _formFields() {
    return [...this._formFieldMap.values()];
  }

  private get _formFieldMap(): Map<FIELD_SELECTOR_LIST, FieldConfiguration> {
    const map = this.formFieldMappingMap.get(this._pdfFileName);
    if (map) {
      return map.fieldMap;
    }
    throw Error(`formFieldMappingMap for [${this._pdfFileName}] not found.`);
  }

  private get _pdfFileName(): string {
    const filename = last(path.normalize(this.documentUrl).split(path.sep));
    if (!filename) {
      throw Error('Unable to parse filename.');
    }
    return filename;
  }

  /**
   * Render PDF document (and all pages with ArcForm Support)
   *  - Pre-fills any existing form field data
   *  - Sets all non-editable fields to readonly
   *  - Adds document-wide scripts (for aggregation and validation)
   */
  public async loadAndRenderDocument() {
    // Load and render all pdf pages.
    await this._loadAndRenderPDFPages();

    // Mutate form fields
    this.mutateFormFields();

    // Set existing form data
    this.setFormData(this.existingData);

    // Add summation for scripts
    this.addSummationScripts();

    this.addCheckboxGroups();
  }

  /**
   * Add single select only to checkbox groups
   */
  public addCheckboxGroups() {
    const allCheckboxFields = this._formFields.filter(f => f.checkBoxGroup);
    const allCheckboxGroups = uniq(allCheckboxFields.map(f => f.checkBoxGroup));

    for (const checkBoxGroup of allCheckboxGroups) {
      const checkGroupFields = allCheckboxFields.filter(f => f.checkBoxGroup === checkBoxGroup);

      function _singleCheckboxSelectEvent(this: HTMLInputElement, ev: Event): any {
        if (this.checked) {
          // Uncheck others in group
          checkGroupFields.forEach(f => (f.element.checked = false));
          this.checked = true;
        } else {
          this.checked = false;
        }
      }

      checkGroupFields.forEach(f => f.element.addEventListener('change', _singleCheckboxSelectEvent));
    }
  }

  /**
   * Certain fields are "summation only" fields. Multiple fields (addends or summands) are added up and summed into a common
   * field (the sum).
   */
  public addSummationScripts() {
    // Get all summable fields
    const summableFields = this._formFields.filter(f => f.isSummable);
    const allSummationGroups = uniq(flatten(summableFields.map(s => s.summableGroups)));

    for (const summationGroup of allSummationGroups) {
      const summationGroupFields = summableFields.filter(f => f.summableGroups.includes(summationGroup));

      function _summationEvent(this: HTMLInputElement, ev: Event): any {
        // Get all field values
        const addends = summationGroupFields
          .filter(f => f.isAddendForGroup(summationGroup) && isNumber(Number(f.getValue())))
          .map(f => Number(f.getValue()))
          .reduce((a, b) => a + b, 0);
        const summands = summationGroupFields
          .filter(f => f.isSummandForGroup(summationGroup) && isNumber(Number(f.getValue())))
          .map(f => Number(f.getValue()))
          .reduce((a, b) => a + b, 0);

        // Put totals in sum group
        const total = addends + summands;
        summationGroupFields.filter(f => f.isSumForGroup(summationGroup)).forEach(f => f.setValue(total));
      }

      summationGroupFields.forEach(f => f.element.addEventListener('change', _summationEvent));
    }
  }

  /**
   * Applies mutators to any form field properties
   */
  public mutateFormFields() {
    for (const expectedField of this._formFields) {
      expectedField.applyMutators();
    }
  }

  /**
   * Pre-fills form fields with data.
   * Keys of `existingData` must be present with the form field map.
   */
  public setFormData(existingData: any) {
    const existingDataFields = this._formFields.filter(v => Object.keys(existingData).includes(v.key));
    existingDataFields.forEach(existingDataField => {
      existingDataField.setValue(existingData[existingDataField.key]);
    });
  }

  /**
   * Retrieves all supported annotation form data from the rendered PDF.
   */
  public getFormData() {
    const formData: any = {};

    for (const expectedField of this._formFields) {
      formData[expectedField.key] = expectedField.getValue();
    }

    return formData;
  }

  /**
   * Load PDF document and pages
   * Also retrieves (and sets) `PDFDocument.prototype.supportedAnnotations` with extract of form fields.
   */
  private async *_loadPDFPages() {
    const container = document.getElementById(this.containerId);

    // Fetch the PDF document from the URL using promises.
    const doc = await pdfjsLib.getDocument(this.documentUrl).promise;

    let supportedAnnotations: any[] = [];

    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
      const pdfPage = await doc.getPage(pageNum);

      const pdfPageView = new pdfjsViewer.PDFPageView({
        container: container,
        id: pageNum,
        scale: DEFAULT_SCALE,
        defaultViewport: pdfPage.getViewport({ scale: DEFAULT_SCALE }),
        eventBus: new pdfjsViewer.EventBus(),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        renderInteractiveForms: true,
      });

      // Get any supported annotations on the current page
      supportedAnnotations = supportedAnnotations.concat(await this._getSupportedAnnotations(pdfPage));

      // Associate the page with a renderer
      await pdfPageView.setPdfPage(pdfPage);

      // Return the ready renderer
      yield pdfPageView;
    }

    // Cache a list of supported annotations within the document.
    this.supportedAnnotations = supportedAnnotations;
  }

  /**
   * Renders all pdf pages
   */
  private async _loadAndRenderPDFPages() {
    for await (const pdfPage of this._loadPDFPages()) {
      await pdfPage.draw();
    }
  }

  /**
   * Returns the _supported_ (from `SUPPORTED_FORM_FIELD_TYPES`) form annotation properties.
   * @param {PDFPageProxy} pdfPage
   */
  private async _getSupportedAnnotations(pdfPage: any) {
    let annotations = await pdfPage.getAnnotations();
    return annotations
      .filter((a: any) => Object.values(SUPPORTED_FORM_FIELD_TYPES).includes(a.fieldType))
      .map((a: any) => ({
        fieldType: a.fieldType,
        fieldName: a.fieldName,
        id: a.id,
        readonly: a.readonly,
        hasAppearance: a.hasAppearance,
        subtype: a.subtype,
      }));
  }
}

import * as pdfjsLib from 'pdfjs-dist';
//@ts-ignore
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { SUPPORTED_FORM_FIELD_TYPES, DEFAULT_SCALE } from '../constants';
import { FIELD_SELECTOR_LIST } from '../config/fw4-2020-field-mapping.config';
import { last, has } from 'lodash';
import path from 'path';
import { FieldConfiguration } from './field-configuration.provider';

export class PDFDocument {
  public supportedAnnotations: any[] = [];

  constructor(
    private readonly documentUrl: string,
    private readonly formFieldMappingMap: Map<string, Map<FIELD_SELECTOR_LIST, any>>,
    private readonly existingData: any,
    private readonly containerId: string
  ) {
    // Using the fixed version CDN due to issues with `parcel` and static file handling (that I don't care about).
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js';
  }

  private get _formFieldMap(): Map<FIELD_SELECTOR_LIST, FieldConfiguration> {
    const map = this.formFieldMappingMap.get(this._pdfFileName);
    if (map) {
      return map;
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
  }

  /**
   * Applies mutators to any form field properties
   */
  public mutateFormFields() {
    for (const expectedField of this._formFieldMap.values()) {
      expectedField.applyMutators();
    }
  }

  /**
   * Pre-fills form fields with data.
   * Keys of `existingData` must be present with the form field map.
   */
  public setFormData(existingData: any) {
    const existingDataFields = [...this._formFieldMap.values()].filter(v => Object.keys(existingData).includes(v.key));
    existingDataFields.forEach(existingDataField => {
      existingDataField.setValue(existingData[existingDataField.key]);
    });
  }

  /**
   * Retrieves all supported annotation form data from the rendered PDF.
   */
  public getFormData() {
    const formData: any = {};

    for (const expectedField of this._formFieldMap.values()) {
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

  /**
   * Apply mutations to form input fields
   */
  private _applyMutations() {}
}

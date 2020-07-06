import * as pdfjsLib from 'pdfjs-dist';
//@ts-ignore
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { SUPPORTED_FORM_FIELD_TYPES, DEFAULT_SCALE } from '../constants';
import { FIELD_SELECTOR_LIST, DOCUMENT_ACROFORM_FIELD_MAP } from '../config/fw4-2020-field-mapping.config';
import { last } from 'lodash';
import path from 'path';

export class PDFDocument {
  public supportedAnnotations: any[] = [];

  constructor(
    private readonly documentUrl: string,
    private readonly formFieldMappingMap: Map<string, Map<FIELD_SELECTOR_LIST, any>>
  ) {
    // Using the fixed version CDN due to issues with `parcel` and static file handling (that I don't care about).
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js';
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
   * Also retrieves (and sets) `PDFDocument.prototype.supportedAnnotations` with extract of form fields.
   */
  public async loadAndRenderDocument({ containerId }: { containerId: string }) {
    const container = document.getElementById(containerId);

    // Fetch the PDF document from the URL using promises.
    const doc = await pdfjsLib.getDocument(this.documentUrl).promise;

    let supportedAnnotations: any[] = [];

    for (var pageNum = 1; pageNum <= doc.numPages; pageNum++) {
      const pdfPage = await doc.getPage(pageNum);

      var pdfPageView = new pdfjsViewer.PDFPageView({
        container: container,
        id: pageNum,
        scale: DEFAULT_SCALE,
        defaultViewport: pdfPage.getViewport({ scale: DEFAULT_SCALE }),
        eventBus: new pdfjsViewer.EventBus(),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        renderInteractiveForms: true,
      });

      // Associate the actual page with the view and draw it.
      supportedAnnotations = supportedAnnotations.concat(await this._getSupportedAnnotations(pdfPage));

      await pdfPageView.setPdfPage(pdfPage);
      await pdfPageView.draw();

      // todo, get set of pre-populated form data dynamically, currently hard coding some values
      // for sake of technical demonstration
      let prePopulatedFields = new Map<string, any>();
      prePopulatedFields.set('firstNameWithMiddleInitial', 'Jon');
      prePopulatedFields.set('lastName', 'Snow');
      await this.setFormData(prePopulatedFields);
    }

    this.supportedAnnotations = supportedAnnotations;
  }

  /**
   *
   * @param prePopulatedFormData - map of data to be pre-populated into the form
   */
  public setFormData(prePopulatedFormData: Map<string, any>) {
    DOCUMENT_ACROFORM_FIELD_MAP.forEach((masterFieldMapEntryValue, masterFieldMapEntryKey) => {
      prePopulatedFormData.forEach((prePopulatedEntryValue, prePopulatedEntryKey) => {
        if (masterFieldMapEntryValue.key == prePopulatedEntryKey) {
          try {
            (<HTMLInputElement>document.getElementsByName(masterFieldMapEntryKey)[0]).value = prePopulatedEntryValue;
          } catch (e) {
            // todo: generic try/catch, expand to be more granular for: mapped field doesn't exist, didn't validate, etc
            throw Error(`Unable to pre-populate field: asdas`);
          }
        }
      });
    });
  }

  /**
   * Retrieves all supported annotation form data from the rendered PDF.
   */
  public getFormData() {
    const map = this.formFieldMappingMap.get(this._pdfFileName);

    if (!map) {
      throw Error('Unmapped pdf encountered.');
    }

    const formData: any = {};

    for (const expectedField of map.values()) {
      formData[expectedField.key] = expectedField.getValue();
    }

    return formData;
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

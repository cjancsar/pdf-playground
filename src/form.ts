import * as pdfjsLib from 'pdfjs-dist';
//@ts-ignore
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { SUPPORTED_FORM_FIELD_TYPES, DEFAULT_SCALE } from './constants';
import { DOCUMENT_ACROFORM_FIELD_MAP } from './config/fw4-2020-field-mapping.config';

const DOCUMENT_URL = '/pdfs/fw4.pdf';
const CONTAINER_ID = 'formContainer';

/**
 * On page readiness we perform loading of a PDF as well as add some event listeners.
 */
document.addEventListener('DOMContentLoaded', async function () {
  _addEventListenerForGetDataBtn();

  const pdfDocument = new PDFDocument(DOCUMENT_URL);
  await pdfDocument.loadAndRenderDocument({ containerId: CONTAINER_ID });
});

/**
 * Returns the _supported_ (from `SUPPORTED_FORM_FIELD_TYPES`) form annotation properties.
 * @param {PDFPageProxy} pdfPage
 */
async function _getSupportedAnnotations(pdfPage: any) {
  let annotations = await pdfPage.getAnnotations();
  return annotations
    .filter((a: any) => a.fieldType === SUPPORTED_FORM_FIELD_TYPES.TEXT)
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
 * Add an event listener to a button to trigger capture of data.
 */
function _addEventListenerForGetDataBtn() {
  const dataBtn = document.getElementById('getDataBtn');
  if (dataBtn) {
    dataBtn.addEventListener('click', _getDataButtonClicked, false);
  } else {
    throw Error('Could not add event listener');
  }
}

/**
 * Collect all data for a given form.
 */
async function _getDataButtonClicked() {
  console.log(DOCUMENT_ACROFORM_FIELD_MAP.get('topmostSubform[0].Page1[0].Step1a[0].f1_01[0]'));
  console.log(DOCUMENT_ACROFORM_FIELD_MAP.get('topmostSubform[0].Page1[0].Step1a[0].f1_01[0]')?.value());
}

class PDFDocument {
  public supportedAnnotations: any[] = [];

  constructor(private readonly documentUrl: string) {
    // Using the fixed version CDN due to issues with `parcel` and static file handling (that I don't care about).
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js';
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
      supportedAnnotations = supportedAnnotations.concat(await _getSupportedAnnotations(pdfPage));

      pdfPageView.setPdfPage(pdfPage);
      pdfPageView.draw();
    }

    this.supportedAnnotations = supportedAnnotations;
  }
}

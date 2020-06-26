import * as pdfjsLib from 'pdfjs-dist';
//@ts-ignore
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { SUPPORTED_FORM_FIELD_TYPES, DEFAULT_SCALE } from './constants';
import { DOCUMENT_ACROFORM_FIELD_MAP } from './config/fw4-2020-field-mapping.config';

// Using the fixed version CDN due to issues with `parcel` and static file handling (that I don't care about).
pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js';
const DEFAULT_URL = '/pdfs/fw4.pdf';
const container = document.getElementById('pageContainer');
const eventBus = new pdfjsViewer.EventBus();

/**
 * On page readiness we perform loading of a PDF as well as add some event listeners.
 */
document.addEventListener('DOMContentLoaded', async function () {
  _addEventListenerForGetDataBtn();

  // Fetch the PDF document from the URL using promises.
  const doc = await pdfjsLib.getDocument(DEFAULT_URL).promise;

  for (var pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const pdfPage = await doc.getPage(pageNum);

    var pdfPageView = new pdfjsViewer.PDFPageView({
      container: container,
      id: pageNum,
      scale: DEFAULT_SCALE,
      defaultViewport: pdfPage.getViewport({ scale: DEFAULT_SCALE }),
      eventBus: eventBus,
      annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
      renderInteractiveForms: true,
    });

    // Associate the actual page with the view and draw it.
    console.log(await _getSupportedAnnotations(pdfPage));

    pdfPageView.setPdfPage(pdfPage);
    pdfPageView.draw();
  }
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

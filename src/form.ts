import { FIELD_SELECTOR_LIST, DOCUMENT_ACROFORM_FIELD_MAP } from './config/fw4-2020-field-mapping.config';
import { PDFDocument } from './providers/pdf-document.provider';

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
  console.log(DOCUMENT_ACROFORM_FIELD_MAP.get(FIELD_SELECTOR_LIST.FIRST_NAME_WITH_LAST_INITIAL)?.getValue());
}

import { PDFDocument } from './providers/pdf-document.provider';
import { FORM_TO_FIELD_MAPPING } from './providers/form-to-field-mapping.provider';

const DOCUMENT_URL = '/pdfs/fw4.pdf';
const CONTAINER_ID = 'formContainer';

/**
 * On page readiness we perform loading of a PDF as well as add some event listeners.
 */
document.addEventListener('DOMContentLoaded', async function () {
  _addEventListenerForGetDataBtn();

  const pdfDocument = new PDFDocument(DOCUMENT_URL, FORM_TO_FIELD_MAPPING);
  await pdfDocument.loadAndRenderDocument({ containerId: CONTAINER_ID });

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
    console.log(pdfDocument.getFormData());
  }
});

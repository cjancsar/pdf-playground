import { PDFDocument } from './providers/pdf-document.provider';
import { FORM_CONFIGURATION_MAPPING } from './providers/form-configuration-mapping.provider';

const DOCUMENT_URL = '/pdfs/fw4.pdf';
const CONTAINER_ID = 'formContainer';

/**
 * On page readiness we perform loading of a PDF as well as add some event listeners.
 */
document.addEventListener('DOMContentLoaded', async function () {
  /**
   * We add a "demo" action to collect form data to json.
   */
  _addEventListenerForGetDataBtn();

  /**
   * Simulate the presence of existing form data. This could be from two sources:
   *   - Static ERP data about an employee (SIN number, Name, DOB, etc.)
   *   - Cached form data (if the page is reloaded etc.)
   */
  const existingData = {
    firstNameWithMiddleInitial: 'Jon',
    lastName: 'Snow',
  };

  /**
   * Show the interface of interacting with a PDFDocument.
   */
  const pdfDocument = new PDFDocument(DOCUMENT_URL, FORM_CONFIGURATION_MAPPING, existingData, CONTAINER_ID);
  await pdfDocument.loadAndRenderDocument();

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

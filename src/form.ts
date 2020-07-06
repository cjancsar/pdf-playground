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

  _customScriptForFW4();

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
   * TEST TEST TEST TEST TEST
   * captures event when field is changed and updates the summation field
   *
   * currently also setting field to disabled, move this once "custom script" architecture decided on
   * as well as the event listener and helper methods. this should be exposed as part of the map as a "custom"
   * script that is executed if defined for a pdf.
   */
  function _customScriptForFW4() {
    //disable summation field
    (<HTMLInputElement>document.getElementsByName('topmostSubform[0].Page1[0].f1_08[0]')[0]).disabled = true;

    // add event listener to the 3 inputs involved with summation
    // will sum up the fields any time any of the 3 fields change
    const childDependentField = document.getElementsByName('topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]')[0];
    if (childDependentField) {
      childDependentField.addEventListener('change', _sumDependentTotalsAndDisplay, false);
    } else {
      throw Error('Could not add event listener to first field');
    }
    const otherDependentField = document.getElementsByName('topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_07[0]')[0];
    if (otherDependentField) {
      otherDependentField.addEventListener('change', _sumDependentTotalsAndDisplay, false);
    } else {
      throw Error('Could not add event listener to other dependent field');
    }
    // this summation field should not be required since it is disabled, but add the event listener just in case disable fails
    const summationField = document.getElementsByName('topmostSubform[0].Page1[0].f1_08[0]')[0];
    if (summationField) {
      summationField.addEventListener('change', _sumDependentTotalsAndDisplay, false);
    } else {
      throw Error('Could not add event listener to summation field');
    }
  }

  /**
   * helper function to above. returns "Error" if non numeric values passed. Can change this to be 0 if we
   * don't plan on getting super fancy with other form validation to prevent it in the first place.
   * todo: move this function along with the above function
   */
  function _sumDependentTotalsAndDisplay() {
    let total = 0;
    total += Number(
      (<HTMLInputElement>document.getElementsByName('topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]')[0]).value
    );
    total += Number(
      (<HTMLInputElement>document.getElementsByName('topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_07[0]')[0]).value
    );
    if (total) {
      (<HTMLInputElement>document.getElementsByName('topmostSubform[0].Page1[0].f1_08[0]')[0]).value = total.toString();
    } else {
      (<HTMLInputElement>document.getElementsByName('topmostSubform[0].Page1[0].f1_08[0]')[0]).value = 'Error';
    }
  }

  /**
   * Collect all data for a given form.
   */
  async function _getDataButtonClicked() {
    console.log(pdfDocument.getFormData());
  }
});

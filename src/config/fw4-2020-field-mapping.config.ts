import { FieldConfiguration } from '../providers/field-configuration.provider';

export enum FIELD_SELECTOR_LIST {
  FIRST_NAME_WITH_LAST_INITIAL = 'topmostSubform[0].Page1[0].Step1a[0].f1_01[0]',
  LAST_NAME = 'topmostSubform[0].Page1[0].Step1a[0].f1_02[0]',
  SIN_NUMBER = 'topmostSubform[0].Page1[0].f1_05[0]',
  ADDRESS_1 = 'topmostSubform[0].Page1[0].Step1a[0].f1_03[0]',
  ADDRESS_2 = 'topmostSubform[0].Page1[0].Step1a[0].f1_04[0]',
  STEP_3_A = 'topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]',
  STEP_3_B = 'topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_07[0]',

  // SINGLE_OR_MARRIED_FILING_SEPARATE = "",
  // MARRIED_FILING_JOINTLY = "",
  // HEAD_OF_HOUSEHOLD = "",
  // STEP_3_SUM = "",
  // STEP_4_A = "",
  // STEP_4_B = "",
  // STEP_4_C = "",
}

/**
 * A map of all (necessary) Acroform fields (by unique field name) mapped to their internal property name,
 * expected field type, expected data type, etc.
 * Field `names` not specified in this map will be disabled as inputs
 *
 * @todo disable fields by name if not on this list
 */
export const DOCUMENT_ACROFORM_FIELD_MAP = new Map<FIELD_SELECTOR_LIST, FieldConfiguration>([
  [
    FIELD_SELECTOR_LIST.FIRST_NAME_WITH_LAST_INITIAL,
    new FieldConfiguration('firstNameWithMiddleInitial', FIELD_SELECTOR_LIST.FIRST_NAME_WITH_LAST_INITIAL, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.LAST_NAME,
    new FieldConfiguration('lastName', FIELD_SELECTOR_LIST.LAST_NAME, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.SIN_NUMBER,
    new FieldConfiguration('sinNumber', FIELD_SELECTOR_LIST.SIN_NUMBER, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.ADDRESS_1,
    new FieldConfiguration('address1', FIELD_SELECTOR_LIST.ADDRESS_1, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.ADDRESS_2,
    new FieldConfiguration('address2', FIELD_SELECTOR_LIST.ADDRESS_2, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.STEP_3_A,
    new FieldConfiguration('step3A_numChildrenUnder17Times2000', FIELD_SELECTOR_LIST.STEP_3_A),
  ],
  [
    FIELD_SELECTOR_LIST.STEP_3_B,
    new FieldConfiguration('step3B_numOtherDependentsTimes500', FIELD_SELECTOR_LIST.STEP_3_B),
  ],
]);

/**
 * Runs any custom scripts for this pdf.
 *
 * In the case of the FW4, disable the
 */
export function executeCustomScripts() {
  _addEventListenerForSummationTest();
}

/**
 * TEST TEST TEST TEST TEST
 * captures event when field is changed
 */
function _addEventListenerForSummationTest() {
  const firstField = document.getElementsByName('topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]')[0];
  if (firstField) {
    firstField.addEventListener(
      'change',
      () => {
        console.log('ASDFASDFSADFASDFASDFASDFASDFSADF');
      },
      false
    );
  } else {
    throw Error('Could not add event listener');
  }
}

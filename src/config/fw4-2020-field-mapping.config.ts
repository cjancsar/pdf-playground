import { FieldConfiguration } from '../providers/field-configuration.provider';

export enum FIELD_SELECTOR_LIST {
  FIRST_NAME_WITH_LAST_INITIAL = 'topmostSubform[0].Page1[0].Step1a[0].f1_01[0]',
  LAST_NAME = 'topmostSubform[0].Page1[0].Step1a[0].f1_02[0]',
  NUM_CHILDREN_UNDER_17_TIMES_2000 = 'topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]',
  NUM_OTHER_DEPENDENTS_TIMES_500 = 'topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_07[0]',

  // SIN_NUMBER = "",
  // ADDRESS_1 = "",
  // ADDRESS_2 = "",
  // SINGLE_OR_MARRIED_FILING_SEPARATE = "",
  // MARRIED_FILING_JOINTLY = "",
  // HEAD_OF_HOUSEHOLD = "",
  // STEP_3_A = "",
  // STEP_3_B = "",
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
    FIELD_SELECTOR_LIST.NUM_CHILDREN_UNDER_17_TIMES_2000,
    new FieldConfiguration('numChildrenUnder17Times2000', FIELD_SELECTOR_LIST.NUM_CHILDREN_UNDER_17_TIMES_2000, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.NUM_OTHER_DEPENDENTS_TIMES_500,
    new FieldConfiguration('numOtherDependentsTimes500', FIELD_SELECTOR_LIST.NUM_OTHER_DEPENDENTS_TIMES_500, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
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

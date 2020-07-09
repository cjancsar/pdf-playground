import { FieldConfiguration } from '../providers/field-configuration.provider';

export enum FIELD_SELECTOR_LIST {
  FIRST_NAME_WITH_LAST_INITIAL = 'topmostSubform[0].Page1[0].Step1a[0].f1_01[0]',
  LAST_NAME = 'topmostSubform[0].Page1[0].Step1a[0].f1_02[0]',
  SIN_NUMBER = 'topmostSubform[0].Page1[0].f1_05[0]',
  ADDRESS_1 = 'topmostSubform[0].Page1[0].Step1a[0].f1_03[0]',
  ADDRESS_2 = 'topmostSubform[0].Page1[0].Step1a[0].f1_04[0]',
  STEP_3_A = 'topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]',
  STEP_3_B = 'topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_07[0]',
  STEP_3_SUM = 'topmostSubform[0].Page1[0].f1_08[0]',

  STEP_4B_1 = 'topmostSubform[0].Page3[0].f3_07[0]',
  STEP_4B_2 = 'topmostSubform[0].Page3[0].f3_08[0]',
  STEP_4B_3 = 'topmostSubform[0].Page3[0].f3_09[0]',
  STEP_4B_4 = 'topmostSubform[0].Page3[0].f3_10[0]',
  STEP_4B_1_SUM = 'topmostSubform[0].Page3[0].f3_11[0]',

  // SINGLE_OR_MARRIED_FILING_SEPARATE = "",
  // MARRIED_FILING_JOINTLY = "",
  // HEAD_OF_HOUSEHOLD = "",

  // STEP_2_C = "",
  // STEP_4_A = "",
  // STEP_4_B = "",
  // STEP_4_C = "",
}

/**
 * A map of all (necessary) Acroform fields (by unique field name) mapped to their internal property name,
 * expected field type, expected data type, etc.
 * Field `names` not specified in this map will be disabled as inputs
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
    new FieldConfiguration('step3A_numChildrenUnder17Times2000', FIELD_SELECTOR_LIST.STEP_3_A, {
      fieldPropertyMutations: {
        type: 'number',
      },
      options: {
        addendForGroups: ['STEP_3'],
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.STEP_3_B,
    new FieldConfiguration('step3B_numOtherDependentsTimes500', FIELD_SELECTOR_LIST.STEP_3_B, {
      fieldPropertyMutations: {
        type: 'number',
      },
      options: {
        addendForGroups: ['STEP_3'],
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.STEP_3_SUM,
    new FieldConfiguration('step3_sum', FIELD_SELECTOR_LIST.STEP_3_SUM, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
      options: {
        sumForGroups: ['STEP_3'],
      },
    }),
  ],
]);

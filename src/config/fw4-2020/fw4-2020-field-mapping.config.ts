import { FieldConfiguration } from '../../providers/field-configuration.provider';

export enum FIELD_SELECTOR_LIST {
  FIRST_NAME_WITH_LAST_INITIAL = 'topmostSubform[0].Page1[0].Step1a[0].f1_01[0]',
  LAST_NAME = 'topmostSubform[0].Page1[0].Step1a[0].f1_02[0]',
  SIN_NUMBER = 'topmostSubform[0].Page1[0].f1_05[0]',
  ADDRESS_1 = 'topmostSubform[0].Page1[0].Step1a[0].f1_03[0]',
  ADDRESS_2 = 'topmostSubform[0].Page1[0].Step1a[0].f1_04[0]',

  STEP_2_C = 'topmostSubform[0].Page1[0].Step2c[0].c1_2[0]',

  STEP_3_A = 'topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]',
  STEP_3_B = 'topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_07[0]',
  STEP_3_SUM = 'topmostSubform[0].Page1[0].f1_08[0]',

  STEP_4_A = 'topmostSubform[0].Page1[0].f1_09[0]',
  STEP_4_B = 'topmostSubform[0].Page1[0].f1_10[0]',
  STEP_4_C = 'topmostSubform[0].Page1[0].f1_11[0]',

  SIGNATURE = 'signature',
  SIGNATURE_DATE = 'signatureDate',

  STEP_4B_1 = 'topmostSubform[0].Page3[0].f3_07[0]',
  STEP_4B_2 = 'topmostSubform[0].Page3[0].f3_08[0]',
  STEP_4B_3 = 'topmostSubform[0].Page3[0].f3_09[0]',
  STEP_4B_4 = 'topmostSubform[0].Page3[0].f3_10[0]',
  STEP_4B_1_SUM = 'topmostSubform[0].Page3[0].f3_11[0]',

  SINGLE_OR_MARRIED_FILING_SEPARATE = 'topmostSubform[0].Page1[0].c1_1[0]',
  MARRIED_FILING_JOINTLY = 'topmostSubform[0].Page1[0].c1_1[1]',
  HEAD_OF_HOUSEHOLD = 'topmostSubform[0].Page1[0].c1_1[2]',

  EMPLOYERS_NAME_AND_ADDRESS = 'topmostSubform[0].Page1[0].f1_13[0]',
  FIRST_DATE_OF_EMPLOYMENT = 'topmostSubform[0].Page1[0].f1_14[0]',
  EMPLOYERS_EIN = 'topmostSubform[0].Page1[0].f1_15[0]',

  WORKSHEET_MULTI_JOBS_1 = 'topmostSubform[0].Page3[0].f3_01[0]',
  WORKSHEET_MULTI_JOBS_2A = 'topmostSubform[0].Page3[0].f3_02[0]',
  WORKSHEET_MULTI_JOBS_2B = 'topmostSubform[0].Page3[0].f3_03[0]',
  WORKSHEET_MULTI_JOBS_2C = 'topmostSubform[0].Page3[0].f3_04[0]',
  WORKSHEET_MULTI_JOBS_3 = 'topmostSubform[0].Page3[0].f3_05[0]',
  WORKSHEET_MULTI_JOBS_4 = 'topmostSubform[0].Page3[0].f3_06[0]',

  WORKSHEET_DEDUCTIONS_1 = 'topmostSubform[0].Page3[0].f3_07[0]',
  WORKSHEET_DEDUCTIONS_2 = 'topmostSubform[0].Page3[0].f3_08[0]',
  WORKSHEET_DEDUCTIONS_3 = 'topmostSubform[0].Page3[0].f3_09[0]',
  WORKSHEET_DEDUCTIONS_4 = 'topmostSubform[0].Page3[0].f3_10[0]',
  WORKSHEET_DEDUCTIONS_5 = 'topmostSubform[0].Page3[0].f3_11[0]',
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
    FIELD_SELECTOR_LIST.SINGLE_OR_MARRIED_FILING_SEPARATE,
    new FieldConfiguration('singleOrMarriedFilingSeparate', FIELD_SELECTOR_LIST.SINGLE_OR_MARRIED_FILING_SEPARATE, {
      getValueFn: (): boolean =>
        FieldConfiguration.CHECKBOX_VALUE_BY_NAME(FIELD_SELECTOR_LIST.SINGLE_OR_MARRIED_FILING_SEPARATE),
      options: {
        checkboxGroup: 'FILING_STATUS',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.MARRIED_FILING_JOINTLY,
    new FieldConfiguration('marriedFilingJointly', FIELD_SELECTOR_LIST.MARRIED_FILING_JOINTLY, {
      getValueFn: (): boolean => FieldConfiguration.CHECKBOX_VALUE_BY_NAME(FIELD_SELECTOR_LIST.MARRIED_FILING_JOINTLY),
      options: {
        checkboxGroup: 'FILING_STATUS',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.HEAD_OF_HOUSEHOLD,
    new FieldConfiguration('headOfHousehold', FIELD_SELECTOR_LIST.HEAD_OF_HOUSEHOLD, {
      getValueFn: (): boolean => FieldConfiguration.CHECKBOX_VALUE_BY_NAME(FIELD_SELECTOR_LIST.HEAD_OF_HOUSEHOLD),
      options: {
        checkboxGroup: 'FILING_STATUS',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.STEP_2_C,
    new FieldConfiguration('step2C_onlyTwoJobs', FIELD_SELECTOR_LIST.STEP_2_C, {
      getValueFn: (): boolean => FieldConfiguration.CHECKBOX_VALUE_BY_NAME(FIELD_SELECTOR_LIST.STEP_2_C),
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
  [
    FIELD_SELECTOR_LIST.STEP_4_A,
    new FieldConfiguration('step4A_otherIncome', FIELD_SELECTOR_LIST.STEP_4_A, {
      fieldPropertyMutations: {
        type: 'number',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.STEP_4_B,
    new FieldConfiguration('step4B_deductions', FIELD_SELECTOR_LIST.STEP_4_B, {
      fieldPropertyMutations: {
        type: 'number',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.STEP_4_C,
    new FieldConfiguration('step4C_extraWithholding', FIELD_SELECTOR_LIST.STEP_4_C, {
      fieldPropertyMutations: {
        type: 'number',
      },
    }),
  ],
  [FIELD_SELECTOR_LIST.SIGNATURE, new FieldConfiguration('signature', FIELD_SELECTOR_LIST.SIGNATURE)],
  [
    FIELD_SELECTOR_LIST.SIGNATURE_DATE,
    new FieldConfiguration('signatureDate', FIELD_SELECTOR_LIST.SIGNATURE_DATE, {
      fieldPropertyMutations: {
        type: 'date',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.EMPLOYERS_NAME_AND_ADDRESS,
    new FieldConfiguration('employersNameAndAddress', FIELD_SELECTOR_LIST.EMPLOYERS_NAME_AND_ADDRESS, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.FIRST_DATE_OF_EMPLOYMENT,
    new FieldConfiguration('firstDateOfEmployment', FIELD_SELECTOR_LIST.FIRST_DATE_OF_EMPLOYMENT, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.EMPLOYERS_EIN,
    new FieldConfiguration('employersEIN', FIELD_SELECTOR_LIST.EMPLOYERS_EIN, {
      fieldPropertyMutations: {
        readonly: true,
        disabled: true,
      },
    }),
  ],

  [
    FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_1,
    new FieldConfiguration('worksheetMultiJob1', FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_1, {
      fieldPropertyMutations: {
        type: 'number',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_2A,
    new FieldConfiguration('worksheetMultiJob2A', FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_2A, {
      fieldPropertyMutations: {
        type: 'number',
      },
      options: {
        addendForGroups: ['WORKSHEET_STEP_2'],
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_2B,
    new FieldConfiguration('worksheetMultiJob2B', FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_2B, {
      fieldPropertyMutations: {
        type: 'number',
      },
      options: {
        addendForGroups: ['WORKSHEET_STEP_2'],
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_2C,
    new FieldConfiguration('worksheetMultiJob2C', FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_2C, {
      fieldPropertyMutations: {
        type: 'number',
        readonly: true,
        disabled: true,
      },
      options: {
        sumForGroups: ['WORKSHEET_STEP_2'],
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_3,
    new FieldConfiguration('worksheetMultiJob3', FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_3, {
      fieldPropertyMutations: {
        type: 'number',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_4,
    new FieldConfiguration('worksheetMultiJob4', FIELD_SELECTOR_LIST.WORKSHEET_MULTI_JOBS_4, {
      fieldPropertyMutations: {
        type: 'number',
      },
    }),
  ],

  [
    FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_1,
    new FieldConfiguration('worksheetDeduction1', FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_1, {
      fieldPropertyMutations: {
        type: 'number',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_2,
    new FieldConfiguration('worksheetDeduction2', FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_2, {
      fieldPropertyMutations: {
        type: 'number',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_3,
    new FieldConfiguration('worksheetDeduction3', FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_3, {
      fieldPropertyMutations: {
        type: 'number',
      },
      options: {
        addendForGroups: ['WORKSHEET_STEP_3'],
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_4,
    new FieldConfiguration('worksheetDeduction4', FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_4, {
      fieldPropertyMutations: {
        type: 'number',
      },
      options: {
        addendForGroups: ['WORKSHEET_STEP_3'],
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_5,
    new FieldConfiguration('worksheetDeduction5', FIELD_SELECTOR_LIST.WORKSHEET_DEDUCTIONS_5, {
      fieldPropertyMutations: {
        type: 'number',
        readonly: true,
        disabled: true,
      },
      options: {
        sumForGroups: ['WORKSHEET_STEP_3'],
      },
    }),
  ],
]);

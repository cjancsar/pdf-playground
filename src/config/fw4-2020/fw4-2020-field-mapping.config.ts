import { FieldConfiguration } from '../../providers/field-configuration.provider';
import { SUPPORTED_FORM_FIELD_TYPES, SUPPORTED_DATA_TYPES } from '../../constants';

export enum FIELD_SELECTOR_LIST {
  FIRST_NAME_WITH_LAST_INITIAL = 'firstNameWithMiddleInitial',
  LAST_NAME = 'lastName',
  SIN_NUMBER = 'sinNumber',
  ADDRESS_1 = 'address1',
  ADDRESS_2 = 'address2',

  STEP_2_C = 'step2C_onlyTwoJobs',

  STEP_3_A = 'step3A_numChildrenUnder17Times2000',
  STEP_3_B = 'step3B_numOtherDependentsTimes500',
  STEP_3_SUM = 'step3_sum',

  STEP_4_A = 'step4A_otherIncome',
  STEP_4_B = 'step4B_deductions',
  STEP_4_C = 'step4C_extraWithholding',

  SIGNATURE = 'signature',
  SIGNATURE_DATE = 'signatureDate',

  SINGLE_OR_MARRIED_FILING_SEPARATE = 'singleOrMarriedFilingSeparate',
  MARRIED_FILING_JOINTLY = 'marriedFilingJointly',
  HEAD_OF_HOUSEHOLD = 'headOfHousehold',

  EMPLOYERS_NAME_AND_ADDRESS = 'employersNameAndAddress',
  FIRST_DATE_OF_EMPLOYMENT = 'firstDateOfEmployment',
  EMPLOYERS_EIN = 'employersEIN',

  WORKSHEET_MULTI_JOBS_1 = 'worksheetMultiJob1',
  WORKSHEET_MULTI_JOBS_2A = 'worksheetMultiJob2A',
  WORKSHEET_MULTI_JOBS_2B = 'worksheetMultiJob2B',
  WORKSHEET_MULTI_JOBS_2C = 'worksheetMultiJob2C',
  WORKSHEET_MULTI_JOBS_3 = 'worksheetMultiJob3',
  WORKSHEET_MULTI_JOBS_4 = 'worksheetMultiJob4',

  WORKSHEET_DEDUCTIONS_1 = 'worksheetDeduction1',
  WORKSHEET_DEDUCTIONS_2 = 'worksheetDeduction2',
  WORKSHEET_DEDUCTIONS_3 = 'worksheetDeduction3',
  WORKSHEET_DEDUCTIONS_4 = 'worksheetDeduction4',
  WORKSHEET_DEDUCTIONS_5 = 'worksheetDeduction5',
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
      fieldType: SUPPORTED_FORM_FIELD_TYPES.CHECK_BOX,
      dataType: SUPPORTED_DATA_TYPES.BOOLEAN,
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
      fieldType: SUPPORTED_FORM_FIELD_TYPES.CHECK_BOX,
      dataType: SUPPORTED_DATA_TYPES.BOOLEAN,
      getValueFn: (): boolean => FieldConfiguration.CHECKBOX_VALUE_BY_NAME(FIELD_SELECTOR_LIST.MARRIED_FILING_JOINTLY),
      options: {
        checkboxGroup: 'FILING_STATUS',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.HEAD_OF_HOUSEHOLD,
    new FieldConfiguration('headOfHousehold', FIELD_SELECTOR_LIST.HEAD_OF_HOUSEHOLD, {
      fieldType: SUPPORTED_FORM_FIELD_TYPES.CHECK_BOX,
      dataType: SUPPORTED_DATA_TYPES.BOOLEAN,
      getValueFn: (): boolean => FieldConfiguration.CHECKBOX_VALUE_BY_NAME(FIELD_SELECTOR_LIST.HEAD_OF_HOUSEHOLD),
      options: {
        checkboxGroup: 'FILING_STATUS',
      },
    }),
  ],
  [
    FIELD_SELECTOR_LIST.STEP_2_C,
    new FieldConfiguration('step2C_onlyTwoJobs', FIELD_SELECTOR_LIST.STEP_2_C, {
      fieldType: SUPPORTED_FORM_FIELD_TYPES.CHECK_BOX,
      dataType: SUPPORTED_DATA_TYPES.BOOLEAN,
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

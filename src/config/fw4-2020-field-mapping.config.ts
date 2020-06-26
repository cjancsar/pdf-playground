import { SUPPORTED_FORM_FIELD_TYPES, SUPPORTED_DATA_TYPES } from '../constants';

/**
 * A map of all (necessary) Acroform fields (by unique field name) mapped to their internal property name,
 * expected field type, expected data type, etc.
 * Field `names` not specified in this map will be disabled as inputs
 *
 * @todo disable fields by name if not on this list
 */
export const DOCUMENT_ACROFORM_FIELD_MAP = new Map([
  [
    'topmostSubform[0].Page1[0].Step1a[0].f1_01[0]',
    {
      key: 'firstNameWithMiddleInitial',
      fieldType: SUPPORTED_FORM_FIELD_TYPES.TEXT,
      dataType: SUPPORTED_DATA_TYPES.TEXT,
      // TODO handle case where field not found or value empty, etc.
      value: () =>
        (<HTMLInputElement>document.getElementsByName('topmostSubform[0].Page1[0].Step1a[0].f1_01[0]')[0])?.value,
    },
  ],
]);

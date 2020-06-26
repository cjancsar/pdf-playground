import { SUPPORTED_FORM_FIELD_TYPES, SUPPORTED_DATA_TYPES } from '../constants';

export enum FIELD_SELECTOR_LIST {
  FIRST_NAME_WITH_LAST_INITIAL = 'topmostSubform[0].Page1[0].Step1a[0].f1_01[0]',
}

/**
 * A map of all (necessary) Acroform fields (by unique field name) mapped to their internal property name,
 * expected field type, expected data type, etc.
 * Field `names` not specified in this map will be disabled as inputs
 *
 * @todo disable fields by name if not on this list
 */
export const DOCUMENT_ACROFORM_FIELD_MAP = new Map<FIELD_SELECTOR_LIST, any>([
  [
    FIELD_SELECTOR_LIST.FIRST_NAME_WITH_LAST_INITIAL,
    {
      key: 'firstNameWithMiddleInitial',
      fieldType: SUPPORTED_FORM_FIELD_TYPES.TEXT,
      dataType: SUPPORTED_DATA_TYPES.TEXT,
      // TODO handle case where field not found or value empty, etc.
      getValue: () =>
        (<HTMLInputElement>document.getElementsByName(FIELD_SELECTOR_LIST.FIRST_NAME_WITH_LAST_INITIAL)[0])?.value,
    },
  ],
]);

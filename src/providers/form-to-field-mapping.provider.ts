import {
  DOCUMENT_ACROFORM_FIELD_MAP as FW4_MAP,
  FIELD_SELECTOR_LIST,
} from '../config/fw4-2020-field-mapping.config';

/**
 * A map of all supported forms with a mapping to a field mapping configuration file.
 */
export const FORM_TO_FIELD_MAPPING = new Map<string, Map<FIELD_SELECTOR_LIST, any>>([['fw4.pdf', FW4_MAP]]);

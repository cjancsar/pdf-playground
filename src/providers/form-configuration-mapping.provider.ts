import { DOCUMENT_ACROFORM_FIELD_MAP as FW4_MAP } from '../config/fw4-2020/fw4-2020-field-mapping.config';
import { IFormConfiguration } from 'src/interfaces/form-configuraton';

/**
 * A map of all supported forms with a mapping to a field mapping configuration file.
 */
export const FORM_CONFIGURATION_MAPPING = new Map<string, IFormConfiguration>([['fw4.pdf', { fieldMap: FW4_MAP }]]);

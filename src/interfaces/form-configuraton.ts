import { FIELD_SELECTOR_LIST } from 'src/config/fw4-2020/fw4-2020-field-mapping.config';
import { FieldConfiguration } from 'src/providers/field-configuration.provider';

export interface IFormConfiguration {
  fieldMap: Map<FIELD_SELECTOR_LIST, FieldConfiguration>;
  scripts?: Function[];
}

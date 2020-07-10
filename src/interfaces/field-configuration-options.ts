import { SUPPORTED_FORM_FIELD_TYPES, SUPPORTED_DATA_TYPES } from '../constants';
import { IPropertyMutationOptions } from './property-mutation-options';
import { IFieldAdditionalOptions } from './field-additional-options';

/**
 * Options to override default field configuration values.
 */
export interface IFieldConfigurationOptions {
  /**
   * The AcroForm input field type (i.e. text input, checkbox input)
   */
  fieldType?: SUPPORTED_FORM_FIELD_TYPES;

  /**
   * The date type that will be parsed when submitting PDF forms.
   */
  dataType?: SUPPORTED_DATA_TYPES;

  /**
   * Any input field properties which should be applied to a form input. (i.e. to change a field to readonly)
   */
  fieldPropertyMutations?: IPropertyMutationOptions;

  /**
   * Additional options for grouping and relating fields
   */
  options?: IFieldAdditionalOptions;

  /**
   * A function to GET the current form field data.
   */
  getValueFn?: () => any;

  /**
   * A function to SET the current form field data.
   */
  setValueFn?: (value: any) => void;
}

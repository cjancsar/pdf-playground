import { IFieldConfigurationOptions } from '../interfaces/field-configuration-options';
import { SUPPORTED_FORM_FIELD_TYPES, SUPPORTED_DATA_TYPES } from '../constants';
import { FIELD_SELECTOR_LIST } from '../config/fw4-2020-field-mapping.config';

export class FieldConfiguration {
  public readonly fieldType: SUPPORTED_FORM_FIELD_TYPES;
  public readonly dataType: SUPPORTED_DATA_TYPES;
  private readonly _fieldPropertyMutations: any;
  private readonly _getValueFn: () => string;
  private readonly _setValueFn: (value: any) => void;

  /**
   * Get an element by name (returns the first element returned with the selector name)
   * throws an error if element not found.
   */
  public static GET_ELEMENT_BY_NAME(fieldName: FIELD_SELECTOR_LIST) {
    try {
      return <HTMLInputElement>document.getElementsByName(fieldName)[0];
    } catch {
      throw Error(`Could not find field at selector name[${fieldName}}]`);
    }
  }

  /**
   * Basic field value selector with lookup by name.
   */
  private static SINGLE_ELEMENT_VALUE_BY_NAME(fieldName: FIELD_SELECTOR_LIST) {
    return FieldConfiguration.GET_ELEMENT_BY_NAME(fieldName)?.value;
  }

  /**
   * Set the value of a field by name
   */
  private static SET_ELEMENT_VALUE_BY_NAME(value: any, fieldName: FIELD_SELECTOR_LIST): void {
    FieldConfiguration.GET_ELEMENT_BY_NAME(fieldName).value = value;
  }

  constructor(
    public readonly key: string,
    public readonly fieldSelector: FIELD_SELECTOR_LIST,
    options: IFieldConfigurationOptions = {}
  ) {
    // Set defaults
    this.fieldType = options.fieldType || SUPPORTED_FORM_FIELD_TYPES.TEXT;
    this.dataType = options.dataType || SUPPORTED_DATA_TYPES.TEXT;
    this._fieldPropertyMutations = options.fieldPropertyMutations || undefined;
    this._getValueFn =
      options.getValueFn || ((): string => FieldConfiguration.SINGLE_ELEMENT_VALUE_BY_NAME(this.fieldSelector));
    this._setValueFn =
      options.setValueFn || ((value: any) => FieldConfiguration.SET_ELEMENT_VALUE_BY_NAME(value, this.fieldSelector));
  }

  /**
   * Get the value of the form field with selector `this.fieldSelector`; output keyed as `this.key`
   */
  public getValue(): any {
    return this._getValueFn();
  }

  /**
   * Set the value of the form field with selector `this.fieldSelector`;
   */
  public setValue(value: any): void {
    return this._setValueFn(value);
  }
}

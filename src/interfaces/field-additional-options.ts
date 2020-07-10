export interface IFieldAdditionalOptions {
  /**
   * Specify a common group names if this field is an addend for a group of values.
   */
  addendForGroups?: string[];

  /**
   * Specify a common group names if this field is an addend for a group of values.
   */
  summandForGroups?: string[];

  /**
   * If this field is a sum field for any groups
   */
  sumForGroups?: string[];

  /**
   * Checkbox group (only single member for a group can be selected)
   */
  checkboxGroup?: string;
}

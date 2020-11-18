export const btnTypes: Array<string> = [
  "text",
  "outline",
  "toggle",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "error",
  "info",
  "light",
  "dark",
  "link"
];

export function validatorTypes(value: string): boolean {
  return btnTypes.indexOf(value) !== -1;
}

export const btnStyles: Array<string> = [
  "",
  "regular",
  "circle",
  "rounded",
  "block"
];

export function validatorStyles(value: string): boolean {
  return btnStyles.indexOf(value) !== -1;
}

export const btnSizes: Array<string> = ["", "sm", "regular", "lg"];

export function validatorSizes(value: string): boolean {
  return btnSizes.includes(value);
}

export const btnStates: Array<string> = ["", "active", "hover", "focus"];

export function validatorStates(value: string): boolean {
  return btnStates.indexOf(value) !== -1;
}

export const btnType: Array<string> = ["", "button", "submit", "reset"];

export function validatorType(value: string): boolean {
  return btnType.indexOf(value) !== -1;
}

export interface BtnClassesInterface {
  [className: string]: boolean;
}

export interface PropertiesInterface {
  [attribute: string]: boolean | null | string;
}

export default {
  btnTypes,
  validatorTypes,
  btnStyles,
  validatorStyles,
  btnSizes,
  validatorSizes,
  btnStates,
  validatorStates,
  btnType,
  validatorType
};

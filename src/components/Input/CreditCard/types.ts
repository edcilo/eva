export const types: Array<string> = [
  "primary",
  "success",
  "warning",
  "danger",
  "error",
  "info"
];

/**
 * This type is for fix tslint
 */
export interface CustomInputElement extends HTMLInputElement {
  // TODO: check if this method is supported because launch type error in helpers.ts file if use HTMLInputElement instead
  createTextRange: Function;
}

export interface CardInterface {
  type: null | string;
  number: null | string;
  month: null | string;
  year: null | string;
  cvc: null | string;
}

export function validator(value: string): boolean {
  return types.includes(value);
}

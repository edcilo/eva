export const types: Array<string> = [
  "primary",
  "success",
  "warning",
  "danger",
  "error",
  "info"
];

export function validator(value: string): boolean {
  return types.indexOf(value) !== -1;
}

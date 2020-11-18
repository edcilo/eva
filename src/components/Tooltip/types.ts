export const types: string[] = [
  "top",
  // "right",
  "bottom"
  // "left"
];

export function validator(val: string): boolean {
  return types.includes(val);
}

export default {};

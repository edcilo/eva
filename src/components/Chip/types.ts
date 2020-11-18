export const states: Array<string> = [
  // "dragged",
  "enabled",
  // "disabled",
  "hover",
  "focused",
  // "pressed",
  "selected"
];

export function validator(value: string): boolean {
  return states.indexOf(value) !== -1;
}

export default {
  states,
  validator
};

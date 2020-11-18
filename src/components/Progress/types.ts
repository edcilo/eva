export interface SizesInterface {
  [any: string]: number;
}

export interface BarSyleInterface {
  width: string;
}

export interface ProgressStyleInterface {
  height: null | string;
}

export const sizes: Array<string> = [
  "tiny",
  "small",
  "medium",
  "large",
  "big",
  "huge",
  "massive"
];

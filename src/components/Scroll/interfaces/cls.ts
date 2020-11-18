export interface ClsInterface {
  main: string;
  element: {
    thumb: (axis: string) => string;
    rail: (axis: string) => string;
    consuming: string;
  };
  state: {
    focus: string;
    clicking: string;
    active: (axis: string) => string;
    scrolling: (axis: string) => string;
  };
}

export interface ScrollingClassTimeoutInterface {
  [axis: string]: any;
}

export type ScrollingClassTimeoutType = {
  [id: string]: ScrollingClassTimeoutInterface;
};

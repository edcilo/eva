export default interface SettingsInterface {
  handlers: Array<string>;
  maxScrollbarLength: null | string;
  minScrollbarLength: null | string;
  scrollingThreshold: number;
  scrollXMarginOffset: number;
  scrollYMarginOffset: number;
  suppressScrollX: boolean;
  suppressScrollY: boolean;
  swipeEasing: boolean;
  useBothWheelAxes: boolean;
  wheelPropagation: boolean;
  wheelSpeed: number;
}

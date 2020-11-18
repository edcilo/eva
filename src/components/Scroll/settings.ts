import SettingsInterface from "./interfaces/settings";

const settings: SettingsInterface = {
  handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1
};

export default settings;

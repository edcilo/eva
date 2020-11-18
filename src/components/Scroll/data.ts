import cls from "./lib/class-names";
import Settings from "./settings";
import { CssInterface } from "./interfaces/css";
import {
  ElementClassesInterface,
  RailAxisClassesInterface,
  RailAxisStyleInterface,
  BarAxisClassesInterface,
  DataInterface
} from "./interfaces/data";

const reach: CssInterface = { x: "", y: "" };

const elementClasses: ElementClassesInterface = {};
elementClasses[cls.main] = true;
elementClasses[cls.state.focus] = false;

const railXClasses: RailAxisClassesInterface = {};
railXClasses[cls.element.rail("x")] = true;

const railXStyle: RailAxisStyleInterface = { display: "none" };

const barXClasses: BarAxisClassesInterface = {};
barXClasses[cls.element.thumb("x")] = true;

const railYClasses: RailAxisClassesInterface = {};
railYClasses[cls.element.rail("y")] = true;

const railYStyle: RailAxisStyleInterface = { display: "none" };

const barYClasses: BarAxisClassesInterface = {};
barYClasses[cls.element.thumb("y")] = true;

const data: DataInterface = {
  settings: Settings,
  element: null,
  elementClasses,

  scrollbarElement: {
    x: null,
    xRail: null,
    y: null,
    yRail: null
  },

  event: null,
  ownerDocument: document,
  isAlive: false,
  isRtl: false,
  isNegativeScroll: false,
  isInitialized: false,
  negativeScrollAdjustment: 0,
  reach,

  lastScrollTop: 0,
  lastScrollLeft: 0,

  rail: {
    xWidth: 0,
    yHeight: 0
  },

  railXClasses,
  railXStyle,
  railBorderXWidth: 0,
  railXMarginWidth: 0,
  railXRatio: 0,

  barXClasses,

  railYClasses,
  railYStyle,
  railBorderYWidth: 0,
  railYMarginHeight: 0,
  railYRatio: 0,

  barYClasses,

  scrollbar: {
    wXidth: 0,
    yHeight: 0
  },

  isScrollbarXUsingBottom: true,
  scrollbarXActive: false,
  scrollbarXTop: 0,
  scrollbarXBottom: 0,
  scrollbarXLeft: 0,

  isScrollbarYUsingRight: true,
  scrollbarYOuterWidth: 0,
  scrollbarYActive: false,
  scrollbarYTop: 0,
  scrollbarYRight: 0,
  scrollbarYLeft: 0,

  container: {
    width: 0,
    height: 0
  },

  content: {
    width: 0,
    height: 0
  }
};

export default data;

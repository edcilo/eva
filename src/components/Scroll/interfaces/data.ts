import SettingsInterface from "@/components/Scroll/interfaces/settings";
import { CssInterface } from "@/components/Scroll/interfaces/css";
import { HTMLElementIndex } from "@/components/Scroll/interfaces/types";

export interface ElementClassesInterface {
  [className: string]: boolean;
}

export interface RailAxisClassesInterface {
  [className: string]: boolean;
}

export interface RailAxisStyleInterface {
  display: string;
}

export interface BarAxisClassesInterface {
  [className: string]: boolean;
}

export interface DataInterface {
  settings: SettingsInterface;
  element: null | HTMLElementIndex;
  elementClasses: ElementClassesInterface;

  scrollbarElement: {
    [x: string]: null | HTMLElementIndex;
    xRail: null | HTMLElementIndex;
    y: null | HTMLElementIndex;
    yRail: null | HTMLElementIndex;
  };

  event: any;
  ownerDocument: Document;
  isAlive: boolean;
  isRtl: boolean;
  isNegativeScroll: boolean;
  isInitialized: boolean;
  negativeScrollAdjustment: number;
  reach: CssInterface;

  lastScrollTop: number;
  lastScrollLeft: number;

  rail: {
    [xWidth: string]: number;
    yHeight: number;
  };

  railXClasses: RailAxisClassesInterface;
  railXStyle: RailAxisStyleInterface;
  railBorderXWidth: number;
  railXMarginWidth: number;
  railXRatio: number;

  barXClasses: BarAxisClassesInterface;

  railYClasses: RailAxisClassesInterface;
  railYStyle: RailAxisStyleInterface;
  railBorderYWidth: number;
  railYMarginHeight: number;
  railYRatio: number;

  barYClasses: BarAxisClassesInterface;

  scrollbar: {
    [xWidth: string]: number;
    yHeight: number;
  };

  isScrollbarXUsingBottom: boolean;
  scrollbarXActive: boolean;
  scrollbarXTop: number;
  scrollbarXBottom: number;
  scrollbarXLeft: number;

  isScrollbarYUsingRight: boolean;
  scrollbarYOuterWidth: number;
  scrollbarYActive: boolean;
  scrollbarYTop: number;
  scrollbarYRight: number;
  scrollbarYLeft: number;

  container: {
    [width: string]: number;
    height: number;
  };

  content: {
    [width: string]: number;
    height: number;
  };
}

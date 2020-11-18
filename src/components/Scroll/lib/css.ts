import {
  CssInterface,
  ContentInterface,
  ContainerInterface
} from "./../interfaces/css";

interface ObjString {
  [key: string]: any;
}

function get(element: HTMLElement): CSSStyleDeclaration {
  return window.getComputedStyle(element);
}

function set(element: HTMLElement, obj: ObjString): HTMLElement {
  for (const key in obj) {
    let val: string = obj[key];

    if (typeof val === "number") {
      val = `${val}px`;
    }

    (<any>element).style[key] = val;
  }

  return element;
}

function isRtl(element: HTMLElement): boolean {
  let elementStyles: CSSStyleDeclaration = get(element);

  return elementStyles.direction === "rtl";
}

function isNegativeScroll(element: HTMLElement): boolean {
  const originalScrollLeft = element.scrollLeft;
  element.scrollLeft = -1;

  let result = element.scrollLeft < 0;
  element.scrollLeft = originalScrollLeft;

  return result;
}

function negativeScrollAdjustment(
  element: HTMLElement,
  isNegativeScroll: boolean
): number {
  return isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
}

function reach(
  element: HTMLElement,
  content: ContentInterface,
  container: ContainerInterface
): CssInterface {
  let { contentWidth, contentHeight } = content;
  let { containerWidth, containerHeight } = container;

  return {
    x:
      element.scrollLeft <= 0
        ? "start"
        : element.scrollLeft >= contentWidth - containerWidth
        ? "end"
        : null,
    y:
      element.scrollTop <= 0
        ? "start"
        : element.scrollTop >= contentHeight - containerHeight
        ? "end"
        : null
  };
}

export default {
  get,
  set,
  isRtl,
  isNegativeScroll,
  negativeScrollAdjustment,
  reach
};

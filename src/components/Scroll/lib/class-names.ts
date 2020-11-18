import {
  ClsInterface,
  ScrollingClassTimeoutInterface
} from "./../interfaces/cls";
import { DataInterface } from "./../interfaces/data";

const cls: ClsInterface = {
  main: "ve-scroll",
  element: {
    thumb: axis => `ves__thumb-${axis}`,
    rail: axis => `ves__rail-${axis}`,
    consuming: "ves__child--consume"
  },
  state: {
    focus: "ves--focus",
    clicking: "ves--clicking",
    active: axis => `ves--active-${axis}`,
    scrolling: axis => `ves--scrolling-${axis}`
  }
};

export default cls;

/*
 * Helper methods
 */
const scrollingClassTimeout: ScrollingClassTimeoutInterface = {
  x: null,
  y: null
};

export function addScrollingClass(data: DataInterface, axis: string): void {
  if (data.element === null) {
    return;
  }

  const classList = data.element.classList;
  const className = cls.state.scrolling(axis);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[axis]);
  } else {
    classList.add(className);
  }
}

export function removeScrollingClass(data: DataInterface, axis: string): void {
  scrollingClassTimeout[axis] = setTimeout(
    () =>
      data.isAlive &&
      data.element &&
      data.element.classList.remove(cls.state.scrolling(axis)),
    data.settings.scrollingThreshold
  );
}

export function setScrollingClassInstantly(
  data: DataInterface,
  axis: string
): void {
  addScrollingClass(data, axis);
  removeScrollingClass(data, axis);
}

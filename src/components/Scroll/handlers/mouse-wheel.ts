import CSS from "./../lib/css";
import cls from "./../lib/class-names";
import updateGeometry from "./../update-geometry";
import { env } from "./../lib/util";
import { DataInterface } from "./../interfaces/data";

interface WheelEventExtended extends WheelEvent {
  wheelDelta: number;
  wheelDeltaX: number;
  wheelDeltaY: number;
}

export default function(i: DataInterface) {
  const element = i.element;

  function shouldPreventDefault(deltaX: number, deltaY: number): boolean {
    if (element === null) {
      return false;
    }

    const roundedScrollTop: number = Math.floor(element.scrollTop);
    const isTop: boolean = element.scrollTop === 0;
    const isBottom: boolean =
      roundedScrollTop + element.offsetHeight === element.scrollHeight;
    const isLeft: boolean = element.scrollLeft === 0;
    const isRight: boolean =
      element.scrollLeft + element.offsetWidth === element.scrollWidth;

    let hitsBound: boolean;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e: WheelEventExtended): Array<number> {
    let deltaX: number = e.deltaX;
    let deltaY: number = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = (-1 * e.wheelDeltaX) / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }

    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(
    target: any,
    deltaX: number,
    deltaY: number
  ): boolean {
    if (element === null) {
      return false;
    }

    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector("select:focus")) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    let cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      const style = CSS.get(cursor);
      const overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ""
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        const maxScrollTop = cursor.scrollHeight - cursor.clientHeight;

        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }

        const maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;

        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e: WheelEventExtended): void {
    if (element === null) {
      return;
    }

    const [deltaX, deltaY] = getDeltaFromEvent(e);

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    let shouldPrevent: boolean = false;

    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let"s scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);

    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, "wheel", mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, "mousewheel", mousewheelHandler);
  }
}

import { DataInterface } from "./interfaces/data";
import CSS from "./lib/css";
import cls from "./lib/class-names";
import { toInt } from "./lib/util";
import railOffsetInterface from "./interfaces/updateGeometry";

export default function(i: DataInterface): void {
  if (i.element === null) {
    return;
  }

  const element = i.element;

  const roundedScrollTop = Math.floor(element.scrollTop);
  i.container.width = element.clientWidth;
  i.container.height = element.clientHeight;
  i.content.width = element.scrollWidth;
  i.content.height = element.scrollHeight;

  if (
    !i.settings.suppressScrollX &&
    i.container.width + i.settings.scrollXMarginOffset < i.content.width
  ) {
    i.scrollbarXActive = true;
    i.rail.xWidth = i.container.width - i.railXMarginWidth;
    i.railXRatio = i.container.width / i.rail.xWidth;
    i.scrollbar.xWidth = getThumbSize(
      i,
      (i.rail.xWidth * i.container.width) / i.content.width
    );
    i.scrollbarXLeft =
      ((i.negativeScrollAdjustment + element.scrollLeft) *
        (i.rail.xWidth - i.scrollbar.xWidth)) /
      (i.content.width - i.container.width);
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.container.height + i.settings.scrollYMarginOffset < i.content.height
  ) {
    i.scrollbarYActive = true;
    i.rail.yHeight = i.container.height - i.railYMarginHeight;
    i.railYRatio = i.container.height / i.rail.yHeight;
    i.scrollbar.yHeight = getThumbSize(
      i,
      (i.rail.yHeight * i.container.height) / i.content.height
    );
    i.scrollbarYTop =
      (roundedScrollTop * (i.rail.yHeight - i.scrollbar.yHeight)) /
      (i.content.height - i.container.height);
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.rail.xWidth - i.scrollbar.xWidth) {
    i.scrollbarXLeft = i.rail.xWidth - i.scrollbar.xWidth;
  }

  if (i.scrollbarYTop >= i.rail.yHeight - i.scrollbar.yHeight) {
    i.scrollbarYTop = i.rail.yHeight - i.scrollbar.yHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active("x"));
  } else {
    element.classList.remove(cls.state.active("x"));
    i.scrollbar.xWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = 0;
  }

  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active("y"));
  } else {
    element.classList.remove(cls.state.active("y"));
    i.scrollbar.yHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
}

function getThumbSize(i: DataInterface, thumbSize: number): number {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, toInt(i.settings.minScrollbarLength));
  }

  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, toInt(i.settings.maxScrollbarLength));
  }

  return thumbSize;
}

function updateCss(element: HTMLElement, i: DataInterface): void {
  const xRailOffset: railOffsetInterface = {
    width: i.rail.xWidth,
    height: null,
    top: null,
    right: null,
    bottom: null,
    left: null
  };

  const roundedScrollTop = Math.floor(element.scrollTop);

  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.container.width -
      i.content.width;
  } else {
    xRailOffset.left = element.scrollLeft;
  }

  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
  }

  if (i.scrollbarElement.xRail !== null) {
    CSS.set(i.scrollbarElement.xRail, xRailOffset);
  }

  const yRailOffset: railOffsetInterface = {
    width: null,
    height: i.rail.yHeight,
    top: roundedScrollTop,
    right: null,
    bottom: null,
    left: null
  };

  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.content.width -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.container.width * 2 -
        i.content.width -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }

  if (i.scrollbarElement.yRail !== null) {
    CSS.set(i.scrollbarElement.yRail, yRailOffset);
  }

  if (i.scrollbarElement.x !== null) {
    const left = i.scrollbarXLeft;
    const width = i.scrollbar.xWidth - i.railBorderXWidth;

    CSS.set(i.scrollbarElement.x, { left, width });
  }

  if (i.scrollbarElement.y !== null) {
    const top = i.scrollbarYTop;
    const height = i.scrollbar.yHeight - i.railBorderYWidth;

    CSS.set(i.scrollbarElement.y, { top, height });
  }
}

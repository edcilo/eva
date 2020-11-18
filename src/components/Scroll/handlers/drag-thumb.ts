import cls, {
  addScrollingClass,
  removeScrollingClass
} from "./../lib/class-names";
import updateGeometry from "./../update-geometry";
import { DataInterface } from "./../interfaces/data";
import { HTMLElementIndex } from "@/components/Scroll/interfaces/types";

interface MouseEventCustom extends MouseEvent {
  [key: string]: any;
}

export default function(i: DataInterface) {
  bindMouseScrollHandler(i, [
    "width",
    "width",
    "pageX",
    "xWidth",
    "x",
    "xWidth",
    "scrollLeft",
    "x",
    "xRail"
  ]);

  bindMouseScrollHandler(i, [
    "height",
    "height",
    "pageY",
    "yHeight",
    "y",
    "yHeight",
    "scrollTop",
    "y",
    "yRail"
  ]);
}

function bindMouseScrollHandler(
  i: DataInterface,
  [
    containerHeight,
    contentHeight,
    page,
    railHeight,
    scrollbar,
    scrollbarHeight,
    scrollTop,
    axis,
    scrollbarRail
  ]: Array<string>
) {
  if (i.element === null) {
    return;
  }

  const element: HTMLElementIndex = i.element;

  let startingScrollTop: number = 0;
  let startingMousepage: number = 0;
  let scrollBy: number = 0;

  function mouseMoveHandler(e: MouseEventCustom) {
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[page] - startingMousepage);
    addScrollingClass(i, axis);
    updateGeometry(i);

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    removeScrollingClass(i, axis);

    const scrollbarElement = i.scrollbarElement[scrollbarRail];

    if (scrollbarElement !== null) {
      scrollbarElement.classList.remove(cls.state.clicking);
    }

    i.event.unbind(i.ownerDocument, "mousemove", mouseMoveHandler);
  }

  i.event.bind(
    i.scrollbarElement[scrollbar],
    "mousedown",
    (e: MouseEventCustom) => {
      startingScrollTop = element[scrollTop];
      startingMousepage = e[page];
      scrollBy =
        (i.content[contentHeight] - i.container[containerHeight]) /
        (i.rail[railHeight] - i.scrollbar[scrollbarHeight]);

      i.event.bind(i.ownerDocument, "mousemove", mouseMoveHandler);
      i.event.once(i.ownerDocument, "mouseup", mouseUpHandler);

      const scrollbarElement = i.scrollbarElement[scrollbarRail];

      if (scrollbarElement !== null) {
        scrollbarElement.classList.add(cls.state.clicking);
      }

      e.stopPropagation();
      e.preventDefault();
    }
  );
}

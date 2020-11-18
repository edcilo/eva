import updateGeometry from "./../update-geometry";
import { DataInterface } from "./../interfaces/data";

export default function(i: DataInterface): void {
  i.event.bind(i.scrollbarElement.y, "mousedown", (e: MouseEvent) =>
    e.stopPropagation()
  );

  i.event.bind(i.scrollbarElement.yRail, "mousedown", (e: MouseEvent) => {
    if (i.element === null || i.scrollbarElement.yRail === null) {
      return;
    }

    const positionTop: number =
      e.pageY -
      window.pageYOffset -
      i.scrollbarElement.yRail.getBoundingClientRect().top;
    const direction: number = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.container.height;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarElement.x, "mousedown", (e: MouseEvent) =>
    e.stopPropagation()
  );

  i.event.bind(i.scrollbarElement.xRail, "mousedown", (e: MouseEvent) => {
    if (i.element === null || i.scrollbarElement.xRail === null) {
      return;
    }

    const positionLeft: number =
      e.pageX -
      window.pageXOffset -
      i.scrollbarElement.xRail.getBoundingClientRect().left;
    const direction: number = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.container.width;
    updateGeometry(i);

    e.stopPropagation();
  });
}

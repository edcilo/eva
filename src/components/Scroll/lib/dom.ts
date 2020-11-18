export function div(className: string): HTMLElement {
  const div = document.createElement("div");

  div.className = className;
  return div;
}

const elMatches =
  typeof Element !== "undefined" &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    (<any>Element).prototype.mozMatchesSelector ||
    (<any>Element).prototype.msMatchesSelector);

export function matches(element: HTMLElement, query: string) {
  if (!elMatches) {
    throw new Error("No element matching method supported");
  }

  return elMatches.call(element, query);
}

export function remove(element: HTMLElement) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

export function queryChildren(
  element: HTMLElement,
  selector: string
): Array<any> {
  return Array.prototype.filter.call(element.children, (child: HTMLElement) =>
    matches(child, selector)
  );
}

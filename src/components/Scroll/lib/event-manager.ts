interface HandlerInterface {
  [eventName: string]: Array<any>;
}

class EventElement {
  protected element: HTMLElement;
  protected handlers: HandlerInterface = {};

  constructor(element: HTMLElement) {
    this.element = element;
  }

  bind(eventName: string, handler: () => void): void {
    if (typeof this.handlers[eventName] === "undefined") {
      this.handlers[eventName] = [];
    }

    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, { passive: false });
  }

  unbind(eventName: string, target?: () => void): boolean | void {
    this.handlers[eventName] = this.handlers[eventName].filter(handler => {
      if (target && handler !== target) {
        return true;
      }

      this.element.removeEventListener(eventName, handler, false);

      return false;
    });
  }

  unbindAll(): void {
    for (const name in this.handlers) {
      this.unbind(name);
    }
  }

  get isEmpty(): boolean {
    return Object.keys(this.handlers).every(
      key => this.handlers[key].length === 0
    );
  }
}

export default class EventManager {
  protected eventElements: Array<any>;

  constructor() {
    this.eventElements = [];
  }

  eventElement(element: HTMLElement) {
    let ee = this.eventElements.filter(ee => ee.element === element)[0];

    if (!ee) {
      ee = new EventElement(element);
      this.eventElements.push(ee);
    }

    return ee;
  }

  bind(element: HTMLElement, eventName: string, handler: () => void): void {
    this.eventElement(element).bind(eventName, handler);
  }

  unbind(element: HTMLElement, eventName: string, handler: () => void): void {
    const ee = this.eventElement(element);
    ee.unbind(eventName, handler);

    if (ee.isEmpty) {
      // remove
      this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
  }

  unbindAll(): void {
    this.eventElements.forEach(e => e.unbindAll());
    this.eventElements = [];
  }

  once(
    element: HTMLElement,
    eventName: string,
    handler: (key: any) => void
  ): void {
    const ee = this.eventElement(element);
    const onceHandler = (evt: any) => {
      ee.unbind(eventName, onceHandler);
      handler(evt);
    };

    ee.bind(eventName, onceHandler);
  }
}

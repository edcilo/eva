import { DataInterface } from "./interfaces/data";

import CSS from "./lib/css";
import cls from "./lib/class-names";
import EventManager from "./lib/event-manager";
import processScrollDiff from "./process-scroll-diff";
import updateGeometry from "./update-geometry";
import { toInt } from "./lib/util";

import clickRail from "./handlers/click-rail";
import dragThumb from "./handlers/drag-thumb";
import keyboard from "./handlers/keyboard";
import wheel from "./handlers/mouse-wheel";
import touch from "./handlers/touch";

interface HandlerInterface {
  [handler: string]: (data: DataInterface) => void;
}

const handlers: HandlerInterface = {
  "click-rail": clickRail,
  "drag-thumb": dragThumb,
  keyboard,
  wheel,
  touch
};

class Scrollbar {
  protected data!: DataInterface;

  constructor($data: DataInterface) {
    this.data = $data;

    if (
      this.data.element === null ||
      this.data.scrollbarElement.xRail === null ||
      this.data.scrollbarElement.yRail === null
    ) {
      return;
    }

    const focus = () => {
      if (this && this.data && this.data.element) {
        this.data.element.classList.add(cls.state.focus);
      }
    };
    const blur = () => {
      if (this && this.data && this.data.element) {
        this.data.element.classList.remove(cls.state.focus);
      }
    };

    this.data.isRtl = CSS.isRtl(this.data.element);
    this.data.isNegativeScroll = CSS.isNegativeScroll(this.data.element);
    this.data.negativeScrollAdjustment = CSS.negativeScrollAdjustment(
      this.data.element,
      this.data.isNegativeScroll
    );

    this.data.event = new EventManager();
    this.data.ownerDocument = this.data.element.ownerDocument || document;

    // AXIS X
    this.data.event.bind(this.data.scrollbarElement.x, "focus", focus);
    this.data.event.bind(this.data.scrollbarElement.x, "blur", blur);

    const railXStyle: CSSStyleDeclaration = CSS.get(
      this.data.scrollbarElement.xRail
    );

    if (railXStyle.bottom === null) {
      this.data.isScrollbarXUsingBottom = false;
      this.data.scrollbarXTop = toInt(railXStyle.top);
    } else {
      this.data.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    }

    this.data.railBorderXWidth =
      toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
    CSS.set(this.data.scrollbarElement.xRail, { display: "block" });
    this.data.railXMarginWidth =
      toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
    CSS.set(this.data.scrollbarElement.xRail, { display: "" });

    // AXIS Y
    this.data.event.bind(this.data.scrollbarElement.y, "focus", focus);
    this.data.event.bind(this.data.scrollbarElement.y, "blur", blur);

    const railYStyle: CSSStyleDeclaration = CSS.get(
      this.data.scrollbarElement.yRail
    );

    if (railYStyle.right === null) {
      this.data.isScrollbarYUsingRight = false;
      this.data.scrollbarYLeft = toInt(railYStyle.left);
    } else {
      this.data.scrollbarYRight = parseInt(railYStyle.right, 10);
    }

    //this.data.isRtl ? outerWidth(this.data.scrollbarY) : null;
    this.data.railBorderYWidth =
      toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
    CSS.set(this.data.scrollbarElement.yRail, { display: "block" });
    this.data.railYMarginHeight =
      toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
    CSS.set(this.data.scrollbarElement.yRail, { display: "" });

    this.data.reach = CSS.reach(
      this.data.element,
      {
        contentWidth: this.data.content.width,
        contentHeight: this.data.content.height
      },
      {
        containerWidth: this.data.container.width,
        containerHeight: this.data.container.height
      }
    );

    this.data.isAlive = true;
    this.data.settings.handlers.forEach((handlerName: string) =>
      handlers[handlerName](this.data)
    );

    this.data.lastScrollTop = Math.floor(this.data.element.scrollTop);
    this.data.lastScrollLeft = this.data.element.scrollLeft;

    this.data.event.bind(this.data.element, "scroll", () => this.onScroll());
    updateGeometry(this.data);
  }

  onScroll(): void {
    if (!this.data.isAlive || this.data.element === null) {
      return;
    }

    updateGeometry(this.data);
    processScrollDiff(
      this.data,
      "top",
      this.data.element.scrollTop - this.data.lastScrollTop
    );
    processScrollDiff(
      this.data,
      "left",
      this.data.element.scrollLeft - this.data.lastScrollLeft
    );

    this.data.lastScrollTop = Math.floor(this.data.element.scrollTop);
    this.data.lastScrollLeft = this.data.element.scrollLeft;
  }

  update() {
    if (
      !this.data.isAlive ||
      this.data.element === null ||
      this.data.scrollbarElement.xRail === null ||
      this.data.scrollbarElement.yRail === null
    ) {
      return;
    }

    // Recalcuate negative scrollLeft adjustment
    this.data.negativeScrollAdjustment = this.data.isNegativeScroll
      ? this.data.element.scrollWidth - this.data.element.clientWidth
      : 0;

    // Recalculate rail margins
    CSS.set(this.data.scrollbarElement.xRail, { display: "block" });
    CSS.set(this.data.scrollbarElement.yRail, { display: "block" });
    this.data.railXMarginWidth =
      toInt(CSS.get(this.data.scrollbarElement.xRail).marginLeft) +
      toInt(CSS.get(this.data.scrollbarElement.xRail).marginRight);
    this.data.railYMarginHeight =
      toInt(CSS.get(this.data.scrollbarElement.yRail).marginTop) +
      toInt(CSS.get(this.data.scrollbarElement.yRail).marginBottom);

    // Hide scrollbars not to affect scrollWidth and scrollHeight
    CSS.set(this.data.scrollbarElement.xRail, { display: "none" });
    CSS.set(this.data.scrollbarElement.yRail, { display: "none" });

    updateGeometry(this.data);

    processScrollDiff(this.data, "top", 0, false, true);
    processScrollDiff(this.data, "left", 0, false, true);

    CSS.set(this.data.scrollbarElement.xRail, { display: "" });
    CSS.set(this.data.scrollbarElement.yRail, { display: "" });
  }
}

export default Scrollbar;

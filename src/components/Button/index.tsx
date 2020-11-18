import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import {
  BtnClassesInterface,
  btnTypes,
  PropertiesInterface,
  validatorTypes,
  validatorStyles,
  validatorSizes,
  validatorStates,
  validatorType
} from "./types";

@Component({
  name: "VeButton"
})
export default class VeButton extends Vue {
  @Prop({ default: "primary", validator: validatorTypes })
  protected type!: string;

  @Prop({ default: "", validator: validatorStyles })
  protected btnStyle!: string;

  @Prop({ default: "", validator: validatorSizes })
  protected size!: string;

  @Prop({ default: "", validator: validatorStates })
  protected state!: string;

  @Prop({ default: "button", validator: validatorType })
  protected btnType!: string;

  @Prop({ default: "" })
  protected btnName!: string;

  @Prop({ default: null })
  protected btnValue!: any;

  @Prop({ default: false })
  protected disabled!: boolean;

  @Prop({ default: null })
  protected href!: null | string;

  @Prop({ type: String, default: null })
  protected id!: string;

  @Prop({ default: null })
  protected target!: null | string;

  @Prop({ default: null })
  protected handler!: null | Function;

  @Prop({ default: false })
  protected autofocus!: boolean;

  protected cn = "ve-button";
  protected active = false;
  protected hasIcon: boolean = typeof this.$slots.icon === "object";
  protected btnClasses: BtnClassesInterface = {};

  @Watch("type")
  onTypeChanged(type: string): void {
    this.btnClasses = {
      ...this.btnClasses,
      ...this.setTypeClass(type)
    };
  }

  @Watch("btnStyle")
  onStyleChanged(style: string): void {
    this.btnClasses = {
      ...this.btnClasses,
      ...this.setStyleClass(style)
    };
  }

  @Watch("size")
  onSizeChanged(size: string): void {
    this.btnClasses = {
      ...this.btnClasses,
      ...this.setSizeClass(size)
    };
  }

  @Watch("state")
  onStateChanged(state: string): void {
    this.btnClasses = {
      ...this.btnClasses,
      ...this.setStateClass(state)
    };
  }

  @Watch("disabled")
  onDisabledChanged(disabled: boolean): void {
    if (this.href !== null && this.href.length > 0) {
      this.btnClasses["disabled"] = disabled;
    }

    if (disabled) {
      this.$emit("disabled");
    } else {
      this.$emit("enable");
    }
  }

  @Watch("active")
  onActiveChanged(active: boolean): void {
    if (active) {
      this.btnClasses["pressed"] = true;
    } else {
      this.btnClasses["pressed"] = false;
    }
  }

  emitEvent() {
    this.$emit("click");
  }

  setSizeClass(size: string): BtnClassesInterface {
    return {
      "ve-btn-sm": size === "sm",
      "ve-btn-regular": size === "regular",
      "ve-btn-lg": size === "lg"
    };
  }

  setStateClass(state: string): BtnClassesInterface {
    return {
      active: state === "active",
      hover: state === "hover",
      focus: state === "focus"
    };
  }

  setStyleClass(style: string): BtnClassesInterface {
    return {
      "ve-btn-round": style === "rounded",
      "ve-btn-circle": style === "circle",
      "ve-btn-block": style === "block"
    };
  }

  setTypeClass(type: string): BtnClassesInterface {
    const classes: BtnClassesInterface = {};

    for (const t of btnTypes) {
      classes[`ve-btn-${t}`] = t === type;
    }

    return classes;
  }

  clicked(): void {
    if (this.type === "toggle") {
      this.active = !this.active;
    }

    if (this.handler !== null) {
      this.handler();
    }

    this.emitEvent();
  }

  linkClicked(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
    }

    this.emitEvent();
  }

  constructor() {
    super();

    const typeClasses = this.setTypeClass(this.type);
    const sizeClass = this.setSizeClass(this.size);
    const styleClasses = this.setStyleClass(this.btnStyle);
    const stateClasses = this.setStateClass(this.state);

    const classes: BtnClassesInterface = {
      disabled:
        this.href !== null && this.href.length > 0 ? this.disabled : false,
      pressed: false
    };

    this.btnClasses = {
      ...typeClasses,
      ...styleClasses,
      ...sizeClass,
      ...stateClasses,
      ...classes
    };
  }

  render(): VNode {
    const isBtn: boolean = this.href === null || this.href.length === 0;
    const element: string = isBtn ? "button" : "a";
    const icon: VNode | null = this.hasIcon
      ? this.$createElement(
          "div",
          {
            class: `${this.cn}__icon`
          },
          this.$slots.icon
        )
      : null;

    const properties: PropertiesInterface = isBtn
      ? {
          autofocus: this.autofocus,
          disabled: this.disabled,
          type: this.btnType,
          name: this.btnName,
          value: this.btnValue
        }
      : {
          autofocus: this.autofocus,
          href: this.href,
          target: this.target
        };

    return this.$createElement(
      element,
      {
        class: [this.cn, this.btnClasses],
        attrs: { id: this.id, ...properties },
        on: {
          click: isBtn ? this.clicked : this.linkClicked
        }
      },
      [icon, this.$slots.default]
    );
  }
}

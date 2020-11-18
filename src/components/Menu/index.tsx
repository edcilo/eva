import "./styles.scss";

import { VNode } from "vue";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { listStylesInterface } from "./types";
import VeNav from "@/components/Nav";

@Component({
  name: "VeMenu",
  components: {
    VeNav
  }
})
export default class VeMenu extends Vue {
  @Prop({ type: Boolean, default: true })
  protected absolute!: boolean;

  @Prop({ type: Boolean, default: true })
  protected bottom!: boolean;

  @Prop({ default: false })
  protected disabled!: boolean;

  @Prop({ type: Boolean, default: true })
  protected dismissible!: boolean;

  @Prop({ type: Boolean, default: false })
  protected alignEnd!: boolean;

  @Prop({ type: Boolean, default: false })
  protected fixed!: boolean;

  @Prop({ type: Boolean, default: false })
  protected left!: boolean;

  @Prop({ type: Number, default: null })
  protected positionX!: number;

  @Prop({ type: Number, default: null })
  protected positionY!: number;

  @Prop({ type: Boolean, default: false })
  protected right!: boolean;

  @Prop({ type: Boolean, default: false })
  protected top!: boolean;

  @Prop({ type: Boolean, default: false })
  protected value!: boolean;

  @Prop({ type: Number, default: null })
  protected zIndex!: number;

  cn = "ve-menu";
  visible = false;

  @Watch("value", { immediate: true })
  onValueChanged(newVal: boolean): void {
    this.visible = newVal;

    if (newVal === true) {
      this.emitOpenEvents();
    } else {
      this.emitCloseEvents();
    }
  }

  @Emit()
  async beforeOpen() {
    return null;
  }

  @Emit()
  async open() {
    return null;
  }

  @Emit()
  async afterOpen() {
    return null;
  }

  @Emit()
  async beforeClose() {
    return null;
  }

  @Emit()
  async close() {
    return null;
  }

  @Emit()
  async afterClose() {
    return null;
  }

  get listClasses(): Array<string> {
    const classes = [`${this.cn}__list`];

    if (this.fixed) {
      classes.push(`${this.cn}__list-fixed`);
    } else if (this.absolute) {
      classes.push(`${this.cn}__list-absolute`);
    }

    if (this.alignEnd) {
      classes.push(`${this.cn}__list-end`);
    }

    if (!this.fixed) {
      if (this.top) {
        classes.push(`${this.cn}__list-top`);
      } else if (this.right) {
        classes.push(`${this.cn}__list-right`);
      } else if (this.bottom) {
        classes.push(`${this.cn}__list-bottom`);
      } else if (this.left) {
        classes.push(`${this.cn}__list-left`);
      } else {
        classes.push(`${this.cn}__list-bottom`);
      }
    }

    return classes;
  }

  get listStyles(): listStylesInterface {
    const styles: listStylesInterface = {};

    if (this.positionX) {
      styles.left = `${this.positionX}px`;
    }

    if (this.positionY) {
      styles.top = `${this.positionY}px`;
    }

    if (this.zIndex) {
      styles.zIndex = this.zIndex;
    }

    return styles;
  }

  emitOpenEvents(): void {
    this.beforeOpen().finally(() =>
      this.open().finally(() => this.afterOpen())
    );
  }

  emitCloseEvents(): void {
    this.beforeClose().finally(() =>
      this.close().finally(() => this.afterClose())
    );
  }

  onClose(): void {
    this.visible = false;
    this.$emit("input", this.visible);

    this.emitCloseEvents();
  }

  onClickOutside(): void {
    if (this.dismissible) {
      this.onClose();
    }
  }

  onOpen(): void {
    if (this.disabled) {
      return;
    }

    this.visible = true;
    this.$emit("input", this.visible);

    this.emitOpenEvents();
  }

  onTriggerClicked(): void {
    if (this.visible) {
      this.onClose();
    } else {
      this.onOpen();
    }
  }

  render(): VNode {
    return (
      <div class={this.cn} v-click-outside={this.onClickOutside}>
        <div class={`${this.cn}__trigger`} onClick={this.onTriggerClicked}>
          {this.$slots.trigger}
        </div>

        <transition name="fade">
          {this.visible && this.$slots.default ? (
            <ve-nav
              class={this.listClasses}
              vertical={true}
              style={this.listStyles}
            >
              {this.$slots.default}
            </ve-nav>
          ) : null}
        </transition>
      </div>
    );
  }
}

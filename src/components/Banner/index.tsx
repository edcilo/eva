import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VeBanner"
})
export default class VeBanner extends Vue {
  @Prop({ type: Number, default: null })
  time!: number | null;

  @Prop({ type: Boolean, default: true })
  value!: boolean;

  cn = "ve-banner";
  timer: number | undefined;
  visible!: boolean;

  get hasIcon(): boolean {
    return this.$slots.icon !== undefined;
  }

  get hasButtons(): boolean {
    return this.$slots.buttons !== undefined;
  }

  @Watch("value", { immediate: true })
  onValueChanged(newVal: boolean): void {
    this.visible = newVal;

    if (newVal) {
      this.$emit("open");
    } else {
      this.$emit("close");
    }
  }

  onClose(): void {
    clearTimeout(this.timer);
    this.visible = false;
    this.$emit("input", this.visible);
    this.$emit("close");
  }

  updated(): void {
    if (this.visible && this.time !== null) {
      this.timer = window.setTimeout(() => {
        this.onClose();
      }, this.time * 1000);
    }
  }

  render(): VNode {
    return (
      <transition name="slide">
        {this.visible ? (
          <div class={this.cn}>
            <div class={`${this.cn}__container`}>
              {this.hasIcon ? (
                <div class={`${this.cn}__icon`}>{this.$slots.icon}</div>
              ) : null}
              <div class={`${this.cn}__content`}>{this.$slots.default}</div>
            </div>
            {this.hasButtons ? (
              <div class={`${this.cn}__buttons`}>{this.$slots.buttons}</div>
            ) : null}
          </div>
        ) : null}
      </transition>
    );
  }
}

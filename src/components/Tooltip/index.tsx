import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validator } from "./types";

@Component({
  name: "VeTooltip"
})
export default class VeTooltip extends Vue {
  cn = "ve-tooltip";
  visible = false;

  @Prop({ type: String || null, default: null })
  label!: string;

  @Prop({ type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "top", validator })
  position!: string;

  get popClasses() {
    return [`${this.cn}__popover`, `${this.cn}__popover-${this.position}`];
  }

  @Watch("show", { immediate: true })
  onShowChanged(newVal: boolean) {
    this.visible = newVal;
  }

  mouseOverHandler() {
    if (!this.disabled && !this.show) {
      this.visible = true;
    }
  }

  mouseLeaveHandler() {
    if (!this.disabled && !this.show) {
      this.visible = false;
    }
  }

  render(): VNode {
    return (
      <div
        class={this.cn}
        onMouseover={this.mouseOverHandler}
        onMouseleave={this.mouseLeaveHandler}
      >
        {this.label !== null ? (
          <div class={[this.popClasses, { open: this.visible }]}>
            {this.label}
          </div>
        ) : null}

        {this.$slots.default}
      </div>
    );
  }
}

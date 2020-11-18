import "./styles.scss";
import { VNode } from "vue";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import vePanel from "@/components/Panel";
import veMask from "@/components/Mask";

@Component({
  name: "VeDialog",
  components: {
    vePanel,
    veMask
  }
})
export default class VeDialog extends Vue {
  cn = "ve-dialog";

  @Prop({ type: Boolean, default: false })
  open!: boolean;

  @Prop({ type: Number, default: 0.6 })
  overlayOpacity!: number;

  @Prop({ type: Boolean, default: false })
  persistent!: boolean;

  @Watch("open", { immediate: true })
  onOpenChanged(newVal: boolean): void {
    if (newVal) {
      this.emitOpenEvent();
    } else {
      this.emitCloseEvents();
    }
  }

  @Emit("open")
  emitOpenEvent() {
    return null;
  }

  @Emit("close")
  emitCloseEvents() {
    return null;
  }

  @Emit("clickOverlay")
  clickOverlayHandler() {
    return null;
  }

  render(): VNode {
    return (
      <ve-mask
        class={this.cn}
        fullscreen={this.open}
        open={this.open}
        opacity={this.overlayOpacity}
        onClick={this.clickOverlayHandler}
      >
        <ve-panel class={`${this.cn}__card`}>{this.$slots.default}</ve-panel>
      </ve-mask>
    );
  }
}

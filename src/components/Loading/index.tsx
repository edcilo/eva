import veMask from "@/components/Mask";
import veSpinner from "@/components/Spinner";

import "./styles.scss";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeLoading",
  components: {
    veMask,
    veSpinner
  }
})
export default class VeLoading extends Vue {
  @Prop({ default: false })
  fullscreen!: boolean;

  @Prop({ default: false })
  open!: boolean;

  @Prop({ default: 1 })
  opacity!: number;

  @Prop({ default: 300 })
  speed!: number;

  hasBody: boolean = typeof this.$slots.default === "object";

  onClick(): void {
    this.$emit("click");
  }

  render() {
    return (
      <div class="ve-loading">
        <ve-mask
          class="ve-loading__mask"
          opacity={this.opacity}
          open={this.open}
          speed={this.speed}
          fullscreen={this.fullscreen}
          onClick={this.onClick}
        >
          <div class="ve-loading__spinner">
            <ve-spinner />
          </div>

          {this.hasBody ? (
            <div class="ve-loading__content">{this.$slots.default}</div>
          ) : null}
        </ve-mask>
      </div>
    );
  }
}

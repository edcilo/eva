import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeRow"
})
export default class VeRow extends Vue {
  cn = "ve-row";

  @Prop({ type: Boolean, default: true })
  gutter!: boolean;

  get rowClass(): Array<string | {} | []> {
    return [
      this.cn,
      {
        "no-gutters": !this.gutter
      }
    ];
  }

  render(): VNode {
    return <div class={this.rowClass}>{this.$slots.default}</div>;
  }
}

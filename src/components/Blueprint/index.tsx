import VePanel from "@/components/Panel";
import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeBlueprint",
  components: {
    VePanel
  }
})
export default class Blueprint extends Vue {
  @Prop({ type: Boolean, default: false })
  overflowHidden!: boolean;

  cn = "ve-blueprint";

  get containerClasses(): Array<string | [] | {}> {
    return [this.cn, { "overflow-hidden": this.overflowHidden }];
  }

  render(): VNode {
    return (
      <ve-panel class={this.containerClasses}>{this.$slots.default}</ve-panel>
    );
  }
}

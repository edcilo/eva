import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeButtonGroup"
})
export default class VeButtonGroup extends Vue {
  @Prop({ type: Boolean, default: false })
  vertical!: boolean;

  cn = "ve-btn-group";

  get containerClasses() {
    return [this.cn, { vertical: this.vertical }];
  }

  render(): VNode {
    return this.$createElement(
      "div",
      {
        class: this.containerClasses
      },
      this.$slots.default
    );
  }
}

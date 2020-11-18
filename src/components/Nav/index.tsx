import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeNav"
})
export default class VeNav extends Vue {
  @Prop({ type: Boolean, default: false })
  vertical!: boolean;

  @Prop({ type: Boolean, default: true })
  nav!: boolean;

  cn = "ve-nav";

  render(): VNode {
    const element = this.nav ? "nav" : "div";

    return this.$createElement(
      element,
      {
        class: [this.cn, { vertical: this.vertical }]
      },
      [this.$slots.default]
    );
  }
}

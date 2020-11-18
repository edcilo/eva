import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

import VeArea from "@/components/Grid/Area";
import VeContainer from "@/components/Grid/Container";
import VeGrid from "@/components/Grid";

@Component({
  name: "VeHeader",
  components: {
    VeArea,
    VeContainer,
    VeGrid
  }
})
export default class VeHeader extends Vue {
  @Prop({ type: String, default: "left center right" })
  areas!: string;

  @Prop({ type: String, default: "repeat(1)" })
  cols!: string;

  @Prop({ type: Boolean, default: false })
  fixed!: boolean;

  @Prop({ type: Boolean, default: false })
  fluid!: boolean;

  cn = "ve-header";

  get showLeft(): boolean {
    return this.areas.includes("left");
  }

  get showCenter(): boolean {
    return this.areas.includes("center");
  }

  get showRight(): boolean {
    return this.areas.includes("right");
  }

  render(): VNode {
    return (
      <header class={[this.cn, { fixed: this.fixed }]}>
        <ve-container class={`${this.cn}__container`} fluid={this.fluid}>
          <ve-grid
            areas={`'${this.areas}'`}
            cols={this.cols}
            rows="auto"
            col-gap={0}
            row-gap={0}
          >
            {this.showLeft ? (
              <ve-area name="left" class={`${this.cn}__left`}>
                {this.$slots.left}
              </ve-area>
            ) : null}

            {this.showCenter ? (
              <ve-area name="center" class={`${this.cn}__center`}>
                {this.$slots.center}
              </ve-area>
            ) : null}

            {this.showRight ? (
              <ve-area name="right" class={`${this.cn}__right`}>
                {this.$slots.right}
              </ve-area>
            ) : null}
          </ve-grid>
        </ve-container>
      </header>
    );
  }
}

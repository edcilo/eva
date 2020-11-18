import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

interface AreaStylesInterface {
  gridArea: null | string;
}

@Component({
  name: "VeGridArea"
})
export default class VeGridArea extends Vue {
  @Prop({ default: null })
  protected name!: null | string;

  cn = "ve-grid-area";

  get styles(): AreaStylesInterface {
    return {
      gridArea: this.name
    };
  }

  render(): VNode {
    return (
      <div class={this.cn} style={this.styles}>
        {this.$slots.default}
      </div>
    );
  }
}

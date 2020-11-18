import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { StylesInterface } from "./types";

@Component({
  name: "VeGrid"
})
export default class VeGrid extends Vue {
  @Prop({ default: null })
  protected colGap!: string;

  @Prop({ default: null })
  protected rowGap!: string;

  @Prop({ default: null })
  protected cols!: string;

  @Prop({ default: null })
  protected rows!: string;

  @Prop({ default: null })
  protected areas!: string;

  get styles(): StylesInterface {
    return {
      gridColumnGap: this.colGap,
      gridRowGap: this.rowGap,
      gridTemplateColumns: this.cols,
      gridTemplateRows: this.rows,
      gridTemplateAreas: this.areas
    };
  }

  render(): VNode {
    return (
      <div class="ve-grid" style={this.styles}>
        {this.$slots.default}
      </div>
    );
  }
}

import "./styles.scss";
import { VNode } from "vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { containerStylesInterface } from "./types";

@Component({
  name: "VePanel"
})
export default class VePanel extends Vue {
  @Prop({ type: String })
  width!: string;

  @Prop({ type: String })
  height!: string;

  cn = "ve-panel";

  @Emit()
  click() {
    return null;
  }

  get containerStyle(): containerStylesInterface {
    let styles = {};
    if (this.width) {
      styles = { ...styles, width: this.width };
    }
    if (this.height) {
      styles = { ...styles, height: this.height };
    }
    return styles;
  }

  render(): VNode {
    return (
      <div class={this.cn} style={this.containerStyle} onclick={this.click}>
        {this.$slots.default}
      </div>
    );
  }
}

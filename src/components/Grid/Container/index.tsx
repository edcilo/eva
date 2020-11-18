import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { ClassNameInterface } from "./../types";

@Component({
  name: "VeContainer"
})
export default class VeContainer extends Vue {
  @Prop({ type: Boolean, default: false })
  fluid!: boolean;

  get containerClasses(): ClassNameInterface {
    return {
      "ve-container": !this.fluid,
      "ve-container-fluid": this.fluid
    };
  }

  render(): VNode {
    return <div class={this.containerClasses}>{this.$slots.default}</div>;
  }
}

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeHero"
})
export default class VeHero extends Vue {
  @Prop({
    type: Number,
    default: 100,
    validator(value: number): boolean {
      return value >= 0 && value <= 100;
    }
  })
  protected height!: number;

  cn = "ve-hero";

  render(): VNode {
    return (
      <div class={this.cn} style={{ height: `${this.height}vh` }}>
        {this.$slots.default}
      </div>
    );
  }
}

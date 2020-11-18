import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  BarSyleInterface,
  ProgressStyleInterface,
  SizesInterface,
  sizes
} from "./types";

@Component({
  name: "VeProgress"
})
export default class VeProgress extends Vue {
  @Prop({ type: Number, default: 0 })
  protected value!: number;

  @Prop({ type: Number, default: 100 })
  protected max!: number;

  @Prop({
    default: 4,
    validator: val => {
      const sizesString = sizes.join("|");
      return RegExp(`^(${sizesString}|\\d+)$`).test(val);
    }
  })
  protected size!: number | string;

  get pct(): number {
    const pct: number = (this.value / this.max) * 100;
    const pctFormated = pct.toFixed(2);

    return Math.min(parseFloat(pctFormated), this.max);
  }

  get sizePx(): number | string {
    const dictionary: SizesInterface = {
      tiny: 2,
      small: 4,
      medium: 8,
      large: 12,
      big: 16,
      huge: 32,
      massive: 64
    };

    return dictionary[this.size] || this.size;
  }

  get progressStyle(): ProgressStyleInterface {
    return {
      height: this.$slots.default ? null : `${this.sizePx}px`
    };
  }

  get barStyle(): BarSyleInterface {
    return { width: `${this.pct}%` };
  }

  render(): VNode {
    return (
      <div class="ve-progress">
        <div class="ve-progress__progress" style={this.progressStyle}>
          <div class="ve-progress__progress-bar" style={this.barStyle}>
            {this.$slots.default}
          </div>
        </div>
      </div>
    );
  }
}

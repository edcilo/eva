import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeRating"
})
export default class VeRating extends Vue {
  @Prop({ type: Number, default: 0 })
  value!: number;

  @Prop({ type: Number, default: 5 })
  length!: number;

  @Prop({ type: Boolean, default: false })
  readonly!: boolean;

  cn = "ve-rating";

  get classes() {
    return [this.cn, this.readonly ? `${this.cn}__readonly` : null];
  }

  mouseOverHandler(index: number): void {
    if (this.readonly) {
      return;
    }

    for (let i = 1; i <= index; i++) {
      const cHover = `${this.cn}__hover`;
      const points = this.$el.querySelectorAll(`.${this.cn}__point`);

      points.forEach((p, i: number) => {
        if (i < index) {
          p.classList.add(cHover);
        } else {
          p.classList.remove(cHover);
        }
      });
    }
  }

  mouseLeaveHandler() {
    if (this.readonly) {
      return;
    }

    const cHover = `${this.cn}__hover`;
    const points = this.$el.querySelectorAll(`.${this.cn}__point`);

    points.forEach(p => {
      p.classList.remove(cHover);
    });
  }

  clickHandler(index: number) {
    if (this.readonly) {
      return;
    }

    this.$emit("input", index);
  }

  render(): VNode {
    const point = this.$slots.default;
    const points = [];

    for (let i = 1; i <= this.length; i++) {
      points.push(
        <div
          ref={`point-${i}`}
          class={[
            `${this.cn}__point`,
            i <= this.value ? `${this.cn}__active` : null
          ]}
          onMouseover={() => this.mouseOverHandler(i)}
          onClick={() => this.clickHandler(i)}
        >
          {point}
        </div>
      );
    }

    return (
      <div class={this.classes} onMouseleave={this.mouseLeaveHandler}>
        {points}
      </div>
    );
  }
}

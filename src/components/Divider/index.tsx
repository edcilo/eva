import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeDivider"
})
export default class VeDivider extends Vue {
  @Prop({ type: Boolean, default: true })
  dark!: boolean;

  cn = "ve-divider";

  get containerClasses(): Array<string | [] | {}> {
    return [
      [this.cn],
      {
        dark: this.dark,
        clear: !this.dark
      }
    ];
  }

  get subheaderClasses(): string {
    return `${this.cn}__subheader`;
  }

  render(): VNode {
    return (
      <div class={this.containerClasses}>
        {this.$slots.default !== undefined ? (
          <div class={this.subheaderClasses}>{this.$slots.default}</div>
        ) : null}
      </div>
    );
  }
}

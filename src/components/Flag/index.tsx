import "flag-icon-css/css/flag-icon.css";
import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeFlag"
})
export default class VeFlag extends Vue {
  @Prop({ type: String, required: true })
  code!: string;

  @Prop({ type: Boolean, default: false })
  squared!: boolean;

  render(): VNode {
    const classes: Array<string> = ["flag-icon", `flag-icon-${this.code}`];

    if (this.squared) {
      classes.push("flag-icon-squared");
    }

    return <span class={classes} />;
  }
}

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { ClassNameInterface } from "./../types";

@Component({
  name: "VeCol"
})
export default class VeCol extends Vue {
  cn = "ve-col";

  @Prop({
    default: null,
    validator: val => {
      if (val === null) {
        return true;
      }

      const regexp = /^(auto|(sm|md|lg|xl)|([1-9]|1[012])|(sm|md|lg|xl)-(auto|([1-9]|1[012])))$/;

      if (val instanceof Array) {
        const result = val.filter(size => {
          return !regexp.test(size);
        });

        return result.length === 0;
      }

      return regexp.test(val);
    }
  })
  size!: null | number | string | Array<string | number>;

  @Prop({
    default: null,
    validator: val =>
      ["first", "last"].includes(val) || (val >= 0 && val <= 13) || val === null
  })
  order!: null | number | string;

  @Prop({
    default: null,
    validator: val => (val >= 0 && val < 12) || val === null
  })
  offset!: null | number;

  get containerClasses(): ClassNameInterface {
    const classes: ClassNameInterface = {};

    classes[this.cn] = true;

    if (this.size instanceof Array) {
      classes["col"] = true;

      this.size.forEach(value => {
        classes[`col-${value}`] = true;
      });
    } else if (this.size) {
      classes[`col-${this.size}`] = true;
    } else {
      classes["col"] = true;
    }

    if (this.order) {
      classes[`order-${this.order}`] = true;
    }

    if (this.offset !== null) {
      classes[`offset-${this.offset}`] = true;
    }

    return classes;
  }

  render(): VNode {
    return <div class={this.containerClasses}>{this.$slots.default}</div>;
  }
}

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Model, Prop, Vue } from "vue-property-decorator";

library.add(faSquare, faCheckSquare);

@Component({
  name: "VeCheckbox",
  components: {
    FontAwesomeIcon
  }
})
export default class VeCheckbox extends Vue {
  @Prop({ default: false })
  checked!: boolean;

  @Prop({ default: false })
  disabled!: boolean;

  @Prop({ default: null })
  id!: null | string;

  @Prop({ default: null })
  name!: null | string;

  @Prop({ default: null })
  value!: any;

  @Prop({ default: true })
  trueValue!: any;

  @Prop({ default: false })
  falseValue!: any;

  cn = "ve-checkbox";
  $refs!: { control: HTMLInputElement };

  @Model("change")
  protected modelValue!: any;

  get shouldBeChecked(): boolean {
    if (this.modelValue instanceof Array) {
      return this.modelValue.includes(this.value);
    }

    return this.modelValue === this.trueValue;
  }

  updateInput(): void {
    const isChecked: boolean = this.$refs.control.checked;

    if (this.modelValue instanceof Array) {
      const newValue = [...this.modelValue];

      if (isChecked) {
        newValue.push(this.value);
      } else {
        newValue.splice(newValue.indexOf(this.value), 1);
      }

      this.$emit("change", newValue);
    } else {
      this.$emit("change", isChecked ? this.trueValue : this.falseValue);
    }
  }

  mounted(): void {
    this.$nextTick(() => {
      if (this.checked) {
        this.$refs.control.checked = true;

        this.updateInput();
      }
    });
  }

  render(): VNode {
    const icon = this.$createElement(FontAwesomeIcon, {
      class: `${this.cn}__icon`,
      props: {
        icon: this.shouldBeChecked ? "check-square" : "square"
      }
    });

    return (
      <label class={[this.cn, { disabled: this.disabled }]} for={this.id}>
        <div class={`${this.cn}__control`}>
          <input
            id={this.id}
            ref="control"
            class={`${this.cn}__input`}
            type="checkbox"
            checked={this.shouldBeChecked}
            disabled={this.disabled}
            name={this.name}
            value={this.value}
            onChange={this.updateInput}
          />

          {icon}
        </div>

        <div class="ve-checkbox__label">{this.$slots.default}</div>
      </label>
    );
  }
}

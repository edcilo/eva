import "./styles.scss";
import { VNode } from "vue";
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VeSwitch"
})
export default class VeSwitch extends Vue {
  @Prop({ default: false })
  protected checked!: boolean;

  @Prop({ default: false })
  protected disabled!: boolean;

  @Prop({ default: null })
  protected id!: null | string;

  @Prop({ default: null })
  protected name!: null | string;

  @Prop({ default: null })
  protected value!: any;

  @Prop({ default: true })
  protected trueValue!: any;

  @Prop({ default: false })
  protected falseValue!: any;

  cn = "ve-switch";
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

  protected mounted(): void {
    this.$nextTick(() => {
      if (this.checked) {
        this.$refs.control.checked = true;
        this.updateInput();
      }
    });
  }

  render(): VNode {
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

          <div
            class={[`${this.cn}__track`, { checked: this.shouldBeChecked }]}
          />
          <div
            class={[`${this.cn}__thumb`, { checked: this.shouldBeChecked }]}
          />
        </div>

        <div class={`${this.cn}__label`}>{this.$slots.default}&nbsp;</div>
      </label>
    );
  }
}

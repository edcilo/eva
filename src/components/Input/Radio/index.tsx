import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";

library.add(faCircle, faCheckCircle);

@Component({
  name: "VeRadio",
  components: {
    FontAwesomeIcon
  }
})
export default class VeRadio extends Vue {
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

  @Model("change")
  modelValue!: any;

  cn = "ve-radio";

  get shouldBeChecked() {
    return this.modelValue === this.value;
  }

  @Watch("checked", { immediate: true })
  onCheckedChanged(newVal: boolean): void {
    if (newVal) {
      this.updateInput();
    }
  }

  updateInput(): void {
    this.$emit("change", this.value);
  }

  render(): VNode {
    const icon = this.$createElement(FontAwesomeIcon, {
      class: `${this.cn}__icon`,
      props: {
        icon: this.shouldBeChecked ? "check-circle" : ["far", "circle"]
      }
    });

    return (
      <label class={[this.cn, { disabled: this.disabled }]} for={this.id}>
        <div class={`${this.cn}__control`}>
          <input
            id={this.id}
            class={`${this.cn}__input`}
            type="radio"
            checked={this.shouldBeChecked}
            disabled={this.disabled}
            name={this.name}
            value={this.value}
            onChange={this.updateInput}
          />

          {icon}
        </div>

        <div class={`${this.cn}__label`}>{this.$slots.default}</div>
      </label>
    );
  }
}

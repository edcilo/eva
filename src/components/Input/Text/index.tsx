import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validator } from "./types";

library.add(faTimesCircle);

@Component({
  name: "VeText",
  components: {
    FontAwesomeIcon
  }
})
export default class VeInputText extends Vue {
  @Prop({ default: null })
  protected value!: string | null;

  @Prop({ default: false })
  protected autocomplete!: boolean;

  @Prop({ default: false })
  protected autofocus!: boolean;

  @Prop({ default: false })
  protected block!: boolean;

  @Prop({ default: false })
  protected btnClear!: boolean;

  @Prop({ default: false })
  protected disabled!: boolean;

  @Prop({ default: null })
  protected helperText!: string | null;

  @Prop({ default: null })
  protected id!: string | null;

  @Prop({ default: null })
  protected label!: string | null;

  @Prop({ default: null })
  protected name!: string | null;

  @Prop({ default: null })
  protected placeholder!: string;

  @Prop({ default: false })
  protected readonly!: boolean;

  @Prop({ default: "primary", validator })
  protected type!: string;

  protected selected = false;
  protected value_: string | null = this.value;
  public cn = "ve-text";
  public $refs!: { input: HTMLInputElement };

  get classes() {
    return {
      block: this.block,
      disabled: this.disabled,
      focused: this.value_ !== null,
      readonly: this.readonly,
      selected: this.selected
    };
  }

  get focused(): boolean {
    return this.value_ !== null;
  }

  @Watch("value")
  protected onValueChanged(newVal: string): void {
    this.value_ = newVal;
  }

  @Watch("value_")
  protected onValueUnderscoreChanged(newVal: string): void {
    this.$emit("input", newVal);
  }

  protected onBlur(): void {
    this.selected = false;
  }

  protected onClear(event: MouseEvent): void {
    this.$emit("clear", event);

    if (!this.disabled && !this.readonly) {
      this.value_ = null;
    }
  }

  protected onFocus(): void {
    this.selected = true;
  }

  protected focus(): void {
    this.$refs.input.focus();
  }

  render(): VNode {
    const btnClear = this.btnClear ? (
      <div class={`${this.cn}__btn-clear`} onClick={this.onClear}>
        <font-awesome-icon icon="times-circle" />
      </div>
    ) : null;

    const icon = this.$slots.icon ? (
      <div class={`${this.cn}__thumbnail`} onClick={this.focus}>
        {this.$slots.icon}
      </div>
    ) : null;

    const rightIcon = this.$slots.rightIcon ? (
      <div class={`${this.cn}__right-thumbnail`} onClick={this.focus}>
        {this.$slots.rightIcon}
      </div>
    ) : null;

    const label =
      this.label !== null ? (
        <label
          for={this.id}
          class={[`${this.cn}__label`, { focused: this.focused }]}
          onclick={this.focus}
        >
          {this.label}
        </label>
      ) : null;

    return (
      <div class={[this.cn, this.type, this.classes]}>
        <div class={`${this.cn}__control`}>
          <span class={`${this.cn}__empty`}>&nbsp;</span>

          {icon}

          <div class={`${this.cn}__body`}>
            <input
              autocomplete={this.autocomplete ? null : "off"}
              autofocus={this.autofocus}
              class={`${this.cn}__input`}
              disabled={this.disabled}
              id={this.id}
              name={this.name}
              placeholder={this.placeholder}
              readonly={this.readonly}
              ref="input"
              type="text"
              v-model={this.value_}
              onfocus={this.onFocus}
              onblur={this.onBlur}
            />

            {label}
          </div>

          {btnClear}

          {rightIcon}
        </div>

        <div class={`${this.cn}__helper-text`}>{this.helperText}</div>
      </div>
    );
  }
}

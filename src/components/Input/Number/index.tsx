import VeButton from "@/components/Button";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimesCircle,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validator } from "./types";

library.add(faMinus, faPlus, faTimesCircle);

@Component({
  name: "VeNumber",
  components: {
    FontAwesomeIcon,
    VeButton
  }
})
export default class VeNumber extends Vue {
  @Prop({ type: Number || null, default: null })
  protected value!: number | null;

  @Prop({ type: Boolean, default: false })
  protected autocomplete!: boolean;

  @Prop({ type: Boolean, default: false })
  protected autofocus!: boolean;

  @Prop({ type: Boolean, default: false })
  protected block!: boolean;

  @Prop({ type: Boolean, default: false })
  protected btnClear!: boolean;

  @Prop({ type: Boolean, default: false })
  protected disabled!: boolean;

  @Prop({ type: String || null, default: null })
  protected helperText!: string | null;

  @Prop({ type: String || null, default: null })
  protected id!: string | null;

  @Prop({ type: String || null, default: null })
  protected label!: string | null;

  @Prop({ type: String || null, default: null })
  protected name!: string | null;

  @Prop({ type: String || null, default: null })
  protected placeholder!: string;

  @Prop({ type: Boolean, default: false })
  protected readonly!: boolean;

  @Prop({ type: String, default: "primary", validator })
  protected type!: string;

  @Prop({ type: Boolean, default: true })
  protected controls!: boolean;

  @Prop({ type: Boolean, default: true })
  protected inputtable!: boolean;

  @Prop({ type: Number, default: Infinity })
  protected max!: number;

  @Prop({ type: Number, default: -Infinity })
  protected min!: number;

  @Prop({ type: Number, default: 1 })
  protected step!: number;

  @Prop({
    type: Number,
    default: Infinity,
    validator: (val: number) => val > 0
  })
  precision!: number;

  protected selected = false;
  protected value_: number | null = this.value;
  public cn = "ve-number";
  public $refs!: { input: HTMLInputElement };

  get classes() {
    return {
      block: this.block,
      disabled: this.disabled,
      focused: this.value !== null,
      readonly: this.readonly,
      selected: this.selected
    };
  }

  get focused(): boolean {
    return this.value_ !== null && !isNaN(this.value_);
  }

  @Watch("value")
  protected onValueChanged(newVal: number): void {
    this.value_ = newVal;
  }

  @Watch("value_")
  protected onValueUnderscoreChanged(newVal: string): void {
    const value = `${newVal}`.length > 0 ? newVal : null;

    this.$emit("input", value);
  }

  @Watch("precision", { immediate: true })
  protected onPrecisionChanged(newVal: number): void {
    if (this.value_ !== null) {
      this.$nextTick(() => {
        const value = parseFloat(this.$refs.input.value) || 0;
        this.value_ = this.toPrecision(value, newVal);
      });
    }
  }

  protected onBlur(): void {
    this.selected = false;
    this.inputHandler();
  }

  protected onClear(event: MouseEvent): void {
    this.$emit("clear", event);

    if (!this.disabled && !this.readonly) {
      this.value_ = !this.inputtable ? 0 : null;
    }
  }

  protected onFocus(): void {
    this.selected = true;
  }

  protected focus(): void {
    this.$refs.input.focus();
  }

  protected addHandler(): void {
    if (this.value_ !== null) {
      let newVal = this.value_ + this.step;
      newVal = this.toPrecision(newVal, this.precision);

      if (newVal <= this.max) {
        this.value_ = newVal;
      }
    }
  }

  protected lessHandler(): void {
    if (this.value_ !== null) {
      let newVal = this.value_ - this.step;
      newVal = this.toPrecision(newVal, this.precision);

      if (newVal >= this.min) {
        this.value_ = newVal;
      }
    }
  }

  protected toPrecision(value: number, precision: number): number {
    if (this.precision !== Infinity) {
      return parseFloat(value.toFixed(precision));
    }

    return value;
  }

  protected inputHandler() {
    const value = parseFloat(this.$refs.input.value) || null;

    if (value !== null) {
      this.value_ = this.toPrecision(value, this.precision);
    } else {
      this.value_ = value;
    }
  }

  render(): VNode {
    const btnClose = this.btnClear ? (
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
          onClick={() => this.focus()}
        >
          {this.label}
        </label>
      ) : null;

    const btnMinus =
      this.controls && !this.readonly ? (
        <ve-button
          class={`minus`}
          type={this.type}
          disabled={this.disabled}
          onClick={this.lessHandler}
        >
          <font-awesome-icon icon="minus" />
        </ve-button>
      ) : null;

    const btnPlus =
      this.controls && !this.readonly ? (
        <ve-button
          class={`add`}
          type={this.type}
          disabled={this.disabled}
          onClick={this.addHandler}
        >
          <font-awesome-icon icon="plus" />
        </ve-button>
      ) : null;

    return (
      <div class={[this.cn, this.type, this.classes]}>
        <div class={`${this.cn}__control`}>
          <span class={`${this.cn}__empty`}>&nbsp;</span>

          {btnMinus}

          {icon}

          <div class={`${this.cn}__body`}>
            <input
              autofocus={this.autofocus}
              class={`${this.cn}__input`}
              disabled={this.disabled}
              id={this.id}
              name={this.name}
              placeholder={this.placeholder}
              readonly={this.readonly || !this.inputtable}
              ref="input"
              type="number"
              v-model={this.value_}
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
            />

            {label}
          </div>

          {btnClose}

          {rightIcon}

          {btnPlus}
        </div>

        <div class={`${this.cn}__helper-text`}>{this.helperText}</div>
      </div>
    );
  }
}

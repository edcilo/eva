import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validator } from "./types";

library.add(faTimesCircle);

@Component({
  name: "VeTextarea",
  components: {
    FontAwesomeIcon
  }
})
export default class VeInputTextarea extends Vue {
  @Prop({ default: null })
  protected value!: string | null;

  @Prop({ type: Boolean, default: false })
  protected autofocus!: boolean;

  @Prop({ type: Boolean, default: false })
  protected block!: boolean;

  @Prop({ type: Boolean, default: false })
  protected btnClear!: boolean;

  @Prop({ type: Number, default: 20 })
  protected cols!: number;

  @Prop({ type: Boolean, default: false })
  protected counter!: boolean;

  @Prop({ type: Number, default: 25 })
  protected counterWarning!: number;

  @Prop({ type: Number, default: 10 })
  protected counterDanger!: number;

  @Prop({ type: Boolean, default: false })
  protected disabled!: boolean;

  @Prop({ default: null })
  protected helperText!: string | null;

  @Prop({ type: String, default: null })
  protected id!: string;

  @Prop({ default: null })
  protected label!: string | null;

  @Prop({ type: Number, default: null })
  protected max!: number;

  @Prop({ default: null })
  protected name!: string | null;

  @Prop({ default: null })
  protected placeholder!: string | null;

  @Prop({ type: Boolean, default: false })
  protected readonly!: boolean;

  @Prop({ type: Number, default: null })
  protected rows!: number;

  @Prop({ type: String, default: "primary", validator })
  protected type!: string;

  protected selected = false;
  protected value_: string | null = this.value;
  public cn = "ve-textarea";
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

  get characters(): number {
    return this.value_ === null ? this.max : this.max - this.value_.length;
  }

  get counterStatus(): string {
    const cWarning = this.max * (this.counterWarning / 100);
    const cDanger = this.max * (this.counterDanger / 100);

    return this.characters > cWarning
      ? "primary"
      : this.characters > cDanger
      ? "warning"
      : "danger";
  }

  get focused(): boolean {
    return this.value_ !== null && `${this.value_}`.length > 0;
  }

  @Watch("value", { immediate: true })
  onValueChanged(newVal: string): void {
    this.value_ = newVal;
  }

  @Watch("value_", { immediate: true })
  onValueUnderscoreChanged(newVal: string): void {
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

          <div class={`${this.cn}__body`}>
            <textarea
              autofocus={this.autofocus}
              class={`${this.cn}__input`}
              cols={this.cols}
              disabled={this.disabled}
              id={this.id}
              maxlength={this.max}
              name={this.name}
              placeholder={this.placeholder}
              readonly={this.readonly}
              ref="input"
              rows={this.rows}
              v-model={this.value_}
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
            />

            {label}
          </div>

          {btnClear}
        </div>

        <div class={`${this.cn}__helper`}>
          <div class={`${this.cn}__helper-text`}>{this.helperText}</div>
          {this.counter && !isNaN(this.max) && this.max > 0 ? (
            <div class={[`${this.cn}__counter`, this.counterStatus]}>
              {this.characters}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

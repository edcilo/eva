import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle, faCreditCard } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CardInterface, validator } from "./types";
import cc, { keyIsBackspace } from "./helper";

library.add(faTimesCircle, faCreditCard);

const cardDefault: CardInterface = {
  type: null,
  number: null,
  month: null,
  year: null,
  cvc: null
};

@Component({
  name: "VeCreditCard",
  components: {
    FontAwesomeIcon
  }
})
export default class VeCreditCard extends Vue {
  @Prop({ default: () => cardDefault })
  protected value!: CardInterface;

  @Prop({ default: false })
  protected autocomplete!: boolean;

  @Prop({ type: Boolean, default: false })
  protected autofocus!: boolean;

  @Prop({ type: Boolean, default: false })
  protected block!: boolean;

  @Prop({ type: Boolean, default: false })
  protected btnClear!: boolean;

  @Prop({ type: String || null, default: null })
  protected cvcName!: string | null;

  @Prop({ type: String, default: "CVC" })
  protected cvcPlaceholder!: string;

  @Prop({ type: String || null, default: null })
  protected dateName!: string | null;

  @Prop({ type: String, default: "MM / YY" })
  protected datePlaceholder!: string;

  @Prop({ type: Boolean, default: false })
  protected disabled!: boolean;

  @Prop({ type: String || null, default: null })
  protected helperText!: string | null;

  @Prop({ type: String || null, default: null })
  protected id!: string | null;

  @Prop({ type: String || null, default: "Credit Card" })
  protected label!: string | null;

  @Prop({ type: String || null, default: null })
  protected name!: string | null;

  @Prop({ type: String, default: "Card Number" })
  protected placeholder!: string;

  @Prop({ type: Boolean, default: false })
  protected readonly!: boolean;

  @Prop({ type: String, default: "primary", validator })
  protected type!: string;

  selected = false;
  cn = "ve-credit-card";
  $refs!: {
    cardNumber: HTMLInputElement;
    date: HTMLInputElement;
    cvc: HTMLInputElement;
  };

  cardType: string | null = null;
  cardNumber: string | null = null;
  date: string | null = null;
  month: string | null = null;
  year: string | null = null;
  cvc: string | null = null;
  cardMask: string = cc.CREDIT_CARD_NUMBER_MASK.DEFAULT;
  cvcMask: string = cc.CVC_MASK.CVC_3;
  dateMask: string = cc.EXPIRY_MASK;

  get classes() {
    return {
      block: this.block,
      disabled: this.disabled,
      focused:
        this.cardNumber !== null || this.date !== null || this.cvc !== null,
      readonly: this.readonly,
      selected: this.selected
    };
  }

  get focused(): boolean {
    return (
      (this.cardNumber !== null && `${this.cardNumber}`.length > 0) ||
      (this.date !== null && `${this.date}`.length > 0) ||
      (this.cvc !== null && `${this.cvc}`.length > 0)
    );
  }

  @Watch("value", { immediate: true, deep: true })
  protected onValueChanged(newVal: CardInterface): void {
    const { number, cvc, month, year } = newVal;

    this.setMask(`${number}`);

    this.cardNumber =
      number !== null
        ? cc.refreshCreditCardNumberFormat(number, this.cardMask)
        : null;
    this.cvc = cvc !== null ? cc.refreshCvcFormat(cvc, this.cvcMask) : null;

    const date = cc.refreshDateFormat(
      `${month || ""}${year || ""}`,
      this.dateMask
    );
    this.date = date.date;
    this.month = date.month;
    this.year = date.year;
  }

  @Watch("card_number")
  protected onCardNumberChanged(newVal: string): void {
    this.setMask(newVal);
  }

  protected emitEvent(): void {
    const number =
      this.cardNumber !== null && this.cardNumber.length > 0
        ? this.cardNumber.replace(/ /g, "")
        : null;

    const data: CardInterface = {
      type: this.cardType || null,
      month: this.month || null,
      year: this.year || null,
      cvc: this.cvc || null,
      number
    };

    this.$emit("input", data);
  }

  protected handleCreditCardNumberKey(e: KeyboardEvent): void {
    if (this.readonly) {
      return;
    }

    this.cardNumber = cc.handleMaskedNumberInputKey(e, this.cardMask);

    if (
      this.cardNumber.length === 0 ||
      this.cardNumber.length === this.cardMask.length
    ) {
      this.emitEvent();
    }
  }

  protected handleCreditCardNumberPaste(): void {
    window.setTimeout(() => {
      const element = this.$refs.cardNumber;

      if (element !== null) {
        this.cardNumber = cc.refreshCreditCardNumberFormat(
          element.value,
          this.cardMask
        );

        if (this.cardNumber.length === this.cardMask.length) {
          this.emitEvent();
        }
      }
    }, 1);
  }

  protected handleDateKey(e: KeyboardEvent): void {
    if (this.readonly) {
      return;
    }

    if (keyIsBackspace(e) && (this.date === null || this.date.length === 0)) {
      this.$refs.cardNumber.focus();
      return;
    }

    const date = cc.handleDateKey(e, this.dateMask);

    this.date = date.date;
    this.month = date.month;
    this.year = date.year;

    if (
      this.date !== null &&
      (this.date.length === 0 || this.date.length === this.dateMask.length)
    ) {
      this.emitEvent();
    }
  }

  protected handleDatePaste(): void {
    window.setTimeout(() => {
      const element = this.$refs.date;
      const date = cc.refreshDateFormat(element.value, this.dateMask);

      this.date = date.date;
      this.month = date.month;
      this.year = date.year;

      if (this.date !== null && this.date.length === this.dateMask.length) {
        this.emitEvent();
      }
    }, 1);
  }

  protected handleCvcKey(e: KeyboardEvent): void {
    if (this.readonly) {
      return;
    }

    if (keyIsBackspace(e) && (this.cvc === null || this.cvc.length === 0)) {
      this.$refs.date.focus();
      return;
    }

    this.cvc = cc.handleCvcInputKey(e, this.cvcMask);

    if (this.cvc.length === 0 || this.cvc.length === this.cvcMask.length) {
      this.emitEvent();
    }
  }

  protected handleCvcPaste(): void {
    window.setTimeout(() => {
      const element = this.$refs.cvc;

      this.cvc = cc.refreshCvcFormat(element.value, this.cvcMask);

      if (this.cvc.length === this.cvcMask.length) {
        this.emitEvent();
      }
    }, 1);
  }

  protected onBlur(): void {
    this.selected = false;
  }

  protected onClear(event: MouseEvent): void {
    this.$emit("clear", event);

    if (!this.disabled && !this.readonly) {
      this.cardType = null;
      this.cardNumber = null;
      this.date = null;
      this.month = null;
      this.year = null;
      this.cvc = null;

      this.emitEvent();
    }
  }

  protected onFocus(): void {
    this.selected = true;
  }

  protected focus(): void {
    this.$refs.cardNumber.focus();
  }

  protected setMask(card: string): void {
    if (!card) {
      return;
    }

    const mask = cc.getCardTypeFromNumber(card);

    this.cardType = mask.type;
    this.cardMask = mask.card;
    this.cvcMask = mask.cvc;
  }

  render(): VNode {
    const btnClear =
      this.btnClear && !this.readonly ? (
        <div class={`${this.cn}__btn-clear`} onClick={this.onClear}>
          <font-awesome-icon icon="times-circle" />
        </div>
      ) : null;

    const icon = this.$slots.icon ? (
      <div class={`${this.cn}__thumbnail`} onClick={this.focus}>
        {this.$slots.icon}
      </div>
    ) : (
      <div class={`${this.cn}__thumbnail`} onClick={this.focus}>
        <font-awesome-icon icon="credit-card" />
      </div>
    );

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

    return (
      <div class={[this.cn, this.type, this.classes]}>
        <div class={`${this.cn}__control`}>
          <span class={`${this.cn}__empty`}>&nbsp;</span>

          {icon}

          <div class={`${this.cn}__body`}>
            <input
              autocapitalize="off"
              autocomplete={this.autocomplete ? null : "off"}
              autocompletetype="cc-number"
              x-autocompletetype="cc-number"
              autocorrect="off"
              autofocus={this.autofocus}
              class={`${this.cn}__input`}
              disabled={this.disabled}
              id={this.id}
              maxlength={this.cardMask.length}
              name={this.name}
              placeholder={this.placeholder}
              readonly={this.readonly}
              ref="cardNumber"
              spellcheck="off"
              type="tel"
              v-model={this.cardNumber}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onKeydown={this.handleCreditCardNumberKey}
              onPaste={this.handleCreditCardNumberPaste}
            />

            <input
              autocapitalize="off"
              autocompletetype="cc-exp"
              x-autocompletetype="cc-exp"
              autocorrect="off"
              class={`${this.cn}__input-date`}
              disabled={this.disabled}
              maxlength={this.dateMask.length}
              name={this.dateName}
              placeholder={this.datePlaceholder}
              readonly={this.readonly}
              ref="date"
              spellcheck="off"
              type="tel"
              v-model={this.date}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onKeydown={this.handleDateKey}
              onPaste={this.handleDatePaste}
            />

            <input
              autocapitalize="off"
              autocompletetype="cc-csc"
              x-autocompletetype="cc-csc"
              autocorrect="off"
              class={`${this.cn}__input-cvc`}
              disabled={this.disabled}
              maxlength={this.cvcMask.length}
              name={this.cvcName}
              placeholder={this.cvcPlaceholder}
              type="tel"
              readonly={this.readonly}
              ref="cvc"
              spellcheck="off"
              v-model={this.cvc}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onKeydown={this.handleCvcKey}
              onPaste={this.handleCvcPaste}
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

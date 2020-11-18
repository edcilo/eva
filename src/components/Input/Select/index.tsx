import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

import VeInputText from "@/components/Input/Text";
import VeItem from "@/components/Item";
import VeMenu from "@/components/Menu";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validator } from "./types";

library.add(faChevronDown, faTimesCircle);

@Component({
  name: "VeSelect",
  components: {
    FontAwesomeIcon,
    VeInputText,
    VeItem,
    VeMenu
  }
})
export default class VeSelect extends Vue {
  @Prop({ default: null })
  protected value!: string | null;

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

  @Prop({ type: String, default: "label" })
  protected optLabel!: string;

  @Prop({ type: Array, required: true })
  protected options!: Array<any>;

  @Prop({ default: null })
  protected placeholder!: string;

  @Prop({ default: false })
  protected readonly!: boolean;

  @Prop({ default: "primary", validator })
  protected type!: string;

  protected open = false;
  protected value_: string | null = this.value;
  protected textLabel: string | null = null;
  public cn = "ve-select";

  get classes() {
    return {
      block: this.block,
      disabled: this.disabled,
      focused: this.value_ !== null,
      readonly: this.readonly
    };
  }

  @Watch("value")
  protected onValueChanged(newVal: string): void {
    this.value_ = newVal;
  }

  @Watch("value_")
  protected onValueUnderscoreChanged(newVal: string): void {
    this.$emit("input", newVal);

    this.textLabel = this.getOptLabel(newVal);
  }

  getOptLabel(opt: any): string {
    if (!!opt && opt.constructor === Object) {
      return opt[this.optLabel];
    }

    return opt;
  }

  onClear(event: MouseEvent): void {
    event.stopPropagation();
    this.$emit("clear", event);

    if (this.readonly || this.disabled) {
      return;
    }

    this.value_ = null;
    this.textLabel = null;
  }

  renderOptions(): Array<VNode> {
    const opts: Array<VNode> = [];

    this.options.forEach(opt => {
      const optLabel = this.getOptLabel(opt);

      opts.push(
        <ve-item
          onClick={() => {
            this.setOptionSelected(opt);
            this.open = false;
          }}
        >
          {optLabel}
        </ve-item>
      );
    });

    return opts;
  }

  setOptionSelected(opt: any): void {
    this.value_ = opt;
  }

  render(): VNode {
    return (
      <div class={[this.cn, this.classes]}>
        <ve-menu
          class={`${this.cn}__list`}
          disabled={this.disabled || this.readonly}
          v-model={this.open}
        >
          <div slot="trigger" class={`${this.cn}__combobox`}>
            <ve-input-text
              v-model={this.textLabel}
              autocomplete={false}
              block={true}
              btnClear={this.btnClear}
              disabled={this.disabled}
              helperText={this.helperText}
              id={this.id}
              label={this.label}
              name={this.name}
              placeholder={this.placeholder}
              readonly={true}
              type={this.type}
              onClear={this.onClear}
            >
              {this.$slots.icon ? (
                <template slot="icon">{this.$slots.icon}</template>
              ) : null}

              <font-awesome-icon slot="rightIcon" icon="chevron-down" />
            </ve-input-text>
          </div>
          {this.renderOptions()}
        </ve-menu>
      </div>
    );
  }
}

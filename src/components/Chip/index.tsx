import veButton from "@/components/Button";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle, faCheck } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validator } from "./types";

library.add(faTimesCircle, faCheck);

@Component({
  name: "VeChip",
  components: {
    FontAwesomeIcon,
    veButton
  }
})
export default class VeChip extends Vue {
  @Prop({ default: false })
  protected dismissible!: boolean;

  @Prop({ default: true })
  protected value!: boolean;

  @Prop({ default: false })
  protected disabled!: boolean;

  @Prop({ default: "enabled", validator })
  protected state!: string;

  cn = "ve-chip";
  visible = true;

  get classes(): Array<string> {
    const classes = [`ve-chip__${this.state}`];

    if (this.$slots.thumbnail) {
      classes.push("ve-chip__th");
    }

    if (this.dismissible) {
      classes.push("ve-chip__ds");
    }

    if (this.disabled) {
      classes.push("ve-chip__disabled");
    }

    return classes;
  }

  get check(): boolean {
    return this.state === "selected";
  }

  @Watch("value", { immediate: true })
  protected onValueChanged(flag: boolean): void {
    this.visible = flag;
  }

  protected onClick(): void {
    if (this.state !== "disabled" && !this.disabled) {
      this.$emit("click");
    }
  }

  protected onClose(): void {
    if (this.dismissible) {
      this.visible = false;
      this.$emit("input", !this.value);
      this.$emit("close");
    }
  }

  render(): VNode {
    return (
      <transition name="zoom">
        {this.visible ? (
          <div class={[this.cn, this.classes]}>
            <div class={`${this.cn}__thumbnail`} onClick={this.onClick}>
              {this.$slots.thumbnail}

              {this.check ? (
                <div class={`${this.cn}__check`}>
                  <font-awesome-icon icon="check" />
                </div>
              ) : null}
            </div>

            <div class={`${this.cn}__text`} onClick={this.onClick}>
              {this.$slots.default}
            </div>

            {this.dismissible ? (
              <div class={`${this.cn}__dismiss`}>
                <ve-button
                  type="text"
                  onClick={this.onClose}
                  disabled={this.disabled}
                >
                  <font-awesome-icon icon="times-circle" />
                </ve-button>
              </div>
            ) : null}
          </div>
        ) : null}
      </transition>
    );
  }
}

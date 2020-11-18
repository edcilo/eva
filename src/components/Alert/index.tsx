import VePanel from "@/components/Panel";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { types } from "./types";

library.add(faTimesCircle);

@Component({
  name: "VeAlert",
  components: {
    FontAwesomeIcon,
    VePanel
  }
})
export default class VeAlert extends Vue {
  @Prop({ type: Boolean, default: false })
  dismissible!: boolean;

  @Prop({ type: Number, default: null })
  time!: number | null;

  @Prop({
    type: String,
    default: types[0],
    validator: val => types.includes(val)
  })
  type!: string;

  @Prop({ type: Boolean, default: true })
  value!: boolean;

  cn = "ve-alert";
  timer: number | undefined;
  visible!: boolean;

  get containerClasses() {
    return [this.cn, [`alert-${this.type}`]];
  }

  get slotContainerClasses() {
    return `${this.cn}__container`;
  }

  get btnContainerClasses() {
    return `${this.cn}__btn-container`;
  }

  @Watch("value", { immediate: true })
  onValueChanged(newVal: boolean): void {
    this.visible = newVal;

    if (newVal) {
      this.$emit("open");
    } else {
      this.$emit("close");
    }
  }

  onClose(): void {
    if (this.dismissible) {
      clearTimeout(this.timer);
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("close");
    }
  }

  updated(): void {
    if (this.visible && this.time !== null) {
      this.timer = window.setTimeout(() => {
        this.onClose();
      }, this.time * 1000);
    }
  }

  render(): VNode {
    return (
      <transition name="fade">
        {this.visible ? (
          <ve-panel class={this.containerClasses}>
            <div class={this.slotContainerClasses}>{this.$slots.default}</div>

            {this.dismissible ? (
              <div class={this.btnContainerClasses}>
                <button type="button" class="btn-close" onClick={this.onClose}>
                  <font-awesome-icon icon="times-circle" />
                </button>
              </div>
            ) : null}
          </ve-panel>
        ) : null}
      </transition>
    );
  }
}

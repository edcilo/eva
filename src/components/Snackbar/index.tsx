import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import veButton from "@/components/Button";
import vePanel from "@/components/Panel";

@Component({
  name: "VeSnackbar",
  components: {
    vePanel,
    veButton
  }
})
export default class VeSnackbar extends Vue {
  cn = "ve-snackbar";

  @Prop({ default: null })
  btnText!: null | string;

  @Prop({ default: false })
  open!: boolean;

  @Prop({ default: false })
  top!: boolean;

  @Prop({ default: false })
  left!: boolean;

  @Prop({ default: false })
  right!: boolean;

  @Prop({ default: false })
  vertical!: boolean;

  @Prop({ default: 6000 })
  timeout!: number;

  timeoutFunc: any = null;
  open_: boolean = this.open;

  get containerClasses() {
    return [
      `${this.cn}__container`,
      {
        top: this.top,
        left: this.left,
        right: this.right
      }
    ];
  }

  get snackbarClasses() {
    return [
      `${this.cn}`,
      {
        vertical: this.vertical
      }
    ];
  }

  closeEvent() {
    this.timeoutFunc = null;
    this.open_ = false;

    this.$emit("close");
  }

  openEvent() {
    this.open_ = true;

    this.timeoutFunc = window.setTimeout(() => {
      this.closeEvent();
    }, this.timeout);

    this.$emit("open");
  }

  onClick() {
    this.$emit("click");
  }

  @Watch("open", { immediate: true })
  onWatchUpdated(newVal: boolean): void {
    window.clearTimeout(this.timeoutFunc);

    if (newVal === true && this.timeoutFunc === null) {
      this.openEvent();
    } else {
      this.closeEvent();
    }
  }

  render(): VNode {
    return (
      <div class={this.containerClasses}>
        <transition name="zoom">
          {this.open_ ? (
            <div class={this.snackbarClasses}>
              <ve-panel>
                <div class="ve-snackbar__content">{this.$slots.default}</div>

                <div class="ve-snackbar__btn">
                  {this.btnText !== null ? (
                    <ve-button type="text" onClick={this.onClick}>
                      {this.btnText}
                    </ve-button>
                  ) : null}
                </div>
              </ve-panel>
            </div>
          ) : null}
        </transition>
      </div>
    );
  }
}

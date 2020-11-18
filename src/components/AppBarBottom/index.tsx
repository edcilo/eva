import VeContainer from "@/components/Grid/Container";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "VeAppBarBottom",
  components: {
    VeContainer
  }
})
export default class VeAppBarBottom extends Vue {
  @Prop({ type: Boolean, default: true })
  fixed!: boolean;

  @Prop({ type: Boolean, default: true })
  toggle!: boolean;

  cn = "ve-app-bar-bottom";
  body: HTMLBodyElement | null = document.querySelector("body");
  lastScrollY: number = window.scrollY;
  show = true;

  get defaultSlot(): boolean {
    return !(
      typeof this.$slots.left === "object" ||
      typeof this.$slots.center === "object" ||
      typeof this.$slots.right === "object"
    );
  }

  get containerClasses() {
    return [[this.cn], { fixed: this.fixed }];
  }

  get defaultSlotClasses(): string {
    return `${this.cn}__container-default`;
  }

  get sectionsClasses(): string {
    return `${this.cn}__container-sections`;
  }

  @Watch("fixed", { immediate: true })
  onFixedChanged(flag: boolean): void {
    this.setBodyClass(flag);

    this.removeEventScroll();
    this.addEventScroll();
  }

  @Watch("toggle", { immediate: true })
  onToggleChanged(flag: boolean): void {
    this.removeEventScroll();
    this.addEventScroll();

    if (!flag) {
      this.lastScrollY = 0;
      this.show = true;
    }
  }

  private addEventScroll(): void {
    if (this.fixed && this.toggle) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  private removeEventScroll(): void {
    window.removeEventListener("scroll", this.handleScroll);
  }

  private handleScroll() {
    if (this.fixed && this.toggle) {
      if (window.scrollY > this.lastScrollY) {
        this.show = false;
      } else {
        this.show = true;
      }

      this.lastScrollY = window.scrollY;
    }
  }

  private setBodyClass(flag: boolean): void {
    if (this.body === null) {
      return;
    }

    const className = `${this.cn}-fixed`;

    if (flag) {
      this.body.classList.add(className);
    } else {
      this.body.classList.remove(className);
    }
  }

  created() {
    this.addEventScroll();
  }

  destroyed() {
    this.removeEventScroll();
  }

  render(): VNode {
    return (
      <transition name="slide">
        {this.show ? (
          <div class={this.containerClasses}>
            {this.defaultSlot ? (
              <ve-container class={this.defaultSlotClasses}>
                {this.$slots.default}
              </ve-container>
            ) : (
              <ve-container class={this.sectionsClasses}>
                <div class={`${this.cn}__left`}>{this.$slots.left}</div>
                <div class={`${this.cn}__center`}>{this.$slots.center}</div>
                <div class={`${this.cn}__right`}>{this.$slots.right}</div>
              </ve-container>
            )}
          </div>
        ) : null}
      </transition>
    );
  }
}

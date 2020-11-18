import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { StylesInterface, BackgroundStylesInterface } from "./types";

@Component({
  name: "VeMask"
})
export default class VeMask extends Vue {
  @Prop({ default: false })
  fullscreen!: boolean;

  @Prop({ default: false })
  open!: boolean;

  @Prop({ default: 1 })
  opacity!: number;

  @Prop({ default: 300 })
  speed!: number;

  body: null | HTMLElement = document.querySelector("body");

  styles: StylesInterface = {
    display: "none",
    position: ""
  };

  backgroundStyles: BackgroundStylesInterface = {
    transitionDuration: `${this.speed}ms`,
    opacity: this.opacity
  };

  @Watch("fullscreen")
  onFullscreenChanged(val: boolean): void {
    this.toggleFullscreen(val);
  }

  @Watch("open")
  onOpenChanged(val: boolean): void {
    this.toggleOpen(val);
  }

  @Watch("opacity")
  onOpacityChanged(val: number): void {
    this.backgroundStyles.opacity = val;
  }

  @Watch("speed")
  onSpeedChanged(val: number): void {
    this.backgroundStyles.transitionDuration = `${val}ms`;
  }

  changeDisplay(): void {
    if (!this.open) {
      this.styles.display = "none";
    }
  }

  onClickScrim(): void {
    this.$emit("click");
  }

  openFullscreen(): void {
    if (this.body) {
      this.body.style["position"] = "relative";
      this.body.style["overflow"] = "hidden";

      this.styles.position = "fixed";
    }
  }

  quitFullscreen(): void {
    if (this.body) {
      this.body.style["position"] = "";
      this.body.style["overflow"] = "";

      this.styles.position = "";
    }
  }

  toggleFullscreen(fullscreen: boolean): void {
    if (fullscreen) {
      this.openFullscreen();
    } else {
      this.quitFullscreen();
    }
  }

  toggleOpen(open: boolean): void {
    this.styles.display = "";

    if (open) {
      this.backgroundStyles.opacity = this.opacity;
    } else {
      this.backgroundStyles.opacity = 0;
    }

    window.setTimeout(this.changeDisplay, this.speed);
  }

  mounted(): void {
    this.$nextTick(() => {
      this.toggleFullscreen(this.fullscreen);
      this.toggleOpen(this.open);
    });
  }

  render(): VNode {
    return (
      <div ref="mask" class="ve-mask" style={this.styles}>
        <div
          class="ve-mask__background"
          style={this.backgroundStyles}
          onClick={this.onClickScrim}
        />

        {this.open ? (
          <div class="ve-mask__content">{this.$slots.default}</div>
        ) : null}
      </div>
    );
  }
}

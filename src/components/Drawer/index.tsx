import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VeMask from "@/components/Mask";
import { positions } from "./types";

@Component({
  name: "VeDrawer",
  components: {
    VeMask
  }
})
export default class VeDrawer extends Vue {
  @Prop({ type: Boolean, default: true })
  value!: boolean;

  @Prop({
    type: String,
    default: positions[0],
    validator: val => positions.includes(val)
  })
  position!: string;

  @Prop({ type: Boolean, default: false })
  backdrop!: boolean;

  @Prop({ type: Number, default: 0.6 })
  backdropOpacity!: number;

  @Prop({ type: Number, default: 300 })
  backdropSpeed!: number;

  @Prop({ type: Number, default: 36 })
  width!: number;

  @Prop({ type: Boolean, default: false })
  right!: string;

  @Prop({ type: Number, default: 250 })
  drawerSpeed!: number;

  @Prop({ type: Boolean, default: false })
  collapsed!: boolean;

  cn = "ve-drawer";
  open_ = false;
  opening = false;
  closing = false;
  maskOpen = false;

  get drawerClasses() {
    const classes: Array<string> = [this.cn];

    classes.push(`${this.cn}__${this.position}`);
    classes.push(this.collapsed ? `${this.cn}__collapsed` : "");
    classes.push(this.open_ ? `${this.cn}__open` : `${this.cn}__closed`);

    return classes;
  }

  get drawerWrapClasses() {
    const classes = [`${this.cn}__wrap`];

    if (this.right) {
      classes.push(`${this.cn}__right`);
    } else {
      classes.push(`${this.cn}__left`);
    }

    /*
    let animationInClass = "slide-enter-left";
    let animationOutClass = "slide-leave-left";

    switch (this.right) {
      case 'right':
        classes.push('drawer-right');
        animationInClass = "slide-enter-right";
        animationOutClass = "slide-leave-right";
        break;
      case 'left':
      default:
        classes.push('drawer-left');
        break;
    }

    classes.push(this.collapsed ? 'drawer-collapsed' : '');
    classes.push(this.opening ? animationInClass : '');
    classes.push(this.closing ? animationOutClass : '');
    */

    return classes;
  }

  get drawerContainerClasses() {
    const classes = [`${this.cn}__container`];

    if (this.right) {
      classes.push(`${this.cn}__right`);
    } else {
      classes.push(`${this.cn}__left`);
    }

    return classes;
  }

  get drawerStyles() {
    // animationDuration: `${this.drawerSpeed / 1000}s`
    return {
      width: `${this.width}%`
    };
  }

  get containerStyles() {
    if (this.open_) {
      if (this.position === positions[0]) {
        const width = 100 - this.width;

        return {
          width: `${width}%`
        };
      } else if (this.position === positions[1]) {
        return this.right
          ? { right: `${this.width}%` }
          : { left: `${this.width}%` };
      }
    }

    return {
      // width: `${100 - this.drawerWidth}%`,
    };
  }

  @Watch("value", { immediate: true })
  onValueChanged(newVal: boolean): void {
    this.handleDrawer(newVal);
  }

  closeDrawer(): void {
    this.handleDrawer(false);
    this.$emit("input", false);
  }

  handleDrawer(open: boolean): void {
    this.maskOpen = open;
    this.opening = false;
    this.closing = false;

    if (open) {
      this.$emit("open");
      this.open_ = true;
      this.opening = true;

      window.setTimeout(() => {
        this.opening = false;
        this.open_ = true;
      }, this.drawerSpeed - 10);
    } else {
      this.$emit("close");
      this.open_ = false;
      this.closing = true;

      window.setTimeout(() => {
        this.closing = false;
        this.open_ = false;
      }, this.drawerSpeed - 10);
    }
  }

  handleMaskClick() {
    this.closeDrawer();

    this.$emit("backdrop-click");
  }

  render(): VNode {
    return (
      <main class={this.drawerClasses}>
        <aside class={this.drawerWrapClasses} style={this.drawerStyles}>
          {this.$slots.drawer}
        </aside>

        <section
          class={this.drawerContainerClasses}
          style={this.containerStyles}
        >
          {this.backdrop ? (
            <ve-mask
              open={this.open_}
              opacity={this.backdropOpacity}
              speed={this.backdropSpeed}
              onClick={this.handleMaskClick}
            />
          ) : null}

          {this.$slots.content}
        </section>
      </main>
    );
  }
}

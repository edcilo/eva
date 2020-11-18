import "./styles.scss";
import { VNode } from "vue";
import { Vue, Component, Prop } from "vue-property-decorator";

import data from "./data";
import defaultSettings from "./settings";
import Scrollbar from "./scroll";

@Component({
  name: "ve-scroll"
})
export default class veScroll extends Vue {
  @Prop({
    default: () => {
      return {};
    }
  })
  private settings!: Object;

  public $refs!: {
    element: HTMLElement;
    scrollbarXRail: HTMLElement;
    scrollbarX: HTMLElement;
    scrollbarYRail: HTMLElement;
    scrollbarY: HTMLElement;
  };

  private Scrollbar: any = null;
  private cn: Object = data.elementClasses;
  private barXClasses: Object = data.barXClasses;
  private barYClasses: Object = data.barYClasses;
  private railXClasses: Object = data.railXClasses;
  private railYClasses: Object = data.railYClasses;

  initScrollbar() {
    data.settings = Object.assign({}, defaultSettings, this.settings);
    data.element = this.$refs.element;
    data.scrollbarElement.xRail = this.$refs.scrollbarXRail;
    data.scrollbarElement.x = this.$refs.scrollbarX;
    data.scrollbarElement.yRail = this.$refs.scrollbarYRail;
    data.scrollbarElement.y = this.$refs.scrollbarY;
    this.Scrollbar = new Scrollbar(data);
  }

  dispatchEvent(suffix: string) {
    this.$emit(`scroll-${suffix}`);
  }

  mounted() {
    this.$nextTick(function() {
      this.initScrollbar();

      this.$refs.element.addEventListener("ps-scroll-y", () =>
        this.dispatchEvent("y")
      );
      this.$refs.element.addEventListener("ps-scroll-up", () =>
        this.dispatchEvent("up")
      );
      this.$refs.element.addEventListener("ps-scroll-down", () =>
        this.dispatchEvent("down")
      );
      this.$refs.element.addEventListener("ps-y-reach-start", () =>
        this.dispatchEvent("y-reach-start")
      );
      this.$refs.element.addEventListener("ps-y-reach-end", () =>
        this.dispatchEvent("y-reach-end")
      );

      this.$refs.element.addEventListener("ps-scroll-x", () =>
        this.dispatchEvent("x")
      );
      this.$refs.element.addEventListener("ps-scroll-left", () =>
        this.dispatchEvent("left")
      );
      this.$refs.element.addEventListener("ps-scroll-right", () =>
        this.dispatchEvent("right")
      );
      this.$refs.element.addEventListener("ps-x-reach-start", () =>
        this.dispatchEvent("x-reach-start")
      );
      this.$refs.element.addEventListener("ps-x-reach-end", () =>
        this.dispatchEvent("x-reach-end")
      );
    });
  }

  render(): VNode {
    return (
      <div ref="element" class={this.cn}>
        <div class="content">{this.$slots.default}</div>

        <div ref="scrollbarXRail" class={this.railXClasses}>
          <div ref="scrollbarX" class={this.barXClasses} tabindex="0" />
        </div>

        <div ref="scrollbarYRail" class={this.railYClasses}>
          <div ref="scrollbarY" class={this.barYClasses} tabindex="0" />
        </div>
      </div>
    );
  }
}

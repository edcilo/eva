import "./styles.scss";
import { VNode } from "vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

interface Preview {
  preview: boolean;
  reveal: boolean;
}

@Component({
  name: "ve-image"
})
export default class VeImage extends Vue {
  @Prop({ default: false })
  protected lazy!: boolean;

  @Prop({ required: true })
  protected src!: string;

  @Prop({ default: "" })
  protected preview!: string;

  @Prop({ default: "" })
  protected alt!: string;

  @Prop({ default: "" })
  protected placeholder!: string;

  cn = "ve-image";
  public $refs!: { preview: HTMLElement };
  protected srcImage: null | string = !this.lazy ? this.src : null;
  protected srcPreview: null | string = this.lazy
    ? this.preview.length > 0
      ? this.preview
      : null
    : null;
  protected previewClass: Preview = { preview: true, reveal: false };
  protected timer: any = null;
  protected loaded: boolean = false;

  @Watch("src")
  onSrcChanged(src: string): void {
    this.srcImage = src;
  }

  protected lazyLoad(): void {
    if (window.addEventListener && window.requestAnimationFrame) {
      window.addEventListener("scroll", this.scroller, false);
      window.addEventListener("resize", this.scroller, false);
      this.inView();
    }
  }

  protected scroller(): void {
    this.timer =
      this.timer ||
      setTimeout(() => {
        this.timer = null;
        this.inView();
      }, 300);
  }

  protected inView(): void {
    requestAnimationFrame(() => {
      let wT = window.pageYOffset;
      let wB = wT + window.innerHeight;

      if (!this.$refs.preview) {
        return;
      }

      let cRect = this.$refs.preview.getBoundingClientRect();
      let pT = wT + cRect.top;
      let pB = pT + cRect.height;

      if (wT < pB && wB > pT) {
        this.srcImage = this.src;
      }
    });
  }

  protected imageLoaded(e: Event): void {
    this.loaded = true;
    this.loadEvent(e);
  }

  protected loadEvent(e: Event): void {
    this.$emit("load", e);
  }

  protected errorEvent(e: Event): void {
    this.$emit("error", e);

    if (this.placeholder.length > 0) {
      this.srcImage = this.placeholder;

      if (this.lazy) {
        this.srcPreview = this.placeholder;
        this.previewClass.preview = false;
        this.previewClass.reveal = true;
      }
    }
  }

  protected mounted(): void {
    this.$nextTick(function() {
      if (this.lazy) {
        this.lazyLoad();
      }
    });
  }

  render(): VNode {
    let image = null;
    let preview = null;

    if (this.lazy) {
      preview = this.$createElement("img", {
        class: "preview",
        attrs: {
          alt: this.alt,
          src: this.srcPreview
        },
        ref: "preview"
      });

      image = this.$createElement("img", {
        class: "reveal",
        attrs: {
          alt: this.alt,
          src: this.srcImage
        },
        on: {
          load: this.imageLoaded,
          error: this.errorEvent
        },
        ref: "image"
      });
    } else {
      image = this.$createElement("img", {
        attrs: {
          alt: this.alt,
          src: this.srcImage
        },
        on: {
          load: this.loadEvent,
          error: this.errorEvent
        }
      });
    }

    return (
      <div class={this.cn}>
        {!this.loaded ? preview : null}
        {image}
      </div>
    );
  }
}

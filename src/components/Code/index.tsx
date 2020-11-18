import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import Prism from "prismjs";

@Component({
  name: "VeCode"
})
export default class VeCode extends Vue {
  @Prop({ type: String, required: true })
  lang!: string;

  @Prop({ type: Boolean, default: false })
  inline!: boolean;

  cn = "ve-code";
  classes = "language-none";

  @Watch("lang", { immediate: true })
  onLangChanged(): void {
    this.getClasses();
  }

  getClasses(): void {
    this.classes =
      this.lang.length > 0 ? `language-${this.lang}` : "language-none";
  }

  mounted() {
    Prism.highlightElement(this.$refs.code);
  }

  updated() {
    Prism.highlightElement(this.$refs.code);
  }

  render(): VNode {
    const code = this.$createElement(
      "code",
      {
        class: this.classes,
        ref: "code"
      },
      this.$slots.default
    );

    const pre = this.$createElement("pre", { class: this.cn }, [code]);

    return !this.inline ? pre : code;
  }
}

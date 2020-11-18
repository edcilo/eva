import "./styles.scss";
import { VNode } from "vue";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import VePanel from "@/components/Panel";

@Component({
  name: "VeCard",
  components: {
    VePanel
  }
})
export default class VeCard extends Vue {
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: Boolean, default: false })
  strict!: boolean;

  @Emit()
  click() {
    return null;
  }

  onClick() {
    if (!this.disabled) {
      this.click();
    }
  }

  orderableSlots: { [name: string]: Function } = {
    header: this.renderHeader,
    cover: this.renderCover,
    raw: this.renderRaw,
    default: this.renderContent,
    footer: this.renderFooter
  };

  get classes() {
    let classes: { [name: string]: boolean } = { "ve-card": true };
    if (this.disabled) {
      classes = { ...classes, disabled: this.disabled };
    }
    return classes;
  }

  renderHeader() {
    if (this.$slots.header) {
      return <ve-panel class="ve-card__header">{this.$slots.header}</ve-panel>;
    }
  }

  renderCover() {
    if (this.$slots.cover) {
      return <ve-panel class="ve-card__cover">{this.$slots.cover}</ve-panel>;
    }
  }

  renderRaw() {
    if (this.$slots.raw) {
      return <ve-panel class="ve-card__cover">{this.$slots.raw}</ve-panel>;
    }
  }

  renderContent() {
    if (this.$slots.default) {
      return (
        <ve-panel class="ve-card__content">{this.$slots.default}</ve-panel>
      );
    }
  }

  renderFooter() {
    if (this.$slots.footer) {
      return <ve-panel class="ve-card__footer">{this.$slots.footer}</ve-panel>;
    }
  }

  getOrderableSlots() {
    if (this.strict) {
      return Object.entries(this.orderableSlots)
        .filter(slot => {
          const [name] = slot;
          return !!this.orderableSlots[name];
        })
        .map(([name]) => this.orderableSlots[name]());
    }
    return Object.entries(this.$slots)
      .filter(slot => {
        const [name] = slot;
        return !!this.orderableSlots[name];
      })
      .map(([name]) => this.orderableSlots[name]());
  }

  render(): VNode {
    return (
      <ve-panel class={this.classes} onClick={this.onClick}>
        {this.getOrderableSlots().map(node => node)}
      </ve-panel>
    );
  }
}

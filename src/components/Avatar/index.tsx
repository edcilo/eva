import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "VeAvatar"
})
export default class VeAvatar extends Vue {
  @Prop({ type: String || null, default: null })
  src!: null | string;

  @Prop({ type: String || null, default: null })
  alt!: null | string;

  @Prop({ type: String || null, default: null })
  label!: null | string;

  @Prop({ type: String || null, default: null })
  color!: null | string;

  @Prop({ type: String || null, default: null })
  size!: null | string;

  @Prop({ type: String || null, default: null })
  fontSize!: null | string;

  @Prop({ type: Boolean, default: false })
  tile!: boolean;

  cn = "ve-avatar";

  get letter(): null | string {
    return this.label !== null && this.label.length > 0
      ? this.label.charAt(0).toUpperCase()
      : null;
  }

  get containerClasses() {
    return [[this.cn], { tile: this.tile }];
  }

  get containerStyles() {
    return {
      width: this.size,
      height: this.size,
      fontSize: this.fontSize
    };
  }

  get labelStyles() {
    let styles = {};
    if (this.color) {
      styles = { ...styles, backgroundColor: this.color };
    }
    return styles;
  }

  get placeholderStyles() {
    let styles = {};
    if (this.color) {
      styles = { ...styles, backgroundColor: this.color };
    }
    return styles;
  }

  get imageStyles() {
    let styles = {};
    if (this.color) {
      styles = { ...styles, backgroundColor: this.color };
    }
    return styles;
  }

  render(): VNode {
    return (
      <div class={this.containerClasses} style={this.containerStyles}>
        {this.src !== null ? (
          <img
            class={`${this.cn}__image`}
            src={this.src}
            alt={this.alt}
            style={this.imageStyles}
          />
        ) : this.letter !== null ? (
          <div class={`${this.cn}__label`} style={this.labelStyles}>
            {this.letter}
          </div>
        ) : (
          <div class={`${this.cn}__placeholder`} style={this.placeholderStyles}>
            {this.$slots.default}
          </div>
        )}
      </div>
    );
  }
}

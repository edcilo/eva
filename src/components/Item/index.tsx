import vePanel from "@/components/Panel";

import "./styles.scss";
import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";

@Component({
  name: "VeItem",
  components: { vePanel }
})
export default class VeItem extends Vue {
  hasBody: boolean = typeof this.$slots.default === "object";

  hasVisual: boolean = typeof this.$slots.visual === "object";

  hasControl: boolean = typeof this.$slots.control === "object";

  onClick(): void {
    this.$emit("click");
  }

  render(): VNode {
    return (
      <ve-panel class="ve-item">
        <div class="ve-item__content" onClick={this.onClick}>
          {this.hasVisual ? (
            <div class="ve-item__visual">{this.$slots.visual}</div>
          ) : null}

          {this.hasBody ? (
            <div class="ve-item__body">
              <span class="ve-item__overline">{this.$slots.overline}</span>

              {this.$slots.default}

              <span class="ve-item__secondary">{this.$slots.secondary}</span>
            </div>
          ) : null}

          {this.hasControl ? (
            <div class="ve-item__control">{this.$slots.control}</div>
          ) : null}
        </div>
      </ve-panel>
    );
  }
}

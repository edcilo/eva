import "./styles.scss";
import { VNode } from "vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "VeSpinner"
})
export default class VeSpinner extends Vue {
  render(): VNode {
    return (
      <div class="ve-spinner">
        <svg class="ve-spinner-svg" viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20" fill="none" class="path" />
        </svg>
      </div>
    );
  }
}

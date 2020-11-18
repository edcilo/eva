<template>
  <div class="component">
    <div class="component__header">
      <h1 class="component__title">
        {{ title }}
        <span class="component__subtitle">
          {{ version }}
        </span>
      </h1>
    </div>

    <ve-row class="component__body">
      <ve-col size="md-8" class="component__blueprint">
        <ve-blueprint>
          <!-- component -->
          <ve-button-group :vertical="vertical">
            <ve-button :type="btnType" :btn-style="btnStyle">
              Button 1
            </ve-button>
            <ve-button :type="btnType" :btn-style="btnStyle">
              Button 2
            </ve-button>
            <ve-button :type="btnType" :btn-style="btnStyle">
              Button 3
            </ve-button>
          </ve-button-group>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-switch v-model="vertical">vertical</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code lang="sh" :inline="true">default</ve-code>
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import VeBlueprint from "@/components/Blueprint";
import VeButton from "@/components/Button";
import VeButtonGroup from "@/components/ButtonGroup";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputSwitch from "@/components/Input/Switch";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeButton,
    VeButtonGroup,
    VeCode,
    VeCol,
    VeDivider,
    VeInputSwitch,
    VeRow
  },

  data() {
    return {
      title: "VeButtonGroup",
      version: "v1.0.0",
      vertical: false,
      btnType: "primary",
      btnStyle: "rounded"
    };
  },

  computed: {
    code() {
      return `<ve-button :vertical="boolean">
  <ve-button>Button 1</ve-button>
  <ve-button>Button 2</ve-button>
  <ve-button>Button 3</ve-button>
</ve-button>`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.component {
  &__header {
    margin-bottom: $margin-lg;
  }

  &__title {
    margin-bottom: 0;
  }

  &__subtitle {
    font-size: $font-lg;
    font-weight: $fw-base;
  }

  // &__props {}

  &__divider {
    border-color: $c-gray-light;
  }

  .ve-blueprint {
    margin-bottom: $margin-base;
  }
}
</style>

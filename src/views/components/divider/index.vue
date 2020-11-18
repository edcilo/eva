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
          <ve-panel class="panel-clear">
            <ve-divider :dark="darkMode">
              {{ content }}
            </ve-divider>
          </ve-panel>
          <ve-panel class="panel-dark">
            <ve-divider :dark="!darkMode">
              {{ content }}
            </ve-divider>
          </ve-panel>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-switch v-model="darkMode">Dark</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-input-textarea
              id="slot-default"
              label="Default"
              v-model="content"
              :btn-clear="true"
              :block="true"
              :rows="4"
              :max="500"
              :counter="true"
            />
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputTextarea from "@/components/Input/Textarea";
import VePanel from "@/components/Panel";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeInputSwitch,
    VeInputTextarea,
    VePanel,
    VeRow
  },

  data() {
    return {
      title: "VeDivider",
      version: "v1.0.0",
      darkMode: true,
      content: "Subtitle"
    };
  },

  computed: {
    code() {
      return `<ve-divider :dark="boolean">
  default slot
</ve-divider>`;
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

  .panel-clear {
    background-color: $c-gray-lightest;
    padding: $padding-base;
  }

  .panel-dark {
    background-color: $c-gray-darkest;
    padding: $padding-base;
  }
}
</style>

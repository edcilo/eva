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
          <ve-header :areas="areas" :fixed="fixed" :fluid="fluid">
            <template #left>
              <div class="text-left">Left</div>
            </template>
            <template #center>
              <div class="text-center">Center</div>
            </template>
            <template #right>
              <div class="text-right">Right</div>
            </template>
          </ve-header>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text v-model="areas" label="Areas">areas</ve-input-text>
          </li>
          <li>
            <ve-input-switch v-model="fixed">fixed</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="fluid">fluid</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code lang="bash" :inline="true">left</ve-code>
          </li>
          <li>
            <ve-code lang="bash" :inline="true">center</ve-code>
          </li>
          <li>
            <ve-code lang="bash" :inline="true">right</ve-code>
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
import VeHeader from "@/components/Header";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputText from "@/components/Input/Text";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeHeader,
    VeInputSwitch,
    VeInputText,
    VeRow
  },

  data() {
    return {
      title: "VeHeader",
      version: "v1.0.0",
      areas: "left center right",
      fixed: false,
      fluid: false
    };
  },

  computed: {
    code() {
      return `<ve-header :areas="string" :fixed="boolean" :fluid="boolean">
  <template #left>Left</template>
  <template #center>Center</template>
  <template #right>Right</template>
</ve-header>`;
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

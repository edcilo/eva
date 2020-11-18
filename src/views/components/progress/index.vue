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
          <strong>With propertie size</strong>
          <ve-progress v-model="value" :max="max" :size="size" />

          <ve-divider />

          <strong>With slot, ignoring propertie size</strong>
          <ve-progress v-model="value" :max="max" :size="size">
            {{ content }}
          </ve-progress>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-number v-model="value" label="v-model" />
          </li>
          <li>
            <ve-input-number v-model="max" label="max" />
          </li>
          <li>
            <select v-model="size">
              <option v-for="s in sizes" :key="s">
                {{ s }}
              </option>
            </select>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-input-text v-model="content" label="default" />
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import { sizes } from "@/components/Progress/types";

import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputNumber from "@/components/Input/Number";
import VeInputText from "@/components/Input/Text";
import VeProgress from "@/components/Progress";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeInputNumber,
    VeInputText,
    VeProgress,
    VeRow
  },

  data() {
    return {
      title: "VeProgress",
      version: "v1.0.0",
      content: "Progress bar",
      value: 50,
      max: 100,
      size: "small",
      sizes
    };
  },

  computed: {
    code() {
      return `<ve-progress
  v-model="number"
  :max="number"
  :size="tiny|small|medium|large|big|huuge|massive|\\d"
>
  {{ content }}
</ve-progress>`;
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

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
        <p>
          Documentation:
          <a href="https://github.com/lipis/flag-icon-css" target="blank">
            https://github.com/lipis/flag-icon-css
          </a>
        </p>

        <ve-blueprint>
          <!-- component -->
          <ve-flag :code="countryCode" />
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text label="code" v-model="countryCode" />
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
import VeFlag from "@/components/Flag";
import VeInputText from "@/components/Input/Text";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentFlag",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeFlag,
    VeInputText,
    VeRow
  },

  data() {
    return {
      title: "VeFlag",
      version: "v1.0.0",
      countryCode: "mx"
    };
  },

  computed: {
    code() {
      return `<ve-flag code="string" />`;
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

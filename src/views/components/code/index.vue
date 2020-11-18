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
          <ve-code lang="bash" :inline="true">{{ inlineContent }}</ve-code>

          <ve-divider />

          <ve-code lang="html">{{ content }}</ve-code>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <strong>lang</strong> (string)
            <br />
            <a href="https://prismjs.com/#supported-languages" target="_blank">
              https://prismjs.com/#supported-languages
            </a>
          </li>
          <li><strong>inline</strong> (boolean)</li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code :inline="true" lang="bash">default</ve-code>
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
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeRow
  },

  data() {
    return {
      title: "VeCode",
      version: "v1.0.0"
    };
  },

  computed: {
    code() {
      return ``;
    },

    inlineContent() {
      return `sh [-acefhikmnprstuvx] [arg] ...`;
    },

    content() {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>ve-code</title>
</head>
<body>
  <h1>VeCode</h1>
  <p>Lorem ipsum dolor sit amet consectetur idiapiscing elit</p>
</body>
</html>`;
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

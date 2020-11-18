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
          <ve-nav :vertical="vertical" :nav="nav">
            <ve-item v-for="i in 4" :key="i"> Item {{ i }} </ve-item>
          </ve-nav>
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
          <li>
            <ve-input-switch v-model="nav">nav</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code lang="bash" :inline="true">default</ve-code>
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
import VeItem from "@/components/Item";
import VeNav from "@/components/Nav";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeInputSwitch,
    VeItem,
    VeNav,
    VeRow
  },

  data() {
    return {
      title: "VeNav",
      version: "v1.0.0",
      vertical: false,
      nav: true
    };
  },

  computed: {
    code() {
      return `<ve-nav :vertical="boolean" :nav="boolean">
  <ve-item v-for="i in 4" :key="i"> Item {{ i }} </ve-item>
</ve-nav>`;
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

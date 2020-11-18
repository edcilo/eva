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
          <ve-loading
            :open="open"
            :fullscreen="fullscreen"
            :opacity="opacity"
            :speed="speed"
            @click="onClick"
          >
            {{ content }}
          </ve-loading>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-number v-model="opacity" label="opacity" />
          </li>
          <li>
            <ve-input-number v-model="speed" label="speed" />
          </li>
          <li>
            <ve-input-switch v-model="fullscreen">fullscreen</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="open">open</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
          <li>
            <strong>onClick: </strong>
            <code v-show="eventClick">emitted</code>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-input-text label="default" v-model="content" />
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
import VeInputNumber from "@/components/Input/Number";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputText from "@/components/Input/Text";
import VeLoading from "@/components/Loading";
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
    VeInputSwitch,
    VeLoading,
    VeRow
  },

  data() {
    return {
      title: "VeLoading",
      version: "v1.0.0",
      content: "Loading...",
      fullscreen: false,
      open: true,
      opacity: 1,
      speed: 300,
      eventClick: false
    };
  },

  computed: {
    code() {
      return `<ve-loading
  :open="boolean"
  :fullscreen="boolean"
  :opacity="number"
  :speed="number"
  @click="function"
>
  Loading
</ve-loading>`;
    }
  },

  methods: {
    onClick() {
      this.eventClick = true;
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

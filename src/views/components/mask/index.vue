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
          <ve-mask
            :open="open"
            :fullscreen="fullscreen"
            :opacity="opacity"
            :speed="opacity"
            @click="onClick"
          >
            {{ content }}
          </ve-mask>
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
            <ve-input-switch v-model="fullscreen">
              fullscreen
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="open">
              open
            </ve-input-switch>
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
            <ve-input-text v-model="content" label="default" />
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
import VeMask from "@/components/Mask";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeInputNumber,
    VeInputSwitch,
    VeInputText,
    VeMask,
    VeRow
  },

  data() {
    return {
      title: "VeMask",
      version: "v1.0.0",
      content: "Default slot",
      fullscreen: false,
      open: true,
      opacity: 0.8,
      speed: 300,
      eventClick: false
    };
  },

  computed: {
    code() {
      return `<ve-mask
  :open="open"
  :fullscreen="fullscreen"
  :opacity="opacity"
  :speed="opacity"
>
  {{ content }}
</ve-mask>`;
    }
  },

  methods: {
    onClick() {
      this.fullscreen = false;
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

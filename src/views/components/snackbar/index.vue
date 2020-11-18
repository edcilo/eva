<template>
  <div class="component">
    <ve-snackbar
      :open="open"
      :top="top"
      :right="right"
      :left="left"
      :vertical="vertical"
      :btnText="btnText"
      :timeoout="timeout"
      @click="onClick"
      @open="onOpen"
      @close="onClose"
    >
      {{ content }}
    </ve-snackbar>

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
        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-number v-model="timeout" label="timeout" />
          </li>
          <li>
            <ve-input-text v-model="btnText" label="btnText" />
          </li>
          <li>
            <ve-input-switch v-model="open">
              open
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="top">
              top
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="right">
              right
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="left">
              left
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="vertical">
              vertical
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
          <li>
            <strong>onOpen: </strong>
            <code v-show="eventOpen">emitted</code>
          </li>
          <li>
            <strong>onClose: </strong>
            <code v-show="eventClose">emitted</code>
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
import VeRow from "@/components/Grid/Row";
import VeSnackbar from "@/components/Snackbar";

export default {
  name: "ViewComponentDivider",

  components: {
    VeCode,
    VeCol,
    VeDivider,
    VeInputNumber,
    VeInputSwitch,
    VeInputText,
    VeRow,
    VeSnackbar
  },

  data() {
    return {
      title: "VeSnackbar",
      version: "v1.0.0",
      content: "Lorem ipsum dolor sit amet conosectetur idiapiscing elit",
      btnText: "Accept",
      open: false,
      top: false,
      left: false,
      right: false,
      vertical: false,
      timeout: 600,
      eventClick: false,
      eventOpen: false,
      eventClose: false
    };
  },

  computed: {
    code() {
      return `<ve-snackbar
  :open="boolean"
  :top="boolean"
  :right="boolean"
  :left="boolean"
  :vertical="boolean"
  :btnText="string"
  :timeoout="number"
  @click="function"
  @open="function"
  @close="function"
>
  {{ content }}
</ve-snackbar>`;
    }
  },

  methods: {
    onClick() {
      this.eventClick = true;
      this.eventOpen = false;
      this.eventClose = false;
    },

    onOpen() {
      this.eventOpen = true;
      this.eventClose = false;
      this.eventClose = false;
    },

    onClose() {
      this.eventClose = true;
      this.eventOpen = false;
      this.eventClick = false;
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

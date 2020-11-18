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
    <ve-dialog
      :open="open"
      @clickOverlay="onClickOverlay"
      @open="onOpen"
      @close="onClose"
    >
      Lorem ipsum dolor sit amet consectetur idiapiscing elit.
    </ve-dialog>

    <ve-row class="component__body">
      <ve-col size="md-8" class="component__blueprint">
        <ve-blueprint>
          <ve-row>
            <ve-button @click="open = true">OPEN DIALOG</ve-button>
          </ve-row>
        </ve-blueprint>
        <!--prettier-ignore -->
        <ve-code lang="html">{{ code}}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-switch v-model="open">open</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
          <li>
            <strong>clickOverlay: </strong>
            <code v-show="eventClickOverlay">emitted</code>
          </li>
          <li>
            <strong>open: </strong>
            <code v-show="eventOpen">emitted</code>
          </li>
          <li>
            <strong>close: </strong>
            <code v-show="eventClose">emitted</code>
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
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDialog from "@/components/Dialog";
import VeDivider from "@/components/Divider";
import VeInputSwitch from "@/components/Input/Switch";
import VeRow from "@/components/Grid/Row";
import VeBlueprint from "../../../components/Blueprint";
import VeButton from "../../../components/Button";

export default {
  name: "ViewComponentDivider",

  components: {
    VeButton,
    VeBlueprint,
    VeCode,
    VeCol,
    VeDialog,
    VeDivider,
    VeInputSwitch,
    VeRow
  },

  data() {
    return {
      title: "VeDialog",
      version: "v1.0.0",
      open: true,
      eventClickOverlay: false,
      eventOpen: false,
      eventClose: false
    };
  },

  computed: {
    code() {
      return `<ve-dialog
  :open="boolean"
  @clickOverlay="function"
  @open="function"
  @close="function">
  Lorem ipsum dolor sit amet consectetur idiapiscing elit.
</ve-dialog>`;
    }
  },

  methods: {
    onClickOverlay() {
      this.open = false;
      this.eventClickOverlay = true;
      setTimeout(() => (this.eventClickOverlay = false), 500);
    },
    onOpen() {
      this.eventOpen = true;
      setTimeout(() => (this.eventOpen = false), 500);
    },
    onClose() {
      this.eventClose = true;
      setTimeout(() => (this.eventClose = false), 500);
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

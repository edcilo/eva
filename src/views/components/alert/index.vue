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
          <ve-alert type="dark">{{ content }}</ve-alert>

          <ve-alert
            v-model="open"
            :dismissible="dismissible"
            :type="type"
            :time="time"
            @open="onOpen"
            @close="onClose"
          >
            {{ content }}
          </ve-alert>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text v-model="type" label="Type" />
          </li>
          <li>
            <ve-input-number v-model.number="time" label="Time" />
          </li>
          <li>
            <ve-input-switch v-model="dismissible">Dismissible</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="open">Open</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
          <li>
            <strong>onClose: </strong>
            <code v-show="eventClose">emitted</code>
          </li>
          <li>
            <strong>onOpen: </strong>
            <code v-show="eventOpen">emitted</code>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-input-textarea
              id="alert-slot-default"
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
import VeAlert from "@/components/Alert";
import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputNumber from "@/components/Input/Number";
import VeInputText from "@/components/Input/Text";
import VeInputTextarea from "@/components/Input/Textarea";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentAlert",

  components: {
    VeAlert,
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeInputSwitch,
    VeInputNumber,
    VeInputText,
    VeInputTextarea,
    VeRow
  },

  data() {
    return {
      title: "VeAlert",
      version: "v1.0.0",
      open: true,
      dismissible: true,
      time: 15,
      type: "light",
      eventOpen: false,
      eventClose: false,
      content: "lorem ipsum dolor sit amet consectetur idiapiscing elit"
    };
  },

  computed: {
    code() {
      return `<ve-alert
  v-model="open"
  :dismissible="boolean"
  :type="light|primary|success|warning|danger|info|dark"
  @open="onOpen"
  @close="onClose"
>
  default slot
</ve-alert>`;
    }
  },

  methods: {
    onOpen() {
      this.eventOpen = true;
      this.eventClose = false;
    },

    onClose() {
      this.eventOpen = false;
      this.eventClose = true;
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

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
          <ve-banner
            v-model="open"
            :time="time"
            @open="onOpen"
            @close="onClose"
          >
            <font-awesome-icon slot="icon" icon="calendar" />
            {{ content }}
            <div slot="buttons">
              <ve-button type="light" @click="onCloseModal">Close</ve-button>
            </div>
          </ve-banner>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-number v-model.number="time" label="Time" />
          </li>
          <li>
            <ve-input-switch v-model="open">model</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
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
            <ve-input-textarea v-model="content" label="Default" />
          </li>
          <li>
            <ve-code lang="bash" :inline="true">icon</ve-code>
          </li>
          <li>
            <ve-code lang="bash" :inline="true">buttons</ve-code>
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import VeBanner from "@/components/Banner";
import VeBlueprint from "@/components/Blueprint";
import VeButton from "@/components/Button";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputNumber from "@/components/Input/Number";
import VeInputTextarea from "@/components/Input/Textarea";
import VeInputSwitch from "@/components/Input/Switch";
import VeRow from "@/components/Grid/Row";

library.add(faCalendar);

export default {
  name: "ViewComponentDivider",

  components: {
    FontAwesomeIcon,
    VeBanner,
    VeBlueprint,
    VeButton,
    VeCode,
    VeCol,
    VeDivider,
    VeInputNumber,
    VeInputTextarea,
    VeInputSwitch,
    VeRow
  },

  data() {
    return {
      title: "VeBanner",
      version: "v1.0.0",
      content:
        "Lorem ipsum dolor sit amet consectetur idiapiscing elit, Lorem ipsum dolor sit amet consectetur idiapiscing elit, lorem ipsum dolor sit amet consectetur.",
      open: true,
      time: 15,
      eventOpen: false,
      eventClose: false
    };
  },

  computed: {
    code() {
      return `<ve-banner v-model="open" :time="time" @open="onOpen" @close="onClose">
  <font-awesome-icon slot="icon" icon="calendar" />
  ${this.content}
  <div slot="buttons">
    <ve-button type="light" @click="onCloseModal">Close</ve-button>
  </div>
</ve-banner>`;
    }
  },

  methods: {
    onCloseModal() {
      this.open = !this.open;
    },

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

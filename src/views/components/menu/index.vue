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
          <ve-menu
            v-model="open"
            :absolute="absolute"
            :dismissible="dismissible"
            :fixed="fixed"
            :position-x="positionX"
            :position-y="positionY"
            :z-index="zIndex"
            @before-open="onBeforeOpen"
            @open="onOpening"
            @after-open="onAfterOpen"
            @before-close="onBeforeClose"
            @close="onClosing"
            @after-close="onAfterClose"
          >
            <ve-item>Home</ve-item>
            <ve-item>About</ve-item>
          </ve-menu>

          <ve-divider />

          <ve-menu
            :align-end="alignEnd"
            :dismissible="dismissible"
            :left="left"
            :right="right"
            :top="top"
            :bottom="bottom"
          >
            <ve-button slot="trigger" type="light">
              Trigger
            </ve-button>

            <ve-item>
              Home
            </ve-item>
            <ve-item> <font-awesome-icon icon="edit" /> Edit </ve-item>
            <ve-item>
              <ve-avatar slot="visual" label="F" />
              Profile
            </ve-item>
            <ve-item>
              <strong>Account</strong><br />
              <span class="text-sm">feedma</span>

              <ve-avatar slot="visual" label="E" />
              <ve-button slot="control" type="text" size="sm">
                <font-awesome-icon icon="times" />
              </ve-button>
            </ve-item>
          </ve-menu>
        </ve-blueprint>
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>
      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-switch v-model="open">open</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="dismissible">dismissible</ve-input-switch>
          </li>
        </ul>

        <ve-divider />

        <ul>
          <li>
            <ve-input-switch v-model="absolute">absolute</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="fixed">fixed</ve-input-switch>
          </li>
          <li>
            <ve-input-number v-model.number="zIndex" label="z-index" />
          </li>
          <li>
            <ve-input-number v-model.number="positionX" label="position-x" />
          </li>
          <li>
            <ve-input-number v-model.number="positionY" label="position-y" />
          </li>
        </ul>

        <ve-divider />

        <ul>
          <li>
            <ve-input-switch v-model="alignEnd">align-end</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="top">top</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="right">right</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="bottom">bottom</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="left">left</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
          <li>
            <strong>onBeforeOpen: </strong>
            <code v-show="eventOnBeforeOpen">emitted</code>
          </li>
          <li>
            <strong>onOpening: </strong>
            <code v-show="eventOnOpen">emitted</code>
          </li>
          <li>
            <strong>onAfterOpen: </strong>
            <code v-show="eventOnAfterOpen">emitted</code>
          </li>
          <li>
            <strong>onBeforeClose: </strong>
            <code v-show="eventOnBeforeClose">emitted</code>
          </li>
          <li>
            <strong>onClosing: </strong>
            <code v-show="eventOnClose">emitted</code>
          </li>
          <li>
            <strong>onAfterClose: </strong>
            <code v-show="eventOnAfterClose">emitted</code>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code lang="bash" :inline="true">default</ve-code>
          </li>
          <li>
            <ve-code lang="bash" :inline="true">list</ve-code>
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import VeDivider from "../../../components/Divider";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeRow from "@/components/Grid/Row";
import VeMenu from "@/components/Menu";
import VeButton from "@/components/Button";
import VeItem from "@/components/Item";
import VeInputNumber from "@/components/Input/Number";
import VeAvatar from "@/components/Avatar";
import VeInputSwitch from "@/components/Input/Switch";

library.add(faTimes, faEdit);

export default {
  name: "ViewComponentDivider",

  components: {
    VeDivider,
    FontAwesomeIcon,
    VeBlueprint,
    VeCode,
    VeCol,
    VeRow,
    VeMenu,
    VeButton,
    VeItem,
    VeInputNumber,
    VeAvatar,
    VeInputSwitch
  },

  data() {
    return {
      title: "VeMenu",
      version: "v1.0.0",
      vertical: false,
      open: true,
      event: null,
      absolute: false,
      dismissible: true,
      fixed: false,
      alignEnd: false,
      left: false,
      right: false,
      top: false,
      bottom: true,
      zIndex: 500,
      positionX: 0,
      positionY: 0
    };
  },

  computed: {
    eventOnBeforeOpen() {
      return this.event === "onBeforeOpen";
    },
    eventOnOpen() {
      return this.event === "onOpening";
    },
    eventOnAfterOpen() {
      return this.event === "onAfterOpen";
    },
    eventOnBeforeClose() {
      return this.event === "onBeforeClose";
    },
    eventOnClose() {
      return this.event === "onClosing";
    },
    eventOnAfterClose() {
      return this.event === "onAfterClose";
    },
    code() {
      return `<ve-menu
  v-model="Bolean"
  :absolute="Boolean"
  :align-end="true"
  :dismissible="Boolean"
  :fixed="Boolean"
  :left="false"
  :position-x="Number"
  :position-y="Number"
  :right="Boolean"
  :top="Boolean"
  @before-open="onBeforeOpen"
  @open="onOpening"
  @after-open="onAfterOpen"
  @before-close="onBeforeClose"
  @close="onClosing"
  @after-close="onAfterClose"
>
  <ve-item>Home</ve-item>
  <ve-item>About</ve-item>
</ve-menu>
      `;
    }
  },

  methods: {
    onBeforeOpen(event) {
      this.event = "onBeforeOpen";
    },
    onOpening(event) {
      setTimeout(() => (this.event = "onOpening"), 500);
    },
    onAfterOpen() {
      setTimeout(() => (this.event = "onAfterOpen"), 1000);
    },
    onBeforeClose(event) {
      this.event = "onBeforeClose";
    },
    onClosing(event) {
      setTimeout(() => (this.event = "onClosing"), 500);
    },
    onAfterClose() {
      setTimeout(() => (this.event = "onAfterClose"), 1000);
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
    min-height: 400px;
  }
}
</style>

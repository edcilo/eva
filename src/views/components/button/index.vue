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
          <ve-button
            :type="type"
            :btn-style="style"
            :size="size"
            :state="state"
            :btn-type="bType"
            :btn-name="bName"
            :btn-value="bValue"
            :disabled="disabled"
            :href="href"
            :target="target"
            :autofocus="autofocus"
            @click="onClick"
            @enable="onEnable"
            @disabled="onDisabled"
          >
            <font-awesome-icon slot="icon" icon="user" />
            {{ content }}
          </ve-button>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text v-model="bName" label="Name" />
          </li>
          <li>
            <ve-input-text v-model="bValue" label="Value" />
          </li>
          <li>
            <ve-input-switch v-model="disabled">Disabled</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="autofocus">Autofocus</ve-input-switch>
          </li>
          <li>
            <ve-input-text v-model="href" label="Href" />
          </li>
          <li v-show="href !== null">
            Target
            <select v-model="target">
              <option v-for="target in targets" :key="target">
                {{ target }}
              </option>
            </select>
          </li>
          <li>
            Type
            <select v-model="type">
              <option v-for="type in btnTypes" :key="type">{{ type }}</option>
            </select>
          </li>
          <li>
            Style
            <select v-model="style">
              <option v-for="style in btnStyles" :key="style">
                {{ style }}
              </option>
            </select>
          </li>
          <li>
            Size
            <select v-model="size">
              <option v-for="size in btnSizes" :key="size">
                {{ size }}
              </option>
            </select>
          </li>
          <li>
            State
            <select v-model="state">
              <option v-for="state in btnStates" :key="state">
                {{ state }}
              </option>
            </select>
          </li>
          <li>
            btn-type
            <select v-model="bType">
              <option v-for="type in btnType" :key="type">
                {{ type }}
              </option>
            </select>
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
            <strong>onEnable: </strong>
            <code v-show="eventEnable">emitted</code>
          </li>
          <li>
            <strong>onDisabled: </strong>
            <code v-show="eventDisabled">emitted</code>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-input-text v-model="content" label="default" />
          </li>
          <li>
            <ve-code lang="sh" :inline="true">icon</ve-code>
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import VeBlueprint from "@/components/Blueprint";
import VeButton from "@/components/Button";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputText from "@/components/Input/Text";
import VeRow from "@/components/Grid/Row";

library.add(faUser);

import {
  btnTypes,
  btnSizes,
  btnStates,
  btnStyles,
  btnType
} from "@/components/Button/types";

export default {
  name: "ViewComponentDivider",

  components: {
    FontAwesomeIcon,
    VeBlueprint,
    VeButton,
    VeCode,
    VeCol,
    VeDivider,
    VeInputSwitch,
    VeInputText,
    VeRow
  },

  data() {
    return {
      title: "Vebutton",
      version: "v1.0.0",
      eventClick: false,
      eventEnable: false,
      eventDisabled: false,
      content: "Button",
      type: null,
      btnTypes,
      style: null,
      btnStyles,
      size: null,
      btnSizes,
      state: null,
      btnStates,
      bType: null,
      btnType,
      bName: null,
      bValue: null,
      disabled: false,
      href: null,
      target: null,
      targets: ["_blank", "_parent", "_self", "_top"],
      autofocus: true
    };
  },

  computed: {
    code() {
      return `<ve-button
  :type="text|outline|toggle|primary|secondary|success|warning|danger|info|light|dark|link"
  :btn-style="regular|circle|rounded|block"
  :size="sm|regular|lg"
  :state="active|hover|focus"
  :btn-type="button|submit|reset"
  :btn-name="string"
  :btn-value="any"
  :disabled="boolean"
  :href="null|string"
  :target="null|string"
  :autofocus="boolean"
  @click="Function"
  @enable="Function"
  @disabled="Function"
>
  <font-awesome-icon slot="icon" icon="user" />
  ${this.content}
</ve-button>`;
    }
  },

  methods: {
    onClick() {
      this.eventClick = true;
      this.eventEnable = false;
      this.eventDisabled = false;
    },

    onEnable() {
      this.eventClick = false;
      this.eventEnable = true;
      this.eventDisabled = false;
    },

    onDisabled() {
      this.eventClick = false;
      this.eventEnable = false;
      this.eventDisabled = true;
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

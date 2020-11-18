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
          <ve-tooltip :label="label" :disabled="disabled" :position="position">
            <ve-button type="light">
              <font-awesome-icon icon="copy" />
            </ve-button>
          </ve-tooltip>

          <ve-tooltip
            label="Ctrl+V"
            :show="show"
            :disabled="disabled"
            :position="position"
          >
            <ve-button type="light">
              <font-awesome-icon icon="paste" />
            </ve-button>
          </ve-tooltip>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text v-model="label" label="label" />
          </li>
          <li>
            <select v-model="position">
              <option v-for="t in types" :key="t">
                {{ t }}
              </option>
            </select>
          </li>
          <li>
            <ve-input-switch v-model="show">
              show
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="disabled">
              disabled
            </ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code lang="bash" :inline="true">
              default
            </ve-code>
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import { types } from "@/components/Tooltip/types";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy, faPaste } from "@fortawesome/free-solid-svg-icons";

import VeBlueprint from "@/components/Blueprint";
import VeButton from "@/components/Button";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputText from "@/components/Input/Text";
import VeRow from "@/components/Grid/Row";
import VeTooltip from "@/components/Tooltip";

library.add(faCopy, faPaste);

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
    VeRow,
    VeTooltip
  },

  data() {
    return {
      title: "VeTooltip",
      version: "v1.0.0",
      label: "Ctrl+C",
      show: false,
      disabled: false,
      position: "top",
      types
    };
  },

  computed: {
    code() {
      return `<ve-tooltip
  :label="string"
  :show="boolean"
  :disabled="boolean"
  :position="top|bottom"
>
  content
</ve-tooltip>`;
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

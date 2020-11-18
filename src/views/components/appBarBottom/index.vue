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
          <ve-app-bar-bottom :fixed="false" :toggle="false">
            <ve-button type="light">
              <font-awesome-icon icon="home" />
            </ve-button>
            <ve-button type="light">
              <font-awesome-icon icon="search" />
            </ve-button>
            <ve-button type="light">
              <font-awesome-icon icon="plus" />
            </ve-button>
            <ve-button type="light">
              <font-awesome-icon icon="heart" />
            </ve-button>
            <ve-button type="light">
              <font-awesome-icon icon="user" />
            </ve-button>
          </ve-app-bar-bottom>

          <ve-divider />

          <ve-app-bar-bottom :fixed="fixed" :toggle="toggle">
            <template #left>
              <ve-button type="light">
                <font-awesome-icon icon="home" />
              </ve-button>
              <ve-button type="light">
                <font-awesome-icon icon="search" />
              </ve-button>
            </template>

            <template #center>
              <ve-button type="light">
                <font-awesome-icon icon="plus" />
              </ve-button>
            </template>

            <template #right>
              <ve-button type="light">
                <font-awesome-icon icon="heart" />
              </ve-button>
              <ve-button type="light">
                <font-awesome-icon icon="user" />
              </ve-button>
            </template>
          </ve-app-bar-bottom>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-switch v-model="fixed">Fixed</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="toggle">Toggle</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code lang="bash" :inline="true">default</ve-code>
          </li>
          <li>
            o
          </li>
          <li>
            <ve-code lang="bash" :inline="true">left</ve-code>
          </li>
          <li>
            <ve-code lang="bash" :inline="true">center</ve-code>
          </li>
          <li>
            <ve-code lang="bash" :inline="true">right</ve-code>
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faHome,
  faPlus,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";

import VeAppBarBottom from "@/components/AppBarBottom";
import VeBlueprint from "@/components/Blueprint";
import VeButton from "@/components/Button";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputSwitch from "@/components/Input/Switch";
import VeRow from "@/components/Grid/Row";

library.add(faHeart, faHome, faPlus, faSearch, faUser);

export default {
  name: "ViewComponentAppBarBottom",

  components: {
    FontAwesomeIcon,
    VeAppBarBottom,
    VeBlueprint,
    VeButton,
    VeCode,
    VeCol,
    VeDivider,
    VeInputSwitch,
    VeRow
  },

  data() {
    return {
      title: "VeAppBarBottom",
      version: "v1.0.0",
      fixed: false,
      toggle: false
    };
  },

  computed: {
    code() {
      return `<ve-app-bar-bottom :fixed="boolean" :toggle="boolean">
  default slot
</ve-app-bar-bottom>

<ve-app-bar-bottom :fixed="boolean" :toggle="boolean">
  <template #left>left slot</template>
  <template #center>center slot</template>
  <template #right>right slot</template>
</ve-app-bar-bottom>`;
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

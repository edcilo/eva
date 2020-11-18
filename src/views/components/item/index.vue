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
          <ve-item @click="onClick">Ve-Item</ve-item>

          <ve-divider />

          <ve-item @click="onClick">
            <ve-avatar slot="visual" label="F" />
            Ve-Item
          </ve-item>

          <ve-divider />

          <ve-item @click="onClick">
            Ve-Item
            <ve-button slot="control" type="text" size="sm">
              <font-awesome-icon icon="times" />
            </ve-button>
          </ve-item>

          <ve-divider />

          <ve-item @click="onClick">
            <strong>Ve-Item</strong><br />
            <span class="text-sm">feedma</span>

            <ve-avatar slot="visual" label="E" />
            <ve-button slot="control" type="text" size="sm">
              <font-awesome-icon icon="times" />
            </ve-button>
          </ve-item>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Eventos</h2>

        <ul>
          <li>
            <strong>onClick: </strong>
            <code v-show="eventClick">emitted</code>
          </li>
        </ul>

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code :inline="true" lang="bash">Default</ve-code>
          </li>
          <li>
            <ve-code :inline="true" lang="bash">Visual</ve-code>
          </li>
          <ve-code :inline="true" lang="bash">control</ve-code>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import VeAvatar from "@/components/Avatar";
import VeBlueprint from "@/components/Blueprint";
import VeButton from "@/components/Button";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeItem from "@/components/Item";
import VeInputSwitch from "@/components/Input/Switch";
import VeRow from "@/components/Grid/Row";

library.add(faTimes);

export default {
  name: "ViewComponentDivider",

  components: {
    FontAwesomeIcon,
    VeAvatar,
    VeBlueprint,
    VeButton,
    VeCode,
    VeCol,
    VeDivider,
    VeItem,
    VeRow
  },

  data() {
    return {
      title: "VeItem",
      version: "v1.0.0",
      eventClick: false
    };
  },

  computed: {
    code() {
      return `<ve-item @click="Function">
  <strong>Ve-Item</strong><br />
  <span class="text-sm">feedma</span>

  <ve-avatar slot="visual" label="E" />
  <ve-button slot="control" type="text" size="sm">
    <font-awesome-icon icon="times" />
  </ve-button>
</ve-item>`;
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

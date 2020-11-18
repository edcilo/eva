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
          <ve-chip
            v-model="check"
            :disabled="disabled"
            :dismissible="dismissible"
            :state="state"
            @click="onClick"
            @close="onClose"
          >
            <ve-avatar slot="thumbnail" label="C" />
            Foo Bar
          </ve-chip>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <select v-model="state">
              <option v-for="s in states" :key="s">
                {{ s }}
              </option>
            </select>
          </li>
          <li>
            <ve-input-switch v-model="check">
              check
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="disabled">
              disabled
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="dismissible">
              dismissible
            </ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
          <li>
            <!-- events -->
          </li>

          <li>
            <strong>onClick: </strong>
            <code v-show="eventClick">emitted</code>
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
            <ve-code lang="bash" :inline="true">default</ve-code>
          </li>
          <li>
            <ve-code lang="bash" :inline="true">thumbnail</ve-code>
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import VeAvatar from "@/components/Avatar";
import VeBlueprint from "@/components/Blueprint";
import VeChip from "@/components/Chip";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputSwitch from "@/components/Input/Switch";
import VeRow from "@/components/Grid/Row";

import { states } from "@/components/Chip/types";

export default {
  name: "ViewComponentDivider",

  components: {
    VeAvatar,
    VeBlueprint,
    VeChip,
    VeCode,
    VeCol,
    VeDivider,
    VeInputSwitch,
    VeRow
  },

  data() {
    return {
      title: "VeChip",
      version: "v1.0.0",
      eventClick: false,
      eventClose: false,
      check: true,
      disabled: false,
      dismissible: false,
      state: null,
      states
    };
  },

  computed: {
    code() {
      return `<ve-chip
  v-model="boolean"
  :disabled="boolean"
  :dismissible="boolean"
  :state="enabled|hover|focused|selected"
>
  <ve-avatar slot="thumbnail" label="C" />
  Component Chip
</ve-chip>`;
    }
  },

  methods: {
    onClick() {
      this.eventClick = true;
      this.eventClose = false;
    },

    onClose() {
      this.eventClick = false;
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

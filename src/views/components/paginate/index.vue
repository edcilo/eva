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
      <ve-col size="md-8" class="component__blueprint" style="z-index: 100">
        <ve-blueprint>
          <ve-paginate
            :total="total"
            :limit="limit"
            :per-page="perPage"
            :btn-type="type"
            :btn-style="style"
            :simple="simple"
            @click="onClick"
            @previousClick="onPreviousClick"
            @edgeLeft="onEdgeLeft"
            @nextClick="onNextClick"
            @edgeRight="onEdgeRight"
            v-model="page"
          />
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-number v-model="page" label="v-model" />
          </li>
          <li>
            <ve-input-number v-model="total" label="total" />
          </li>
          <li>
            <ve-input-number v-model="limit" label="limit" />
          </li>
          <li>
            <ve-input-number v-model="perPage" label="per-page" />
          </li>
          <li>
            <ve-input-switch v-model="simple">
              simple
            </ve-input-switch>
          </li>
          <li>
            btn-type
            <select v-model="type">
              <option v-for="type in btnTypes" :key="type">{{ type }}</option>
            </select>
          </li>
          <li>
            btn-style
            <select v-model="style">
              <option v-for="style in btnStyles" :key="style">
                {{ style }}
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
            <strong>onNextClick: </strong>
            <code v-show="eventNextClick">emitted</code>
          </li>
          <li>
            <strong>onEdgeRight: </strong>
            <code v-show="eventEdgeRight">emitted</code>
          </li>
          <li>
            <strong>onPreviousClick: </strong>
            <code v-show="eventPreviousClick">emitted</code>
          </li>
          <li>
            <strong>onEdgeLeft: </strong>
            <code v-show="eventEdgeLeft">emitted</code>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-code lang="sh" :inline="true">rightArrow</ve-code>,
            <ve-code lang="sh" :inline="true">leftArrow</ve-code>
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
import VePaginate from "@/components/Paginate";
import VeRow from "@/components/Grid/Row";

import { btnTypes, btnStyles } from "@/components/Button/types";

export default {
  name: "ViewComponentPaginate",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeInputNumber,
    VeInputSwitch,
    VePaginate,
    VeRow
  },

  data() {
    return {
      title: "VePaginate",
      version: "v1.0.0",
      page: 1,
      limit: 3,
      perPage: 10,
      simple: false,
      total: 100,
      type: null,
      style: null,
      btnTypes,
      btnStyles,
      eventClick: false,
      eventNextClick: false,
      eventEdgeRight: false,
      eventPreviousClick: false,
      eventEdgeLeft: false
    };
  },

  computed: {
    code() {
      return `<ve-paginate
  :btn-type="string"
  :btn-style="string"
  :limit="number"
  :per-page="number"
  :total="number"
  :simple="boolean"
  v-model="number"
/>`;
    }
  },

  methods: {
    onClick(page) {
      this.eventClick = true;
    },
    onPreviousClick(page) {
      this.eventPreviousClick = true;
    },
    onEdgeLeft() {
      this.eventEdgeLeft = true;
    },
    onNextClick(page) {
      this.eventNextClick = true;
    },
    onEdgeRight() {
      this.eventEdgeRight = true;
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

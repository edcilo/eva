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
          <ve-panel :width="width" :height="height" @click="onClick">
            {{ content }}
          </ve-panel>
        </ve-blueprint>

        <!-- prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text
              id="panel-width"
              label="Width"
              v-model="width"
              :block="true"
              :btn-clear="true"
            />
          </li>
          <li>
            <ve-input-text
              id="panel-height"
              label="Height"
              v-model="height"
              :block="true"
              :btn-clear="true"
            />
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>
        <ul>
          <li>
            <strong>onClick: </strong>
            <ve-code lang="bash" :inline="true" v-show="clicked">
              emitted
            </ve-code>
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
import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputText from "@/components/Input/Text";
import VeInputTextarea from "@/components/Input/Textarea";
import VePanel from "@/components/Panel";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentPanel",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeInputText,
    VeInputTextarea,
    VePanel,
    VeRow
  },

  data() {
    return {
      title: "VePanel",
      version: "v1.0.0",
      open: false,
      clicked: false,
      height: "auto",
      width: "320px",
      content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam consequuntur deleniti, dolore ducimus ipsa libero minus, molestiae nisi officia praesentium recusandae veritatis voluptatem! Dolorum id maxime sit suscipit veniam?`
    };
  },

  computed: {
    code() {
      return `<ve-panel :width="number" :height="number" @click="onClick">
  default slot
</ve-panel>`;
    }
  },

  methods: {
    openBtn() {
      this.open = true;
    },

    closeBtn() {
      this.open = false;
    },

    onClick() {
      this.clicked = true;
      setTimeout(() => (this.clicked = false), 500);
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

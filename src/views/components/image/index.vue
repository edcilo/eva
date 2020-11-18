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
        <ve-input-switch v-model="error">
          Image not found
        </ve-input-switch>

        <ve-blueprint>
          <ve-image
            :src="src"
            :preview="preview"
            :placeholder="placeholder"
            :lazy="lazy"
            :alt="alt"
            @load="onLoad"
            @error="onError"
          />
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text v-model="src" label="src" :disabled="true" />
          </li>
          <li>
            <ve-input-text v-model="preview" label="preview" :disabled="true" />
          </li>
          <li>
            <ve-input-text
              v-model="placeholder"
              label="placeholder"
              :disabled="true"
            />
          </li>
          <li>
            <ve-input-text v-model="alt" label="alt" />
          </li>
          <li>
            <ve-input-switch v-model="lazy">lazy</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
          <li>
            <strong>load: </strong>
            <code v-show="eventLoad">emitted</code>
          </li>
          <li>
            <strong>error: </strong>
            <code v-show="eventError">emitted</code>
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
import VeImage from "@/components/Image";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputText from "@/components/Input/Text";
import VeRow from "@/components/Grid/Row";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeImage,
    VeInputSwitch,
    VeInputText,
    VeRow
  },

  data() {
    return {
      title: "VeImage",
      version: "v1.0.0",
      lazy: true,
      alt: "lazy image",
      error: false,
      eventLoad: false,
      eventError: false
    };
  },

  computed: {
    code() {
      return `<ve-image
  :src="string"
  :preview="string"
  :placeholder="string"
  :lazy="boolean"
  :alt="string"
  @load="function"
  @error="function"
/>`;
    },

    src() {
      return !this.error
        ? require("@/assets/images/examples/00.jpg")
        : "http://feedma.com/image/not-found";
    },

    preview() {
      return require("@/assets/images/examples/01.jpg");
    },

    placeholder() {
      return require("@/assets/images/examples/02.jpg");
    }
  },

  watch: {
    error(error) {
      this.eventLoad = false;
      this.eventError = false;
    }
  },

  methods: {
    onLoad() {
      this.eventLoad = true;
    },

    onError() {
      this.eventError = true;
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

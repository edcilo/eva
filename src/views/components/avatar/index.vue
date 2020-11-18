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
          <div>
            <ve-avatar :color="color">{{ content }}</ve-avatar>
          </div>

          <div>
            <ve-avatar
              :label="label"
              :tile="tile"
              :size="size"
              :font-size="fontSize"
            />
          </div>

          <div>
            <ve-avatar :src="src" :alt="alt" :color="color" />
          </div>

          <div>
            <ve-avatar>
              <font-awesome-icon icon="user" />
            </ve-avatar>
          </div>

          <div>
            <ve-avatar class="gradient">E</ve-avatar>
            With CSS
          </div>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text v-model="src" label="src" />
          </li>
          <li>
            <ve-input-text v-model="alt" label="alt" />
          </li>
          <li>
            <ve-input-text v-model="label" label="label" />
          </li>
          <li>
            <ve-input-text v-model="color" label="color" />
          </li>
          <li>
            <ve-input-text v-model="size" label="size" />
          </li>
          <li>
            <ve-input-text v-model="fontSize" label="fontSize" />
          </li>
          <li>
            <ve-input-switch v-model="tile">Tile</ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <ve-input-text v-model="content" label="default" />
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

import VeAvatar from "@/components/Avatar";
import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputText from "@/components/Input/Text";
import VeInputSwitch from "@/components/Input/Switch";
import VeRow from "@/components/Grid/Row";

library.add(faUser);

export default {
  name: "ViewComponentAvatar",

  components: {
    FontAwesomeIcon,
    VeAvatar,
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeInputText,
    VeInputSwitch,
    VeRow
  },

  data() {
    return {
      title: "VeAvatar",
      version: "v1.0.0",
      content: "A",
      src: "https://vuejs.org/images/logo.png",
      alt: "avatar",
      label: "avatar label",
      color: "#2AAC8D",
      size: null,
      fontSize: null,
      tile: false
    };
  },

  computed: {
    code() {
      return `<ve-avatar
  :color="string"
  :label="string"
  :tile="boolean"
  :size="string"
  :font-size="string"
/>

<ve-avatar :src="string" :alt="string" />
<ve-avatar :class="{ gradient: true }">E</ve-avatar>
<ve-avatar class="gradient">E</ve-avatar>

<style>
.gradient {
   background-image: linear-gradient(#e66465, #9198e5);
}
</style>
`;
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

  .gradient {
    background-image: linear-gradient(#e66465, #9198e5);
  }
}
</style>

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
          <!-- component -->
          <ve-drawer
            v-model="open"
            :position="position"
            :backdrop="backdrop"
            :backdrop-opacity="backdropOpacity"
            :backdrop-speed="backdropSpeed"
            :collapsed="collapsed"
            :right="right"
            :width="width"
          >
            <div slot="drawer">Drawer</div>
            <div slot="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                blanditiis animi, error iusto culpa eveniet, delectus facere
                inventore. Aperiam eligendi temporibus et enim nesciunt, earum
                distinctio? Praesentium recusandae quos molestias!
              </p>

              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Soluta, eius optio? Ipsa consequatur magni, esse ducimus vel
                minima perspiciatis iure excepturi vero nesciunt tenetur harum
                maxime placeat laboriosam molestias eaque!
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam minus maiores eos debitis velit delectus natus quam
                culpa porro nihil deserunt nam laudantium, facere aperiam ut non
                laboriosam maxime dolorem?
              </p>
            </div>
          </ve-drawer>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <!-- properties -->
            <ve-input-switch v-model="open">v-model</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="backdrop">backdrop</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="right">right</ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="collapsed">collapsed</ve-input-switch>
          </li>
          <li>
            <ve-input-text
              v-model.number="backdropOpacity"
              label="backdrop-opacity"
            />
          </li>
          <li>
            <ve-input-text
              v-model.number="backdropSpeed"
              label="backdrop-speed"
            />
          </li>
          <li>
            <ve-input-text v-model.number="width" label="width (%)" />
          </li>
          <li>
            <select v-model="position">
              <option v-for="pos in positions" :key="pos">{{ pos }}</option>
            </select>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
          <li>
            <!-- events -->
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Slots</h2>

        <ul>
          <li>
            <!-- slots -->
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
import VeDrawer from "@/components/Drawer";
import VeRow from "@/components/Grid/Row";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputText from "@/components/Input/Text";
import { positions } from "@/components/Drawer/types";

export default {
  name: "ViewComponentDivider",

  components: {
    VeBlueprint,
    VeCode,
    VeCol,
    VeDivider,
    VeDrawer,
    VeInputSwitch,
    VeInputText,
    VeRow
  },

  data() {
    return {
      title: "Drawer",
      version: "v1.0.0",
      positions,
      open: false,
      position: positions[0],
      backdrop: false,
      backdropOpacity: 0.6,
      backdropSpeed: 300,
      collapsed: false,
      right: false,
      width: 36
    };
  },

  computed: {
    code() {
      return ``;
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

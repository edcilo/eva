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
        <strong>value: </strong>
        <code>{{ value }}</code>

        <ve-blueprint>
          <ve-input-checkbox
            v-model="value"
            :name="name"
            :id="id"
            :checked="checked"
            :disabled="disabled"
            :true-value="trueValue"
            :false-value="falseValue"
            @change="onChange"
          >
            {{ content }}
          </ve-input-checkbox>
        </ve-blueprint>

        <!--prettier-ignore -->
        <ve-code lang="html">{{ code }}</ve-code>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-input-text v-model="id" label="id" />
          </li>
          <li>
            <ve-input-text v-model="name" label="name" />
          </li>
          <li>
            <ve-input-text v-model="trueValue" label="trueValue" />
          </li>
          <li>
            <ve-input-text v-model="falseValue" label="falseValue" />
          </li>
          <li>
            <ve-input-switch v-model="checked">
              checked
            </ve-input-switch>
          </li>
          <li>
            <ve-input-switch v-model="disabled">
              disabled
            </ve-input-switch>
          </li>
        </ul>

        <ve-divider class="component__divider" />

        <h2>Eventos</h2>

        <ul>
          <li>
            <strong>onChange: </strong>
            <code v-show="eventChange">emitted</code>
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
import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputCheckbox from "@/components/Input/Checkbox";
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
    VeInputCheckbox,
    VeInputSwitch,
    VeInputText,
    VeRow
  },

  data() {
    return {
      title: "VeInputCheckbox",
      version: "v1.0.0",
      content: "Label",
      checked: false,
      disabled: false,
      id: "custom-id",
      name: "custom-name",
      value: null,
      trueValue: "check",
      falseValue: "uncheck",
      eventChange: false
    };
  },

  computed: {
    code() {
      return `<ve-input-checkbox
  v-model="any"
  :name="string"
  :id="string"
  :checked="boolean"
  :disabled="boolean"
  :true-value="any"
  :false-value="any"
  @change="function"
>
  content
</ve-input-checkbox>`;
    }
  },

  methods: {
    onChange() {
      this.eventChange = true;
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

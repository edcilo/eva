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
      <ve-col size="md-12" class="component__blueprint">
        Agregar las propiedades readonly y disabled

        <ve-divider />

        Lorem ipsum:
        <ve-input-checkbox
          v-model="check"
          :checked="true"
          :disabled="false"
          id="checkbox-1-id"
          name="checkbox-1-field"
          :true-value="1"
          :false-value="0"
        >
          Checkbox
        </ve-input-checkbox>

        {{ check }} |

        <ve-input-radio
          v-model="radio"
          :checked="true"
          :disabled="false"
          :value="1"
          id="radio-1-id"
          name="radio-1-field"
        >
          Radio 1
        </ve-input-radio>

        <ve-input-radio
          v-model="radio"
          :checked="false"
          :disabled="false"
          :value="2"
          id="radio-2-id"
          name="radio-1-field"
        >
          Radio 2
        </ve-input-radio>

        {{ radio }} | Rating:

        <ve-input-rating v-model="rating" :length="6" :readonly="false">
          <font-awesome-icon icon="star" />
        </ve-input-rating>

        {{ rating }} stars |

        <ve-input-switch
          v-model="switchVal"
          :checked="false"
          :disabled="false"
          id="switch-id"
          name="switch-field"
          :true-value="1"
          :false-value="2"
        >
          Switch
        </ve-input-switch>

        {{ switchVal }}

        Lorem ipsum

        <ve-divider />

        lorem

        <ve-input-text
          v-model="textVal"
          :autocomplete="false"
          :autofocus="false"
          :block="false"
          :btn-clear="true"
          :disabled="false"
          helper-text="Helper text"
          id="input-text-id"
          label="Input text"
          name="input-text-name"
          placeholder="Placeholder"
          :readonly="false"
          type="primary"
        >
          <font-awesome-icon slot="icon" icon="star" />
          <font-awesome-icon slot="rightIcon" icon="heart" />
        </ve-input-text>

        <ve-input-password
          v-model="passwordVal"
          :autocomplete="false"
          :autofocus="false"
          :block="false"
          :btn-clear="true"
          :btn-show="true"
          :disabled="false"
          helper-text="Helper text"
          id="input-password-id"
          label="Input password"
          name="input-password-name"
          placeholder="Placeholder"
          :readonly="false"
          type="primary"
        >
          <font-awesome-icon slot="icon" icon="star" />
          <font-awesome-icon slot="rightIcon" icon="heart" />
        </ve-input-password>

        <ve-input-number
          v-model="numberVal"
          :autocomplete="false"
          :autofocus="false"
          :block="false"
          :btn-clear="true"
          :controls="true"
          :disabled="false"
          helper-text="Herlper text"
          id="input-number-id"
          :inputtable="true"
          label="Input number"
          :max="1000"
          :min="900"
          name="input-number-name"
          placeholder="Placeholder"
          :readonly="false"
          :step="10"
          type="primary"
        >
          <font-awesome-icon slot="icon" icon="user" />
          <font-awesome-icon slot="rightIcon" icon="heart" />
        </ve-input-number>

        <ve-input-textarea
          v-model="textareaVal"
          :autofocus="false"
          :block="false"
          :cols="20"
          :counter="true"
          :counter-warning="25"
          :counter-danger="10"
          :disabled="false"
          helper-text="Helper text"
          id="input-textarea-id"
          label="Input textarea"
          :max="120"
          name="input-textarea-name"
          placeholder="Placeholder"
          :readonly="false"
          :rows="3"
          type="primary"
        />

        <ve-input-credit-card
          v-model="creditCardVal"
          :autocomplete="false"
          :autofocus="true"
          :block="false"
          :btn-clear="true"
          cvc-name="cvc-input-name"
          cvc-placeholder="CVC"
          date-name="date-input-name"
          date-placeholder="MM / YY"
          :disabled="false"
          helper-text="Helper text"
          id="credit-card-id"
          label="Input credit-card"
          name="credit-card-name"
          placeholder="Card Number"
          :readonly="false"
          type="primary"
        >
          <font-awesome-icon slot="icon" icon="star" />
          <font-awesome-icon slot="rightIcon" icon="heart" />
        </ve-input-credit-card>

        <ve-select
          v-model="select"
          :options="options"
          :block="false"
          :btn-clear="true"
          :disabled="false"
          helper-text="lorem ipsum"
          id="my-select"
          label="select"
          name="my-aws-select"
          placeholder="Placeholder"
          :readonly="false"
          type="primary"
        >
          <font-awesome-icon slot="icon" icon="star" />
        </ve-select>

        ipsum, lorem ipsum dolor sit amet consectetur idiapiscing elit

        <ve-divider />

        <ve-input-checkbox>
          Checkbox
        </ve-input-checkbox>

        <ve-input-radio>
          Radio
        </ve-input-radio>

        <ve-input-switch>
          Switch
        </ve-input-switch>

        <ve-input-rating>
          <font-awesome-icon icon="star" />
        </ve-input-rating>

        <ve-input-text />

        <ve-input-password />

        <ve-input-number label="number" />

        <ve-input-credit-card label="credit-card" />

        <ve-input-textarea label="textarea" />

        <ve-select label="select" :options="options" />

        <ve-divider />

        <ul>
          <li>
            <ve-input-checkbox>
              Checkbox
            </ve-input-checkbox>
          </li>
          <li>
            <ve-input-radio>
              Radio
            </ve-input-radio>
          </li>
          <li>
            <ve-input-switch>
              Switch
            </ve-input-switch>
          </li>
          <li>
            <ve-input-rating>
              <font-awesome-icon icon="star" />
            </ve-input-rating>
          </li>
          <li>
            <ve-input-text label="text" />
          </li>
          <li>
            <ve-input-password label="password" />
          </li>
          <li>
            <ve-input-number label="number" />
          </li>
          <li>
            <ve-input-credit-card label="credit-card" />
          </li>
          <li>
            <ve-input-textarea label="textarea" />
          </li>
          <li>
            <ve-select label="select" :options="options" />
          </li>
        </ul>
      </ve-col>

      <ve-col size="md-4" class="component__props">
        ...
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faStar, faUser } from "@fortawesome/free-solid-svg-icons";

import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeDivider from "@/components/Divider";
import VeInputCheckbox from "@/components/Input/Checkbox";
import VeInputCreditCard from "@/components/Input/CreditCard";
import VeInputNumber from "@/components/Input/Number";
import VeInputPassword from "@/components/Input/Password";
import VeInputRadio from "@/components/Input/Radio";
import VeInputRating from "@/components/Input/Rating";
import VeInputSwitch from "@/components/Input/Switch";
import VeInputText from "@/components/Input/Text";
import VeInputTextarea from "@/components/Input/Textarea";
import VeRow from "@/components/Grid/Row";
import VeSelect from "@/components/Input/Select";

library.add(faHeart, faStar, faUser);

export default {
  name: "ViewComponentDivider",

  components: {
    FontAwesomeIcon,
    VeCol,
    VeDivider,
    VeInputCheckbox,
    VeInputCreditCard,
    VeInputNumber,
    VeInputPassword,
    VeInputRadio,
    VeInputRating,
    VeInputSwitch,
    VeInputText,
    VeInputTextarea,
    VeRow,
    VeSelect
  },

  data() {
    return {
      title: "VeInputs",
      version: "v1.0.0",
      check: false,
      radio: false,
      rating: 2,
      switchVal: false,
      textVal: "Hello world!",
      passwordVal: "secret",
      numberVal: 962,
      textareaVal: "Hello world!",
      creditCardVal: {
        type: null,
        number: "1234123412341234",
        month: null,
        year: null,
        cvc: null
      },
      select: null,
      options: ["foo", { value: "bar", label: "BAR" }, "zoo"]
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

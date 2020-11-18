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
        <h5>
          Simple
        </h5>
        <div>
          Enable or disable card:
          <ve-switch v-model="disabled">{{
            disabled ? "disabled" : "enabled"
          }}</ve-switch>
        </div>
        <ve-blueprint>
          <ve-row>
            <ve-card :disabled="disabled" @click="onClick">
              <h1 slot="header">Eva Green</h1>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto atque commodi dolore explicabo iure neque, nisi
              praesentium quo ut. Autem dignissimos eaque expedita magnam nobis
              numquam placeat quo saepe sapiente!
            </ve-card>
          </ve-row>
        </ve-blueprint>
        <ve-code lang="html">{{ codeSimple }}</ve-code>

        <ve-divider></ve-divider>
        <h5>
          With Actions
        </h5>
        <div>
          Enable or disable card:
          <ve-switch v-model="disabled">{{
            disabled ? "disabled" : "enabled"
          }}</ve-switch>
        </div>
        <ve-blueprint>
          <ve-row>
            <ve-card :disabled="disabled" @click="onClick">
              <div slot="header">
                <h1>Eva Green</h1>
                <h5>Subtitle</h5>
              </div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto atque commodi dolore explicabo iure neque, nisi
              praesentium quo ut. Autem dignissimos eaque expedita magnam nobis
              numquam placeat quo saepe sapiente!
              <ve-button slot="footer">ACCEPT</ve-button>
            </ve-card>
          </ve-row>
        </ve-blueprint>
        <ve-code lang="html">{{ codeActions }}</ve-code>

        <ve-divider></ve-divider>
        <h5>
          With Cover
        </h5>
        <div>
          Enable or disable card:
          <ve-switch v-model="disabled">{{
            disabled ? "disabled" : "enabled"
          }}</ve-switch>
        </div>
        <ve-blueprint>
          <ve-row>
            <ve-card :disabled="disabled" @click="onClick">
              <ve-image slot="cover" :src="src" :alt="'text'" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              aperiam atque consequuntur dolorum ea fugiat iste iusto
              perferendis repudiandae sint? Ad animi culpa, eius eligendi hic
              iure obcaecati porro! Ea?
            </ve-card>
          </ve-row>
        </ve-blueprint>
        <ve-code lang="html">{{ codeCover }}</ve-code>

        <ve-divider></ve-divider>
        <h5>
          Compose (a complex card example)
        </h5>
        <div>
          Enable or disable card:
          <ve-switch v-model="disabled">{{
            disabled ? "disabled" : "enabled"
          }}</ve-switch>
        </div>
        <ve-blueprint>
          <ve-row>
            <ve-card :disabled="disabled" @click="onClick">
              <ve-image slot="cover" :src="src" :alt="'text'" />
              <div slot="header"><h1>Picture</h1></div>
              <ve-item slot="raw">
                <strong>Ve-Item</strong><br />
                <span class="text-sm">feedma</span>

                <ve-avatar slot="visual" label="E" />
                <ve-button slot="control" type="text" size="sm">
                  <font-awesome-icon icon="calendar" />
                </ve-button>
              </ve-item>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              aperiam atque consequuntur dolorum ea fugiat iste iusto
              perferendis repudiandae sint? Ad animi culpa, eius eligendi hic
              iure obcaecati porro! Ea?
              <ve-panel slot="footer">
                <ve-row>
                  <ve-col>
                    <ve-button type="light" btn-style="block">CANCEL</ve-button>
                  </ve-col>
                  <ve-col>
                    <ve-button btn-style="block">SEE PROFILE</ve-button>
                  </ve-col>
                </ve-row>
              </ve-panel>
            </ve-card>
          </ve-row>
        </ve-blueprint>
        <ve-code lang="html">{{ codeCompose }}</ve-code>

        <ve-divider></ve-divider>
        <h5>Strict mode <ve-switch v-model="strict">strict</ve-switch></h5>
        <div>
          By default <strong>false</strong>: this renders the slots in the same
          order that they were coded. This provide more flexibility for compose
          complex cards. If set strict as <strong>true</strong>
          then is rendered keeping the syntactic order defined by the card
          component:
          <ul>
            <li>- header</li>
            <li>- cover</li>
            <li>- raw</li>
            <li>- default</li>
            <li>- footer</li>
          </ul>
        </div>
        <ve-blueprint>
          <ve-row>
            <ve-card :strict="strict">
              <ve-panel slot="footer">
                <ve-row>
                  <ve-col>
                    <ve-button type="light" btn-style="block">CANCEL</ve-button>
                  </ve-col>
                  <ve-col>
                    <ve-button btn-style="block">SEE PROFILE</ve-button>
                  </ve-col>
                </ve-row>
              </ve-panel>
              <div slot="header"><h1>Picture</h1></div>
              <ve-item slot="raw">
                <strong>Ve-Item</strong><br />
                <span class="text-sm">feedma</span>

                <ve-avatar slot="visual" label="E" />
                <ve-button slot="control" type="text" size="sm">
                  <font-awesome-icon icon="calendar" />
                </ve-button>
              </ve-item>
              <ve-image slot="cover" :src="src" :alt="'text'" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              aperiam atque consequuntur dolorum ea fugiat iste iusto
              perferendis repudiandae sint? Ad animi culpa, eius eligendi hic
              iure obcaecati porro! Ea?
            </ve-card>
          </ve-row>
        </ve-blueprint>
        <ve-code lang="html">{{ codeComposeOrder }}</ve-code>
      </ve-col>
      <ve-col size="md-4" class="component__props">
        <h2>Propiedades</h2>

        <ul>
          <li>
            <ve-switch v-model="disabled"><strong>disabled</strong></ve-switch>
          </li>
          <li>
            <ve-switch v-model="strict"><strong>strict</strong></ve-switch>
            Enable or disable the ability to sort slots from code (see example
            below)
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
            <ve-code lang="bash" :inline="true">header</ve-code>
            For header content (has padding)
          </li>
          <li>
            <ve-code lang="bash" :inline="true">cover</ve-code>
            For use with images mainly (has not padding)
          </li>
          <li>
            <ve-code lang="bash" :inline="true">raw</ve-code>
            For avoid elements with side paddings (has not padding)
          </li>
          <li>
            <ve-code lang="bash" :inline="true">footer</ve-code>
            For footer content (has padding)
          </li>
        </ul>
      </ve-col>
    </ve-row>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import VeBlueprint from "@/components/Blueprint";
import VeCode from "@/components/Code";
import VeCol from "@/components/Grid/Col";
import VeRow from "@/components/Grid/Row";
import VeCard from "@/components/Card";
import VePanel from "@/components/Panel";
import VeImage from "@/components/Image";
import VeItem from "../../../components/Item";
import VeAvatar from "../../../components/Avatar";
import VeButton from "../../../components/Button";
import VeDivider from "../../../components/Divider";
import VeSwitch from "../../../components/Input/Switch";

library.add(faCalendar);

export default {
  name: "ViewComponentDivider",

  components: {
    FontAwesomeIcon,
    VeSwitch,
    VeDivider,
    VeBlueprint,
    VeCode,
    VeCol,
    VeRow,
    VeButton,
    VeAvatar,
    VeItem,
    VeImage,
    VeCard,
    VePanel
  },

  data() {
    return {
      title: "VeCard",
      version: "v1.0.0",
      disabled: false,
      strict: false,
      clicked: false
    };
  },

  methods: {
    onClick() {
      this.clicked = true;
      setTimeout(() => (this.clicked = false), 500);
    }
  },

  computed: {
    codeSimple() {
      return `<ve-card :disabled="disabled" @click="onClick">
  <h1 slot="header">Eva Green</h1>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Architecto atque commodi dolore explicabo iure neque, nisi
  praesentium quo ut. Autem dignissimos eaque expedita magnam nobis
  numquam placeat quo saepe sapiente!
</ve-card>`;
    },

    codeActions() {
      return `<ve-card :disabled="disabled" @click="onClick">
<div slot="header">
  <h1>Eva Green</h1>
  <h5>Subtitle</h5>
</div>
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Architecto atque commodi dolore explicabo iure neque, nisi
praesentium quo ut. Autem dignissimos eaque expedita magnam nobis
numquam placeat quo saepe sapiente!
  <ve-button slot="footer">ACCEPT</ve-button>
</ve-card>`;
    },
    codeCover() {
      return `<ve-card :disabled="disabled" @click="onClick">
  <ve-image slot="cover" :src="src" :alt="'text'" />
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
  aperiam atque consequuntur dolorum ea fugiat iste iusto
  perferendis repudiandae sint? Ad animi culpa, eius eligendi hic
  iure obcaecati porro! Ea?
</ve-card>`;
    },
    codeCompose() {
      return `<ve-card :disabled="disabled" @click="onClick">
  <ve-image slot="cover" :src="src" :alt="'text'" />
  <div slot="header"><h1>Picture</h1></div>
  <ve-item slot="raw">
    <strong>Ve-Item</strong><br />
    <span class="text-sm">feedma</span>

    <ve-avatar slot="visual" label="E" />
    <ve-button slot="control" type="text" size="sm">
      <font-awesome-icon icon="calendar" />
    </ve-button>
  </ve-item>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
  aperiam atque consequuntur dolorum ea fugiat iste iusto
  perferendis repudiandae sint? Ad animi culpa, eius eligendi hic
  iure obcaecati porro! Ea?
  <ve-panel slot="footer">
    <ve-row>
      <ve-col>
        <ve-button type="light" btn-style="block">CANCEL</ve-button>
      </ve-col>
      <ve-col>
        <ve-button btn-style="block">SEE PROFILE</ve-button>
      </ve-col>
    </ve-row>
  </ve-panel>
</ve-card>`;
    },

    codeComposeOrder() {
      return `<ve-card :strict="strict" @click="onClick">
  <ve-panel slot="footer">
    <!-- Render first if strict mode is disabled-->
    <ve-row>
      <ve-col>
        <ve-button type="light" btn-style="block">CANCEL</ve-button>
      </ve-col>
      <ve-col>
        <ve-button btn-style="block">SEE PROFILE</ve-button>
      </ve-col>
    </ve-row>
  </ve-panel>

    <!-- Render after footer if strict mode is disabled-->
  <div slot="header"><h1>Picture</h1></div>

    <!-- Render after header if strict mode is disabled-->
  <ve-item slot="raw">
    <strong>Ve-Item</strong><br />
    <span class="text-sm">feedma</span>

    <ve-avatar slot="visual" label="E" />
    <ve-button slot="control" type="text" size="sm">
      <font-awesome-icon icon="calendar" />
    </ve-button>
  </ve-item>

  <!-- Render after raw if strict mode is disabled-->
  <ve-image slot="cover" :src="src" :alt="'text'" />

  <!-- Render after cover if strict mode is disabled-->
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
  aperiam atque consequuntur dolorum ea fugiat iste iusto
  perferendis repudiandae sint? Ad animi culpa, eius eligendi hic
  iure obcaecati porro! Ea?
</ve-card>`;
    },
    src() {
      return !this.error
        ? require("@/assets/images/examples/00.jpg")
        : "http://feedma.com/image/not-found";
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

.ve-card {
  width: 500px;
}
</style>

<template>
  <footer class="footer">
    <ve-container :fluid="fluid">
      <ve-row>
        <ve-col class="footer__rights">
          Feedma 2020 | {{ $t("home.designedWith") }}
          <font-awesome-icon icon="heart" />
        </ve-col>

        <ve-col class="footer__locale">
          <partial-dark-mode />

          <partial-lang />
        </ve-col>
      </ve-row>
    </ve-container>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import PartialLang from "@/views/partials/lang.vue";
import PartialDarkMode from "@/views/partials/darkMode.vue";
import VeCol from "@/components/Grid/Col";
import VeContainer from "@/components/Grid/Container";
import VeRow from "@/components/Grid/Row";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);

@Component({
  name: "ViewPartialFooter",
  components: {
    FontAwesomeIcon,
    PartialLang,
    PartialDarkMode,
    VeCol,
    VeContainer,
    VeRow
  }
})
export default class ViewPartialFooter extends Vue {
  @Prop({ type: Boolean, default: false })
  fluid!: boolean;
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.footer {
  background: #1f2026;
  padding: $padding-base 0;
  color: #656d7a;
  font-size: $font-sm;

  &__locale {
    text-align: right;

    &-group {
      margin: 0;
      width: auto;
    }
  }
}
</style>

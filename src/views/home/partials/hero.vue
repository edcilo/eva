<template>
  <ve-hero class="hero" :height="100">
    <ve-container>
      <div class="hero__content">
        <h1 class="hero__title">{{ title }}</h1>

        <p class="hero__subtitle">Vue.js framework</p>
      </div>
    </ve-container>
  </ve-hero>
</template>

<script lang="ts">
import config from "@/config";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import VeContainer from "@/components/Grid/Container";
import VeHero from "@/components/Hero";

@Component({
  name: "ViewPartialHero",
  components: { VeContainer, VeHero }
})
export default class ViewPartialHero extends Vue {
  protected title: string = config("app.name");
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.hero {
  background: transparent;
  display: flex;

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $padding-base 70px;
  }

  &__title {
    margin: 0;
    color: $c-primary;
    font-family: $font-family-monospace;
    font-size: $font-5xl * 2;
    font-weight: $fw-light;
    line-height: 1;
    text-transform: uppercase;
  }

  &__subtitle {
    font-family: $font-family-monospace;
    font-size: $font-lg;
    color: #6d7783;
  }
}
</style>

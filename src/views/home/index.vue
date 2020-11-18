<template>
  <landing-layout>
    <partial-hero />
  </landing-layout>
</template>

<script lang="ts">
// @ is an alias to /src
import config from "@/config";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import LandingLayout from "@/layouts/landing.vue";
import PartialHero from "@/views/home/partials/hero.vue";

@Component({
  name: "ViewHome",
  components: {
    LandingLayout,
    PartialHero
  },
  metaInfo() {
    const title: string = config("app.name");

    return {
      title: title,
      meta: [{ name: "description", content: "EVA - Vue.js framework" }]
    };
  }
})
export default class ViewHome extends Vue {}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";
</style>

<template>
  <section class="home">
    <partial-header />

    <slot />

    <partial-footer />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import PartialFooter from "@/views/partials/footer.vue";
import PartialHeader from "@/views/partials/header.vue";

@Component({
  name: "LandingLayout",
  components: {
    PartialFooter,
    PartialHeader
  }
})
export default class LandingLayout extends Vue {}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";
</style>

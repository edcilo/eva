<template>
  <div class="dark-mode">
    Dark mode
    <ve-input-switch
      v-model="switchVal"
      :checked="darkMode"
      @change="toggleDarkMode(!darkMode)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import VeInputSwitch from "@/components/Input/Switch";

const app = namespace("app");

@Component({
  name: "ViewpartialLang",
  components: {
    VeInputSwitch
  }
})
export default class ViewPartialLang extends Vue {
  public switchVal = false;

  @app.State
  protected darkMode!: boolean;

  @app.Mutation
  protected setDarkmode!: Function;

  protected toggleDarkMode(darkMode: boolean) {
    this.setDarkmode(darkMode);
  }
}
</script>

<style scoped>
.dark-mode {
  display: inline;
}
</style>

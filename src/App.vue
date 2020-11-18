<template>
  <div id="app" :class="className">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from "vue-property-decorator";
import {Route} from "vue-router";

@Component({
  name: "App"
})
export default class App extends Vue {
  protected className: string | null = null;

  @Watch("$route", {immediate: true})
  onRoutehanged(to: Route) {
    this.className = to.name || null;
  }
}
</script>

<style lang="scss">
@import "src/styles/main";
</style>

<template>
  <dashboard-layout>
    <template slot="header-title">
      Title
    </template>

    <template slot="header-nav">
      Nav
    </template>

    <template slot="sidebar">
      sidebar
    </template>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
      exercitationem explicabo fugiat itaque dolor deleniti dignissimos
      laudantium labore, dolores suscipit, mollitia esse! Aliquam quo officiis
      itaque voluptatum laboriosam eius, deserunt.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
      exercitationem explicabo fugiat itaque dolor deleniti dignissimos
      laudantium labore, dolores suscipit, mollitia esse! Aliquam quo officiis
      itaque voluptatum laboriosam eius, deserunt.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
      exercitationem explicabo fugiat itaque dolor deleniti dignissimos
      laudantium labore, dolores suscipit, mollitia esse! Aliquam quo officiis
      itaque voluptatum laboriosam eius, deserunt.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
      exercitationem explicabo fugiat itaque dolor deleniti dignissimos
      laudantium labore, dolores suscipit, mollitia esse! Aliquam quo officiis
      itaque voluptatum laboriosam eius, deserunt.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
      exercitationem explicabo fugiat itaque dolor deleniti dignissimos
      laudantium labore, dolores suscipit, mollitia esse! Aliquam quo officiis
      itaque voluptatum laboriosam eius, deserunt.
    </p>
  </dashboard-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import DashboardLayout from "@/layouts/dashboard.vue";

@Component({
  name: "DashboardView",
  components: {
    DashboardLayout
  }
})
export default class DashboardView extends Vue {}
</script>

<style lang="scss">
@import "src/styles/helpers/variables";
</style>

<template>
  <ve-drawer
    :collapsed="drawerCollapsed"
    :value="drawerOpened"
    :position="drawerPosition"
    :backdrop="drawerBackdrop"
    :width="drawerWidth"
    @backdrop-click="closeNavDashboard"
  >
    <template slot="content">
      <ve-header class="dashboard__header" :fluid="mdScreen" cols="40% 20% 40%">
        <div slot="left" class="dashboard__header-l">
          <ve-button
            class="dashboard__sidebar-btn"
            type="text"
            @click="toggleNavDashboardExpanded"
          >
            <font-awesome-icon icon="bars" />
          </ve-button>

          <h1 class="dashboard__header-title">
            <slot name="header-title" />
          </h1>
        </div>

        <div slot="center" class="dashboard__header-c">
          <router-link slot="left" :to="{ name: 'home' }">
            <img
              v-show="mdScreen"
              class="dashboard__logo-img"
              src="@/assets/images/feedma/logo-icon.svg"
              alt="logo"
              width="16px"
            />
          </router-link>
        </div>

        <div slot="right" class="dashboard__header-r">
          <slot name="header-nav" />
        </div>
      </ve-header>

      <div class="dashboard__content">
        <ve-container :fluid="mdScreen">
          <slot />
        </ve-container>

        <partial-footer :fluid="mdScreen" />
      </div>
    </template>

    <template slot="drawer">
      <ve-header
        class="dashboard__header dashboard__header-sidebar"
        v-show="!mdScreen"
      >
        <div slot="center" class="dashboard__header-c">
          <router-link slot="left" :to="{ name: 'home' }">
            <img
              v-show="drawerCollapsed"
              class="dashboard__logo-img"
              src="@/assets/images/feedma/logo-icon.svg"
              alt="logo"
              width="16px"
            />
            <img
              v-show="!drawerCollapsed"
              class="dashboard__logo-img"
              src="@/assets/images/feedma/logo.svg"
              alt="logo"
              width="80px"
            />
          </router-link>
        </div>
      </ve-header>

      <div :class="sidebarClass">
        <slot name="sidebar" />
      </div>
    </template>
  </ve-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import VeButton from "@/components/Button";
import VeContainer from "@/components/Grid/Container";
import VeHeader from "@/components/Header";
import VeDrawer from "@/components/Drawer";

import PartialFooter from "@/views/partials/footer.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
library.add(faBars);

const app = namespace("app");

@Component({
  name: "DashboardLayout",
  components: {
    FontAwesomeIcon,
    PartialFooter,
    VeButton,
    VeContainer,
    VeDrawer,
    VeHeader
  }
})
export default class DashboardLayout extends Vue {
  protected mdScreen = false;

  @app.State
  protected navDashboardExpanded!: boolean;

  @app.Mutation
  protected toggleNavDashboardExpanded!: Function;

  @app.Mutation
  protected closeNavDashboard!: Function;

  get drawerBackdrop(): boolean {
    return this.mdScreen;
  }

  get drawerCollapsed(): boolean {
    return !this.mdScreen && this.navDashboardExpanded;
  }

  get drawerOpened(): boolean {
    return this.mdScreen ? this.navDashboardExpanded : true;
  }

  get drawerPosition(): string {
    return this.mdScreen ? "absolute" : "relative";
  }

  get drawerWidth(): number {
    return this.mdScreen ? 73 : 20;
  }

  get sidebarClass(): Array<string> {
    const classes = ["dashboard__sidebar-content"];

    if (this.mdScreen) {
      classes.push("md-screen");
    }

    return classes;
  }

  windowResize(): void {
    const mdScreen = 767;

    if (window.innerWidth > mdScreen) {
      this.mdScreen = false;
    } else {
      this.mdScreen = true;
    }
  }

  protected mounted(): void {
    this.windowResize();
    window.addEventListener("resize", this.windowResize);
  }

  protected beforeDestroy(): void {
    window.removeEventListener("resize", this.windowResize);
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

$header-height: 50px;

.dashboard {
  &__header,
  &__logo {
    background: $c-white;
    border-bottom: 1px solid $c-gray-light;
    color: $c-gray-darker;
    font-size: $font-base;
    font-weight: $fw-base;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;

    .md & {
      border: none;
      padding: $padding-sm;
    }
  }

  &__header {
    position: absolute;

    .md & {
      background: $c-gray-lightest;
    }

    &-l {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &-c {
      text-align: center;
    }

    &-r {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &-sidebar {
      height: $header-height + 1px;
    }

    &-title {
      margin: 0;
      font-size: $font-base;
      font-weight: $fw-base;
      line-height: 1.6;
    }
  }

  &__sidebar {
    border-right: 1px solid $c-gray-light;

    .md & {
      border: none;
      background: $c-gray-darker;
      color: $c-white;
    }

    &-btn {
      margin-right: $margin-base;
      padding: $padding-sm;
    }

    &-content {
      width: 100%;
      height: 100%;
      padding-top: $header-height;
      overflow: auto;

      &.md-screen {
        padding-top: 0;
      }
    }
  }

  &__container {
    background: $c-gray-lighter;
  }

  &__content {
    height: 100%;
    padding-top: $header-height;
    overflow: auto;
    background: $c-gray-lightest;
  }

  &__footer {
  }
}
</style>

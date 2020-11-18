<template>
  <ve-header
    class="app__header"
    :class="{ visible: visible || !headerFixed }"
    :fixed="headerFixed"
    areas="left center right"
  >
    <router-link slot="left" :to="{ name: 'home' }">
      <img
        class="app__header-logo"
        src="@/assets/images/feedma/logo.svg"
        alt="logo"
        width="60px"
      />
    </router-link>

    <ve-nav slot="right" class="app__menu">
      <router-link class="app__menu-link" :to="{ name: 'components' }">
        {{ $t("nav.components") | capitalize }}
      </router-link>
    </ve-nav>
  </ve-header>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { namespace } from "vuex-class";

import VeNav from "@/components/Nav";
import VeHeader from "@/components/Header";

const app = namespace("app");

@Component({
  name: "HeaderPartial",
  components: { VeNav, VeHeader }
})
export default class HeaderPartial extends Vue {
  protected visible = false;

  protected size = 200;

  @Watch("$route", { immediate: true })
  onRouteChanged(to: Route) {
    this.fixHeader(to.name === "home");
  }

  @app.State
  protected headerFixed!: boolean;

  @app.Mutation
  protected fixHeader!: Function;

  getCurrentScroll(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  setVisible(): void {
    window.onscroll = () => {
      const scroll = this.getCurrentScroll();
      this.visible = scroll >= this.size;
    };
  }

  mounted(): void {
    this.fixHeader(this.$route.name === "home");
    this.setVisible();
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/main";

.app__header {
  transition: background 0.3s;
  background: transparent;

  &.visible {
    background: $c-white;
    border-bottom: 1px solid $c-gray-lighter;
    box-shadow: $box-shadow-sm;
  }

  &-logo {
    height: auto;
    width: 90px;
  }
}

.app__menu {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &-link {
    display: block;
    padding: $padding-sm;
    color: $c-teal-dark;

    &:hover {
      color: $c-teal-light;
      text-decoration: none;
      transition: color 0.3s;
    }

    &.router-link-active {
      font-weight: $fw-bold;
    }
  }
}
</style>

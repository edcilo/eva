<template>
  <dashboard-layout>
    <template slot="header-title">
      {{ $t("dictionary.components") | capitalize }}
    </template>

    <ve-nav slot="sidebar" :vertical="true">
      <router-link
        v-for="link in componentsLinks"
        :key="link.name"
        class="components__sidebar-link"
        :to="{ name: link.name }"
      >
        {{ link.label }}
      </router-link>

      <ve-divider class="components__sidebar-divider" />

      <router-link
        v-for="link in stylesLinks"
        :key="link.name"
        class="components__sidebar-link"
        :to="{ name: link.name }"
      >
        {{ link.label }}
      </router-link>
    </ve-nav>

    <div class="components__content">
      <router-view />
    </div>
  </dashboard-layout>
</template>

<script lang="ts">
import config from "@/config";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import i18n from "@/lang";
import capitalize from "@/filters/capitalize";
import DashboardLayout from "@/layouts/dashboard.vue";
import VeDivider from "@/components/Divider";
import VeNav from "@/components/Nav";

@Component({
  name: "ViewComponents",
  components: {
    DashboardLayout,
    VeDivider,
    VeNav
  },
  metaInfo() {
    const appName: string = config("app.name");
    const appSection: string = capitalize(i18n.t("nav.components"));

    return {
      title: `${appName} - ${appSection}`
    };
  }
})
export default class ViewComponents extends Vue {
  protected componentsLinks = [
    {
      id: "alert",
      label: "Alert",
      name: "components.alert"
    },
    {
      id: "app-bar-bottom",
      label: "AppBarBottom",
      name: "components.appBarBottom"
    },
    {
      id: "avatar",
      label: "Avatar",
      name: "components.avatar"
    },
    {
      id: "banner",
      label: "Banner",
      name: "components.banner"
    },
    {
      id: "button",
      label: "Button",
      name: "components.button"
    },
    {
      id: "button-group",
      label: "Button Group",
      name: "components.buttonGroup"
    },
    {
      id: "card",
      label: "Card",
      name: "components.card"
    },
    {
      id: "chip",
      label: "Chip",
      name: "components.chip"
    },
    {
      id: "code",
      label: "Code",
      name: "components.code"
    },
    {
      id: "dialog",
      label: "Dialog",
      name: "components.dialog"
    },
    {
      id: "divider",
      label: "Divider",
      name: "components.divider"
    },
    {
      id: "drawer",
      label: "Drawer",
      name: "components.drawer"
    },
    {
      id: "flag",
      label: "Flag",
      name: "components.flag"
    },
    {
      id: "header",
      label: "Header",
      name: "components.header"
    },
    {
      id: "hero",
      label: "Hero",
      name: "components.hero"
    },
    {
      id: "image",
      label: "Image",
      name: "components.image"
    },
    {
      id: "input",
      label: "Inputs",
      name: "components.input"
    },
    {
      id: "input.checkbox",
      label: "Input Checbox",
      name: "components.input.checkbox"
    },
    {
      id: "item",
      label: "Item",
      name: "components.item"
    },
    {
      id: "loading",
      label: "Loading",
      name: "components.loading"
    },
    {
      id: "mask",
      label: "Mask",
      name: "components.mask"
    },
    {
      id: "menu",
      label: "Menu",
      name: "components.menu"
    },
    {
      id: "nav",
      label: "Nav",
      name: "components.nav"
    },
    {
      id: "paginate",
      label: "Paginate",
      name: "components.paginate"
    },
    {
      id: "panel",
      label: "Panel",
      name: "components.panel"
    },
    {
      id: "progress",
      label: "Progress",
      name: "components.progress"
    },
    {
      id: "snackbar",
      label: "Snackbar",
      name: "components.snackbar"
    },
    {
      id: "spinner",
      label: "Spinner",
      name: "components.spinner"
    },
    {
      id: "tooltip",
      label: "Tooltip",
      name: "components.tooltip"
    }
  ];

  protected stylesLinks = [
    {
      id: "typography",
      label: "Tipografía",
      name: "styles.typography"
    }
  ];
}
</script>

<style lang="scss" scoped>
@import "src/styles/helpers/variables";

.components {
  &__sidebar {
    &-divider {
      border-color: $c-gray-light;
    }

    &-link {
      padding: $padding-sm $padding-base;
      color: $text-base;
      font-weight: $fw-medium;

      &.router-link-exact-active {
        background: $c-gray-lighter;
      }

      &:hover {
        background: $c-gray-lighter;
        text-decoration: none;
      }
    }
  }

  &__content {
    padding: $padding-base 0;
  }
}
</style>

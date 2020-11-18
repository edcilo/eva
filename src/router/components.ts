import Components from "@/views/components/index.vue";

export default [
  {
    path: "/components",
    name: "components",
    component: Components,
    children: [
      {
        path: "ve-alert",
        name: "components.alert",
        component: () => import("@/views/components/alert/index.vue")
      },
      {
        path: "ve-app-bar-bottom",
        name: "components.appBarBottom",
        component: () => import("@/views/components/appBarBottom/index.vue")
      },
      {
        path: "ve-avatar",
        name: "components.avatar",
        component: () => import("@/views/components/avatar/index.vue")
      },
      {
        path: "ve-banner",
        name: "components.banner",
        component: () => import("@/views/components/banner/index.vue")
      },
      {
        path: "ve-card",
        name: "components.card",
        component: () => import("@/views/components/card/index.vue")
      },
      {
        path: "ve-button",
        name: "components.button",
        component: () => import("@/views/components/button/index.vue")
      },
      {
        path: "ve-button-group",
        name: "components.buttonGroup",
        component: () => import("@/views/components/buttonGroup/index.vue")
      },
      {
        path: "ve-chip",
        name: "components.chip",
        component: () => import("@/views/components/chip/index.vue")
      },
      {
        path: "ve-code",
        name: "components.code",
        component: () => import("@/views/components/code/index.vue")
      },
      {
        path: "ve-dialog",
        name: "components.dialog",
        component: () => import("@/views/components/dialog/index.vue")
      },
      {
        path: "ve-divider",
        name: "components.divider",
        component: () => import("@/views/components/divider/index.vue")
      },
      {
        path: "ve-drawer",
        name: "components.drawer",
        component: () => import("@/views/components/drawer/index.vue")
      },
      {
        path: "ve-flag",
        name: "components.flag",
        component: () => import("@/views/components/flag/index.vue")
      },
      {
        path: "ve-header",
        name: "components.header",
        component: () => import("@/views/components/header/index.vue")
      },
      {
        path: "ve-hero",
        name: "components.hero",
        component: () => import("@/views/components/hero/index.vue")
      },
      {
        path: "ve-image",
        name: "components.image",
        component: () => import("@/views/components/image/index.vue")
      },
      {
        path: "input",
        name: "components.input",
        component: () => import("@/views/components/input/index.vue")
      },
      {
        path: "input/checkbox",
        name: "components.input.checkbox",
        component: () => import("@/views/components/input/checkbox/index.vue")
      },
      {
        path: "ve-item",
        name: "components.item",
        component: () => import("@/views/components/item/index.vue")
      },
      {
        path: "ve-loading",
        name: "components.loading",
        component: () => import("@/views/components/loading/index.vue")
      },
      {
        path: "ve-mask",
        name: "components.mask",
        component: () => import("@/views/components/mask/index.vue")
      },
      {
        path: "ve-menu",
        name: "components.menu",
        component: () => import("@/views/components/menu/index.vue")
      },
      {
        path: "ve-nav",
        name: "components.nav",
        component: () => import("@/views/components/nav/index.vue")
      },
      {
        path: "ve-paginate",
        name: "components.paginate",
        component: () => import("@/views/components/paginate/index.vue")
      },
      {
        path: "ve-panel",
        name: "components.panel",
        component: () => import("@/views/components/panel/index.vue")
      },
      {
        path: "ve-progress",
        name: "components.progress",
        component: () => import("@/views/components/progress/index.vue")
      },
      {
        path: "ve-snackbar",
        name: "components.snackbar",
        component: () => import("@/views/components/snackbar/index.vue")
      },
      {
        path: "ve-spinner",
        name: "components.spinner",
        component: () => import("@/views/components/spinner/index.vue")
      },
      {
        path: "ve-tooltip",
        name: "components.tooltip",
        component: () => import("@/views/components/tooltip/index.vue")
      },
      {
        path: "styles/typography",
        name: "styles.typography",
        component: () => import("@/views/styles/typography/index.vue")
      }
    ]
  }
];

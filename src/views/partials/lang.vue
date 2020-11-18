<template>
  <ve-button-group class="footer__locale-group">
    <ve-button
      v-for="entry in languages"
      :key="entry.language"
      btn-style="regular"
      size="sm"
      :state="locale === entry.language ? 'active' : null"
      @click="changeLocal(entry.language)"
    >
      <ve-flag :code="entry.flag" :squared="false" />
    </ve-button>
  </ve-button-group>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import i18n from "@/lang";
import VeButton from "@/components/Button";
import VeButtonGroup from "@/components/ButtonGroup";
import VeFlag from "@/components/Flag";

const app = namespace("app");

interface LangInterface {
  flag: string;
  language: string;
}

@Component({
  name: "ViewpartialLang",
  components: {
    VeButton,
    VeButtonGroup,
    VeFlag
  }
})
export default class ViewPartialLang extends Vue {
  protected languages: Array<LangInterface> = [
    {
      flag: "es",
      language: "es"
    },
    {
      flag: "gb",
      language: "en"
    }
  ];

  @app.State
  protected locale!: string;

  @app.Mutation
  protected setLocale!: Function;

  protected changeLocal(locale: string) {
    this.setLocale(locale);

    i18n.locale = locale;
  }

  public mounted() {
    i18n.locale = this.locale;
  }
}
</script>

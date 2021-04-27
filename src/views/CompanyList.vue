<template>
  <div>
    <h1>Firmen</h1>
    <ul>
      <li v-for="company in companyMatching.data" :key="company.id">{{ company.id }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Company } from "api";
import { Vue } from "vue-class-component";

Vue.registerHooks(["beforeRouteUpdate"]);

export default class CompanyList extends Vue {
  async mounted(): Promise<void> {
    await this.loadData();
  }

  get companyMatching(): { data: Company[] } {
    return this.$store.getters["companyMatching"];
  }

  async loadData(): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.COMPANY_MATCHING);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped></style>

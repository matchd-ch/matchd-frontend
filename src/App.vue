<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} - MATCHD` : `MATCHD` }}</template>
  </metainfo>

  <div>
    <component v-if="showNavbar" :is="navigation" v-bind="{ user }" />
    <router-view
      :class="{
        'theme-student': isStudent,
        'theme-company': isCompany,
        'theme-university': isUniversity,
      }"
    />
  </div>
</template>

<script lang="ts">
import type { User } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import NavBarStudent from "@/components/NavBarStudent.vue";
import NavBarCompany from "@/components/NavBarCompany.vue";

@Options({
  components: { NavBarStudent, NavBarCompany },
})
export default class App extends Vue {
  meta = setup(() =>
    useMeta({
      title: "",
    })
  );

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get isCompany(): boolean {
    return this.$store.getters["isCompany"];
  }

  get isUniversity(): boolean {
    return this.$store.getters["isUniversity"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get showNavbar(): boolean {
    return !this.$route.meta.public;
  }

  get navigation(): string {
    if (this.isStudent) return "NavBarStudent";
    return "NavBarCompany";
  }
}
</script>

<style lang="postcss">
@import "./styles/index.css";
</style>

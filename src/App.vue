<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} - MATCHD` : `MATCHD` }}</template>
  </metainfo>

  <div>
  <nav-bar></nav-bar>
  <router-view
    :class="{
      'theme-student': isStudent,
      'theme-company': isCompany,
      'theme-university': isUniversity,
    }"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import type { User } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import NavBar from "@/components/NavBar.vue";

@Options({
  components: { NavBar },
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
}
</script>

<style lang="postcss">
@import "./styles/index.css";
</style>

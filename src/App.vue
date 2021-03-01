<template>
  <router-view
    :class="{
      'theme-student': isStudent,
      'theme-company': isCompany,
      'theme-university': isUniversity,
    }"
  />
</template>

<script lang="ts">
import { UserWithProfileNode } from "api";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class App extends Vue {
  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get isCompany(): boolean {
    return this.$store.getters["isCompany"];
  }

  get isUniversity(): boolean {
    return this.$store.getters["isUniversity"];
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }
}
</script>

<style>
@import "./styles/index.css";
</style>

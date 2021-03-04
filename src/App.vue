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
import { UserType } from "@/api/models/types";
import { UserWithProfileNode } from "api";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class App extends Vue {
  get isStudent(): boolean {
    if (!this.user?.type) {
      return false;
    }
    return [UserType.Student, UserType.CollegeStudent, UserType.Internal, UserType.Junior].includes(
      this.user.type
    );
  }

  get isCompany(): boolean {
    if (!this.user?.type) {
      return false;
    }
    return [UserType.Company].includes(this.user.type);
  }

  get isUniversity(): boolean {
    if (!this.user?.type) {
      return false;
    }
    return [UserType.University].includes(this.user.type);
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }
}
</script>

<style>
@import "./styles/index.css";
</style>

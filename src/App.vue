<template>
  <metainfo>
    <template #title="{ content }">{{ content ? `${content} - MATCHD` : `MATCHD` }}</template>
  </metainfo>

  <div
    :class="{
      'theme-student': isStudent,
      'theme-company': isCompany,
      'theme-university': isUniversity,
    }"
  >
    <header
      id="teleporter-app-header"
      class="header bg-white fixed top-0 left-0 right-0 z-20 shadow-black-20"
    >
      <component
        :is="navigation"
        v-if="showNavbar && user"
        :user="user"
        @click-logout="onClickLogout"
      />
    </header>
    <div class="mt-fixed-header mb-fixed-footer">
      <router-view />
    </div>
    <footer class="footer fixed bottom-0 left-0 right-0 z-20 shadow-black-20"></footer>
  </div>
</template>

<script lang="ts">
import type { User } from "@/api/models/types";
import NavBarCompany from "@/components/NavBarCompany.vue";
import NavBarStudent from "@/components/NavBarStudent.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ActionTypes as LoginActions } from "@/store/modules/login/action-types";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

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
    return !this.$route.meta.hideNavigation;
  }

  get navigation(): string {
    if (this.isStudent) return "NavBarStudent";
    return "NavBarCompany";
  }

  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(LoginActions.LOGOUT);
    this.$router.push({ name: "Login" });
  }

  mounted(): void {
    window.addEventListener("resize", calculateMargins, true);
  }

  unmounted(): void {
    window.removeEventListener("resize", calculateMargins, true);
  }
}
</script>

<style lang="postcss">
@import "./styles/index.css";
</style>

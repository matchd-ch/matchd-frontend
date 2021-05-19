<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} - MATCHD` : `MATCHD` }}</template>
  </metainfo>

  <div
    :class="{
      'theme-student': isStudent,
      'theme-company': isCompany,
      'theme-university': isUniversity,
    }"
  >
    <header class="header fixed top-0 left-0 right-0 z-20">
      <component v-if="showNavbar && user" :is="navigation" :user="user" />
    </header>
    <router-view />
    <footer class="footer fixed bottom-0 left-0 right-0 z-20"></footer>
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
    return !this.$route.meta.hideNavigation;
  }

  get navigation(): string {
    if (this.isStudent) return "NavBarStudent";
    return "NavBarCompany";
  }

  mounted(): void {
    window.addEventListener("resize", this.calculateMargins, true);
    this.calculateMargins();
  }

  unmounted(): void {
    window.removeEventListener("resize", this.calculateMargins, true);
  }

  calculateMargins(): void {
    const root = document.documentElement;
    const headerHeight = (document.querySelector("header") as HTMLElement).offsetHeight;
    const footerHeight = (document.querySelector("footer") as HTMLElement).offsetHeight;
    root.style.setProperty("--contentMarginTop", `${headerHeight}px`);
    root.style.setProperty("--contentMarginBottom", `${footerHeight}px`);
  }
}
</script>

<style lang="postcss">
@import "./styles/index.css";
</style>

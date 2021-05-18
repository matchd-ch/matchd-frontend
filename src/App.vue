<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} - MATCHD` : `MATCHD` }}</template>
  </metainfo>

  <div>
    <nav-bar v-if="showNavbar" :user-name="user?.firstName">
      <nav-link :to="{ name: 'Dashboard' }">Dashboard</nav-link>
      <nav-link :to="{ name: 'JobPostingSearch' }">Projekt finden</nav-link>
    </nav-bar>
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
import NavBar from "@/components/NavBar.vue";
import NavLink from "@/components/NavLink.vue";

@Options({
  components: { NavBar, NavLink },
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
}
</script>

<style lang="postcss">
@import "./styles/index.css";
</style>

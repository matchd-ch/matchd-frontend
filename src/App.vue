<template>
  <metainfo>
    <template #title="{ content }">{{ content ? `${content} - MATCHD` : `MATCHD` }}</template>
  </metainfo>

  <div
    :class="{
      'theme-student': isStudent,
      'theme-company': isCompany,
      'theme-university': isUniversity,
      'theme-public': !user && isPublic && showNavbar,
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
        @click-logout="handleLogoutClick"
      />
      <NavBarPublic v-else-if="showNavbar" />
      <ImpersonateBar v-if="impersonator" />
    </header>
    <div class="main-view mt-fixed-header mb-fixed-footer">
      <router-view />
    </div>
    <footer class="footer fixed bottom-0 left-0 right-0 z-20 shadow-black-20" />
  </div>
</template>

<script setup lang="ts">
import NavBarCompany from "@/components/NavBarCompany.vue";
import NavBarStudent from "@/components/NavBarStudent.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ActionTypes as LoginActions } from "@/store/modules/login/action-types";
import { computed, onMounted, onUnmounted } from "vue";
import { useMeta } from "vue-meta";
import { useRoute, useRouter } from "vue-router";
import ImpersonateBar from "./components/ImpersonateBar.vue";
import NavBarPublic from "./components/NavBarPublic.vue";
import useImpersonator from "./helpers/useImpersonator";
import { Routes } from "./router";
import { useStore } from "./store";

useMeta({ title: "" });
const store = useStore();
const router = useRouter();
const route = useRoute();
const user = computed(() => store.getters["user"]);
const isStudent = computed(() => store.getters["isStudent"]);
const isCompany = computed(() => store.getters["isCompany"]);
const isUniversity = computed(() => store.getters["isUniversity"]);
const showNavbar = computed(() => !route.meta.hideNavigation);
const isPublic = computed(() => route.meta.public);
const navigation = computed(() => (isStudent.value ? NavBarStudent : NavBarCompany));
const { impersonator } = useImpersonator();

const handleLogoutClick = async () => {
  await store.dispatch(LoginActions.LOGOUT);
  router.push({ name: Routes.LOGIN });
};

onMounted(() => {
  window.addEventListener("resize", calculateMargins, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", calculateMargins, true);
});
</script>

<style lang="postcss">
@import "./styles/index.css";
</style>
<style lang="postcss" scoped>
.main-view {
  min-height: calc(100vh - var(--contentMarginTop) - var(--contentMarginBottom));
}

.header {
  max-height: 100vh;
  overflow: hidden auto;
}
</style>

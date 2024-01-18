<template>
  <NavBar :open="open" @toggle-navigation="onToggleNavigation">
    <div class="grow md:flex-row justify-center pb-4 md:pb-0 md:flex md:justify-center">
      <NavLink :to="{ name: Routes.DASHBOARD }">Dashboard</NavLink>
      <NavLink :to="{ name: Routes.JOB_POSTING_SEARCH }">Stelle finden</NavLink>
      <NavLink :to="{ name: Routes.CHALLENGE_SEARCH }">Challenges | Mentorings</NavLink>
      <NavLink :to="{ name: Routes.COMPANY_LIST }">Unternehmen entdecken</NavLink>
    </div>
    <NavDropdown :text="user?.firstName ?? ''">
      <NavLink :to="{ name: Routes.PROFILE }" class="border-b border-grey-2">Mein Profil</NavLink>
      <button
        class="block focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 hover:text-primary-1 bg-transparent md:mt-0 md:text-lg mt-2 px-4 py-2 text-sm transition-colors"
        @click="emit('clickLogout')"
      >
        Logout
      </button>
    </NavDropdown>
  </NavBar>
</template>

<script setup lang="ts">
import type { MeQuery } from "@/api/queries/me.generated";
import { Routes } from "@/router";
import { ref } from "vue";
import NavBar from "./NavBar.vue";
import NavDropdown from "./NavDropdown.vue";
import NavLink from "./NavLink.vue";

defineProps<{ user: MeQuery["me"] }>();

const emit = defineEmits<{
  (event: "clickLogout"): void;
}>();

const open = ref(false);
const onToggleNavigation = () => {
  open.value = !open.value;
};
</script>

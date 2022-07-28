<template>
  <NavBar :open="open" @toggle-navigation="onToggleNavigation">
    <div class="grow md:flex-row justify-center pb-4 md:pb-0 md:flex md:justify-center">
      <NavLink :to="{ name: 'Dashboard' }">Dashboard</NavLink>
      <NavLink :to="{ name: 'StudentSearch' }">Talent finden</NavLink>
      <NavLink :to="{ name: 'ProjectPostingSearch' }">Projektidee finden</NavLink>
    </div>
  </NavBar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBar from "./NavBar.vue";
import NavLink from "./NavLink.vue";

const open = ref(false);
const onToggleNavigation = () => {
  open.value = !open.value;
};
</script>

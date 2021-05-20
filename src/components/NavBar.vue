<template>
  <div
    class="flex flex-col md:items-center md:justify-between md:flex-row px-2.5 border-b py-2.5 bg-white border-primary-1"
  >
    <div class="p-4 flex flex-row items-center justify-between">
      <router-link :to="{ name: 'Dashboard' }"><Logo class="w-36" /></router-link>
      <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline"></button>
    </div>

    <nav class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
      <slot />
    </nav>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavDropdown from "./NavDropdown.vue";
import NavLink from "./NavLink.vue";
import Logo from "@/assets/icons/logo.svg";

@Options({
  name: "NavBar",
  components: { NavDropdown, NavLink, Logo },
})
export default class NavBar extends Vue {}
</script>

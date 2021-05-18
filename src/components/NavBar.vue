<template>
  <div
    x-data="{ open: false }"
    class="flex flex-col md:items-center md:justify-between md:flex-row px-2.5 border-green-1 border-b py-2.5"
  >
    <div class="p-4 flex flex-row items-center justify-between">
      <a
        href="#"
        class="text-lg tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
        ><Logo class="w-36"
      /></a>
      <button
        class="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
        x-on:click="open = !open"
      >
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
          <path
            x-show="!open"
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
          <path
            x-show="open"
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>

    <nav
      x-bind:class="{ flex: open, hidden: !open }"
      class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row"
    >
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

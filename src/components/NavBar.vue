<template>
  <div
    :class="{ 'border-green-1': !isCompany, 'border-pink-1': isCompany }"
    class="flex flex-col md:items-center md:justify-between md:flex-row px-2.5 border-b py-2.5 bg-white"
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
import { Options, Vue, prop } from "vue-class-component";
import NavDropdown from "./NavDropdown.vue";
import NavLink from "./NavLink.vue";
import Logo from "@/assets/icons/logo.svg";

class Props {
  isCompany = prop<boolean>({ default: false });
}

@Options({
  name: "NavBar",
  components: { NavDropdown, NavLink, Logo },
})
export default class NavBar extends Vue.with(Props) {
  mounted(): void {
    console.log("MOUNTED NAVBAR");
  }
}
</script>

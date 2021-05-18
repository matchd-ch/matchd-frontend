<template>
  <div
    x-data="{ open: false }"
    class="flex flex-col px-4 md:items-center md:justify-between md:flex-row md:px-6 lg:px-8 border-green-1 border-b py-2.5"
  >
    <div class="p-4 flex flex-row items-center justify-between">
      <a
        href="#"
        class="text-lg tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
        >Matchd</a
      >
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
      <nav-dropdown :text="userName">
        <router-link
          :to="{ name: 'Profile' }"
          class="block px-4 py-2 mt-2 md:text-lg text-sm bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >Mein Profil</router-link
        >
        <a
          class="block px-4 py-2 mt-2 md:text-lg text-sm bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          @click="onClickLogout"
          href="#"
          >Logout</a
        >
      </nav-dropdown>
    </nav>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/modules/login/action-types";
import { Options, Vue } from "vue-class-component";
import NavDropdown from "./NavDropdown.vue";

@Options({
  components: { NavDropdown },
})
export default class NavBar extends Vue.with(Props) {
  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

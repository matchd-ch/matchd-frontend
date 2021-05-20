<template>
  <NavBar :open="open" @toggleNavigation="onToggleNavigation">
    <div class="flex-grow md:flex-row justify-center pb-4 md:pb-0 md:flex md:justify-center">
      <nav-link :to="{ name: 'Dashboard' }">Dashboard</nav-link>
      <nav-link :to="{ name: 'JobPostingSearch' }">Stelle finden</nav-link>
      <nav-link :to="{ name: 'CompanyList' }">Unternehmen entdecken</nav-link>
    </div>
    <NavDropdown :text="user?.firstName">
      <NavLink :to="{ name: 'Profile' }" class="border-b border-grey-2">Mein Profil</NavLink>
      <button
        @click="$emit('clickLogout')"
        class="block focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 hover:bg-gray-200 hover:text-gray-900 bg-transparent md:mt-0 md:text-lg mt-2 px-4 py-2 text-sm"
      >
        Logout
      </button>
    </NavDropdown>
  </NavBar>
</template>

<script lang="ts">
import type { User } from "api";
import { Options, prop, Vue } from "vue-class-component";
import NavBar from "./NavBar.vue";
import NavLink from "./NavLink.vue";
import NavDropdown from "./NavDropdown.vue";

class Props {
  user = prop<User>({ required: true });
}

@Options({
  components: { NavLink, NavBar, NavDropdown },
  emits: ["clickLogout"],
})
export default class NavBarStudent extends Vue.with(Props) {
  open = false;
  onToggleNavigation(): void {
    this.open = !this.open;
  }
}
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply text-primary-1;
}
</style>

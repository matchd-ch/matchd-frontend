<template>
  <NavBar :open="open" @toggle-navigation="onToggleNavigation">
    <div class="grow md:flex-row justify-center pb-4 md:pb-0 md:flex md:justify-center">
      <NavLink :to="{ name: 'Dashboard' }">Dashboard</NavLink>
      <NavLink :to="{ name: 'JobPostingSearch' }">Stelle finden</NavLink>
      <NavLink :to="{ name: 'ProjectPostingSearch' }">Projekt finden</NavLink>
      <NavLink :to="{ name: 'CompanyList' }">Unternehmen entdecken</NavLink>
    </div>
    <NavDropdown :text="user?.firstName">
      <NavLink :to="{ name: 'Profile' }" class="border-b border-grey-2">Mein Profil</NavLink>
      <button
        class="block focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 hover:text-primary-1 bg-transparent md:mt-0 md:text-lg mt-2 px-4 py-2 text-sm transition-colors"
        @click="$emit('clickLogout')"
      >
        Logout
      </button>
    </NavDropdown>
  </NavBar>
</template>

<script lang="ts">
import type { User } from "@/api/models/types";
import { Options, prop, Vue } from "vue-class-component";
import NavBar from "./NavBar.vue";
import NavDropdown from "./NavDropdown.vue";
import NavLink from "./NavLink.vue";

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

<template>
  <nav-bar :is-company="true">
    <nav-link :to="{ name: 'Dashboard' }">Dashboard</nav-link>
    <nav-link :to="{ name: 'JobPostingSearch' }">Talent finden</nav-link>
    <nav-dropdown :text="user?.company?.name">
      <nav-link :to="{ name: 'Profile' }" :inline="false">Profileinstellungen</nav-link>
      <nav-link @click="onClickLogout" :inline="false">Logout</nav-link>
    </nav-dropdown>
  </nav-bar>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/modules/login/action-types";
import type { User } from "api";
import { Options, prop, Vue } from "vue-class-component";
import NavBar from "./NavBar.vue";
import NavLink from "./NavLink.vue";
import NavDropdown from "./NavDropdown.vue";

class Props {
  user = prop<User>({ required: true });
}

@Options({
  name: "NavBarCompany",
  components: { NavLink, NavBar, NavDropdown },
})
export default class NavBarCompany extends Vue.with(Props) {
  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

<template>
  <nav-bar>
    <nav-link :to="{ name: 'Dashboard' }">Dashboard</nav-link>
    <nav-link :to="{ name: 'StudentSearch' }">Projekt finden</nav-link>
    <nav-dropdown :text="user?.firstName">
      <nav-link :to="{ name: 'Profile' }" :inline="false">Mein Profil</nav-link>
      <nav-link @click="onClickLogout" :inline="false">Logout</nav-link>
    </nav-dropdown>
  </nav-bar>
</template>

<script lang="ts">
import type { User } from "api";
import { Options, prop, Vue } from "vue-class-component";
import NavBar from "./NavBar.vue";
import NavLink from "./NavLink.vue";
import NavDropdown from "./NavDropdown.vue";
import { ActionTypes } from "@/store/modules/login/action-types";

class Props {
  user = prop<User>({ required: true });
}

@Options({
  name: "NavBarStudent",
  components: { NavLink, NavBar, NavDropdown },
})
export default class NavBarStudent extends Vue.with(Props) {
  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

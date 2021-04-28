<template>
  <section class="flex bg-cover bg-student-gradient-t-b">
    <div>
      <h2>
        Hallo {{ user.firstName }},<br />
        schön dass du online bist!
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo suscipit aliquid, quisquam
        assumenda voluptatem quod ipsam at impedit laborum? Sed sint ut necessitatibus corporis
        atque molestiae assumenda aliquid nulla neque?
      </p>
    </div>
    <div>
      <div class="avatar">
        <img :src="user.image" alt="Profil Bild" />
      </div>
      <matchd-button>Profil bearbeiten</matchd-button>
    </div>
  </section>
  <section class="grid-cols-3 grid">
    <section class="border-green-1">
      <h3 class="text-3xl">Neue Stellen und Projekte</h3>
      <ul>
        <li>Liip AG, St. Gallen -></li>
        <li>Liip AG, St. Gallen -></li>
        <li>Liip AG, St. Gallen -></li>
        <li>Liip AG, St. Gallen -></li>
        <li>Liip AG, St. Gallen -></li>
      </ul>
      <matchd-button>
        <router-link :to="{ name: 'JobPostingSearch' }">Stelle suchen</router-link>
      </matchd-button>
    </section>
    <section class="border-green-1">
      <h3 class="text-3xl">Neue Unternehmen und Bildungseinrichtungen</h3>
      <ul>
        <li>Firma A</li>
        <li>Firma B</li>
      </ul>
    </section>
    <section class="border-green-1">
      <h3 class="text-3xl">Offene Matches</h3>
      <ul>
        <li>Match 1</li>
        <li>Match 2</li>
      </ul>
    </section>
    <section class="border-green-1">
      <h3 class="text-3xl">Bestätigt Matches</h3>
      <ul>
        <li>Liip AG, St. Gallen -></li>
      </ul>
    </section>
    <section class="border-green-1">
      <h3 class="text-3xl">Hilfe & Support</h3>
      <MatchdButton
        variant="outline"
        @click="onClickLogout"
        :disabled="isLogoutLoading"
        :loading="isLogoutLoading"
        >Logout</MatchdButton
      >
    </section>
  </section>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import type { User } from "api";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
  },
})
export default class StudentDashboard extends Vue {
  get isLogoutLoading(): boolean {
    return this.$store.getters["logoutLoading"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get isCompany(): boolean {
    return this.$store.getters["isCompany"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

<style scoped>
</style>

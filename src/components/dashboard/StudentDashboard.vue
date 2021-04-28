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
        <img :src="user?.image" alt="Profil Bild" />
      </div>
      <matchd-button>Profil bearbeiten</matchd-button>
    </div>
  </section>
  <section class="grid-cols-3 grid">
    <section>
      <h3 class="text-3xl">Neue Stellen und Projekte</h3>
      <ul>
        <li v-for="posting in dashboard?.jobPostings" :key="posting.id">
          {{ posting.title }}, {{ posting.company.name }}, {{ posting.company.city }}
        </li>
      </ul>
      <matchd-button>
        <router-link :to="{ name: 'JobPostingSearch' }">Stelle suchen</router-link>
      </matchd-button>
    </section>
    <section v-if="dashboard?.requestedMatches?.length">
      <h3 class="text-3xl">Offene Matches</h3>
      <ul>
        <li v-for="match in dashboard?.requestedMatches" :key="match.id">
          <p>
            <em>
              {{ match.jobPosting.company.name }}
            </em>
          </p>
          <p>
            {{ match.jobPosting.title }}
          </p>
        </li>
      </ul>
    </section>
    <section v-if="dashboard?.unconfirmedMatches?.length">
      <h3 class="text-3xl">Anfragen zum Matching</h3>
      <p>
        Dein Matchd-Profil findet Anklang! Es gibt Unternehmen die gerne mit dir in Kontakt treten
        möchten.
      </p>
      <ul>
        <li v-for="match in dashboard?.unconfirmedMatches" :key="match.jobPosting.id">
          <router-link
            :to="{ path: '/stellen/' + match.jobPosting.slug }"
            class="search-result-grid__link"
          >
            <p>
              {{ match.jobPosting.company.name }}
            </p>
            <p>
              {{ match.jobPosting.title }}
            </p>
          </router-link>
        </li>
      </ul>
    </section>
    <section v-if="dashboard?.confirmedMatches?.length">
      <h3 class="text-3xl">Hier hat's gemachd!</h3>
      <ul>
        <li v-for="match in dashboard?.confirmedMatches" :key="match.jobPosting.id">
          <router-link :to="{ path: '/stellen/' + match.jobPosting.slug }" class="search-result-grid__link">
            <p>
              {{ match.jobPosting.company.name }}
            </p>
            <p>
              {{ match.jobPosting.title }}
            </p>
          </router-link>
        </li>
      </ul>
    </section>
    <section>
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
import type { Dashboard, User } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  dashboard = prop<Dashboard>({ required: true });
}

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
  },
})
export default class StudentDashboard extends Vue.with(Props) {
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

<style scoped></style>

<template>
  <div
    class="student-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars mb-fixed-footer"
  >
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="flex justify-center m-20">
        <img class="avatar rounded-full object-cover" :src="avatarSrc" />
      </div>
      <div class="xl:flex items-start lg:pl-16 lg:pr-16 flex-col">
        <h2 class="flex-1 mb-8 xl:mb-0">Hallo {{ user.firstName }}, schön dass du da bist!</h2>
        <p>
          Hier zeigen wir dir deine Matching-Anfragen und die neuesten Stellenausschreibungen. Alle
          fürs Matching nötigen Informationen schicken wir dir auch per E-Mail. So verpasst du
          bestimmt kein Match.
        </p>
      </div>
    </div>
    <div class="text-green-1 flex flex-col min-h-full">
      <profile-section v-if="dashboard?.data.jobPostings?.length" title="Neue Stellen und Projekte">
        <ul>
          <li v-for="posting in dashboard?.data.jobPostings" :key="posting.id">
            {{ posting.title }}, {{ posting.company.name }}, {{ posting.company.city }}
          </li>
        </ul>
        <matchd-button>
          <router-link :to="{ name: 'JobPostingSearch' }">Stelle suchen</router-link>
        </matchd-button>
      </profile-section>
      <profile-section v-if="dashboard?.data.requestedMatches?.length" title="Offene Matches">
        <ul>
          <li v-for="match in dashboard?.data.requestedMatches" :key="match.id">
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
      </profile-section>
      <profile-section v-if="dashboard?.data.unconfirmedMatches?.length" title="Anfragen zum Matching">
        <p>
          Dein Matchd-Profil findet Anklang! Es gibt Unternehmen die gerne mit dir in Kontakt treten
          möchten.
        </p>
        <ul>
          <li v-for="match in dashboard?.data.unconfirmedMatches" :key="match.jobPosting.id">
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
      </profile-section>
      <profile-section v-if="dashboard?.data.confirmedMatches?.length" title="Hier hat's gemachd!">
        <ul>
          <li v-for="match in dashboard?.data.confirmedMatches" :key="match.jobPosting.id">
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
      </profile-section>
      <profile-section title="Hilfe &amp; Support">
        <MatchdButton
          variant="outline"
          @click="onClickLogout"
          :disabled="isLogoutLoading"
          :loading="isLogoutLoading"
          >Logout</MatchdButton
        >
      </profile-section>
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import type { Attachment, Dashboard, User } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  dashboard = prop<{ data: Dashboard; avatar: Attachment[] }>({ required: true });
}

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
    ProfileSection,
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

  get avatarSrc(): string {
    return this.dashboard?.avatar?.[0].url;
  }

  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

<style scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
</style>

<template>
  <div
    class="student-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars"
  >
    <div
      class="bg-company-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-pink-1"
    >
      <div class="flex justify-center m-5 lg:m-20 lg:w-86 lg:h-86">
        <img class="w-40" :src="replaceStack(avatar.url, 'logo')"/>
      </div>
      <div class="xl:flex items-start lg:pl-16 lg:pr-16 flex-col">
        <h2 class="flex-1 mb-8 xl:mb-0">Guten Tag, schön dass Sie online sind!</h2>
        <p>
          Hier zeigen wir Ihnen offene Matching-Anfragen. Alle fürs Matching nötigen Informationen
          schicken wir Ihnen auch per E-Mail. So verpassen Sie bestimmt kein Match.
        </p>
        <MatchdButton
          class="mt-4"
          variant="outline"
          @click="onClickLogout"
          :disabled="isLogoutLoading"
          :loading="isLogoutLoading"
        >Logout</MatchdButton>
      </div>
    </div>
    <div class="text-pink-1 flex flex-col min-h-full">
      <profile-section
        v-if="dashboard?.data?.jobPostings?.length"
        title="Ihre Stellen&shy;ausschreibungen"
        :pink="true"
      >
        <p class="mt-4" v-if="dashboard?.data?.jobPostings.length === 0">
          Sie haben keine offenen Stellen ausgeschrieben.
        </p>
        <ul>
          <li
            v-for="jobPosting in dashboard?.data?.jobPostings"
            :key="jobPosting.id"
            class="link-list__item mb-4"
          >
            <company-job-posting-link :jobPosting="jobPosting" :isCompany="true"></company-job-posting-link>
          </li>
        </ul>
        <matchd-button class="w-full mt-4">
          <router-link :to="{ name: 'JobPostingCreate' }">Neue Stelle ausschreiben</router-link>
        </matchd-button>
      </profile-section>
      <profile-section
        title="Ihre offenen Matches"
        :pink="true">
        <p v-if="dashboard?.data?.requestedMatches?.length > 0">
          Sobald Ihre Matching-Anfrage bestätigt wurde, kann es mit dem Kennenlernen weitergehen.
        </p>
        <p v-if="dashboard?.data?.requestedMatches?.length === 0">
          Im Moment haben Sie keine offenen Matches. Sobald Sie ein Match auslösen, werden Sie das hier sehen.
        </p>
        <company-match-group class="mt-4" :matches="dashboard?.data?.requestedMatches"></company-match-group>
      </profile-section>
      <profile-section
        title="Anfragen zum Matching"
        :pink="true"
      >
        <p v-if="dashboard?.data?.unconfirmedMatches.length > 0">
          Ihre Ausschreibung stösst auf Interesse! Es gibt Talente die gerne mit Ihnen in Kontakt treten möchten.
        </p>
        <p v-if="dashboard?.data?.unconfirmedMatches?.length === 0">
          Im Moment haben Sie keine offenen Anfragen. Sobald ein Talent ein Match auslöst, werden Sie das hier sehen.
        </p>
        <company-match-group class="mt-4" :matches="dashboard?.data?.unconfirmedMatches"></company-match-group>
      </profile-section>
      <profile-section
        v-if="dashboard?.data?.confirmedMatches?.length > 0"
        title="Hier hat's gematchd!"
        :pink="true"
      >
        <company-match-group :matches="dashboard?.data?.confirmedMatches"></company-match-group>
      </profile-section>
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import type { User, Attachment, Dashboard } from "api";
import { Options, prop, Vue } from "vue-class-component";
import { AttachmentKey } from '@/api/models/types';
import { replaceStack } from "@/helpers/replaceStack";
import ArrowFront from '@/assets/icons/arrow-front.svg';
import ProfileSection from '@/components/ProfileSection.vue';
import CompanyJobPostingLink from '@/components/dashboard/CompanyJobPostingLink.vue';
import CompanyMatchGroup from '@/components/dashboard/CompanyMatchGroup.vue';

class Props {
  dashboard = prop<{ data: Dashboard }>({required: true});
}

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
    ProfileSection,
    ArrowFront,
    CompanyJobPostingLink,
    CompanyMatchGroup
  },
})
export default class CompanyDashboard extends Vue.with(Props) {
  get isLogoutLoading(): boolean {
    return this.$store.getters["logoutLoading"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get isCompany(): boolean {
    return this.$store.getters["isCompany"];
  }

  get avatar(): Attachment | undefined {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.CompanyAvatar,
      })[0] || this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.CompanyAvatarFallback,
      })[0] || ""
    );
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
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

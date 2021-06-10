<template>
  <div class="company-dashboard grid grid-cols-1 xl:grid-cols-2">
    <div
      class="bg-company-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-pink-1"
    >
      <div class="flex justify-center">
        <CompanyLogo
          :url="avatar.url"
          :name="user?.company?.name"
          class="m-5 lg:m-20 w-40 h-40 xl:w-60 xl:h-60"
        />
      </div>
      <div class="xl:flex items-start lg:pl-16 lg:pr-16 flex-col">
        <h2 class="flex-1 xl:mb-0 text-display-xs">
          Willkommen zurück bei Matchd! Wir wünschen viel Erfolg bei der Talentsuche
        </h2>
        <p class="mt-4">
          Auf dieser Seite finden Sie Ihre ausgeschriebenen Stellen sowie den aktuellen Stand Ihrer
          Matches. Damit Sie keinen Match verpassen, informieren wir Sie jeweils auch per E-Mail.
        </p>
      </div>
    </div>
    <div class="flex flex-col min-h-full">
      <profile-section title="Ihre Ausschreibungen" :pink="true">
        <h2 class="text-base font-medium text-primary-1 mb-4">Projekte</h2>
        <p v-if="dashboard?.projectPostings?.length === 0">
          Momentan haben Sie noch keine Projekte ausgeschrieben. Sobald Sie ein Projekt
          ausschreiben, kann die Talentsuche beginnen.
        </p>
        <ul v-if="dashboard?.projectPostings?.length">
          <li
            v-for="jobPosting in dashboard?.jobPostings"
            :key="jobPosting.id"
            class="link-list__item"
          >
            <company-job-posting-link :jobPosting="jobPosting"></company-job-posting-link>
          </li>
        </ul>
        <matchd-button class="w-full mt-8" :to="{ name: 'ProjectPostingCreate' }">
          Neues Projekt ausschreiben
        </matchd-button>
        <h2 class="text-base font-medium text-primary-1 mt-12 mb-4">Stellen</h2>
        <p v-if="dashboard?.jobPostings?.length === 0">
          Momentan haben Sie noch keine Stelle ausgeschrieben. Sobald Sie eine Stelle ausschreiben,
          kann die Talentsuche beginnen.
        </p>
        <ul v-if="dashboard?.jobPostings?.length">
          <li
            v-for="jobPosting in dashboard?.jobPostings"
            :key="jobPosting.id"
            class="link-list__item"
          >
            <company-job-posting-link :jobPosting="jobPosting"></company-job-posting-link>
          </li>
        </ul>
        <matchd-button class="w-full mt-8" :to="{ name: 'JobPostingCreate' }">
          Neue Stelle ausschreiben
        </matchd-button>
      </profile-section>
      <profile-section title="Ihre offenen Matches" :pink="true">
        <p v-if="dashboard?.requestedMatches?.length > 0">
          Sobald Ihre Matching-Anfrage vom Talent bestätigt wurde, kanns mit dem Kennenlernen
          weitergehen.
        </p>
        <p v-if="dashboard?.requestedMatches?.length === 0">
          Momentan haben Sie keine offenen Matches. Sobald Sie ein Match auslösen, werden Sie das
          hier sehen.
        </p>
        <company-match-group
          class="mt-4"
          :matches="dashboard?.requestedMatches"
        ></company-match-group>
      </profile-section>
      <profile-section title="Anfragen zum Matching" :pink="true">
        <p v-if="dashboard?.unconfirmedMatches.length > 0">
          Ihre Ausschreibung ist beliebt. Folgende Talente möchten Sie gerne kennenlernen.
        </p>
        <p v-if="dashboard?.unconfirmedMatches?.length === 0">
          Momentan haben Sie keine offenen Anfragen. Sobald ein Talent ein Match auslöst, werden Sie
          das hier sehen.
        </p>
        <company-match-group
          class="mt-4"
          :matches="dashboard?.unconfirmedMatches"
        ></company-match-group>
      </profile-section>
      <profile-section
        v-if="dashboard?.confirmedMatches?.length > 0"
        title="Hier hats gematchd!"
        :pink="true"
      >
        <company-match-group :matches="dashboard?.confirmedMatches"></company-match-group>
      </profile-section>
    </div>
  </div>
</template>

<script lang="ts">
import CompanyLogo from "@/components/CompanyLogo.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import type { User, Attachment, Dashboard } from "api";
import { Options, prop, Vue } from "vue-class-component";
import { AttachmentKey } from "@/api/models/types";
import { replaceStack } from "@/helpers/replaceStack";
import ProfileSection from "@/components/ProfileSection.vue";
import CompanyJobPostingLink from "@/components/dashboard/CompanyJobPostingLink.vue";
import CompanyMatchGroup from "@/components/dashboard/CompanyMatchGroup.vue";

class Props {
  dashboard = prop<{ data: Dashboard }>({ required: true });
}

@Options({
  components: {
    CompanyLogo,
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
    ProfileSection,
    CompanyJobPostingLink,
    CompanyMatchGroup,
  },
})
export default class CompanyDashboard extends Vue.with(Props) {
  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get avatar(): Attachment | undefined {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.CompanyAvatar,
      })[0] ||
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.CompanyAvatarFallback,
      })[0] ||
      ""
    );
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }
}
</script>

<style lang="postcss" scoped>
.link-list__item {
  @apply mb-4;
}
</style>

<template>
  <div v-if="jobPosting" class="jobPosting-detail flex flex-col min-h-content-with-fixed-bars">
    <div class="border-b border-orange-1 p-9">
      <button @click="$router.back()" class="text-black hover:text-orange-1 transition-colors">
        <ArrowBack class="w-5 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" /> Zurück zur Übersicht
      </button>
    </div>
    <div class="border-b border-orange-1 p-9">
      <h1 class="text-display-lg-fluid break-words text-orange-1">{{ jobPosting.displayTitle }}</h1>
    </div>
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Beschreibung</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <p v-html="nl2br(jobPosting.description)"></p>
      </div>
    </section>
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Stelle</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <p v-if="hasBranches">{{ branchesLabel }}</p>
        <p>Arbeitspensum {{ jobPosting.workload }}%</p>
        <p>{{ jobPosting.jobType.name }}</p>
        <p>
          <template v-if="jobPosting.jobToDate">
            {{ formatDate(jobPosting.jobFromDate) }} bis {{ formatDate(jobPosting.jobToDate) }}
          </template>
          <template v-else> ab {{ jobPosting.jobFromDate }} </template>
        </p>
        <p
          v-if="jobPosting.url"
          class="flex items-center mt-4 text-black hover:text-orange-1 transition-colors"
        >
          <span class="material-icons mr-2">open_in_new</span>
          <a :href="jobPosting.url" target="_blank" class="underline">weitere Informationen</a>
        </p>
      </div>
    </section>

    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Das bringst du mit</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <template v-if="jobPosting.jobRequirements.length">
          <h3 class="text-heading-sm mb-3">Erforderlicher Abschluss</h3>
          <ul class="list-disc list-inside marker-orange-1 text-lg">
            <li v-for="jobRequirement in jobPosting.jobRequirements" :key="jobRequirement.id">
              {{ jobRequirement.name }}
            </li>
          </ul>
        </template>

        <template v-if="jobPosting.languages?.length">
          <h3 class="text-heading-sm mb-3 mt-8">Sprachen</h3>
          <ul class="list-disc list-inside marker-orange-1 text-lg">
            <li v-for="language in jobPosting.languages" :key="language.id">
              {{ language.language.name }} {{ language.languageLevel.level }}
            </li>
          </ul>
        </template>

        <template v-if="jobPosting.skills?.length">
          <h3 class="text-heading-sm mb-3 mt-8">Skills</h3>
          <ul class="list-disc list-inside marker-orange-1 text-lg">
            <li v-for="skill in jobPosting.skills" :key="skill.id">{{ skill.name }}</li>
          </ul>
        </template>
      </div>
    </section>
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Unternehmen</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <router-link
          :to="{
            name: detailSiteLink(jobPosting.company.type),
            params: { slug: jobPosting.company.slug },
          }"
        >
          <address class="not-italic text-black hover:text-orange-1 transition-colors flex text-lg">
            <div>
              <h3 class="text-heading-sm mb-3">
                {{ jobPosting.company.name }}
              </h3>
              {{ jobPosting.company.street }}<br />{{ jobPosting.company.zip }}
              {{ jobPosting.company.city }}
            </div>
            <IconArrow class="w-8 ml-8" />
          </address>
        </router-link>
      </div>
    </section>
    <section class="flex-grow lg:flex p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Deine Ansprechperson für Fragen</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <p>
          <span class="block text-heading-sm mb-3"
            >{{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }}</span
          >
          <a
            :href="`mailto:${jobPosting.employee?.email}`"
            target="_blank"
            class="underline font-medium text-black hover:text-orange-1 transition-colors"
            >{{ jobPosting.employee?.email }}</a
          >
        </p>
      </div>
    </section>
    <teleport to="footer">
      <MatchingBar>
        <template v-if="matchType === matchTypeEnum.HalfOwnMatch">
          Du hast bereits Interesse gezeigt, fingers crossed! 🤞
        </template>
        <template v-else-if="matchType === matchTypeEnum.FullMatch"
          >Gratulation, it’s a Match!</template
        >
        <MatchdButton v-else-if="matchType === matchTypeEnum.HalfMatch" @click="onClickMatch">
          Match bestätigen
        </MatchdButton>
        <MatchdButton v-else @click="onClickMatch">Mit dieser Stelle matchen</MatchdButton>
      </MatchingBar>
    </teleport>
    <JobPostingMatchModal
      v-if="showConfirmationModal"
      :user="user"
      :jobPosting="jobPosting"
      :loading="matchLoading"
      :matchType="matchType"
      @clickConfirm="onClickMatchConfirm"
      @clickCancel="onClickCancel"
    />
    <JobPostingFullMatchModal
      v-if="showFullMatchModal"
      :jobPosting="jobPosting"
      @clickClose="onClickClose"
    />
  </div>
</template>

<script lang="ts">
import ArrowBack from "@/assets/icons/arrow-back.svg";
import IconArrow from "@/assets/icons/arrow.svg";
import { ProfileType } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import JobPostingFullMatchModal from "@/components/modals/JobPostingFullMatchModal.vue";
import JobPostingMatchModal from "@/components/modals/JobPostingMatchModal.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { formatDate } from "@/helpers/formatDate";
import { nl2br } from "@/helpers/nl2br";
import { replaceStack } from "@/helpers/replaceStack";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { JobPosting, User } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    ArrowBack,
    IconArrow,
    MatchdButton,
    MatchdToggle,
    MatchingBar,
    JobPostingMatchModal,
    JobPostingFullMatchModal,
  },
})
export default class JobPostingDetail extends Vue {
  meta = setup(() => useMeta({}));
  showConfirmationModal = false;
  showFullMatchModal = false;

  get branchesLabel(): string {
    return this.jobPosting?.branches.map((branch) => branch.name).join(", ") || "";
  }

  get hasBranches(): boolean {
    return this.jobPosting ? this.jobPosting?.branches.length > 0 : false;
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get matchLoading(): boolean {
    return this.$store.getters["matchLoading"];
  }

  get jobPosting(): JobPosting | null {
    return this.$store.getters["jobPostingDetail"];
  }

  get matchTypeEnum(): typeof MatchTypeEnum {
    return MatchTypeEnum;
  }

  get matchType(): MatchTypeEnum {
    if (this.jobPosting?.matchStatus === null) {
      return MatchTypeEnum.EmptyMatch;
    } else if (
      this.jobPosting?.matchStatus?.confirmed === false &&
      this.jobPosting?.matchStatus?.initiator === ProfileType.Company
    ) {
      return MatchTypeEnum.HalfMatch;
    } else if (
      this.jobPosting?.matchStatus?.confirmed === false &&
      this.jobPosting?.matchStatus?.initiator === ProfileType.Student
    ) {
      return MatchTypeEnum.HalfOwnMatch;
    } else {
      return MatchTypeEnum.FullMatch;
    }
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  formatDate(isoString: string): string {
    return formatDate(isoString, "LLLL yyyy");
  }

  nl2br(text: string): string {
    return nl2br(text);
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    if (to.params.slug) {
      await this.loadData(String(to.params.slug));
    }
    next();
  }

  async mounted(): Promise<void> {
    if (this.$route.params.slug) {
      await this.loadData(String(this.$route.params.slug));
      calculateMargins();
    }
  }

  async loadData(slug: string): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.JOB_POSTING, { slug });
      this.meta.meta.title = `${this.jobPosting?.title} bei ${this.jobPosting?.company.name}`;
      this.showFullMatchModal = this.matchType === MatchTypeEnum.FullMatch;
    } catch (e) {
      this.$router.replace("/404");
    }
  }

  async mutateMatch(): Promise<void> {
    if (this.jobPosting?.id) {
      await this.$store.dispatch(ActionTypes.MATCH_JOB_POSTING, {
        jobPosting: {
          id: this.jobPosting.id,
        },
      });
      await this.loadData(String(this.$route.params.slug));
      this.showFullMatchModal = this.matchType === MatchTypeEnum.FullMatch;
      this.showConfirmationModal = false;
    }
  }

  async onClickMatchConfirm(): Promise<void> {
    await this.mutateMatch();
  }

  onClickCancel(): void {
    this.showConfirmationModal = false;
  }

  onClickClose(): void {
    this.showFullMatchModal = false;
  }

  onClickMatch(): void {
    this.showConfirmationModal = true;
  }
  detailSiteLink(type: string) {
    return type == "UNIVERSITY" ? "UniversityDetail" : "CompanyDetail";
  }
}
</script>

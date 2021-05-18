<template>
  <div
    v-if="jobPosting"
    class="jobPosting-detail text-orange-1 flex flex-col xl:min-h-content-with-fixed-bars mb-fixed-footer"
  >
    <div class="border-b border-orange-1 p-9">
      <button @click="$router.back()">Zurück zur Übersicht</button>
    </div>
    <div class="border-b border-orange-1 p-9">
      <h1 class="text-display-lg-fluid break-words">{{ jobPosting.title }}</h1>
    </div>
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0">Beschreibung</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <p v-html="nl2br(jobPosting.description)"></p>
      </div>
    </section>
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0">Stelle</h2>
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
        <p v-if="jobPosting.url" class="flex items-center mt-4">
          <span class="material-icons mr-2">open_in_new</span>
          <a :href="jobPosting.url" target="_blank" class="underline">weitere Informationen</a>
        </p>
      </div>
    </section>

    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0">Das bringst du mit</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <template v-if="jobPosting.jobRequirements.length">
          <h3 class="text-heading-sm mb-3">Erforderlicher Abschluss</h3>
          <ul class="list-disc list-inside">
            <li v-for="jobRequirement in jobPosting.jobRequirements" :key="jobRequirement.id">
              {{ jobRequirement.name }}
            </li>
          </ul>
        </template>

        <template v-if="jobPosting.languages?.length">
          <h3 class="text-heading-sm mb-3">Sprachen</h3>
          <ul class="list-disc list-inside">
            <li v-for="language in jobPosting.languages" :key="language.id">
              {{ language.language.name }} {{ language.languageLevel.level }}
            </li>
          </ul>
        </template>

        <template v-if="jobPosting.skills?.length">
          <h3 class="text-heading-sm mb-3">Skills</h3>
          <ul class="list-disc list-inside">
            <li v-for="skill in jobPosting.skills" :key="skill.id">{{ skill }}</li>
          </ul>
        </template>
      </div>
    </section>
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0">Unternehmen</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <router-link :to="{ name: 'CompanyDetail', params: { slug: jobPosting.company.slug } }">
          <address class="not-italic">
            <h3 class="text-heading-sm">{{ jobPosting.company.name }}</h3>
            {{ jobPosting.company.street }}<br />{{ jobPosting.company.zip }}
            {{ jobPosting.company.city }}
          </address>
        </router-link>
      </div>
    </section>
    <section class="flex-grow lg:flex p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0">Deine Ansprechperson für Fragen</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <p>
          <span class="text-heading-sm"
            >{{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }}</span
          ><br />
          <a :href="`mailto:${jobPosting.employee?.email}`" target="_blank">{{
            jobPosting.employee?.email
          }}</a>
        </p>
      </div>
    </section>
    <MatchingBar class="fixed bottom-0 right-0 left-0">
      <template v-if="matchType === matchTypeEnum.HalfOwnMatch">
        Du hast den Startschuss abgegeben.
      </template>
      <template v-else-if="matchType === matchTypeEnum.FullMatch">
        Gratulation, ihr Matchd euch gegenseitig!
      </template>
      <MatchdButton v-else-if="matchType === matchTypeEnum.HalfMatch" @click="onClickMatch">
        Match bestätigen
      </MatchdButton>
      <MatchdButton v-else @click="onClickMatch">Startschuss fürs Matching</MatchdButton>
    </MatchingBar>
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
import { ProfileType } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import JobPostingFullMatchModal from "@/components/modals/JobPostingFullMatchModal.vue";
import JobPostingMatchModal from "@/components/modals/JobPostingMatchModal.vue";
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

      window.addEventListener("resize", this.calculateMargins, true);
      this.calculateMargins();
    }
  }

  unmounted(): void {
    window.removeEventListener("resize", this.calculateMargins, true);
  }

  calculateMargins(): void {
    const root = document.documentElement;
    const matchingBarHeight = (document.querySelector(".matching-bar") as HTMLElement).offsetHeight;
    root.style.setProperty("--contentMarginTop", `0px`);
    root.style.setProperty("--contentMarginBottom", `${matchingBarHeight}px`);
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
      this.calculateMargins();
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
}
</script>

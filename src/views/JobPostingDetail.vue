<template>
  <div
    v-if="jobPosting"
    class="jobPosting-detail text-orange-1 flex flex-col min-h-screen mb-fixed-footer"
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
        <p>{{ jobPosting.branch.name }}</p>
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

        <template v-if="jobPosting.languages.length">
          <h3 class="text-heading-sm mb-3">Sprachen</h3>
          <ul class="list-disc list-inside">
            <li v-for="language in jobPosting.languages" :key="language.id">
              {{ language.language.name }} {{ language.languageLevel.level }}
            </li>
          </ul>
        </template>

        <template v-if="jobPosting.skills.length">
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
    <MatchingBar
      class="fixed bottom-0 right-0 left-0"
      :showExplanation="showExplanation"
      type="jobposting"
    >
      <MatchdButton v-if="!startShotFired" @click="onClickMatch"
        >Startschuss fürs Matching</MatchdButton
      >
      <template v-else>Du hast den Startschuss abgegeben.</template>
    </MatchingBar>
    <MatchingModal v-if="showConfirmation">
      <h2 class="text-heading-sm mb-3">Hallo Leonie</h2>
      <p class="mb-3">
        Cool! Das ist der erste Schritt zum gegenseitigen Matching. Nach dem Klick auf "Freigeben",
        bekommt
        <strong>{{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }}</strong>
        von <strong>{{ jobPosting.company.name }}</strong> den Link zu deinem Profil.<br />Sobald
        {{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }} dein Profil
        angesehen und es ebenfalls interessant findet, schicken wir dir eine E-Mail mit weiteren
        Infos.
      </p>
      <p class="mb-3">
        Wenn du damit einverstanden bist, werden wir diese Daten von dir bekannt geben:
      </p>

      <label
        ><input type="checkbox" v-model="permissionGranted" /> Deine Kontaktdaten und Zertifikate
        freigeben</label
      >

      <template v-slot:footer>
        <MatchdButton @click="onClickCancel" class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
          >Abbrechen</MatchdButton
        >
        <MatchdButton
          @click="onClickMatchConfirm"
          :disabled="!permissionGranted"
          class="block w-full md:w-auto"
          >Freigeben</MatchdButton
        >
      </template>
    </MatchingModal>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import { nl2br } from "@/helpers/nl2br";
import { replaceStack } from "@/helpers/replaceStack";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { JobPosting } from "api";
import { DateTime } from "luxon";
import { Options, Vue } from "vue-class-component";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    MatchdButton,
    MatchingBar,
    MatchingModal,
  },
})
export default class JobPostingDetail extends Vue {
  showExplanation = true;
  showConfirmation = false;
  startShotFired = false;
  permissionGranted = false;

  get jobPosting(): JobPosting | null {
    return this.$store.getters["jobPostingDetail"];
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  formatDate(isoString: string): string {
    const date = DateTime.fromISO(isoString).setLocale("de-CH");
    return date.toFormat("LLLL yyyy");
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
    root.style.setProperty("--contentMarginBottom", `${matchingBarHeight}px`);
  }

  async loadData(slug: string): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.JOB_POSTING, { slug });
    } catch (e) {
      this.$router.replace("/404");
    }
  }

  onClickCancel(): void {
    this.showConfirmation = false;
  }

  onClickMatchConfirm(): void {
    this.showConfirmation = false;
    this.startShotFired = true;
  }

  onClickMatch(): void {
    this.showExplanation = false;
    this.showConfirmation = true;
    this.$nextTick(() => {
      this.calculateMargins();
    });
  }
}
</script>

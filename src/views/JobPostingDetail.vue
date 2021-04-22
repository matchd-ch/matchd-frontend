<template>
  <div v-if="jobPosting" class="jobPosting-detail text-orange-1 flex flex-col min-h-screen">
    <div class="border-b border-orange-1 p-9">
      <button @click="$router.back()">Zurück zur Übersicht</button>
    </div>
    <div class="border-b border-orange-1 p-9">
      <h1 class="text-display-lg-fluid">{{ jobPosting.title }}</h1>
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
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
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
  },
})
export default class JobPostingDetail extends Vue {
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
    }
  }

  async loadData(slug: string): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.JOB_POSTING, { slug });
    } catch (e) {
      this.$router.replace("/404");
    }
  }
}
</script>

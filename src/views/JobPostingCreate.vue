<template>
  <div
    v-if="(requestedCurrentJobPosting && currentJobPosting) || !requestedCurrentJobPosting"
    class="jobposting min-h-screen text-primary-1"
  >
    <div class="grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-home gap-x-4 lg:gap-x-5 lg:border-b">
      <h1
        class="text-display-xl-fluid col-start-1 col-span-4 row-start-1 border-r flex items-center px-4 lg:px-5 py-10"
      >
        Stelle
      </h1>
      <div
        class="col-start-5 col-span-4 row-start-1 text-display-xl-fluid lg:hidden flex items-center justify-center px-4 lg:px-5 py-10"
      >
        <template v-if="currentStep <= 3">{{ currentStep }}</template>
      </div>
      <h2
        class="text-display-xs-fluid flex items-center col-start-1 lg:col-start-5 col-span-8 row-start-3 lg:row-start-1 border-t lg:border-t-0 lg:border-r flex items-center px-4 lg:px-8 py-10"
      >
        <span v-if="currentStep <= 3" class="text-display-xl-fluid mr-8 hidden lg:inline">{{
          currentStep
        }}</span>
        <template v-if="currentStep === 1">Ausschreibung</template>
        <template v-if="currentStep === 2">Anforderungen</template>
        <template v-if="currentStep === 3">Kontakt</template>
      </h2>
      <div class="col-start-13 col-span-4 hidden lg:block"></div>
    </div>
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="jobPostingCreateComponent"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:px-8 px-4 lg:px-5 py-12"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { parseStepName } from "@/helpers/parseStepName";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { MutationTypes } from "@/store/modules/jobposting/mutation-types";
import JobPostingStep1 from "@/views/jobposting/JobPostingStep1.vue";
import JobPostingStep2 from "@/views/jobposting/JobPostingStep2.vue";
import JobPostingStep3 from "@/views/jobposting/JobPostingStep3.vue";
import { Options, Vue } from "vue-class-component";
import type { JobPosting as JobPostingType } from "api";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    JobPostingStep1,
    JobPostingStep2,
    JobPostingStep3,
  },
})
export default class JobPostingCreate extends Vue {
  urlStepNumber: number | null = null;
  requestedCurrentJobPosting = false;

  get paramStrings(): typeof ParamStrings {
    return ParamStrings;
  }

  get currentStep(): number | null {
    return this.urlStepNumber;
  }

  get jobPostingCreateComponent(): string {
    if (this.urlStepNumber) {
      return `JobPostingStep${this.currentStep}`;
    }
    return "";
  }

  get currentJobPosting(): JobPostingType | null {
    return this.$store.getters["currentJobPosting"];
  }

  get jobPostingId(): string {
    return this.$store.getters["jobPostingId"];
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    this.urlStepNumber = parseStepName(String(to.params.step));
    if (to.params.id && Number(to.params.id)) {
      await this.loadJobPostingWithId(String(to.params.id));
    } else if (to.params.id && to.params.id === ParamStrings.NEW) {
      this.clearCurrentJobPosting();
    }
    next();
  }

  mounted(): void {
    this.urlStepNumber = parseStepName(String(this.$route.params.step));
    if (this.$route.params.id && this.$route.params.id === ParamStrings.NEW) {
      this.clearCurrentJobPosting();
    }
  }

  clearCurrentJobPosting(): void {
    this.$store.commit(MutationTypes.CLEAR_CURRENT_JOBPOSTING);
  }

  async loadJobPostingWithId(jobPostingId: string): Promise<void> {
    this.requestedCurrentJobPosting = true;
    await this.$store.dispatch(ActionTypes.JOBPOSTING, { id: jobPostingId });
  }
}
</script>

<style></style>

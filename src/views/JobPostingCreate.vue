<template>
  <ProfileNavigation>
    <ProfileNavigationItem :to="{ params: { step: 'schritt1' } }">
      Ausschreibung
    </ProfileNavigationItem>
    <ProfileNavigationItem
      :to="{ params: { step: 'schritt2' } }"
      :disabled="!currentJobPosting || currentJobPosting?.formStep < 2"
    >
      Anforderungen
    </ProfileNavigationItem>
    <ProfileNavigationItem
      :to="{ params: { step: 'schritt3' } }"
      :disabled="!currentJobPosting || currentJobPosting?.formStep < 3"
    >
      Kontakt
    </ProfileNavigationItem>
  </ProfileNavigation>
  <div
    v-if="(requestedCurrentJobPosting && currentJobPosting) || !requestedCurrentJobPosting"
    class="jobposting min-h-screen text-primary-1"
  >
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="jobPostingCreateComponent"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:px-8 px-4 lg:px-5 py-12"
        @submitComplete="onSubmitComplete"
        @navigateBack="onNavigateBack"
        @changeDirty="onChangeDirty"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import ProfileNavigation from "@/components/ProfileNavigation.vue";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";
import { parseStepName } from "@/helpers/parseStepName";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { MutationTypes } from "@/store/modules/jobposting/mutation-types";
import JobPostingStep1 from "@/views/jobposting/JobPostingStep1.vue";
import JobPostingStep2 from "@/views/jobposting/JobPostingStep2.vue";
import JobPostingStep3 from "@/views/jobposting/JobPostingStep3.vue";
import { Options, setup, Vue } from "vue-class-component";
import type { JobPosting as JobPostingType } from "api";
import { useMeta } from "vue-meta";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate", "beforeRouteLeave"]);

@Options({
  components: {
    ProfileNavigation,
    ProfileNavigationItem,
    JobPostingStep1,
    JobPostingStep2,
    JobPostingStep3,
  },
})
export default class JobPostingCreate extends Vue {
  meta = setup(() => useMeta({}));
  dirty = false;
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
    if (to.params?.slug && to.params?.slug !== ParamStrings.NEW) {
      await this.loadJobPostingWithSlug(String(to.params.slug));
    } else {
      this.clearCurrentJobPosting();
    }
    this.confirmWhenDirty(next);
  }

  async beforeRouteLeave(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    this.confirmWhenDirty(next);
  }

  mounted(): void {
    this.urlStepNumber = parseStepName(String(this.$route.params.step));
    if (this.$route.params?.slug && this.$route.params?.slug !== ParamStrings.NEW) {
      this.meta.meta.title = `Stelle bearbeiten - ${this.currentJobPosting?.title}`;
    } else {
      this.meta.meta.title = "Stelle ausschreiben";
      this.clearCurrentJobPosting();
    }
  }

  async onSubmitComplete(): Promise<void> {
    this.dirty = false;
    if (this.$route.params?.slug === ParamStrings.NEW) {
      await this.$router.replace({
        params: {
          step: `${ParamStrings.STEP}1`,
          slug: this.$store.getters["jobPostingState"].slug,
        },
      });
    }
    if (this.currentJobPosting?.formStep && this.currentJobPosting?.formStep >= 3) {
      this.$router.push({ name: "Dashboard" });
    } else if (this.currentStep) {
      this.$router.push({
        params: {
          step: `${ParamStrings.STEP}${this.currentStep + 1}`,
          slug: this.$store.getters["jobPostingState"].slug,
        },
      });
    }
  }

  async onNavigateBack(): Promise<void> {
    if (this.currentJobPosting?.formStep && this.currentJobPosting?.formStep >= 3) {
      this.$router.push({ name: "Dashboard" });
    } else if (this.currentStep) {
      this.$router.push({
        params: {
          step: `${ParamStrings.STEP}${this.currentStep - 1}`,
        },
      });
    }
  }

  onChangeDirty(dirty: boolean): void {
    this.dirty = dirty;
  }

  confirmWhenDirty(next: NavigationGuardNext): void {
    if (this.dirty) {
      const confirmed = window.confirm(
        "Es sind ungespeicherte Änderungen im Formular enthalten. Seite trotzdem verlassen?"
      );
      this.clearCurrentJobPosting();
      next(confirmed);
    } else {
      next();
    }
  }

  clearCurrentJobPosting(): void {
    this.$store.commit(MutationTypes.CLEAR_CURRENT_JOBPOSTING);
  }

  async loadJobPostingWithSlug(slug: string): Promise<void> {
    this.requestedCurrentJobPosting = true;
    await this.$store.dispatch(ActionTypes.JOBPOSTING, { slug });
  }
}
</script>

<style></style>

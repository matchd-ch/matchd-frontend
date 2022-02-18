<template>
  <teleport to="#teleporter-app-header">
    <ProfileNavigation>
      <ProfileNavigationItem :to="{ params: { step: 'schritt1' } }" :active="currentStep === 1">
        Ausschreibung
      </ProfileNavigationItem>
      <ProfileNavigationItem
        :to="{ params: { step: 'schritt2' } }"
        :active="currentStep === 2"
        :disabled="!currentProjectPosting || currentProjectPosting?.formStep < 2"
      >
        Weitere Informationen
      </ProfileNavigationItem>
      <ProfileNavigationItem
        :to="{ params: { step: 'schritt3' } }"
        :disabled="!currentProjectPosting || currentProjectPosting?.formStep < 3"
        :active="currentStep === 3"
      >
        <template v-if="isStudent">Sichtbarkeit</template>
        <template v-else>Kontakt und Sichtbarkeit</template>
      </ProfileNavigationItem>
    </ProfileNavigation>
  </teleport>
  <div
    v-if="
      (requestedCurrentProjectPosting && currentProjectPosting) || !requestedCurrentProjectPosting
    "
    class="projectposting min-h-content-with-fixed-bars"
  >
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="projectPostingCreateComponent"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:px-8 px-4 lg:px-5 py-12"
        @submit-complete="onSubmitComplete"
        @navigate-back="onNavigateBack"
        @change-dirty="onChangeDirty"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import ProfileNavigation from "@/components/ProfileNavigation.vue";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";
import { parseStepName } from "@/helpers/parseStepName";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import { MutationTypes } from "@/store/modules/projectposting/mutation-types";
import ProjectPostingStep1 from "@/views/projectposting/ProjectPostingStep1.vue";
import ProjectPostingStep2 from "@/views/projectposting/ProjectPostingStep2.vue";
import ProjectPostingStep3 from "@/views/projectposting/ProjectPostingStep3.vue";
import type { ProjectPosting as ProjectPostingType } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate", "beforeRouteLeave"]);

@Options({
  components: {
    ProfileNavigation,
    ProfileNavigationItem,
    ProjectPostingStep1,
    ProjectPostingStep2,
    ProjectPostingStep3,
  },
})
export default class ProjectPostingCreate extends Vue {
  meta = setup(() => useMeta({}));
  dirty = false;
  urlStepNumber: number | null = null;
  requestedCurrentProjectPosting = false;

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get paramStrings(): typeof ParamStrings {
    return ParamStrings;
  }

  get currentStep(): number | null {
    return this.urlStepNumber;
  }

  get projectPostingCreateComponent(): string {
    if (this.urlStepNumber) {
      return `ProjectPostingStep${this.currentStep}`;
    }
    return "";
  }

  get currentProjectPosting(): ProjectPostingType | null {
    return this.$store.getters["currentProjectPosting"];
  }

  get projectPostingId(): string {
    return this.$store.getters["projectPostingId"];
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    if (this.dirty && !this.confirmLeaveDirtyForm()) {
      next(false);
    } else {
      next();
      this.urlStepNumber = parseStepName(String(to.params.step));
      if (to.params?.slug && to.params?.slug !== ParamStrings.NEW) {
        await this.loadProjectPostingWithSlug(String(to.params.slug));
      } else {
        this.clearCurrentProjectPosting();
      }
    }
  }

  async beforeRouteLeave(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    if (this.dirty && !this.confirmLeaveDirtyForm()) {
      next(false);
    } else {
      next();
    }
  }

  mounted(): void {
    this.urlStepNumber = parseStepName(String(this.$route.params.step));
    if (this.$route.params?.slug && this.$route.params?.slug !== ParamStrings.NEW) {
      this.meta.meta.title = `Projekt bearbeiten - ${this.currentProjectPosting?.title}`;
      this.loadProjectPostingWithSlug(String(this.$route.params.slug));
    } else {
      this.meta.meta.title = "Projekt ausschreiben";
      this.clearCurrentProjectPosting();
    }

    // this.urlStepNumber = parseStepName(String(to.params.step));
    // if (to.params?.slug && to.params?.slug !== ParamStrings.NEW) {
    //   await this.loadProjectPostingWithSlug(String(to.params.slug));
    // } else {
    //   this.clearCurrentProjectPosting();
    // }
  }

  async onSubmitComplete(): Promise<void> {
    this.dirty = false;
    if (this.$route.params?.slug === ParamStrings.NEW) {
      await this.$router.replace({
        params: {
          step: `${ParamStrings.STEP}1`,
          slug: this.$store.getters["projectPostingState"].slug,
        },
      });
    }
    if (this.currentProjectPosting?.formStep && this.currentProjectPosting?.formStep >= 3) {
      this.$router.push({ name: "Dashboard" });
    } else if (this.currentStep) {
      this.$router.push({
        params: {
          step: `${ParamStrings.STEP}${this.currentStep + 1}`,
          slug: this.$store.getters["projectPostingState"].slug,
        },
      });
    }
  }

  async onNavigateBack(): Promise<void> {
    if (this.currentProjectPosting?.formStep && this.currentProjectPosting?.formStep >= 3) {
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

  confirmLeaveDirtyForm(): boolean {
    return window.confirm(
      "Auf dieser Seite gibt es ungespeicherte Angaben. Seite trotzdem verlassen?"
    );
  }

  clearCurrentProjectPosting(): void {
    this.$store.commit(MutationTypes.CLEAR_CURRENT_PROJECTPOSTING);
  }

  async loadProjectPostingWithSlug(slug: string): Promise<void> {
    this.requestedCurrentProjectPosting = true;
    await this.$store.dispatch(ActionTypes.PROJECTPOSTING, { slug });
  }
}
</script>

<style lang="postcss" scoped>
.projectposting,
.profile-navigation-wrapper {
  &,
  & :deep(*) {
    --color-primary-1: var(--color-orange-1);
  }
}
</style>

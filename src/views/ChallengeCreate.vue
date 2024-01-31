<template>
  <teleport to="#teleporter-app-header">
    <ProfileNavigation>
      <ProfileNavigationItem :to="{ params: { step: 'schritt1' } }" :active="currentStep === 1">
        Ausschreibung
      </ProfileNavigationItem>
      <ProfileNavigationItem
        :to="{ params: { step: 'schritt2' } }"
        :active="currentStep === 2"
        :disabled="!currentChallenge || currentChallenge?.formStep < 2"
      >
        Weitere Informationen
      </ProfileNavigationItem>
      <ProfileNavigationItem
        :to="{ params: { step: 'schritt3' } }"
        :disabled="!currentChallenge || currentChallenge?.formStep < 3"
        :active="currentStep === 3"
      >
        <template v-if="isStudent">Sichtbarkeit</template>
        <template v-else>Kontakt und Sichtbarkeit</template>
      </ProfileNavigationItem>
    </ProfileNavigation>
  </teleport>
  <div
    v-if="(requestedCurrentChallenge && currentChallenge) || !requestedCurrentChallenge"
    class="challenge min-h-content-with-fixed-bars"
  >
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="challengeCreateComponent"
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
import { Routes } from "@/router/index";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes } from "@/store/modules/challenge/action-types";
import { MutationTypes } from "@/store/modules/challenge/mutation-types";
import ChallengeStep1 from "@/views/challenge/ChallengeStep1.vue";
import ChallengeStep2 from "@/views/challenge/ChallengeStep2.vue";
import ChallengeStep3 from "@/views/challenge/ChallengeStep3.vue";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate", "beforeRouteLeave"]);

@Options({
  components: {
    ProfileNavigation,
    ProfileNavigationItem,
    ChallengeStep1,
    ChallengeStep2,
    ChallengeStep3,
  },
})
export default class ChallengeCreate extends Vue {
  meta = setup(() => useMeta({}));
  dirty = false;
  urlStepNumber: number | null = null;
  requestedCurrentChallenge = false;

  get isStudent() {
    return this.$store.getters["isStudent"];
  }

  get paramStrings() {
    return ParamStrings;
  }

  get currentStep() {
    return this.urlStepNumber;
  }

  get challengeCreateComponent() {
    if (this.urlStepNumber) {
      return `ChallengeStep${this.currentStep}`;
    }
    return "";
  }

  get currentChallenge() {
    return this.$store.getters["currentChallenge"];
  }

  get challengeId() {
    return this.$store.getters["challengeId"];
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) {
    if (this.dirty && !this.confirmLeaveDirtyForm()) {
      next(false);
    } else {
      next();
      this.urlStepNumber = parseStepName(String(to.params.step));
      if (to.params?.slug && to.params?.slug !== ParamStrings.NEW) {
        await this.loadChallengeWithSlug(String(to.params.slug));
      } else {
        this.clearCurrentChallenge();
      }
    }
  }

  async beforeRouteLeave(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) {
    if (this.dirty && !this.confirmLeaveDirtyForm()) {
      next(false);
    } else {
      next();
    }
  }

  mounted() {
    this.urlStepNumber = parseStepName(String(this.$route.params.step));
    if (this.$route.params?.slug && this.$route.params?.slug !== ParamStrings.NEW) {
      this.meta.meta.title = `Challenge bearbeiten - ${this.currentChallenge?.title}`;
      this.loadChallengeWithSlug(String(this.$route.params.slug));
    } else {
      this.meta.meta.title = "Challenge ausschreiben";
      this.clearCurrentChallenge();
    }
  }

  async onSubmitComplete() {
    this.dirty = false;
    if (this.$route.params?.slug === ParamStrings.NEW) {
      await this.$router.replace({
        params: {
          step: `${ParamStrings.STEP}1`,
          slug: this.$store.getters["challengeState"].slug,
        },
      });
    }
    if (this.currentChallenge?.formStep && this.currentChallenge?.formStep >= 3) {
      this.$router.push({ name: Routes.DASHBOARD });
    } else if (this.currentStep) {
      this.$router.push({
        params: {
          step: `${ParamStrings.STEP}${this.currentStep + 1}`,
          slug: this.$store.getters["challengeState"].slug,
        },
      });
    }
  }

  async onNavigateBack() {
    if (this.currentChallenge?.formStep && this.currentChallenge?.formStep >= 3) {
      this.$router.push({ name: Routes.DASHBOARD });
    } else if (this.currentStep) {
      this.$router.push({
        params: {
          step: `${ParamStrings.STEP}${this.currentStep - 1}`,
        },
      });
    }
  }

  onChangeDirty(dirty: boolean) {
    this.dirty = dirty;
  }

  confirmLeaveDirtyForm() {
    return window.confirm(
      "Auf dieser Seite gibt es ungespeicherte Angaben. Seite trotzdem verlassen?",
    );
  }

  clearCurrentChallenge() {
    this.$store.commit(MutationTypes.CLEAR_CURRENT_CHALLENGE);
  }

  async loadChallengeWithSlug(slug: string) {
    this.requestedCurrentChallenge = true;
    await this.$store.dispatch(ActionTypes.CHALLENGE, { slug });
  }
}
</script>

<style lang="postcss" scoped>
.challenge,
.profile-navigation-wrapper {
  &,
  & :deep(*) {
    --color-primary-1: var(--color-orange-1);
  }
}
</style>

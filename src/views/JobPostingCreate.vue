<template>
  <teleport to="#teleporter-app-header">
    <ProfileNavigation>
      <ProfileNavigationItem :to="{ params: { step: 'schritt1' } }" :active="currentStep === 1">
        Ausschreibung
      </ProfileNavigationItem>
      <ProfileNavigationItem
        :to="{ params: { step: 'schritt2' } }"
        :disabled="!currentJobPosting || currentJobPosting?.formStep < 2"
        :active="currentStep === 2"
      >
        Anforderungen
      </ProfileNavigationItem>
      <ProfileNavigationItem
        :to="{ params: { step: 'schritt3' } }"
        :disabled="!currentJobPosting || currentJobPosting?.formStep < 3"
        :active="currentStep === 3"
      >
        Kontakt und Sichtbarkeit
      </ProfileNavigationItem>
    </ProfileNavigation>
  </teleport>
  <div
    v-if="(requestedCurrentJobPosting && currentJobPosting) || !requestedCurrentJobPosting"
    class="jobposting min-h-content-with-fixed-bars"
  >
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <JobPostingStep2
        v-if="urlStepNumber === 2"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 px-4 lg:px-5 py-12"
        @submit-complete="onSubmitComplete"
        @navigate-back="onNavigateBack"
        @change-dirty="onChangeDirty"
      />
      <JobPostingStep3
        v-else-if="urlStepNumber === 3"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 px-4 lg:px-5 py-12"
        @submit-complete="onSubmitComplete"
        @navigate-back="onNavigateBack"
        @change-dirty="onChangeDirty"
      />
      <JobPostingStep1
        v-else
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 px-4 lg:px-5 py-12"
        @submit-complete="onSubmitComplete"
        @navigate-back="onNavigateBack"
        @change-dirty="onChangeDirty"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// import LoadingBox from "@/components/LoadingBox.vue";
import ProfileNavigation from "@/components/ProfileNavigation.vue";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";
import { parseStepName } from "@/helpers/parseStepName";
import { Routes } from "@/router/index";
import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { MutationTypes } from "@/store/modules/jobposting/mutation-types";
import JobPostingStep1 from "@/views/jobposting/JobPostingStep1.vue";
import JobPostingStep2 from "@/views/jobposting/JobPostingStep2.vue";
import JobPostingStep3 from "@/views/jobposting/JobPostingStep3.vue";
import { computed, onMounted, ref } from "vue";
import { useMeta } from "vue-meta";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const meta = useMeta({});
const dirty = ref(false);
const urlStepNumber = ref<number | null>(null);
const requestedCurrentJobPosting = ref(false);
const currentStep = computed(() => urlStepNumber.value);
const currentJobPosting = computed(() => store.getters["currentJobPosting"]);

onBeforeRouteUpdate(async (to, _from, next) => {
  if (dirty.value && !confirmLeaveDirtyForm()) {
    next(false);
  } else {
    next();
    urlStepNumber.value = parseStepName(String(to.params.step));
    if (to.params?.slug && to.params?.slug !== ParamStrings.NEW) {
      await loadJobPostingWithSlug(String(to.params.slug));
    } else {
      clearCurrentJobPosting();
    }
  }
});

onBeforeRouteLeave((_to, _from, next) => {
  if (dirty.value && !confirmLeaveDirtyForm()) {
    next(false);
  } else {
    next();
  }
});

onMounted(() => {
  urlStepNumber.value = parseStepName(String(route.params.step));
  if (route.params?.slug && route.params?.slug !== ParamStrings.NEW) {
    meta.meta.title = `Stelle bearbeiten - ${currentJobPosting.value?.title}`;
  } else {
    meta.meta.title = "Stelle ausschreiben";
    clearCurrentJobPosting();
  }
});

const onSubmitComplete = async () => {
  dirty.value = false;
  if (route.params?.slug === ParamStrings.NEW) {
    await router.replace({
      params: {
        step: `${ParamStrings.STEP}1`,
        slug: store.getters["jobPostingState"].slug,
      },
    });
  }
  if (currentJobPosting.value?.formStep && currentJobPosting.value?.formStep >= 3) {
    router.push({ name: Routes.DASHBOARD });
  } else if (currentStep.value) {
    router.push({
      params: {
        step: `${ParamStrings.STEP}${currentStep.value + 1}`,
        slug: store.getters["jobPostingState"].slug,
      },
    });
  }
};

const onNavigateBack = () => {
  if (currentJobPosting.value?.formStep && currentJobPosting.value?.formStep >= 3) {
    router.push({ name: Routes.DASHBOARD });
  } else if (currentStep.value) {
    router.push({
      params: {
        step: `${ParamStrings.STEP}${currentStep.value - 1}`,
      },
    });
  }
};

const onChangeDirty = (isDirty: boolean) => {
  dirty.value = isDirty;
};

const confirmLeaveDirtyForm = () => {
  return window.confirm(
    "Auf dieser Seite gibt es ungespeicherte Angaben. Seite trotzdem verlassen?"
  );
};

const clearCurrentJobPosting = () => {
  store.commit(MutationTypes.CLEAR_CURRENT_JOBPOSTING);
};

const loadJobPostingWithSlug = async (slug: string) => {
  requestedCurrentJobPosting.value = true;
  await store.dispatch(ActionTypes.JOBPOSTING, { slug });
};
</script>

<style lang="postcss" scoped>
.jobposting,
.profile-navigation-wrapper {
  &,
  & :deep(*) {
    --color-primary-1: var(--color-orange-1);
  }
}
</style>

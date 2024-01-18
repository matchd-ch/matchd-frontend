<template>
  <div class="posting-edit-link">
    <router-link
      :to="{
        name: routeName,
        params: params,
      }"
      class="hover:text-primary-1 transition-colors underline"
    >
      <h3 class="font-medium text-lg">
        {{ posting.displayTitle }}
        <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
      </h3>
    </router-link>
    <p v-if="challenge" class="text-sm">
      {{ challenge.challengeType.name }}
    </p>
    <p class="text-sm no-underline2">
      <template v-if="isPublic">
        <IconLoadingFull class="status-icon is-public" />
        veröffentlicht
      </template>
      <template v-else>
        <IconLoading class="status-icon" />
        Entwurf
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Challenge, JobPosting } from "@/api/models/types";
import { ChallengeState, JobPostingState } from "@/api/models/types";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import IconLoadingFull from "@/assets/icons/loading-full.svg";
import IconLoading from "@/assets/icons/loading.svg";
import { Routes } from "@/router";
import { computed } from "vue";

const props = defineProps<{
  posting: JobPosting | Challenge;
}>();

const jobPosting = computed(() =>
  props.posting.__typename === "JobPosting" ? props.posting : null
);
const challenge = computed(() => (props.posting.__typename === "Challenge" ? props.posting : null));

const isPublic = computed(() => {
  return (
    props.posting.state === JobPostingState.Public || props.posting.state === ChallengeState.Public
  );
});

const routeName = computed(() => {
  if (jobPosting.value) {
    return Routes.JOB_POSTING_CREATE;
  } else if (isPublic.value) {
    return Routes.CHALLENGE_DETAIL;
  } else {
    return Routes.CHALLENGE_CREATE;
  }
});

const params = computed(() => {
  return jobPosting.value || !isPublic.value
    ? { slug: props.posting.slug, step: "schritt1" }
    : { slug: props.posting.slug };
});
</script>
<style lang="postcss" scoped>
.posting-edit-link {
  display: inline-block;
  .status-icon {
    width: 12px;
    display: inline-block;
    margin-right: 2px;
    &.is-public {
      @apply text-green-1;
    }
  }
  .no-underline2 {
    text-decoration: none !important;
  }
}
</style>

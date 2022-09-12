<template>
  <router-link
    :to="{
      name: routeName,
      params: params,
    }"
    class="hover:text-primary-1 transition-colors underline"
  >
    <h3 class="font-medium text-lg">
      {{ posting.displayTitle }} {{ isPublic ? "" : " (Entwurf)" }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
    </h3>
    <p v-if="challenge" class="text-sm">
      {{ challenge.challengeType.name }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import type { Challenge, JobPosting } from "@/api/models/types";
import { ChallengeState, JobPostingState } from "@/api/models/types";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
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

<template>
  <router-link
    v-if="posting.company"
    :to="{
      name: jobPosting ? 'JobPostingDetail' : 'ChallengeDetail',
      params: { slug: posting.slug },
    }"
    class="hover:text-primary-1 transition-colors underline"
  >
    <h3 class="font-medium text-lg">
      {{ posting.displayTitle }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
    </h3>
    <p v-if="challenge" class="text-sm">{{ challenge.challengeType.name }}</p>
    <p v-if="jobPosting">
      {{ jobPosting.company.name }}
      <br />
      {{ jobPosting.company.zip }} {{ jobPosting.company.city }}
    </p>
  </router-link>
  <router-link
    v-else-if="challenge?.company"
    :to="{
      name: 'CompanyDetail',
      params: { slug: challenge.company.slug },
    }"
    class="hover:text-primary-1 transition-colors underline"
  >
    <h3 class="font-medium text-lg">
      {{ challenge.displayTitle }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
    </h3>
    <p class="text-sm">{{ challenge.challengeType.name }}</p>
    <p class="text-sm">{{ challenge.company.name }}</p>
  </router-link>
</template>

<script setup lang="ts">
import type { Challenge, JobPosting } from "@/api/models/types";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import { computed } from "vue";

const props = defineProps<{
  posting: JobPosting | Challenge;
}>();

const jobPosting = computed(() =>
  props.posting.__typename === "JobPosting" ? props.posting : null
);
const challenge = computed(() => (props.posting.__typename === "Challenge" ? props.posting : null));
</script>

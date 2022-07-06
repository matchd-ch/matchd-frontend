<template>
  <router-link
    v-if="posting.company"
    :to="{
      name: jobPosting ? 'JobPostingDetail' : 'ProjectPostingDetail',
      params: { slug: posting.slug },
    }"
    class="hover:text-primary-1 transition-colors underline"
  >
    <h3 class="font-medium text-lg">
      {{ posting.displayTitle }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
    </h3>
    <p v-if="projectPosting" class="text-sm">{{ projectPosting.projectType.name }}</p>
    <p v-if="jobPosting">
      {{ jobPosting.company.name }}
      <br />
      {{ jobPosting.company.zip }} {{ jobPosting.company.city }}
    </p>
  </router-link>
  <router-link
    v-else-if="projectPosting?.company"
    :to="{
      name: 'CompanyDetail',
      params: { slug: projectPosting.company.slug },
    }"
    class="hover:text-primary-1 transition-colors underline"
  >
    <h3 class="font-medium text-lg">
      {{ projectPosting.displayTitle }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
    </h3>
    <p class="text-sm">{{ projectPosting.projectType.name }}</p>
    <p class="text-sm">{{ projectPosting.company.name }}</p>
  </router-link>
</template>

<script setup lang="ts">
import type { JobPosting, ProjectPosting } from "@/api/models/types";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import { computed } from "vue";

const props = defineProps<{
  posting: JobPosting | ProjectPosting;
}>();

const jobPosting = computed(() =>
  props.posting.__typename === "JobPosting" ? props.posting : null
);
const projectPosting = computed(() =>
  props.posting.__typename === "ProjectPosting" ? props.posting : null
);
</script>

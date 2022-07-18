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
    <p v-if="projectPosting" class="text-sm">
      {{ projectPosting.projectType.name }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import type { JobPosting, ProjectPosting } from "@/api/models/types";
import { JobPostingState, ProjectPostingState } from "@/api/models/types";
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

const isPublic = computed(() => {
  return (
    props.posting.state === JobPostingState.Public ||
    props.posting.state === ProjectPostingState.Public
  );
});

const routeName = computed(() => {
  if (jobPosting.value) {
    return "JobPostingCreate";
  } else if (isPublic.value) {
    return "ProjectPostingDetail";
  } else {
    return "ProjectPostingCreate";
  }
});

const params = computed(() => {
  return jobPosting.value || !isPublic.value
    ? { slug: props.posting.slug, step: "schritt1" }
    : { slug: props.posting.slug };
});
</script>

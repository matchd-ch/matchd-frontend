<template>
  <ul
    class="search-result-project-posting-grid grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-px"
  >
    <ProjectPostingGridTile
      v-for="projectPosting in projectPostings"
      :key="projectPosting.id"
      :link-to="{ name: 'ProjectPostingDetail', params: { slug: projectPosting.slug } }"
      :color="color"
    >
      <h2 class="text-paragraph-lg font-medium mb-4">{{ projectPosting.title }}</h2>
      <p v-if="projectPosting.description" class="mb-2 text-paragraph-md">
        {{ projectPosting.description.slice(0, 100) }}
        <template v-if="projectPosting.description.length > 100">&hellip;</template>
      </p>
      <p v-if="projectPosting.keywords?.length" class="text-paragraph-md">
        {{ projectPosting.keywords.map((k) => k.name).join(", ") }}
      </p>
    </ProjectPostingGridTile>
  </ul>
</template>

<script setup lang="ts">
import { AttachmentKey } from "@/api/models/types";
import { ProjectPostingsProjectPostingFragment } from "@/api/queries/projectPostingsFragment.generated";
import ProjectPostingGridTile from "@/components/ProjectPostingGridTile.vue";
import { useStore } from "@/store";
import { computed } from "vue";

withDefaults(
  defineProps<{
    projectPostings: ProjectPostingsProjectPostingFragment[];
    color?: string;
  }>(),
  {
    color: "pink",
  }
);

const store = useStore();
const isStudent = computed(() => store.getters["isStudent"]);

const avatar = computed(() => {
  return (
    store.getters["attachmentsByKey"]({
      key: isStudent.value ? AttachmentKey.StudentAvatar : AttachmentKey.CompanyAvatar,
    })?.[0] ||
    store.getters["attachmentsByKey"]({
      key: isStudent.value
        ? AttachmentKey.StudentAvatarFallback
        : AttachmentKey.CompanyAvatarFallback,
    })?.[0] ||
    undefined
  );
});
</script>

<style lang="postcss" scoped>
@block search-result-project-posting-grid {
  @element match-status-helper {
    @apply absolute top-0 right-0 bottom-0 left-0;
    @apply rounded-full;
    @apply origin-center rotate-45;
  }

  @element match-status {
    @apply absolute right-0 top-1/2;
    @apply flex items-center justify-center;
    @apply rounded-full p-2;
    @apply text-white;
    @apply translate-x-1/2 -translate-y-1/2 -rotate-45;
    @apply bg-primary-1;
  }

  @element link {
    @apply block min-w-full min-h-full p-8 pb-4;

    &:visited {
      @apply text-grey-2;
    }

    &:hover {
      @apply text-white transition-colors;

      & .search-result-project-posting-grid__image-box {
        @apply border-white;
      }
    }
  }
}
</style>

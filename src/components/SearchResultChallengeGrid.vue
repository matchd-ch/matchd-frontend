<template>
  <ul class="search-result-challenge-grid grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-px">
    <ChallengeGridTile
      v-for="challenge in challenges"
      :key="challenge.id"
      :img-src="challenge.avatarUrl ?? undefined"
      :img-alt="challenge.title ?? undefined"
      :link-to="{ name: 'ChallengeDetail', params: { slug: challenge.slug } }"
      :color="color"
    >
      <h2 class="text-paragraph-lg font-medium mb-4">{{ challenge.title }}</h2>
      <p v-if="challenge.description" class="mb-2 text-paragraph-md">
        {{ challenge.description.slice(0, 100) }}
        <template v-if="challenge.description.length > 100">&hellip;</template>
      </p>
      <p v-if="challenge.keywords?.length" class="text-paragraph-md">
        {{ challenge.keywords.map((k) => k.name).join(", ") }}
      </p>
    </ChallengeGridTile>
  </ul>
</template>

<script setup lang="ts">
import { type ChallengesChallengeFragment } from "@/api/queries/challengesFragment.generated";
import ChallengeGridTile from "./ChallengeGridTile.vue";

withDefaults(
  defineProps<{
    challenges: ChallengesChallengeFragment[];
    color?: string;
  }>(),
  {
    color: "pink",
  }
);
</script>

<style lang="postcss" scoped>
@block search-result-challenge-grid {
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

      & .search-result-challenge-grid__image-box {
        @apply border-white;
      }
    }
  }
}
</style>

<template>
  <ul
    class="search-result-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-px"
    :class="{
      'search-result-grid--student': resultType === 'student',
      'search-result-grid--jobposting': resultType === 'jobposting',
      'search-result-grid--company': resultType === 'company',
    }"
  >
    <GridTile
      v-for="match in formattedMatches"
      :key="match.id"
      :link-to="{ name: toRouteName, params: { slug: match.id }, query: queryParams }"
      :img-src="replaceStack(match.img, resultType === 'student' ? 'avatar' : 'logo')"
      :img-alt="`${match.name} ${resultType === 'student' ? 'Profilbild' : 'Logo'}`"
      :color="color"
    >
      <template #match-status>
        <div v-if="match.matchStatus?.initiator" class="search-result-grid__match-status-helper">
          <div class="search-result-grid__match-status">
            <span v-if="match.matchStatus.confirmed" class="material-icons">people</span>
            <span v-else class="material-icons">record_voice_over</span>
          </div>
        </div>
      </template>
      <div class="mt-2">
        <h2 class="text-paragraph-lg font-medium">{{ match.title }}</h2>
        <h3 class="text-paragraph-lg">{{ match.name }}</h3>
      </div>
    </GridTile>
  </ul>
</template>

<script setup lang="ts">
import GridTile from "@/components/GridTile.vue";
import fetchAttachmentDataUri from "@/helpers/fetchAttachmentDataUri";
import { replaceStack } from "@/helpers/replaceStack";
import { SearchResult } from "@/models/SearchResult";
import { computed, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    matches?: SearchResult[];
    resultType?: string;
    jobPostingId?: string;
    color?: string;
  }>(),
  {
    matches: () => [],
    resultType: "",
    jobPostingId: "",
    color: "",
  }
);

const formattedMatches = ref<SearchResult[]>(props.matches);
const queryParams = computed(() => {
  if (props.resultType !== "student") {
    return {};
  }
  return { jobPostingId: props.jobPostingId };
});

const toRouteName = computed(() => {
  switch (props.resultType) {
    case "jobposting":
      return "JobPostingDetail";
    case "company":
      return "CompanyDetail";
    default:
      return "StudentDetail";
  }
});

watch(
  () => props.matches,
  async () => {
    formattedMatches.value = await Promise.all(
      props.matches.map(async (match) => {
        if (match.img) {
          match.img = await fetchAttachmentDataUri(
            match.img,
            props.resultType === "student" ? "avatar" : "logo"
          );
        }
        return match;
      })
    );
  },
  { immediate: true }
);
</script>

<style lang="postcss" scoped>
@block search-result-grid {
  @modifier jobposting {
    & .search-result-grid__link {
      & .search-result-grid__image-box {
        @apply border-orange-1;
      }
    }

    & .search-result-grid__match-status {
      @apply bg-orange-1;
    }
  }

  @modifier student {
    & .search-result-grid__match-status {
      @apply bg-green-1;
    }
  }

  @modifier company {
    & .search-result-grid__link {
      & .search-result-grid__image-box {
        @apply border-pink-1;
      }

      & .search-result-grid__match-status {
        @apply bg-pink-1;
      }
    }
  }

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
  }

  @element link {
    @apply block min-w-full min-h-full p-8 pb-4;

    &:visited {
      @apply text-grey-2;
    }

    &:hover {
      @apply text-white transition-colors;

      & .search-result-grid__image-box {
        @apply border-white;
      }
    }
  }
}
</style>

<template>
  <ul
    class="search-result-project-posting-grid grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-px"
  >
    <project-posting-grid-tile
      v-for="match in matches"
      :key="match.id"
      :linkTo="{ name: 'ProjectPostingDetail', params: { slug: match.id } }"
      :imgSrc="replaceStack(match.img, 'avatar')"
      :imgAlt="match.name"
    >
      <template v-slot:match-status>
        <div v-if="match.matchStatus?.initiator" class="search-result-grid__match-status-helper">
          <div class="search-result-grid__match-status">
            <span v-if="match.matchStatus.confirmed" class="material-icons">people</span>
            <span v-else class="material-icons">record_voice_over</span>
          </div>
        </div>
      </template>
      <div class="mt-2">
        <h2 class="text-paragraph-lg font-medium">{{ match.jobPostingTitle }}</h2>
        <h3 class="text-paragraph-lg">{{ match.name }}</h3>
      </div>
    </project-posting-grid-tile>
  </ul>
</template>

<script lang="ts">
import ProjectPostingGridTile from "@/components/ProjectPostingGridTile.vue";
import { SearchResult } from "@/models/SearchResult";
import { Options, prop, Vue } from "vue-class-component";
import { replaceStack } from "@/helpers/replaceStack";

class Props {
  matches = prop<SearchResult[]>({ default: [] });
  resultType = prop<string>({ default: "" });
  jobPostingId = prop<string>({ default: "" });
  color = prop<string>({ default: "" });
}

@Options({
  components: {
    ProjectPostingGridTile,
  },
})
export default class SearchResultProjectPostingGrid extends Vue.with(Props) {
  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }
}
</script>

<style lang="postcss" scoped>
@block search-result-project-posting-grid {
  @element match-status-helper {
    @apply absolute top-0 right-0 bottom-0 left-0;
    @apply rounded-full;
    @apply origin-center transform rotate-45;
  }

  @element match-status {
    @apply absolute right-0 top-1/2;
    @apply flex items-center justify-center;
    @apply rounded-full p-2;
    @apply text-white;
    @apply transform translate-x-1/2 -translate-y-1/2 -rotate-45;
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

<template>
  <ul
    class="search-result-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-px"
  >
    <li
      v-for="match in matches"
      :key="match.id"
      class="search-result-grid__item text-center shadow-pink text-pink-1"
    >
      <router-link
        :to="{ name: 'StudentDetail', params: { slug: match.id } }"
        class="search-result-grid__link block p-8 pb-4"
      >
        <img
          :src="match.img.replace('{stack}', 'desktop-square')"
          class="w-full rounded-full border-2 border-green-1"
        />
        <div class="mt-2">{{ match.name }} ({{ (match.rawScore * 100).toFixed(1) }}%)</div>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { SearchResult } from "@/models/SearchResult";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  matches = prop<SearchResult[]>({ default: [] });
  resultType = prop<string>({ default: "" });
}

@Options({
  components: {},
})
export default class SearchBoost extends Vue.with(Props) {}
</script>

<style type="postcss" scoped>
@block search-result-grid {
  @element item {
    @apply flex items-center;

    &::before {
      content: "";
      @apply inline-block align-top pb-full w-0;
    }
  }

  @element link {
    &:visited {
      @apply text-grey-2;
    }

    &:hover {
      @apply bg-pink-1 text-white transition-colors;

      & img {
        @apply border-white;
      }
    }
  }
}
</style>

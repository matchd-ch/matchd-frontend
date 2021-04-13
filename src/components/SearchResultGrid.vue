<template>
  <ul
    class="search-result-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-px"
    :class="{
      'search-result-grid--student': resultType === 'student',
      'search-result-grid--jobposting': resultType === 'jobposting',
      'search-result-grid--company': resultType === 'company',
    }"
  >
    <li
      v-for="match in matches"
      :key="match.id"
      class="search-result-grid__item"
      :class="{
        'search-result-grid__item--green': color === 'green',
        'search-result-grid__item--orange': color === 'orange',
        'search-result-grid__item--pink': color === 'pink',
      }"
    >
      <router-link
        :to="{ name: toRouteName, params: { slug: match.id } }"
        class="search-result-grid__link"
      >
        <div class="search-result-grid__image-box rounded-full border-2">
          <img
            :src="
              match.img.replace(
                '{stack}',
                resultType === 'student' ? 'desktop-square' : 'logo-square'
              )
            "
            class="w-full"
            :alt="`${match.name} Logo`"
          />
        </div>
        <div class="mt-2">
          <h2 class="text-paragraph-lg font-medium">{{ match.jobPostingTitle }}</h2>
          <h3 class="text-paragraph-lg">{{ match.name }}</h3>
        </div>
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
  color = prop<string>({ default: "" });
}

@Options({
  components: {},
})
export default class SearchBoost extends Vue.with(Props) {
  get toRouteName(): string {
    switch (this.resultType) {
      case "jobposting":
        return "JobPostingDetail";
      case "company":
        return "CompanyDetail";
      default:
        return "StudentDetail";
    }
  }
}
</script>

<style type="postcss" scoped>
@block search-result-grid {
  @modifier jobposting {
    & .search-result-grid__link {
      & .search-result-grid__image-box {
        @apply border-orange-1;
      }
    }
  }

  @modifier student {
    & .search-result-grid__link {
      & .search-result-grid__image-box {
        @apply border-green-1;
      }
    }
  }

  @modifier company {
    & .search-result-grid__link {
      & .search-result-grid__image-box {
        @apply border-pink-1;
      }
    }
  }

  @element item {
    @apply flex items-center text-center;

    &::before {
      content: "";
      @apply inline-block align-top pb-full w-0;
    }

    @modifier orange {
      @apply shadow-orange text-orange-1;

      & .search-result-grid__link:hover {
        @apply bg-orange-1;
      }
    }

    @modifier green {
      @apply shadow-green text-green-1;

      & .search-result-grid__link:hover {
        @apply bg-green-1;
      }
    }

    @modifier pink {
      @apply shadow-pink text-pink-1;

      & .search-result-grid__link:hover {
        @apply bg-pink-1;
      }
    }
  }

  @element image-box {
    @apply bg-white overflow-hidden;
    @apply relative;

    & img {
      @apply absolute top-1/2;
      transform: translateY(-50%);
    }

    &::before {
      content: "";
      @apply inline-block align-top pb-full w-0;
    }
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

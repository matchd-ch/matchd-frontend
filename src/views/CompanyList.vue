<template>
  <div>
    <ul
      v-if="companyMatching.data.length"
      class="search-result-grid--company search-result-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-px"
    >
      <grid-tile
        v-for="match in companyMatching.data"
        :key="match.id"
        :link-to="{ name: detailSiteRoute(match.type), params: { slug: match.slug } }"
        :img-src="match.avatar ? replaceStack(match.avatar, 'logo') : null"
        :img-alt="`${match.name} Logo`"
        color="green"
      >
        <div class="mt-2">
          <h3 class="text-paragraph-lg">{{ match.name }}</h3>
        </div>
      </grid-tile>
    </ul>
  </div>
</template>

<script lang="ts">
import { ProfileType } from "@/api/models/types";
import GridTile from "@/components/GridTile.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { replaceStack } from "@/helpers/replaceStack";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Match } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    GridTile,
  },
})
export default class CompanyList extends Vue {
  meta = setup(() => useMeta({ title: "Firmen" }));

  async mounted(): Promise<void> {
    await this.loadData();
    calculateMargins();
  }

  get companyMatching(): { data: Match[] } {
    return this.$store.getters["companyMatching"];
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  async loadData(): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.COMPANY_MATCHING);
    } catch (e) {
      console.error(e);
    }
  }
  detailSiteRoute(type: string): string {
    return ProfileType.University === type ? "UniversityDetail" : "CompanyDetail";
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

    & .search-result-grid__match-status {
      @apply bg-orange-1;
    }
  }

  @modifier student {
    & .search-result-grid__link {
      & .search-result-grid__image-box {
        @apply border-green-1;
      }
    }

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

  @element image-wrap {
    @apply relative;
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

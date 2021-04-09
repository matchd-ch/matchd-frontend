<template>
  <div class="search-filters flex flex-col xl:flex-row xl:justify-between xl:items-center">
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  emits: ["changeFilters"],
})
export default class SearchFilters extends Vue {
  techBoost = 3;
  softBoost = 3;
}
</script>

<style type="postcss">
@import "@vueform/slider/themes/default.css";
</style>

<style type="postcss" scoped>
@block search-filters {
  @apply fixed right-0 top-0 left-0;
  @apply p-4 xl:p-8;
  @apply text-white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @element slider {
    & :deep(.slider-target) {
      @apply ml-8;
      height: 1px;
      width: 100%;
      @screen lg {
        width: 200px;
      }

      & .slider-base,
      & .slider-connect {
        @apply bg-black;
      }

      & .slider-handle {
        @apply bg-green-1 shadow-none;
      }
    }
  }
}
</style>

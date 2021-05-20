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

<style lang="postcss">
@import "@vueform/slider/themes/default.css";
</style>

<style lang="postcss" scoped>
@block search-filters {
  @apply p-4 xl:p-8;
  @apply text-white;

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

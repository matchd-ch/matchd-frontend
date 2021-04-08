<template>
  <div class="search-filters flex flex-col xl:flex-row xl:justify-center">
    <div class="search-filters__slider flex items-center justify-between">
      Übereinstimmung Werte
      <Slider
        v-model="softBoost"
        :tooltips="false"
        :min="1"
        :max="5"
        @change="$emit('changeSoftBoost', $event)"
      />
    </div>
    <div class="search-filters__slider flex items-center justify-between mt-4 xl:mt-0 xl:ml-8">
      Übereinstimmung Skills
      <Slider
        v-model="techBoost"
        :tooltips="false"
        :min="1"
        :max="5"
        @change="$emit('changeTechBoost', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Slider from "@vueform/slider";

@Options({
  components: {
    Slider,
  },
  emits: ["changeSoftBoost", "changeTechBoost"],
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
  @apply fixed right-0 bottom-0 left-0;
  @apply p-4 xl:p-8;
  @apply bg-white;
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

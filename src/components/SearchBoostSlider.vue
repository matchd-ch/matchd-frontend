<template>
  <div
    class="search-boost-slider flex items-center justify-between"
    :class="{
      'search-boost-slider--pink': color === 'pink',
      'search-boost-slider--green': color === 'green',
      'search-boost-slider--orange': color === 'orange',
    }"
  >
    <slot />
    <Slider v-model="sliderValue" :tooltips="false" :min="1" :max="5" />
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import Slider from "@vueform/slider";

class Props {
  color = prop<string>({ default: "green" });
  value = prop<number>({ default: 0 });
}

@Options({
  components: {
    Slider,
  },
  emits: ["changeValue"],
})
export default class SearchBoostSlider extends Vue.with(Props) {
  get sliderValue(): number {
    return this.value;
  }

  set sliderValue(value: number) {
    this.$emit("changeValue", value);
  }
}
</script>

<style type="postcss">
@import "@vueform/slider/themes/default.css";
</style>

<style type="postcss" scoped>
@block search-boost-slider {
  @modifier pink {
    & :deep(.slider-target) {
      & .slider-handle {
        @apply bg-pink-1;
      }
    }
  }

  @modifier green {
    & :deep(.slider-target) {
      & .slider-handle {
        @apply bg-green-1;
      }
    }
  }

  @modifier orange {
    & :deep(.slider-target) {
      & .slider-handle {
        @apply bg-orange-1;
      }
    }
  }

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
      @apply shadow-none;
    }
  }
}
</style>

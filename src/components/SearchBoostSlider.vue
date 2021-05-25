<template>
  <div class="search-boost-slider flex flex-col xl:flex-row xl:items-center xl:justify-between">
    <div class="text-center xl:text-left xl:mr-4"><slot /></div>
    <div class="flex items-center xl:justify-between">
      <slot name="label-left" />
      <Slider v-model="sliderValue" :tooltips="false" :min="1" :max="5" />
      <slot name="label-right" />
    </div>
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

<style lang="postcss" scoped>
@block search-boost-slider {
  & :deep(.slider-target) {
    @apply flex-grow mx-4;
    height: 2px;

    @screen xl {
      width: 200px;
    }

    & .slider-base {
      @apply bg-white xl:bg-black;
    }

    & .slider-connect {
      @apply bg-black xl:bg-primary-1;
    }

    & .slider-handle {
      @apply bg-black xl:bg-primary-1 shadow-none;
      @apply border border-white border-solid xl:border-none;
    }
  }
}
</style>

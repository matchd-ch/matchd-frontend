<template>
  <div class="search-boost flex flex-col xl:flex-row xl:justify-center">
    <div
      class="search-boost__slider flex items-center justify-between"
      :class="{ 'search-boost__slider--pink': color === 'pink' }"
    >
      Übereinstimmung Werte
      <Slider
        v-model="softBoostValue"
        :tooltips="false"
        :min="1"
        :max="5"
        @change="$emit('changeSoftBoost', $event)"
      />
    </div>
    <div
      class="search-boost__slider flex items-center justify-between mt-4 xl:mt-0 xl:ml-8"
      :class="{ 'search-boost__slider--pink': color === 'pink' }"
    >
      Übereinstimmung Skills
      <Slider v-model="techBoostValue" :tooltips="false" :min="1" :max="5" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import Slider from "@vueform/slider";

class Props {
  color = prop<string>({ default: "green" });
  techBoost = prop<number>({ default: 3 });
  softBoost = prop<number>({ default: 3 });
}

@Options({
  components: {
    Slider,
  },
  emits: ["changeSoftBoost", "changeTechBoost"],
})
export default class SearchBoost extends Vue.with(Props) {
  get techBoostValue(): number {
    return this.techBoost;
  }

  set techBoostValue(value: number) {
    this.$emit("changeTechBoost", value);
  }

  get softBoostValue(): number {
    return this.softBoost;
  }

  set softBoostValue(value: number) {
    this.$emit("changeSoftBoost", value);
  }
}
</script>

<style type="postcss">
@import "@vueform/slider/themes/default.css";
</style>

<style type="postcss" scoped>
@block search-boost {
  @apply fixed right-0 bottom-0 left-0;
  @apply p-4 xl:p-8;
  @apply bg-white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @element slider {
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
}
</style>

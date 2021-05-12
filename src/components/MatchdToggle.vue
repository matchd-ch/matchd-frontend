<template>
  <div class="matchd-toggle">
    <label class="matchd-toggle__label"><slot name="label" /></label>
    <div
      class="matchd-toggle__form-element"
      :class="{ 'matchd-toggle__form-element relative': $slots.iconRight }"
    >
      <slot />
      <label
        :for="id"
        class="matchd-toggle__slider border border-primary-1 relative inline-flex flex-shrink-0 h-9 w-20 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:border-black"
      >
        <span
          aria-hidden="true"
          class="matchd-toggle__slider-knob pointer-events-none inline-block h-9 w-9 rounded-full bg-current transform ring-0 transition ease-in-out duration-200 -m-px translate-x-0"
        ></span>
      </label>
    </div>
    <div v-if="errors" class="matchd-toggle__errors">
      {{ errors }}
    </div>
    <p v-if="$slots.info" class="matchd-toggle__info">
      <IconInfo class="flex-shrink-0 w-5 mr-2" />
      <slot name="info" />
    </p>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import IconInfo from "@/assets/icons/info.svg";

class Props {
  id = prop<string>({});
  errors = prop<string>({});
}

@Options({
  components: {
    IconInfo,
  },
})
export default class MatchdToggle extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
@block matchd-toggle {
  @modifier invalid {
    & input,
    & textarea {
      @apply border-negative text-negative placeholder-negative;
    }
  }

  @element label {
    @apply block px-8 mb-2;
    @apply font-medium;
  }

  @element errors {
    @apply px-8 mt-2;
    @apply text-negative text-paragraph-sm;
  }

  @element info {
    @apply mt-4 flex items-center px-8;
    @apply text-paragraph-sm text-black;
  }

  & :deep(input) {
    display: none;
  }

  & :deep(input:checked) + .matchd-toggle__slider .matchd-toggle__slider-knob {
    @apply translate-x-11;
  }
}
</style>

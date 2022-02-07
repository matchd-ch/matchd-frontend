<template>
  <div class="matchd-toggle">
    <label class="matchd-toggle__label">
      <slot name="label" />
    </label>
    <div
      class="matchd-toggle__form-element flex items-center"
      :class="{ 'matchd-toggle__form-element relative': $slots.iconRight }"
    >
      <slot />
      <label
        :for="id"
        class="matchd-toggle__slider relative inline-flex shrink-0 h-8 w-14 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:border-black"
      >
        <span
          aria-hidden="true"
          class="matchd-toggle__slider-knob pointer-events-none inline-block h-6 w-6 m-1 rounded-full bg-white ring-0 transition ease-in-out duration-200 translate-x-0"
        ></span>
      </label>
      <span class="matchd-toggle__value-on ml-3">
        <slot name="value" />
      </span>
    </div>
    <div v-if="errors" class="matchd-toggle__errors">{{ errors }}</div>
    <p v-if="$slots.info" class="matchd-toggle__info">
      <IconInfo class="shrink-0 w-5 mr-2" />
      <slot name="info" />
    </p>
  </div>
</template>

<script lang="ts">
import IconInfo from "@/assets/icons/info.svg";
import { Options, prop, Vue } from "vue-class-component";

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
    @apply font-medium text-primary-1;
  }

  @element errors {
    @apply px-8 mt-2;
    @apply text-negative text-paragraph-sm;
  }

  @element info {
    @apply mt-4 flex items-center px-8;
    @apply text-paragraph-sm text-black;
  }

  @element slider {
    @apply bg-black;
  }

  & :deep(input) {
    display: none;
  }

  & :deep(input:checked) {
    & + .matchd-toggle__slider {
      @apply bg-primary-1;
      & .matchd-toggle__slider-knob {
        @apply translate-x-6;
      }
    }
  }
}
</style>

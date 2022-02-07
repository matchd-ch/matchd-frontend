<template>
  <div class="matchd-field" :class="{ 'matchd-field--invalid': errors }">
    <label :for="id" class="matchd-field__label">
      <slot name="label" />
    </label>
    <div
      class="matchd-field__form-element"
      :class="{ 'matchd-field__form-element relative': $slots.iconRight }"
    >
      <slot />
      <div v-if="$slots.iconRight" class="absolute right-0 top-0 h-full">
        <slot name="iconRight" />
      </div>
    </div>
    <div v-if="errors" class="matchd-field__errors">{{ errors }}</div>
    <p v-if="$slots.info" class="matchd-field__info">
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
export default class MatchdField extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
@block matchd-field {
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

  @element form-element {
    @modifier icon-right {
      & input {
        @apply pr-16;
      }
    }
  }

  @element info {
    @apply mt-4 flex items-center px-8;
    @apply text-paragraph-sm text-black;
  }

  @element errors {
    @apply px-8 mt-2;
    @apply text-negative text-paragraph-sm;
  }

  & :deep(input),
  & :deep(textarea) {
    @apply block w-full bg-white rounded-30 px-8 py-4;
    @apply border border-white focus:border-black;
    @apply text-lg placeholder-black placeholder-opacity-40;
    @apply focus:outline-none;
    @apply transition-colors duration-300;
  }

  & :deep(textarea) {
    @apply resize-none;
  }

  & .form-element--icon-right {
    & input {
      @apply pr-16;
    }
  }
}
</style>

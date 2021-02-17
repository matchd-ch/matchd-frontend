<template>
  <div class="matchd-field" :class="{ 'matchd-field-invalid': errors }">
    <label :for="id" class="label"><slot name="label"/></label>
    <div class="form-element" :class="{ 'form-element--icon-right relative': $slots.iconRight }">
      <slot />
      <div v-if="$slots.iconRight" class="absolute right-0 top-0 h-full">
        <slot name="iconRight" />
      </div>
    </div>
    <div v-if="errors" class="text-negative text-paragraph-sm px-8 mt-2">
      {{ errors }}
    </div>
    <p v-if="$slots.info" class="text-paragraph-sm text-black mt-4 flex items-center px-8">
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
export default class MatchdField extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.matchd-field {
  &.matchd-field-invalid {
    & input,
    & textarea {
      @apply border-negative text-negative placeholder-negative;
    }
  }

  & .label {
    @apply block px-8 mb-2;
    @apply font-medium;
  }

  & input,
  & textarea {
    @apply block w-full bg-white rounded-30 px-8 py-4;
    @apply border border-white focus:border-black;
    @apply text-lg placeholder-black placeholder-opacity-100;
    @apply focus:outline-none;
    @apply transition-colors duration-300;
  }

  & .form-element--icon-right {
    & input {
      @apply pr-16;
    }
  }
}
</style>

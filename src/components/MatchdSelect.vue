<template>
  <div class="matchd-select" :class="{ 'matchd-select--invalid': errors }">
    <label :for="id" class="matchd-select__label"><slot name="label" /></label>
    <div class="form-element">
      <slot />
    </div>
    <div v-if="errors" class="text-negative text-paragraph-sm px-8 mt-2">
      {{ errors }}
    </div>
    <p v-if="$slots.info" class="text-paragraph-sm mt-4 flex items-center px-8">
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
export default class MatchdSelect extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
@block matchd-select {
  @modifier invalid {
    & deep(select) {
      @apply border-negative text-negative placeholder-negative;
    }
  }

  @element label {
    @apply block px-8 mb-2;
    @apply font-medium;
  }

  & :deep(select) {
    @apply block w-full bg-white rounded-30 px-8 py-4;
    @apply border border-white focus:border-black;
    @apply text-lg placeholder-black placeholder-opacity-100;
    @apply focus:outline-none;
    @apply transition-colors duration-300;
    @apply appearance-none;
  }
}
</style>

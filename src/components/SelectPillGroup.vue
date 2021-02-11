<template>
  <div class="select-pill-group" :class="{ 'select-pill-group--invalid': errors }">
    <label class="label"><slot name="label"/></label>
    <slot name="field" />
    <ul class="flex flex-wrap -m-2">
      <slot />
    </ul>
    <div v-if="errors" class="text-negative text-paragraph-sm px-8 mt-2">
      {{ errors }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  id = prop<string>({});
  errors = prop<string>({});
}

@Options({})
export default class SelectPillGroup extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.select-pill-group {
  &.select-pill-group--invalid >>> .select-pill {
    @apply text-negative;
  }

  & .label {
    @apply block px-8 mb-2;
    @apply font-medium;
  }
}
</style>

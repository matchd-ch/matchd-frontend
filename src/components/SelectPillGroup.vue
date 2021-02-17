<template>
  <div class="select-pill-group" :class="{ 'select-pill-group--invalid': errors }">
    <label v-if="$slots.label" class="label"><slot name="label"/></label>
    <slot name="field" />
    <ul class="flex flex-wrap -m-2">
      <slot />
    </ul>
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
export default class SelectPillGroup extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.select-pill-group {
  &.select-pill-group--invalid :deep(.select-pill) {
    @apply text-negative;
  }

  & .label {
    @apply block px-8 mb-2;
    @apply font-medium;
  }
}
</style>

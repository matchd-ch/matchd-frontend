<template>
  <div class="select-pill-multiple" :class="{ 'select-pill-multiple--invalid': errors }">
    <label v-if="$slots.label" class="select-pill-multiple__label">
      <slot name="label" />
    </label>
    <ul class="flex flex-wrap -m-2">
      <li
        v-for="option in options"
        :key="option.id"
        class="select-pill-multiple__item shrink-0 m-2"
      >
        <label
          class="select-pill-multiple__box flex items-center rounded-full bg-white border border-current font-medium text-sm py-3 px-8 cursor-pointer transition-colors"
          :class="{
            'text-primary-1': option.checked,
          }"
        >
          <input
            type="checkbox"
            :name="`${name}[]`"
            class="appearance-none"
            :value="option"
            :checked="option.checked"
            @change="emit('change', option)"
          />
          {{ option.name }}
        </label>
      </li>
    </ul>
    <div v-if="errors" class="text-negative text-paragraph-sm px-8 mt-2">{{ errors }}</div>
    <p v-if="$slots.info" class="select-pill-multiple__info">
      <IconInfo class="shrink-0 w-5 mr-2" />
      <slot name="info" />
    </p>
  </div>
</template>

<script setup lang="ts">
import IconInfo from "@/assets/icons/info.svg";
import type { SelectPillMultipleItem } from "@/types/selectPillMultiple";

withDefaults(
  defineProps<{
    name?: string;
    options?: SelectPillMultipleItem[];
    errors?: string;
  }>(),
  {
    name: "",
    options: () => [],
    errors: undefined,
  }
);

const emit = defineEmits<{
  (event: "change", option: SelectPillMultipleItem): void;
}>();
</script>

<style lang="postcss" scoped>
@block select-pill-multiple {
  max-width: calc(100% - 1rem);

  @modifier invalid {
    & .select-pill-multiple__box {
      @apply border-negative text-negative placeholder-negative;
    }
  }

  @element label {
    @apply block px-8 mb-2;
    @apply font-medium text-primary-1;
  }

  @element info {
    @apply mt-4 flex items-center px-8;
    @apply text-paragraph-sm text-black;
  }
}
</style>

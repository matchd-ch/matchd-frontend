<template>
  <div class="matchd-autocomplete" :class="{ 'matchd-autocomplete--invalid': errors }">
    <label :for="id" class="matchd-autocomplete__label">
      <slot name="label" />
    </label>
    <div class="matchd-autocomplete__form-element">
      <slot />
      <ul v-if="items && items.length > 0" class="matchd-autocomplete__result-list">
        <li
          v-for="result in items.slice(0, 10)"
          :key="result.id"
          class="matchd-autocomplete__result-item"
        >
          <button type="button" @click="emits('select', result)">{{ result.name }}</button>
        </li>
      </ul>
    </div>
    <div v-if="errors" class="text-negative text-paragraph-sm px-8 mt-2">{{ errors }}</div>
    <p v-if="$slots.info" class="text-paragraph-sm text-black mt-4 flex items-center px-8">
      <IconInfo class="shrink-0 w-5 mr-2" />
      <slot name="info" />
    </p>
  </div>
</template>

<script setup lang="ts">
import IconInfo from "@/assets/icons/info.svg";

type Item = { id: string; name: string };

withDefaults(
  defineProps<{
    id: string;
    items?: Item[];
    errors?: string;
  }>(),
  {
    errors: "",
    items: () => [],
  },
);

const emits = defineEmits<{ (event: "select", item: Item): void }>();
</script>

<style lang="postcss" scoped>
@block matchd-autocomplete {
  @modifier invalid {
    & input {
      @apply text-negative border-current;
    }
  }

  @element result-list {
    @apply absolute top-full w-full z-50 overflow-hidden;
    @apply bg-white;
    @apply border border-current rounded-30;
  }

  @element result-item {
    &:not(:last-child) {
      @apply border-b border-current;
    }

    & button {
      @apply block w-full px-8 py-4;
      @apply text-left;
      @apply transition-all;

      &:hover,
      &:focus {
        @apply bg-black text-white;
      }
    }
  }

  @element form-element {
    @apply relative;
  }

  @element label {
    @apply block px-8 mb-2;
    @apply font-medium text-primary-1;
  }

  & :deep(input) {
    @apply block w-full bg-white rounded-30 px-8 py-4;
    @apply border border-white focus:border-black;
    @apply text-lg placeholder-black placeholder-opacity-40;
    @apply focus:outline-none;
    @apply transition-colors duration-300;
  }
}
</style>

<template>
  <li class="select-pill shrink-0 m-2">
    <label
      class="flex items-center rounded-full bg-white border font-medium text-sm py-3 transition-colors"
      :class="{
        'text-primary-1': checked || hasDelete,
        'pl-8 pr-4': hasDelete,
        'px-8': !hasDelete,
        'cursor-pointer': hasInput,
      }"
    >
      <input
        v-if="hasInput"
        type="checkbox"
        :name="name"
        class="appearance-none"
        :value="value"
        @change="handleChange"
      />
      <slot />
      <button v-if="hasDelete" type="button" @click.stop="emits('remove')">
        <IconClose class="w-6 h-6" />
      </button>
    </label>
  </li>
</template>

<script setup lang="ts">
import IconClose from "@/assets/icons/close.svg";

withDefaults(
  defineProps<{
    value?: string;
    name?: string;
    checked?: boolean;
    hasDelete?: boolean;
    hasInput?: boolean;
    backdropOpacity?: number;
  }>(),
  {
    value: "",
    name: "",
    checked: false,
    hasDelete: false,
    hasInput: true,
    backdropOpacity: 1,
  },
);

const emits = defineEmits<{
  (event: "change", value: string): void;
  (event: "remove"): void;
}>();

const handleChange = (event: Event) => {
  emits("change", (event.target as HTMLInputElement).value);
};
</script>

<style lang="postcss" scoped>
@block select-pill {
  max-width: calc(100% - 1rem);

  & button {
    @apply ml-4;
    @apply transition-all;
  }

  &:hover {
    & button {
      @apply rotate-90;
    }
  }
}
</style>

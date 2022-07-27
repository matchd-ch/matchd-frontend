<template>
  <component
    :is="tag"
    :disabled="disabled"
    class="btn relative overflow-hidden rounded-full font-medium text-xl py-3 px-6 xl:px-10 focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50"
    :class="[variant, size, active ? 'active' : '']"
  >
    <LoadingSvg v-if="loading" />
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import LoadingSvg from "@/assets/icons/loading.svg";

withDefaults(
  defineProps<{
    tag?: string;
    variant?: string;
    loading?: boolean;
    active?: boolean;
    disabled?: boolean;
    size?: string;
  }>(),
  {
    tag: "button",
    variant: "fill",
    loading: false,
    active: false,
    disabled: false,
    size: undefined,
  }
);
</script>

<style lang="postcss" scoped>
.btn {
  @apply transition-all;

  &:disabled {
    @apply opacity-60;
    @apply cursor-default;
  }

  & svg {
    @apply inline-block;
    @apply text-primary-1;
    @apply animate-spin;
    width: 30px;
    height: 30px;
    fill: black;
    transition: fill 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.xl {
    @apply text-display-md font-normal;
    @apply py-8 px-14;
    @apply border-2;
  }

  &.fill {
    & svg {
      fill: white;
      @apply text-primary-1;
    }
  }
}

@block fill {
  @apply bg-black text-white border border-black;

  &:not(:disabled) {
    &:hover,
    &:focus,
    &.active {
      @apply bg-white border-black;
      @apply text-black;

      & svg {
        fill: black;
      }
    }
  }

  @modifier white {
    @apply bg-white border-white text-black;
    & svg {
      fill: black;
    }
    &:not(:disabled) {
      &:hover,
      &:focus,
      &.active {
        @apply text-white bg-black border-black;
        & svg {
          fill: white;
        }
      }
    }
  }
}

@block outline {
  @apply border border-black text-black outline-none;

  &:not(:disabled) {
    &:hover,
    &:focus,
    &.active {
      @apply text-white bg-black;

      & svg {
        fill: white;
      }
    }
  }

  @modifier white {
    @apply border border-white text-white;
    & svg {
      fill: white;
    }
    &:not(:disabled) {
      &:hover,
      &:focus,
      &.active {
        @apply text-black bg-white;
        & svg {
          fill: black;
        }
      }
    }
  }
}
</style>

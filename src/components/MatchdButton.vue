<template>
  <component
    :is="tag"
    class="btn relative overflow-hidden rounded-full font-medium text-xl py-3 px-10 focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50"
    :class="[variant, active ? 'active' : '', `theme-${theme}`]"
  >
    <Loading v-if="loading" />
    <slot v-else />
  </component>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import Loading from "@/assets/icons/loading.svg";

class Props {
  tag = prop<string>({ default: "button" });
  theme = prop<string>({ default: "green" });
  variant = prop<string>({ default: "fill" });
  loading = prop<boolean>({ default: false });
  active = prop<boolean>({ default: false });
}

@Options({
  components: {
    Loading,
  },
})
export default class MatchdButton extends Vue.with(Props) {}
</script>

<style lang="css">
.btn {
  & svg {
    @apply inline-block;
    @apply text-pink-1;
    @apply animate-spin;
    width: 30px;
    height: 30px;
    fill: black;
    transition: fill 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.fill {
    & svg {
      fill: white;
    }
  }

  &.theme-pink {
    & svg {
      @apply text-pink-1;
    }
  }

  &.theme-green {
    & svg {
      @apply text-green-1;
    }
  }
}

.fill {
  @apply bg-black;
  @apply text-white;
  z-index: 1;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    @apply absolute block -top-px -right-px -bottom-px -left-px;
    @apply bg-white rounded-full;
    transform: scale(0, 1);
    transform-origin: right center;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:not(:disabled) {
    &:hover,
    &:focus,
    &.active {
      @apply text-black;

      &::before {
        transform-origin: left center;
        transform: scale(1, 1);
      }

      & svg {
        fill: black;
      }
    }
  }
}

.outline {
  @apply border border-black;
  @apply text-black;
  z-index: 1;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    @apply absolute block -top-px -right-px -bottom-px -left-px;
    @apply bg-black rounded-full;
    transform: scale(0, 1);
    transform-origin: right center;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:not(:disabled) {
    &:hover,
    &:focus,
    &.active {
      @apply text-white;
      &::before {
        transform-origin: left center;
        transform: scale(1, 1);
      }

      & svg {
        fill: white;
      }
    }
  }
}
</style>

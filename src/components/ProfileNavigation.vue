<template>
  <div class="profile-navigation-wrapper bg-white border-b border-t border-primary-1">
    <ul
      class="profile-navigation flex lg:justify-center min-w-full overflow-y-hidden overflow-x-auto"
    >
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class ProfileNavigation extends Vue {}
</script>

<style lang="postcss" scoped>
.profile-navigation-wrapper {
  @apply relative;

  &::before,
  &::after {
    @apply absolute top-0 bottom-0 w-6 z-10;
    content: "";
  }

  &::before {
    @apply left-0;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }

  &::after {
    @apply right-0;
    background-image: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
}
.profile-navigation {
}
</style>

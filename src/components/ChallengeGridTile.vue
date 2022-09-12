<template>
  <li class="challenge-grid-tile text-primary-1 shadow-primary-1">
    <router-link v-if="linkTo" :to="linkTo" class="challenge-grid-tile__link hover:bg-primary-1">
      <div class="challenge-grid-tile__image-wrap shrink-0 w-1/3">
        <div class="challenge-grid-tile__image-box border-primary-1 rounded-full border-2">
          <img v-if="imgSrc" :src="imgSrc" :alt="imgAlt" />
        </div>
        <slot name="match-status" />
      </div>
      <div class="challenge-grid-tile__info">
        <slot />
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

defineProps<{
  linkTo: RouteLocationRaw;
  imgSrc?: string;
  imgAlt?: string;
  color?: string;
}>();
</script>

<style lang="postcss" scoped>
@block challenge-grid-tile {
  @element image-wrap {
    @apply relative;
  }

  @element image-box {
    @apply bg-white overflow-hidden text-center;
    @apply relative;

    & img {
      @apply absolute top-0;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    &::before {
      content: "";
      @apply inline-block align-top pb-full w-0;
    }
  }

  @element link {
    @apply flex min-w-full min-h-full p-8 items-start;

    &:visited {
      @apply text-grey-2;
    }

    &:hover {
      @apply text-white transition-colors;

      & .challenge-grid-tile__image-box {
        @apply border-white;
      }
    }
  }

  @element info {
    @apply ml-8;
  }
}
</style>

<template>
  <li class="project-posting-grid-tile text-primary-1 shadow-primary-1">
    <router-link :to="linkTo" class="project-posting-grid-tile__link hover:bg-primary-1">
      <div class="project-posting-grid-tile__image-wrap">
        <div class="project-posting-grid-tile__image-box border-primary-1 rounded-full border-2">
          <img :src="imgSrc" class="w-full" :alt="imgAlt" />
        </div>
        <slot name="match-status" />
      </div>
      <slot />
    </router-link>
  </li>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  linkTo = prop<string>({});
  imgSrc = prop<string>({});
  imgAlt = prop<string>({});
  color = prop<string>({});
}

export default class GridTile extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
@block project-posting-grid-tile {
  @apply flex items-center text-center;

  &::before {
    content: "";
    @apply inline-block align-top pb-full w-0;
  }

  @element image-wrap {
    @apply relative;
  }

  @element image-box {
    @apply bg-white overflow-hidden;
    @apply relative;

    & img {
      @apply absolute top-1/2;
      transform: translateY(-50%);
    }

    &::before {
      content: "";
      @apply inline-block align-top pb-full w-0;
    }
  }

  @element link {
    @apply block min-w-full min-h-full p-8 pb-4;

    &:visited {
      @apply text-grey-2;
    }

    &:hover {
      @apply text-white transition-colors;

      & .grid-tile__image-box {
        @apply border-white;
      }
    }
  }
}
</style>

<template>
  <li
    class="grid-tile__item"
    :class="{
      'grid-tile__item--green': color === 'green',
      'grid-tile__item--orange': color === 'orange',
      'grid-tile__item--pink': color === 'pink',
    }"
  >
    <router-link :to="linkTo" class="grid-tile__link">
      <div class="grid-tile__image-wrap">
        <div class="grid-tile__image-box rounded-full border-2">
          <img :src="imgSrc" class="w-full" :alt="imgAlt" />
        </div>
        <slot name="match-status" />
      </div>
      <slot />
    </router-link>
  </li>
</template>

<script lang="ts">
import { prop, Vue } from "vue-class-component";

class Props {
  linkTo = prop<string>({});
  imgSrc = prop<string>({});
  imgAlt = prop<string>({});
  color = prop<string>({});
}

export default class GridTile extends Vue.with(Props) {}
</script>

<style type="postcss" scoped>
@block grid-tile {
  @modifier student {
    & .grid-tile__link {
      & .grid-tile__image-box {
        @apply border-green-1;
      }
    }
  }

  @element item {
    @apply flex items-center text-center;

    &::before {
      content: "";
      @apply inline-block align-top pb-full w-0;
    }

    @modifier orange {
      @apply shadow-orange text-orange-1;

      & .grid-tile__link:hover {
        @apply bg-orange-1;
      }
    }

    @modifier green {
      @apply shadow-green text-green-1;

      & .grid-tile__link:hover {
        @apply bg-green-1;
      }
    }

    @modifier pink {
      @apply shadow-pink text-pink-1;

      & .grid-tile__link:hover {
        @apply bg-pink-1;
      }
    }
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

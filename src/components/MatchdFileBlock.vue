<template>
  <div class="matchd-file-block">
    <div class="matchd-file-block__label">
      <slot name="label" />
    </div>
    <slot />
    <p v-if="$slots.info" class="matchd-file-block__info">
      <IconInfo class="shrink-0 w-5 mr-2" />
      <slot name="info" />
    </p>
  </div>
</template>

<script lang="ts">
import IconInfo from "@/assets/icons/info.svg";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    IconInfo,
  },
})
export default class MatchdFileBlock extends Vue {}
</script>

<style lang="postcss" scoped>
@block matchd-file-block {
  @element label {
    @apply px-8 mb-2;
    @apply font-medium text-primary-1;
  }

  @element info {
    @apply mt-4 flex items-center px-8;
    @apply text-paragraph-sm text-black;
  }
}
</style>

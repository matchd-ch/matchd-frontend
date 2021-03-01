<template>
  <div class="matchd-file-block">
    <div class="matchd-file-block__label"><slot name="label" /></div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class MatchdFileBlock extends Vue {}
</script>

<style lang="postcss" scoped>
@block matchd-file-block {
  @element label {
    @apply px-8 mb-2;
    @apply font-medium;
  }
}
</style>

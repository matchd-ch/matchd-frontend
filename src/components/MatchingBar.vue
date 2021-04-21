<template>
  <div class="matching-bar flex justify-center bg-white p-4 xl:p-8">
    <slot />
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
  },
})
export default class MatchingBar extends Vue {}
</script>

<style lang="postcss" scoped>
.matching-bar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>

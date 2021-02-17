<template>
  <ul class="nickname-suggestions">
    <li v-for="suggestion in suggestions" :key="suggestion">
      <button type="button" @click="$emit('clickNickname', suggestion)">
        {{ suggestion }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  suggestions = prop<string[]>({ default: [] });
}

@Options({
  emits: ["clickNicknames"],
})
export default class NicknameSuggestions extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.nickname-suggestions {
  @apply inline-flex flex-wrap;

  & li:not(:last-child) {
    @apply mr-1;

    &::after {
      content: ", ";
    }
  }
}
</style>

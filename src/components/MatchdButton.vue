<template>
  <component :is="tag" class="bg-black rounded-full font-medium text-xl text-white py-2 px-10">
    <slot />
  </component>
</template>

<script lang="ts">
import { prop, Vue } from "vue-class-component";

class Props {
  tag = prop<string>({ default: "button" });
}

export default class MatchdButton extends Vue.with(Props) {}
</script>

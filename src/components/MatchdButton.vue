<template>
  <component
    :is="tag"
    class="bg-black rounded-full font-medium text-xl text-white py-3 px-10 focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50"
  >
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

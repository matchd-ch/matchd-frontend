<template>
  <div class="matching-bar bg-white p-4 xl:p-8">
    <div v-if="showExplanation" class="flex justify-center mb-8 text-black">
      <ol v-if="type === 'jobposting'" class="list list-inside list-decimal">
        <li>Button drücken</li>
        <li>Deine Daten freigeben</li>
        <li>Das Unternehmen wird automatisch benachrichtigt</li>
        <li>und MATCHD!</li>
      </ol>
      <ol v-else class="list list-inside list-decimal">
        <li>Button drücken</li>
        <li>Das Talent wird automatisch benachrichtigt</li>
        <li>Zusammen die weiteren Schritte besprechen</li>
        <li>und MATCHD!</li>
      </ol>
    </div>
    <div class="flex justify-center">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  type = prop<string>({ default: "student" });
  showExplanation = prop<boolean>({ default: false });
}

@Options({
  components: {
    MatchdButton,
  },
})
export default class MatchingBar extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.matching-bar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>

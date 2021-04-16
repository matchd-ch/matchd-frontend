<template>
  <teleport to="body">
    <div
      class="matching-modal fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>

        <span class="hidden sm:inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-lg w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <slot />
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 md:flex md:justify-end">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
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
export default class MatchingModal extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.matching-bar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>

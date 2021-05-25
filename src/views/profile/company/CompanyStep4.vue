<template>
  <CompanyStep4Form
    @submitComplete="$emit('submitComplete', $event)"
    @changeDirty="$emit('changeDirty', $event)"
  >
    <template v-if="edit">
      <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
        <MatchdButton
          type="button"
          variant="outline"
          @click="$emit('clickCancel')"
          class="mb-2 xl:mr-4 xl:mb-0"
        >
          Abbrechen
        </MatchdButton>
        <MatchdButton variant="outline" :disabled="onboardingLoading" :loading="onboardingLoading">
          Speichern
        </MatchdButton>
      </div>
    </template>
    <template v-else>
      <MatchdButton variant="outline" :disabled="onboardingLoading" :loading="onboardingLoading">
        Speichern und weiter
      </MatchdButton>
    </template>
  </CompanyStep4Form>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import CompanyStep4Form from "@/containers/CompanyStep4Form.vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    CompanyStep4Form,
    MatchdButton,
  },
  emits: ["clickCancel", "clickBack", "submitComplete", "changeDirty"],
})
export default class CompanyStep4Edit extends Vue.with(Props) {
  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }
}
</script>

<style></style>

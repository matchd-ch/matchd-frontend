<template>
  <StudentStep4Form>
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
      <MatchdButton type="button" variant="outline" @click="$emit('clickBack')" class="mr-4">
        Zurück
      </MatchdButton>
      <MatchdButton variant="outline" :disabled="onboardingLoading" :loading="onboardingLoading"
        >Speichern und weiter</MatchdButton
      >
    </template>
  </StudentStep4Form>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import StudentStep4Form from "@/containers/StudentStep4Form.vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    MatchdButton,
    StudentStep4Form,
  },
  emits: ["clickCancel", "clickBack"],
})
export default class StudentStep4 extends Vue.with(Props) {
  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }
}
</script>

<style></style>

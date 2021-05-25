<template>
  <StudentStep5Form>
    <template v-if="edit">
      <div class="p-8 bg-white flex justify-center">
        <MatchdButton type="button" variant="outline" @click="$emit('clickCancel')" class="mr-4">
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
  </StudentStep5Form>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import StudentStep5Form from "@/containers/StudentStep5Form.vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    MatchdButton,
    StudentStep5Form,
  },
  emits: ["clickCancel", "clickBack"],
})
export default class StudentStep5 extends Vue.with(Props) {
  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }
}
</script>

<style></style>

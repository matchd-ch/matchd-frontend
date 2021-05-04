<template>
  <StudentStep6Form>
    <template v-if="edit">
      <div class="fixed right-0 bottom-0 left-0 p-8 bg-white flex justify-center">
        <MatchdButton type="button" variant="outline" @click="$emit('clickCancel')" class="mr-4">
          Abbrechen
        </MatchdButton>
        <MatchdButton variant="outline" :disabled="onboardingLoading" :loading="onboardingLoading">
          Speichern
        </MatchdButton>
      </div>
    </template>
    <template v-else>
      <MatchdButton
        variant="outline"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        class="block w-full"
        >Speichern und weiter</MatchdButton
      >
    </template>
  </StudentStep6Form>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import StudentStep6Form from "@/containers/StudentStep6Form.vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    MatchdButton,
    StudentStep6Form,
  },
})
export default class StudentStep6 extends Vue.with(Props) {
  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }
}
</script>

<style></style>

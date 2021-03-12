<template>
  <div>
    <GenericError v-if="jobPostingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <MatchdButton
      type="button"
      variant="outline"
      :disabled="jobPostingLoading"
      @click="onClickSave('DRAFT')"
      class="block w-full"
      >Speichern</MatchdButton
    >
    <MatchdButton
      type="button"
      variant="outline"
      :disabled="jobPostingLoading"
      @click="onClickSave('PUBLIC')"
      class="block w-full mt-5"
      >Stelle jetzt ausschreiben</MatchdButton
    >
    <MatchdButton
      type="button"
      variant="outline"
      :disabled="jobPostingLoading"
      @click="onClickBack"
      class="block w-full mt-5"
      >Zurück zu Schritt 2</MatchdButton
    >
  </div>
</template>

<script lang="ts">
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
  },
})
export default class JobPostingStep3 extends Vue {
  get jobPostingLoading() {
    return this.$store.getters["jobPostingLoading"];
  }

  get jobPostingState() {
    return this.$store.getters["jobPostingState"];
  }

  get currentJobPosting() {
    return this.$store.getters["currentJobPosting"];
  }

  onClickBack() {
    this.$router.push({ params: { step: `${ParamStrings.STEP}2` } });
  }

  async onClickSave(state: string) {
    await this.$store.dispatch(ActionTypes.SAVE_JOBPOSTING_STEP3, {
      id: this.currentJobPosting?.id,
      state,
    });
    if (this.jobPostingState.success) {
      this.$router.push({ name: "Home" });
    }
  }
}
</script>

<style></style>

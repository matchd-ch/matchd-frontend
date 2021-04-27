<template>
  <Form @submit="onSubmit">
    <GenericError v-if="onboardingState.errors"
      >Beim Speichern ist etwas schief gelaufen.</GenericError
    >
    <p>
      Dein Profil ist standardmässig anonymisiert. D.h. Unternehmen und Bildungseinrichtungen sehen
      nur deinen Nickname, ein neutrales Profilbild und was du suchst. Sofern du in deinem Profil
      Skills erfasst hast, werden auch diese gezeigt, denn Matchd nutzt deine Skills, um dich mit
      passenden Stellen zu matchen. Du kannst wählen, ob du die Einstellung so beibehalten willst,
      oder ob du deinen Vor- und Nachnamen sowie dein Profilbild zeigen möchtest.
    </p>

    <div class="flex justify-between items-center mt-14">
      <div class="flex-grow w-40" :class="{ 'font-medium': isAnonymous }">Profil anonymisieren</div>
      <button
        type="button"
        class="border border-primary-1 relative inline-flex flex-shrink-0 h-9 w-20 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:border-black"
        aria-pressed="false"
        @click="onToggleUserState"
      >
        <span class="sr-only">Status ändern</span>
        <span
          aria-hidden="true"
          class="pointer-events-none inline-block h-9 w-9 rounded-full bg-current transform ring-0 transition ease-in-out duration-200 -m-px"
          :class="isAnonymous ? 'translate-x-0' : 'translate-x-11'"
        ></span>
      </button>
      <div class="flex-grow w-40 text-right" :class="{ 'font-medium': !isAnonymous }">
        Profil veröffentlichen
      </div>
    </div>

    <div class="rounded-30 bg-green-5 border border-green-1 text-green-1 py-4 px-8 mb-10 mt-16">
      <template v-if="isAnonymous">
        <p>Dein Profil ist anonymisiert. Unternehmen und Bildungseinrichtungen sehen nur:</p>
        <ul class="list list-disc list-inside text-lg mb-2">
          <li>deinen Nicknamen</li>
          <li>ein neutrales Profilbild</li>
          <li>was du suchst</li>
          <li>deine technischen Skills</li>
          <li>deine Sprachskills</li>
        </ul>
        <p>
          Die restlichen Daten werden erst freigegeben, wenn du an einer Stelle interessiert bist.
        </p>
      </template>
      <template v-else>
        <p>Dein Profil ist öffentlich. Unternehmen und Bildungseinrichtungen sehen:</p>
        <ul class="list list-disc list-inside text-lg mb-2">
          <li>deinen Vor- und Nachnamen</li>
          <li>dein Geburtsmonat und -jahr</li>
          <li>dein Profilbild</li>
          <li>deine Online-Projekte</li>
          <li>deine Hobbies und Interessen</li>
          <li>was dich sonst noch auszeichnet</li>
          <li>und alle Daten, welche auch im anonyem Zustand sichtbar sind</li>
        </ul>
        <p>
          Deine E-Mailadressen, Handynummer, Adresse und deine Zertifikate werden erst
          freigeschaltet, wenn du an einer Stelle interessiert bist.
        </p>
      </template>
    </div>

    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading"
      :loading="onboardingLoading"
      class="block w-full"
      >Speichern</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import { studentProfileStep6InputMapper } from "@/api/mappers/studentProfileStep6InputMapper";
import { ProfileState } from "@/api/models/types";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import { OnboardingState } from "@/models/OnboardingState";
import { StudentProfileStep6Form } from "@/models/StudentProfileStep6Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import type { User } from "api";
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
export default class StudentStep6 extends Vue {
  form: StudentProfileStep6Form = {
    state: ProfileState.Anonymous,
  };

  get isAnonymous(): boolean {
    return this.form.state === ProfileState.Anonymous;
  }

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  onToggleUserState(): void {
    this.form.state = this.isAnonymous ? ProfileState.Public : ProfileState.Anonymous;
  }

  async onSubmit(): Promise<void> {
    await this.$store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP6,
      studentProfileStep6InputMapper(this.form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "finish" } });
    }
  }
}
</script>

<style></style>

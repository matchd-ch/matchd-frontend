<template>
  <form v-if="profileData" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <p>
      Standardmässig ist dein Matchd-Profil auf «anonym» gestellt. Unternehmen und
      Bildungseinrichtungen sehen nur deinen Nickname, ein neutrales Profilbild und was du suchst.
      Auch Skills sind ersichtlich – falls du diese erfasst. Good to know: Skills helfen Matchd
      dabei, passende Stellen für dich zu finden. Wenn du dich für ein öffentliches Profil
      entscheidest, zeigen wir deinen Vor- und Nachnamen und dein Profilbild.
    </p>

    <h3 class="mb-2 font-medium mt-14">Profil</h3>
    <div class="flex justify-center">
      <div class="flex justify-between items-center mt-4">
        <div
          class="flex-grow mr-8"
          :class="{ 'text-black': isAnonymous, 'text-grey-2': !isAnonymous }"
        >
          anonym
        </div>
        <button
          type="button"
          class="relative inline-flex flex-shrink-0 h-8 w-14 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:border-black"
          :class="{ 'bg-black': isAnonymous, 'bg-primary-1': !isAnonymous }"
          aria-pressed="false"
          @click="onToggleUserState"
        >
          <span class="sr-only">Status ändern</span>
          <span
            aria-hidden="true"
            class="pointer-events-none inline-block h-6 w-6 m-1 rounded-full bg-white transform ring-0 transition ease-in-out duration-200 translate-x-0"
            :class="isAnonymous ? 'translate-x-0' : 'translate-x-6'"
          ></span>
        </button>
        <div
          class="flex-grow text-right ml-8"
          :class="{ 'text-primary-1': !isAnonymous, 'text-grey-2': isAnonymous }"
        >
          öffentlich
        </div>
      </div>
    </div>

    <div
      class="rounded-30 border py-4 px-8 mb-10 mt-16 transition-colors"
      :class="{ 'text-green-1 bg-green-5': !isAnonymous, 'bg-grey-3': isAnonymous }"
    >
      <template v-if="isAnonymous">
        <p>Dein Profil ist anonym. Unternehmen und Bildungseinrichtungen sehen nur:</p>
        <ul class="list list-disc list-inside text-lg mb-2">
          <li>deinen Nickname</li>
          <li>ein neutrales Profilbild</li>
          <li>was du suchst</li>
          <li>deine technischen Skills</li>
          <li>deine Sprachkenntnisse</li>
        </ul>
        <p>
          Deine restlichen Daten werden erst freigegeben, wenn du an einer Stelle interessiert bist.
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
          <li>und alle Daten, welche auch im anonymen Zustand sichtbar sind</li>
        </ul>
        <p>
          Deine E-Mail-Adresse, Mobile-Nummer, Adresse und deine Zertifikate werden erst
          freigeschaltet, wenn du an einer Stelle interessiert bist.
        </p>
      </template>
    </div>
    <slot />
  </form>
</template>

<script lang="ts">
import { studentProfileStep6FormMapper } from "@/api/mappers/studentProfileStep6FormMapper";
import { studentProfileStep6InputMapper } from "@/api/mappers/studentProfileStep6InputMapper";
import { ProfileState } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import NicknameSuggestions from "@/components/NicknameSuggestions.vue";
import { OnboardingState } from "@/models/OnboardingState";
import { StudentProfileStep6Form } from "@/models/StudentProfileStep6Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { Field, useField, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import cloneDeep from "clone-deep";

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdField,
    MatchdFileBlock,
    MatchdFileUpload,
    MatchdFileView,
    NicknameSuggestions,
  },
  emits: ["submitComplete", "changeDirty"],
})
export default class StudentStep6Form extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<StudentProfileStep6Form>();
    const { value: state } = useField<ProfileState>("state");

    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.STUDENT_ONBOARDING_STEP6,
            studentProfileStep6InputMapper(formData)
          );
          const onboardingState = store.getters["onboardingState"];
          this.$emit("submitComplete", onboardingState.success);
        } catch (e) {
          console.log(e);
        }
      }
    );

    return {
      ...form,
      onSubmit,
      state,
    };
  });

  get showError(): boolean {
    return !!this.onboardingState.errors;
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get currentStep(): number | undefined {
    return this.$store.getters["profileStep"];
  }

  get isAnonymous(): boolean {
    return this.veeForm.state === ProfileState.Anonymous;
  }

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get profileData(): StudentProfileStep6Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as StudentProfileStep6Form;
    }
    return studentProfileStep6FormMapper(user);
  }

  onToggleUserState(): void {
    this.veeForm.state = this.isAnonymous ? ProfileState.Public : ProfileState.Anonymous;
  }

  async mounted(): Promise<void> {
    this.veeForm.resetForm({
      values: cloneDeep(this.profileData),
    });

    if (this.currentStep && this.currentStep > 6) {
      this.veeForm.setValues(cloneDeep(this.profileData));
    }
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>

<template>
  <form v-if="profileData" @submit="onSubmit">
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
        <div class="grow mr-8" :class="{ 'text-black': isAnonymous, 'text-grey-2': !isAnonymous }">
          anonym
        </div>
        <button
          type="button"
          class="relative inline-flex shrink-0 h-8 w-14 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:border-black"
          :class="{ 'bg-black': isAnonymous, 'bg-primary-1': !isAnonymous }"
          aria-pressed="false"
          @click="onToggleUserState"
        >
          <span class="sr-only">Status ändern</span>
          <span
            aria-hidden="true"
            class="pointer-events-none inline-block h-6 w-6 m-1 rounded-full bg-white ring-0 transition ease-in-out duration-200 translate-x-0"
            :class="isAnonymous ? 'translate-x-0' : 'translate-x-6'"
          />
        </button>
        <div
          class="grow text-right ml-8"
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
          <li>deine Online-Challenges</li>
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
    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="emit('clickCancel')"
            >Abbrechen</MatchdButton
          >
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="onSubmit"
            >Speichern</MatchdButton
          >
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton type="button" variant="outline" class="mr-4" @click="emit('clickBack')"
        >Zurück</MatchdButton
      >
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="onSubmit"
        >Speichern und weiter</MatchdButton
      >
    </template>
  </form>
</template>

<script setup lang="ts">
import { studentProfileStep6FormMapper } from "@/api/mappers/studentProfileStep6FormMapper";
import { studentProfileStep6InputMapper } from "@/api/mappers/studentProfileStep6InputMapper";
import { ProfileState } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { type StudentProfileStep6Form } from "@/models/StudentProfileStep6Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { useField, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(
  defineProps<{
    edit: boolean;
  }>(),
  {
    edit: false,
  },
);

const emit = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
  (event: "clickBack"): void;
}>();

const store = useStore();
const veeForm = useForm<StudentProfileStep6Form>();
const { value: state } = useField<ProfileState>("state");

const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP6,
      studentProfileStep6InputMapper(formData),
    );
    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e);
  }
});

const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const showError = computed(() => !!onboardingState.value.errors);
const onboardingState = computed(() => store.getters["onboardingState"]);
const isAnonymous = computed(() => state.value === ProfileState.Anonymous);
const user = computed(() => store.getters["user"]);
const profileData = computed(() =>
  !user.value ? ({} as StudentProfileStep6Form) : studentProfileStep6FormMapper(user.value),
);
const onToggleUserState = () =>
  (state.value = isAnonymous.value ? ProfileState.Public : ProfileState.Anonymous);

onMounted(async () => {
  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  },
);
</script>

<style></style>

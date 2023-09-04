<template>
  <form v-if="profileData && softSkills.length && culturalFits.length" @submit="onSubmit">
    <p class="mb-8">
      Bei der Suche nach deiner Traumstelle kannst du Unternehmen finden, die ähnlich ticken wie du.
      Wähle aus den folgenden Vorschlägen alle Eigenschaften und Werte aus, die dich ausmachen und
      dir wichtig sind.
    </p>
    <FormSaveError v-if="showError" />
    <SelectPillMultiple
      :options="softSkills"
      name="softSkills"
      class="mb-10"
      @change="onChangeSoftSkill"
    >
      <template #label>Ich mag es ...</template>
      <template v-if="remainingSoftSkillCount > 0" #info>
        <template v-if="remainingSoftSkillCount === 1">
          Wähle noch 1 für dich passende Aussage aus
        </template>
        <template v-else>
          Wähle {{ minSoftSkills - veeForm.values.softSkills.length }} für dich passende Aussagen
          aus
        </template></template
      >
    </SelectPillMultiple>
    <SelectPillMultiple
      :options="culturalFits"
      name="culturalFits"
      class="mb-10"
      @change="onChangeCulturalFit"
    >
      <template #label>Es ist mir wichtig, dass ...</template>
      <template v-if="remainingCulturalFits > 0" #info>
        <template v-if="remainingCulturalFits === 1">
          Wähle noch 1 für dich passende Aussage aus
        </template>
        <template v-else>
          Wähle {{ minCulturalFits - veeForm.values.culturalFits.length }} für dich passende
          Aussagen aus
        </template></template
      >
    </SelectPillMultiple>
    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="emit('clickCancel')"
          >
            Abbrechen
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="onSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton type="button" variant="outline" class="mr-4" @click="emit('clickBack')">
        Zurück
      </MatchdButton>
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="onSubmit"
      >
        Speichern und weiter
      </MatchdButton>
    </template>
  </form>
</template>

<script setup lang="ts">
import { studentProfileStep3FormMapper } from "@/api/mappers/studentProfileStep3FormMapper";
import { studentProfileStep3InputMapper } from "@/api/mappers/studentProfileStep3InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import type { SelectPillMultipleItem } from "@/types/selectPillMultiple";
import { useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(
  defineProps<{
    edit?: boolean;
  }>(),
  {
    edit: false,
  }
);

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
  (event: "clickBack"): void;
}>();

const store = useStore();
const veeForm = useForm<StudentProfileStep3Form>({});

const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP3,
      studentProfileStep3InputMapper(formData)
    );

    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e);
  }
});

const minSoftSkills = 6;
const minCulturalFits = 6;

const user = computed(() => store.getters["user"]);
const remainingSoftSkillCount = computed(() => minSoftSkills - veeForm.values.softSkills.length);
const remainingCulturalFits = computed(() => minCulturalFits - veeForm.values.culturalFits.length);
const softSkills = computed(() =>
  store.getters["softSkills"].map((softSkill) => {
    return {
      id: softSkill.id,
      name: softSkill.student,
      checked: !!veeForm.values.softSkills.find((id) => id === softSkill.id),
    };
  })
);

const culturalFits = computed(() =>
  store.getters["culturalFits"].map((culturalFit) => {
    return {
      id: culturalFit.id,
      name: culturalFit.student,
      checked: !!veeForm.values.culturalFits.find((id) => id === culturalFit.id),
    };
  })
);

const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);

const onChangeSoftSkill = (softSkill: SelectPillMultipleItem) => {
  const softSkillExists = !!veeForm.values.softSkills.find((id) => id === softSkill.id);
  if (softSkillExists) {
    veeForm.values.softSkills = veeForm.values.softSkills.filter((id) => id !== softSkill.id);
  } else if (remainingSoftSkillCount.value > 0) {
    veeForm.values.softSkills = [...veeForm.values.softSkills, softSkill.id];
  }
};

const onChangeCulturalFit = (culturalFit: SelectPillMultipleItem) => {
  const culturalFitExists = !!veeForm.values.culturalFits.find((id) => id === culturalFit.id);
  if (culturalFitExists) {
    veeForm.values.culturalFits = veeForm.values.culturalFits.filter((id) => id !== culturalFit.id);
  } else if (remainingCulturalFits.value > 0) {
    veeForm.values.culturalFits = [...veeForm.values.culturalFits, culturalFit.id];
  }
};

const profileData = computed(() => {
  if (!user.value) {
    return {} as StudentProfileStep3Form;
  }
  return studentProfileStep3FormMapper(user.value);
});

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActionTypes.SOFT_SKILLS),
    store.dispatch(ContentActionTypes.CULTURAL_FITS),
  ]);

  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>

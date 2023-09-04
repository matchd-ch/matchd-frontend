<template>
  <form v-if="profileData && softSkills.length && culturalFits.length" @submit="onSubmit">
    <p class="mb-8">
      Um den Perfect-Match für Ihr Unternehmen im Talentpool zu finden, können Sie aus den folgenden
      Vorschlägen alle Eigenschaften und Werte auswählen, die Ihnen bei einem Talent wichtig sind.
    </p>
    <FormSaveError v-if="showError" />
    <SelectPillMultiple
      :options="softSkills"
      name="softSkills"
      class="mb-10"
      @change="onChangeSoftSkill"
    >
      <template #label>Das Talent mag es ...</template>
    </SelectPillMultiple>
    <SelectPillMultiple
      :options="culturalFits"
      name="culturalFits"
      class="mb-10"
      @change="onChangeCulturalFit"
    >
      <template #label>Ihrem Unternehmen ist es wichtig, dass ...</template>
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
import { companyProfileStep4FormMapper } from "@/api/mappers/companyProfileStep4FormMapper";
import { companyProfileStep4InputMapper } from "@/api/mappers/companyProfileStep4InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { CompanyProfileStep4Form } from "@/models/CompanyProfileStep4Form";
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
const veeForm = useForm<CompanyProfileStep4Form>({});
const showError = computed(() => onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);
const user = computed(() => store.getters["user"]);

const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.COMPANY_ONBOARDING_STEP4,
      companyProfileStep4InputMapper(formData)
    );

    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e);
  }
});

const softSkills = computed(() => {
  return (
    store.getters["softSkills"].map((softSkill) => {
      return {
        id: softSkill.id,
        name: softSkill.company,
        checked: !!veeForm.values.softSkills?.find((id) => id === softSkill.id),
      };
    }) ?? []
  );
});

const culturalFits = computed(() => {
  return (
    store.getters["culturalFits"].map((culturalFit) => {
      return {
        id: culturalFit.id,
        name: culturalFit.company,
        checked: !!veeForm.values.culturalFits?.find((id) => id === culturalFit.id),
      };
    }) ?? []
  );
});

const onChangeSoftSkill = (softSkill: SelectPillMultipleItem) => {
  const softSkillExists = !!veeForm.values.softSkills.find((id) => id === softSkill.id);
  if (softSkillExists) {
    veeForm.setFieldValue(
      "softSkills",
      veeForm.values.softSkills.filter((id) => id !== softSkill.id)
    );
    return;
  }
  veeForm.setFieldValue("softSkills", [...veeForm.values.softSkills, softSkill.id]);
};

const onChangeCulturalFit = (culturalFit: SelectPillMultipleItem) => {
  const culturalFitExists = !!veeForm.values.culturalFits.find((id) => id === culturalFit.id);
  if (culturalFitExists) {
    veeForm.setFieldValue(
      "culturalFits",
      veeForm.values.culturalFits.filter((id) => id !== culturalFit.id)
    );
    return;
  }
  veeForm.setFieldValue("culturalFits", [...veeForm.values.culturalFits, culturalFit.id]);
};

const profileData = computed(() => {
  if (!user.value) {
    return {} as CompanyProfileStep4Form;
  }
  return companyProfileStep4FormMapper(user.value);
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

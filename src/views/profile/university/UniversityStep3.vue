<template>
  <form v-if="branches.length" @submit="onSubmit">
    <FormSaveError v-if="showError" />
    <!-- Link Education Field -->
    <MatchdField id="linkEducation" class="mb-10" :errors="veeForm.errors.value.linkEducation">
      <template #label>Wissenswertes zur Aus- und Weiterbildung</template>
      <Field
        id="linkEducation"
        name="linkEducation"
        as="input"
        label="Wissenswertes zur Aus- und Weiterbildung"
        rules="url"
      />
    </MatchdField>
    <!-- Link Challenges Field -->
    <MatchdField id="linkChallenges" class="mb-10" :errors="veeForm.errors.value.linkChallenges">
      <template #label>Wissenswertes zum Thema Praxisprojekte</template>
      <Field
        id="linkChallenges"
        name="linkChallenges"
        as="input"
        label="Wissenswertes zum Thema Praxisprojekte"
        rules="url"
      />
    </MatchdField>
    <!-- Link Thesis Field -->
    <MatchdField id="linkThesis" class="mb-10" :errors="veeForm.errors.value.linkThesis">
      <template #label>Wissenswertes zur Thema Abschlussarbeiten</template>
      <Field
        id="linkThesis"
        name="linkThesis"
        as="input"
        label="Wissenswertes zur Thema Abschlussarbeiten"
        rules="url"
      />
    </MatchdField>
    <!-- Description Field -->
    <MatchdField id="services" class="mb-10" :errors="veeForm.errors.value.services">
      <template #label>Unser Angebot</template>
      <Field
        id="services"
        name="services"
        as="textarea"
        maxlength="3000"
        label="Services"
        class="h-72"
      />
      <template #info>Maximal 300 Zeichen</template>
    </MatchdField>
    <!-- Branch Field -->
    <SelectPillMultiple
      :options="branches"
      name="branches"
      class="mb-10"
      :errors="veeForm.errors.value.branches"
      @change="onChangeBranch"
    >
      <template #label
        >In diesen Bereichen und Challenges können Talente bei Ihnen tätig werden</template
      >
    </SelectPillMultiple>
    <!-- Benefits Field -->
    <SelectIconGroup class="mb-10" :icons="benefits" name="benefits" @change="onChangeBenefits">
      <template #label>Das erwartet dich bei uns</template>
    </SelectIconGroup>

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
import { universityProfileStep3FormMapper } from "@/api/mappers/universityProfileStep3FormMapper";
import { universityProfileStep3InputMapper } from "@/api/mappers/universityProfileStep3InputMapper";
import type { Benefit, Branch } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import SelectIconGroup from "@/components/SelectIconGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(defineProps<{ edit?: boolean }>(), { edit: false });

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
  (event: "clickBack"): void;
}>();

const store = useStore();
const veeForm = useForm<UniversityProfileStep3Form>({});
const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);
const user = computed(() => store.getters["user"]);

const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.UNIVERSITY_ONBOARDING_STEP3,
      universityProfileStep3InputMapper(formData)
    );
    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e);
  }
});

const branches = computed(() => {
  return store.getters["branches"].map((branch) => {
    return {
      id: branch.id,
      name: branch.name,
      checked: !!veeForm.values.branches?.find(
        (selectedBranchId) => selectedBranchId === branch.id
      ),
    };
  });
});

const benefits = computed(() => {
  return store.getters["benefits"].map((benefit) => {
    return {
      ...benefit,
      checked: !!veeForm.values.benefits?.find(
        (selectedBenefitId) => selectedBenefitId === benefit.id
      ),
    };
  });
});

const profileData = computed(() => {
  if (!user.value) {
    return {} as UniversityProfileStep3Form;
  }
  return universityProfileStep3FormMapper(user.value);
});

const onChangeBranch = (branch: Branch) => {
  const branchExists = !!veeForm.values.branches.find(
    (selectedBranchId) => selectedBranchId === branch.id
  );
  if (branchExists) {
    veeForm.setFieldValue(
      "branches",
      veeForm.values.branches.filter((selectedBranchId) => selectedBranchId !== branch.id)
    );
  } else {
    veeForm.setFieldValue("branches", [...veeForm.values.branches, branch.id]);
  }
};

const onChangeBenefits = (benefit: Benefit) => {
  const benefitExists = !!veeForm.values.benefits.find(
    (selectedBenefitId) => selectedBenefitId === benefit.id
  );
  if (benefitExists) {
    veeForm.setValues({
      benefits: veeForm.values.benefits.filter(
        (selectedBenefitId) => selectedBenefitId !== benefit.id
      ),
    });
  } else {
    veeForm.setValues({ benefits: [...veeForm.values.benefits, benefit.id] });
  }
};

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActionTypes.BRANCHES),
    store.dispatch(ContentActionTypes.BENEFITS),
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

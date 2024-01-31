<template>
  <form @submit="onSubmit">
    <FormSaveError v-if="showError" />
    <MatchdField id="name" class="mb-10" :errors="veeForm.errors.value.name">
      <template #label>Vollständiger Name der Bildungsinstitution*</template>
      <Field
        id="name"
        name="name"
        as="input"
        label="Vollständiger Name der Bildungsinstitution"
        rules="required"
      />
    </MatchdField>
    <MatchdField id="street" class="mb-10" :errors="veeForm.errors.value.street">
      <template #label>Adresse</template>
      <Field id="street" name="street" as="input" label="Adresse" />
    </MatchdField>
    <div class="lg:flex">
      <MatchdField id="zip" class="lg:mr-3 mb-10 lg:w-40" :errors="veeForm.errors.value.zip">
        <template #label>PLZ</template>
        <Field
          id="zip"
          name="zip"
          as="input"
          label="PLZ"
          maxlength="4"
          @blur="onBlurZip(veeForm.values?.zip)"
        />
      </MatchdField>
      <MatchdField id="city" class="mb-10 lg:grow" :errors="veeForm.errors.value.city">
        <template #label>Ort</template>
        <Field id="city" name="city" as="input" label="Ort" />
      </MatchdField>
    </div>
    <MatchdField id="firstName" class="mb-10" :errors="veeForm.errors.value.firstName">
      <template #label>Vorname*</template>
      <Field id="firstName" name="firstName" as="input" label="Vorname" rules="required" />
    </MatchdField>
    <MatchdField id="lastName" class="mb-10" :errors="veeForm.errors.value.lastName">
      <template #label>Nachname*</template>
      <Field id="lastName" name="lastName" as="input" label="Nachname" rules="required" />
    </MatchdField>
    <MatchdField id="role" class="mb-10" :errors="veeForm.errors.value.role">
      <template #label>Funktion*</template>
      <Field id="role" name="role" as="input" label="Funktion" rules="required" />
    </MatchdField>
    <MatchdField id="mobile" class="mb-10" :errors="veeForm.errors.value.phone">
      <template #label>Telefonnummer</template>
      <Field id="mobile" name="phone" as="input" label="Telefonnummer" rules="phone" />
    </MatchdField>
    <!-- Website Field -->
    <MatchdField id="website" class="mb-10" :errors="veeForm.errors.value.website">
      <template #label>Website</template>
      <Field id="website" name="website" as="input" label="Website" rules="url" />
    </MatchdField>
    <!-- TopLevel Organisation Field -->
    <MatchdField
      id="topLevelOrganisationDescription"
      class="mb-10"
      :errors="veeForm.errors.value.topLevelOrganisationDescription"
    >
      <template #label>Unsere Dachorganisation</template>
      <Field
        id="topLevelOrganisationDescription"
        name="topLevelOrganisationDescription"
        as="input"
        label="Unsere Dachorganisation"
      />
      <template #info
        >Hier können sie angeben, zu welcher Bildungseinrichtung ihre Organisation gehört.</template
      >
    </MatchdField>
    <!-- TopLevel Organisation Website Field -->
    <MatchdField id="topLevelOrganisationWebsite" class="mb-10">
      <template #label>Webseite der Dachorganisation</template>
      <Field
        id="topLevelOrganisationWebsite"
        name="topLevelOrganisationWebsite"
        as="input"
        label="URL der Dachorganisation"
        rules="url"
      />
    </MatchdField>
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
import { universityProfileStep1FormMapper } from "@/api/mappers/universityProfileStep1FormMapper";
import { universityProfileStep1InputMapper } from "@/api/mappers/universityProfileStep1InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { UniversityProfileStep1Form } from "@/models/UniversityProfileStep1Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(defineProps<{ edit?: boolean }>(), { edit: false });

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
}>();

const store = useStore();
const veeForm = useForm<UniversityProfileStep1Form>();
const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.UNIVERSITY_ONBOARDING_STEP1,
      universityProfileStep1InputMapper(formData),
    );
    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e); // todo
  }
});

const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);
const user = computed(() => store.getters["user"]);
const showError = computed(() => !!onboardingState.value.errors);

const profileData = computed(() => {
  if (!user.value) {
    return {} as UniversityProfileStep1Form;
  }
  return universityProfileStep1FormMapper(user.value);
});

onMounted(async () => {
  await store.dispatch(ActionTypes.CITY_BY_ZIP);
  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

const onBlurZip = async (zip: string) => {
  const city = await store.getters["cityByZip"]({ zip });
  if (city) {
    veeForm.setFieldValue("city", city);
  }
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  },
);
</script>

<style></style>

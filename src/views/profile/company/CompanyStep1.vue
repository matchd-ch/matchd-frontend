<template>
  <form v-if="user" @submit="onSubmit">
    <FormSaveError v-if="showError" />
    <MatchdField id="name" class="mb-10" :errors="veeForm.errors.value.name">
      <template #label>Name des Unternehmens inkl. Rechtsform*</template>
      <Field
        id="name"
        name="name"
        as="input"
        label="Vollständiger Name der Unternehmung"
        maxlength="255"
        rules="required"
      />
    </MatchdField>
    <MatchdField id="street" class="mb-10" :errors="veeForm.errors.value.street">
      <template #label>Adresse*</template>
      <Field id="street" name="street" as="input" label="Adresse" rules="required" />
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
      <template #label>Vorname Ansprechperson*</template>
      <Field id="firstName" name="firstName" as="input" label="Vorname" rules="required" />
    </MatchdField>
    <MatchdField id="lastName" class="mb-10" :errors="veeForm.errors.value.lastName">
      <template #label>Nachname Ansprechperson*</template>
      <Field id="lastName" name="lastName" as="input" label="Nachname" rules="required" />
    </MatchdField>
    <MatchdField id="role" class="mb-10" :errors="veeForm.errors.value.role">
      <template #label>Funktion*</template>
      <Field id="role" name="role" as="input" label="Funktion" rules="required" />
    </MatchdField>
    <MatchdField id="phone" class="mb-10" :errors="veeForm.errors.value.phone">
      <template #label>Telefonnummer*</template>
      <Field
        id="phone"
        name="phone"
        as="input"
        label="Telefonnummer"
        rules="required|phone"
        placeholder="+41712223344"
      />
    </MatchdField>
    <template v-if="props.edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="$emit('clickCancel')"
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
      >
        Speichern und weiter
      </MatchdButton>
    </template>
  </form>
</template>

<script setup lang="ts">
import { companyProfileStep1FormMapper } from "@/api/mappers/companyProfileStep1FormMapper";
import { companyProfileStep1InputMapper } from "@/api/mappers/companyProfileStep1InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { CompanyProfileStep1Form } from "@/models/CompanyProfileStep1Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    edit?: boolean;
  }>(),
  {
    edit: false,
  }
);

const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
}>();

const store = useStore();

const veeForm = useForm<CompanyProfileStep1Form>();
const onSubmit = veeForm.handleSubmit(async (formData) => {
  try {
    await store.dispatch(
      ActionTypes.COMPANY_ONBOARDING_STEP1,
      companyProfileStep1InputMapper(formData)
    );
    const onboardingState = store.getters["onboardingState"];
    emits("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e); // todo
  }
});

const onboardingState = computed(() => store.getters["onboardingState"]);
const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const user = computed(() => store.getters["user"]);

const profileData = computed(() => {
  const user = store.getters["user"];
  if (!user) {
    return {} as CompanyProfileStep1Form;
  }
  return companyProfileStep1FormMapper(user);
});

onMounted(async () => {
  await store.dispatch(ActionTypes.CITY_BY_ZIP);
  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

const onBlurZip = async (zip: string) => {
  const city = store.getters["cityByZip"]({ zip });
  if (city) {
    veeForm.setFieldValue("city", city);
  }
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emits("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>

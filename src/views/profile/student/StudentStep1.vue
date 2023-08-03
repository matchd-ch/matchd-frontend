<template>
  <form @submit="onSubmit">
    <FormSaveError v-if="showError" />
    <div class="lg:flex">
      <MatchdField
        id="firstName"
        class="lg:mr-3 mb-10 grow"
        :errors="veeForm.errors.value.firstName"
      >
        <template #label>Vorname*</template>
        <Field
          id="firstName"
          name="firstName"
          as="input"
          type="firstName"
          label="Vorname"
          rules="required"
          readonly
        />
      </MatchdField>
      <MatchdField id="lastName" class="mb-10 grow" :errors="veeForm.errors.value.lastName">
        <template #label>Nachname*</template>
        <Field
          id="lastName"
          name="lastName"
          as="input"
          type="lastName"
          label="Nachname"
          rules="required"
          readonly
        />
      </MatchdField>
    </div>
    <MatchdSelect id="birthdate" class="mb-10" :errors="veeForm.errors.value.year">
      <template #label>Geburtstag</template>
      <fieldset id="birthdate" class="flex">
        <Field id="day" name="day" as="select" label="Tag" class="mr-3">
          <option value disabled selected hidden>Tag</option>
          <option v-for="n in 31" :key="`day_${n}`" :value="n">
            {{ String(n).padStart(2, "0") }}
          </option>
        </Field>
        <Field id="month" name="month" as="select" label="Monat" class="mr-3">
          <option value disabled selected hidden>Monat</option>
          <option v-for="n in 12" :key="`month_${n}`" :value="n">
            {{ String(n).padStart(2, "0") }}
          </option>
        </Field>
        <Field id="year" name="year" as="select" label="Jahr" rules="birthday:day,month,year">
          <option value disabled selected hidden>Jahr</option>
          <option v-for="n in validAges" :key="`year_${n}`" :value="n">{{ n }}</option>
        </Field>
      </fieldset>
    </MatchdSelect>
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
    <MatchdField id="mobile" class="mb-10" :errors="veeForm.errors.value.mobile">
      <template #label>Mobile-Nummer</template>
      <Field
        id="mobile"
        name="mobile"
        as="input"
        label="Mobile-Nummer"
        rules="phone"
        placeholder="+41792223344"
      />
      <template #info>
        Matchd gibt deine Mobile-Nummer nicht weiter. Du entscheidest, wann wir sie mit einem
        Unternehmen teilen dürfen.
      </template>
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
import { studentProfileStep1FormMapper } from "@/api/mappers/studentProfileStep1FormMapper";
import { studentProfileStep1InputMapper } from "@/api/mappers/studentProfileStep1InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { StudentProfileStep1Form } from "@/models/StudentProfileStep1Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(defineProps<{ edit: boolean }>(), { edit: false });

const emit = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", isDirty: boolean): void;
  (event: "clickCancel"): void;
}>();

const store = useStore();
const veeForm = useForm<StudentProfileStep1Form>();
const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP1,
      studentProfileStep1InputMapper(formData)
    );
    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e); // todo
  }
});

const showError = computed(() => onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);

const profileData = computed(() => {
  const user = store.getters["user"];
  if (!user) {
    return {} as StudentProfileStep1Form;
  }
  return studentProfileStep1FormMapper(user);
});

const validAges = computed(() => {
  const currentYear = new Date().getFullYear();
  const minAge = 13;
  const maxAge = 40;
  const validYears = [];
  for (let i = currentYear - minAge; currentYear - maxAge <= i; i--) {
    validYears.push(i);
  }
  return validYears;
});

onMounted(() => {
  store.dispatch(ActionTypes.CITY_BY_ZIP);
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
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>

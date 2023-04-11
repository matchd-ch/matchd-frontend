<template>
  <form @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <MatchdField id="name" class="mb-10" :errors="veeForm.errors.name">
      <template #label>Vollständiger Name der Bildungsinstitution*</template>
      <Field
        id="name"
        name="name"
        as="input"
        label="Vollständiger Name der Bildungsinstitution"
        rules="required"
      />
    </MatchdField>
    <MatchdField id="street" class="mb-10" :errors="veeForm.errors.street">
      <template #label>Adresse*</template>
      <Field id="street" name="street" as="input" label="Adresse" rules="required" />
    </MatchdField>
    <div class="lg:flex">
      <MatchdField id="zip" class="lg:mr-3 mb-10 lg:w-40" :errors="veeForm.errors.zip">
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
      <MatchdField id="city" class="mb-10 lg:grow" :errors="veeForm.errors.city">
        <template #label>Ort</template>
        <Field id="city" name="city" as="input" label="Ort" />
      </MatchdField>
    </div>
    <MatchdField id="firstName" class="mb-10" :errors="veeForm.errors.firstName">
      <template #label>Vorname*</template>
      <Field id="firstName" name="firstName" as="input" label="Vorname" rules="required" />
    </MatchdField>
    <MatchdField id="lastName" class="mb-10" :errors="veeForm.errors.lastName">
      <template #label>Nachname*</template>
      <Field id="lastName" name="lastName" as="input" label="Nachname" rules="required" />
    </MatchdField>
    <MatchdField id="role" class="mb-10" :errors="veeForm.errors.role">
      <template #label>Funktion*</template>
      <Field id="role" name="role" as="input" label="Funktion" rules="required" />
    </MatchdField>
    <MatchdField id="mobile" class="mb-10" :errors="veeForm.errors.phone">
      <template #label>Telefonnummer*</template>
      <Field id="mobile" name="phone" as="input" label="Telefonnummer" rules="required|phone" />
    </MatchdField>
    <!-- Website Field -->
    <MatchdField id="website" class="mb-10" :errors="veeForm.errors.website">
      <template #label>Website*</template>
      <Field id="website" name="website" as="input" label="Website" rules="required|url" />
    </MatchdField>
    <!-- TopLevel Organisation Field -->
    <MatchdField
      id="topLevelOrganisationDescription"
      class="mb-10"
      :errors="veeForm.errors.topLevelOrganisationDescription"
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
            @click="$emit('clickCancel')"
            >Abbrechen</MatchdButton
          >
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="veeForm.onSubmit"
            >Speichern</MatchdButton
          >
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="veeForm.onSubmit"
        >Speichern und weiter</MatchdButton
      >
    </template>
  </form>
</template>

<script lang="ts">
import { universityProfileStep1FormMapper } from "@/api/mappers/universityProfileStep1FormMapper";
import { universityProfileStep1InputMapper } from "@/api/mappers/universityProfileStep1InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { OnboardingState } from "@/models/OnboardingState";
import type { UniversityProfileStep1Form } from "@/models/UniversityProfileStep1Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ErrorMessage, Field, Form, useForm } from "vee-validate";
import { Options, prop, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    FormSaveError,
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    MatchdField,
  },
  emits: ["submitComplete", "changeDirty", "clickCancel"],
})
export default class UniversityStep1 extends Vue.with(Props) {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<UniversityProfileStep1Form>();
    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
      try {
        await store.dispatch(
          ActionTypes.UNIVERSITY_ONBOARDING_STEP1,
          universityProfileStep1InputMapper(formData)
        );
        const onboardingState = store.getters["onboardingState"];
        this.$emit("submitComplete", onboardingState.success);
      } catch (e) {
        console.log(e); // todo
      }
    });

    return {
      ...form,
      onSubmit,
    };
  });
  formData = {} as UniversityProfileStep1Form;
  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get user() {
    return this.$store.getters["user"];
  }

  get showError(): boolean {
    return !!this.onboardingState.errors;
  }

  get currentStep(): number | undefined {
    return this.$store.getters["profileStep"];
  }

  get profileData(): UniversityProfileStep1Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as UniversityProfileStep1Form;
    }
    return universityProfileStep1FormMapper(user);
  }

  async mounted(): Promise<void> {
    this.$store.dispatch(ActionTypes.CITY_BY_ZIP);

    this.veeForm.resetForm({
      values: this.profileData,
    });

    calculateMargins();
  }

  async onBlurZip(zip: string): Promise<void> {
    const city = this.$store.getters["cityByZip"]({ zip });
    if (city) {
      this.veeForm.setFieldValue("city", city);
    }
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>

<template>
  <form v-if="user" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <MatchdField id="name" class="mb-10" :errors="veeForm.errors.name">
      <template v-slot:label>Name des Unternehmens inkl. Rechtsform*</template>
      <Field
        id="name"
        name="name"
        as="input"
        label="Vollständiger Name der Unternehmung"
        rules="required"
      />
    </MatchdField>
    <MatchdField id="street" class="mb-10" :errors="veeForm.errors.street">
      <template v-slot:label>Adresse*</template>
      <Field id="street" name="street" as="input" label="Adresse" rules="required" />
    </MatchdField>
    <div class="lg:flex">
      <MatchdField id="zip" class="lg:mr-3 mb-10 lg:w-40" :errors="veeForm.errors.zip">
        <template v-slot:label>PLZ</template>
        <Field
          id="zip"
          name="zip"
          as="input"
          label="PLZ"
          maxlength="4"
          @blur="onBlurZip(veeForm.values?.zip)"
        />
      </MatchdField>
      <MatchdField id="city" class="mb-10 lg:flex-grow" :errors="veeForm.errors.city">
        <template v-slot:label>Ort</template>
        <Field id="city" name="city" as="input" label="Ort" />
      </MatchdField>
    </div>
    <MatchdField id="firstName" class="mb-10" :errors="veeForm.errors.firstName">
      <template v-slot:label>Vorname Ansprechperson*</template>
      <Field id="firstName" name="firstName" as="input" label="Vorname" rules="required" />
    </MatchdField>
    <MatchdField id="lastName" class="mb-10" :errors="veeForm.errors.lastName">
      <template v-slot:label>Nachname Ansprechperson*</template>
      <Field id="lastName" name="lastName" as="input" label="Nachname" rules="required" />
    </MatchdField>
    <MatchdField id="role" class="mb-10" :errors="veeForm.errors.role">
      <template v-slot:label>Funktion*</template>
      <Field id="role" name="role" as="input" label="Funktion" rules="required" />
    </MatchdField>
    <MatchdField id="mobile" class="mb-10" :errors="veeForm.errors.phone">
      <template v-slot:label>Telefonnummer*</template>
      <Field
        id="mobile"
        name="phone"
        as="input"
        label="Telefonnummer"
        rules="required|phone"
        placeholder="+41712223344"
      />
    </MatchdField>
    <teleport to="footer">
      <slot />
    </teleport>
  </form>
</template>

<script lang="ts">
import { companyProfileStep1FormMapper } from "@/api/mappers/companyProfileStep1FormMapper";
import { companyProfileStep1InputMapper } from "@/api/mappers/companyProfileStep1InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { CompanyProfileStep1Form } from "@/models/CompanyProfileStep1Form";
import type { OnboardingState } from "@/models/OnboardingState";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import type { User } from "api";
import cloneDeep from "clone-deep";
import { ErrorMessage, Field, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Options({
  components: {
    Field,
    ErrorMessage,
    FormSaveError,
    MatchdButton,
    MatchdField,
  },
})
export default class CompanyStep1Form extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<CompanyProfileStep1Form>();
    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.COMPANY_ONBOARDING_STEP1,
            companyProfileStep1InputMapper(formData)
          );
          const onboardingState = store.getters["onboardingState"];
          this.$emit("submitComplete", onboardingState.success);
        } catch (e) {
          console.log(e); // todo
        }
      }
    );

    return {
      ...form,
      onSubmit,
    };
  });
  formData = {} as CompanyProfileStep1Form;

  get showError(): boolean {
    return !!this.onboardingState.errors;
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

  get profileData(): CompanyProfileStep1Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as CompanyProfileStep1Form;
    }
    return companyProfileStep1FormMapper(user);
  }

  async mounted(): Promise<void> {
    await this.$store.dispatch(ActionTypes.CITY_BY_ZIP);
    this.veeForm.resetForm({
      values: cloneDeep(this.profileData),
    });
    calculateMargins();
  }

  async onBlurZip(zip: string): Promise<void> {
    const city = this.$store.getters["cityByZip"]({ zip });
    if (city) {
      this.veeForm.setFieldValue("city", city);
    }
  }

  async onSubmit(form: CompanyProfileStep1Form): Promise<void> {
    await this.$store.dispatch(
      ActionTypes.COMPANY_ONBOARDING_STEP1,
      companyProfileStep1InputMapper(form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt2" } });
    }
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>

<template>
  <div class="bg-grey-4">
    <div class="register-company grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5 px-4 lg:px-5">
      <h1
        class="text-display-xl-fluid text-primary-1 col-span-full lg:fixed lg:transition-all lg:top-0"
        :class="{ 'attach-heading': registration.attached }"
      >
        Registrierung
      </h1>
    </div>
    <div class="px-4 lg:px-5">
      <MatchdStep step="1">
        <template v-if="form.type === 'company'" v-slot:title
          >Möchte ihr Unternehmen Teil der Matchd-Community werden?</template
        >
        <template v-else v-slot:title
          >Möchte ihre Organisation Teil der Matchd-Community werden?</template
        >
        <MatchdButton
          type="button"
          variant="outline"
          :active="isValidCompany"
          @click="onClickConfirmCompany(true)"
          class="mb-3 lg:mb-0 mr-3"
          >Ja</MatchdButton
        >
        <MatchdButton type="button" variant="outline" @click="registration.onClickNo()"
          >Nein</MatchdButton
        >
      </MatchdStep>
      <MatchdStep
        v-if="form.type === 'company'"
        v-show="activeStep >= 2"
        step="2"
        class="col-start-1 col-span-8 lg:col-start-5 lg:col-span-8 row-start-2"
      >
        <template v-slot:title>Bitte hinterlegen sie die UID-Nummer ihres Unternehmens:</template>
        <Form @submit="onSubmitUid" v-slot="{ errors }">
          <MatchdField id="uid" class="mb-10" :errors="errors.uid">
            <template v-slot:label>UID-Nr.</template>
            <Field
              id="uid"
              name="uid"
              as="input"
              placeholder="CHE-xxx.xxx.xxx"
              label="UID-Nr."
              rules="required|uid"
            />
          </MatchdField>
          <MatchdButton variant="outline">Weiter</MatchdButton>
        </Form>
      </MatchdStep>
      <MatchdStep
        v-show="activeStep >= 3"
        step="3"
        class="col-start-1 col-span-8 lg:col-start-5 lg:col-span-8 row-start-2"
      >
        <template v-slot:title>
          Erzählen sie, wer sie sind. Diese Angaben erscheinen später auf ihrem Profil.
        </template>
        <Form @submit="onSubmitCompanyData" v-slot="{ errors }">
          <MatchdField id="name" class="mb-3" :errors="errors.name">
            <template v-if="form.type === 'company'" v-slot:label
              >Vollständiger Name der Unternehmung</template
            >
            <template v-else v-slot:label>Vollständiger Name der Bildungsinstitution</template>
            <Field
              id="name"
              name="name"
              as="input"
              :label="
                form.type === 'company' ? 'Name der Unternehmung' : 'Name der Bildungsinstitution'
              "
              rules="required"
            />
          </MatchdField>
          <div class="lg:flex">
            <MatchdField id="zip" class="lg:mr-3 mb-3 lg:w-40" :errors="errors.zip">
              <template v-slot:label>PLZ</template>
              <Field id="zip" name="zip" as="input" label="PLZ" rules="required" />
            </MatchdField>
            <MatchdField id="city" class="mb-3 lg:flex-grow" :errors="errors.city">
              <template v-slot:label>Ort</template>
              <Field id="city" name="city" as="input" label="Ort" rules="required" />
            </MatchdField>
          </div>
          <div class="lg:flex">
            <MatchdField
              id="firstName"
              class="lg:mr-3 mb-3 lg:flex-grow"
              :errors="errors.firstName"
            >
              <template v-slot:label>Vorname</template>
              <Field id="firstName" name="firstName" as="input" label="Vorname" rules="required" />
            </MatchdField>
            <MatchdField id="lastName" class="mb-3 lg:flex-grow" :errors="errors.lastName">
              <template v-slot:label>Nachname</template>
              <Field id="lastName" name="lastName" as="input" label="Nachname" rules="required" />
            </MatchdField>
          </div>
          <MatchdField id="role" class="mb-3" :errors="errors.role">
            <template v-slot:label>Funktion</template>
            <Field
              id="role"
              name="role"
              as="input"
              label="Funktion"
              rules="required"
              :class="{ invalid: errors.role }"
            />
          </MatchdField>
          <MatchdField id="email" class="mb-3" :errors="errors.email">
            <template v-slot:label>E-Mail</template>
            <Field
              id="email"
              name="email"
              as="input"
              type="email"
              label="E-Mail"
              rules="required|email"
            />
          </MatchdField>
          <MatchdField id="password" class="mb-10" :errors="errors.password" icon-right="true">
            <template v-slot:label>Passwort</template>
            <Field
              id="password"
              name="password"
              as="input"
              :type="registration.passwordFieldType"
              label="Passwort"
              rules="required|password-strengh"
              autocomplete
            />
            <template v-slot:iconRight>
              <button
                type="button"
                @click="registration.onTogglePasswordVisibility"
                class="h-full flex justify-center items-center p-2 mr-4"
              >
                <component
                  :is="registration.passwordFieldType === 'password' ? 'IconShow' : 'IconHide'"
                  class="w-6"
                />
              </button>
            </template>
            <template v-slot:info
              >Nutzen sie mindestens 8 Zeichen bestehend aus Buchstaben, Ziffern,
              Sonderzeichen.</template
            >
          </MatchdField>

          <MatchdToggle id="dataProtection" class="mb-10" :errors="errors.dataProtectionAccepted">
            <template v-slot:label><a :ref="VUE_APP_DATA_PROTECTION_URL">datenschutzerklaerung</a></template>
            <input
              id="dataProtection"
              name="dataProtection"
              type="checkbox"
              v-model="dataProtectionAccepted"
            />
          </MatchdToggle>

          <MatchdButton
            variant="outline"
            :disabled="companyRegistrationLoading || !dataProtectionAccepted"
            :loading="companyRegistrationLoading"
          >Registrieren</MatchdButton
          >
        </Form>
      </MatchdStep>
      <MatchdStep
        v-show="activeStep >= 4"
        step="4"
        class="col-start-1 col-span-8 lg:col-start-5 lg:col-span-8 row-start-2"
      >
        <template v-slot:title>
          Fast geschafft:<br />Aktivieren sie ihren Account mit dem Link, den wir ihnen per Mail an
          {{ form.email || "?" }} geschickt haben.
        </template>
      </MatchdStep>
    </div>
  </div>
</template>

<script lang="ts">
import { useRegistration } from "@/composables/Registration";
import { CompanyRegistrationState } from "@/models/CompanyRegistrationState";
import { NewCompanyAccount } from "@/models/NewAccount";
import {
  RegistrationCompanyFormData,
  RegistrationCompanyFormUid,
} from "@/models/RegistrationCompanyForm";
import { ActionTypes as RegistrationActionTypes } from "@/store/modules/registration/action-types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdStep from "@/components/MatchdStep.vue";
import IconShow from "@/assets/icons/show.svg";
import IconHide from "@/assets/icons/hide.svg";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import MatchdToggle from "@/components/MatchdToggle.vue";

@Options({
  components: {
    MatchdButton,
    MatchdStep,
    MatchdField,
    MatchdToggle,
    IconShow,
    IconHide,
    Form,
    Field,
    ErrorMessage,
  },
})
export default class CompanyRegister extends Vue {
  meta = setup(() => useMeta({}));
  isValidCompany: boolean | null = null;
  isCompanyUidFormValid = false;
  isCompanyDataFormValid = false;
  dataProtectionAccepted = false;
  form: NewCompanyAccount = {
    uid: "",
    firstName: "",
    lastName: "",
    name: "",
    role: "",
    zip: "",
    city: "",
    email: "",
    password: "",
    type: "company",
  };

  registration = setup(() => useRegistration());

  get companyRegistrationLoading(): boolean {
    return this.$store.getters["companyRegistrationLoading"];
  }

  get companyRegistrationState(): CompanyRegistrationState {
    return this.$store.getters["companyRegistrationState"];
  }

  get activeStep(): number {
    if (!this.isValidCompany) {
      return 1;
    } else if (this.form.type === "company" && !this.isCompanyUidFormValid) {
      return 2;
    } else if (!this.isCompanyDataFormValid) {
      return 3;
    } else {
      return 4;
    }
  }

  mounted(): void {
    this.form.type = this.registration.urlToAccountTypeMapper(this.$route.path);
    this.meta.meta.title =
      this.form.type === "company"
        ? "Unternehmen registrieren"
        : "Bildungsinstitution registrieren";
    this.registration.mounted("theme-company");
  }

  beforeUnmount(): void {
    this.registration.beforeUnmount("theme-company");
  }

  onClickConfirmCompany(response: boolean): void {
    const nextStep = this.form.type === "company" ? 2 : 3;
    this.isValidCompany = response;
    this.registration.scrollToStep(nextStep);
  }

  onSubmitUid(form: RegistrationCompanyFormUid): void {
    this.form = {
      ...this.form,
      ...form,
    };
    this.isCompanyUidFormValid = true;
    this.registration.scrollToStep(3);
  }

  async onSubmitCompanyData(
    form: RegistrationCompanyFormData,
    actions: FormActions<Partial<RegistrationCompanyFormData>>
  ): Promise<void> {
    this.form = {
      ...this.form,
      ...form,
    };
    await this.$store.dispatch(RegistrationActionTypes.SAVE_COMPANY_REGISTRATION, this.form);
    if (this.companyRegistrationState.errors) {
      actions.setErrors(this.companyRegistrationState.errors);
      if (
        this.companyRegistrationState.errors.username &&
        this.companyRegistrationState.errors.username[0] === "unique"
      ) {
        actions.setErrors({
          email: "Mit dieser E-Mailadresse wurde bereits ein Account registriert.",
        });
      }
      return;
    }
    this.isCompanyDataFormValid = true;
    this.registration.scrollToStep(4);
  }
}
</script>

<style lang="postcss" scoped>
.attach-heading {
  top: 50%;
  transform: translateY(-50%);
  @apply text-display-sm;
}

.register-company {
  counter-reset: step;
}
</style>

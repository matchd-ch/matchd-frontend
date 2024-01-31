<template>
  <div class="bg-grey-4">
    <div class="register-company grid grid-cols-8 xl:grid-cols-16 gap-x-4 xl:gap-x-5 px-4 xl:px-5">
      <div
        class="col-span-full xl:fixed xl:transition-all xl:top-0"
        :class="{ 'attach-heading': registration.attached }"
      >
        <BackLink :to="{ name: 'Triage' }" class="backlink" />
        <h1 class="text-display-xl-fluid text-primary-1">Matchd beitreten</h1>
      </div>
    </div>
    <div class="px-4 xl:px-5">
      <MatchdStep step="1">
        <template v-if="form.type === 'company'" #title
          >Möchte Ihr Unternehmen Talente der Matchd-Community kennenlernen?</template
        >
        <template v-else #title
          >Möchte ihre Organisation Talente der Matchd-Community kennenlernen?</template
        >
        <MatchdButton
          type="button"
          variant="outline"
          :active="isValidCompany"
          class="mb-3 xl:mb-0 mr-3"
          @click="onClickConfirmCompany(true)"
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
        class="col-start-1 col-span-8 xl:col-start-5 xl:col-span-8 row-start-2"
      >
        <template #title>
          Bitte geben Sie uns die Unternehmens-Identifikationsnummer (UID-Nr.) Ihres Unternehmens
          an.
        </template>
        <Form v-slot="{ errors }" @submit="onSubmitUid">
          <MatchdField id="uid" class="mb-10" :errors="errors.uid">
            <template #label>UID-Nr.</template>
            <Field
              id="uid"
              name="uid"
              as="input"
              placeholder="CHE-xxx.xxx.xxx"
              label="UID-Nr."
              rules="required|uid"
            />
            <template #info>
              Ihre UID-Nr. finden Sie online&nbsp;
              <a
                href="https://www.uid.admin.ch/Search.aspx?lang=de"
                target="_blank"
                class="underline"
                >im UID-Register</a
              >.
            </template>
          </MatchdField>
          <MatchdButton variant="outline">Speichern und weiter</MatchdButton>
        </Form>
      </MatchdStep>
      <MatchdStep
        v-show="activeStep >= 3"
        step="3"
        class="col-start-1 col-span-8 xl:col-start-5 xl:col-span-8 row-start-2"
      >
        <template #title
          >Erzählen sie, wer sie sind. Diese Angaben erscheinen später auf ihrem Profil.</template
        >
        <Form v-slot="{ errors }" @submit="onSubmitCompanyData">
          <MatchdField id="name" class="mb-3" :errors="errors.name">
            <template v-if="form.type === 'company'" #label
              >Name des Unternehmens inkl. Rechtsform</template
            >
            <template v-else #label>Vollständiger Name der Bildungsinstitution</template>
            <Field
              id="name"
              name="name"
              as="input"
              maxlength="255"
              :label="
                form.type === 'company' ? 'Name der Unternehmung' : 'Name der Bildungsinstitution'
              "
              rules="required"
            />
          </MatchdField>
          <div class="xl:flex">
            <MatchdField id="zip" class="xl:mr-3 mb-3 xl:w-40" :errors="errors.zip">
              <template #label>PLZ</template>
              <Field id="zip" name="zip" as="input" label="PLZ" rules="required" maxlength="4" />
            </MatchdField>
            <MatchdField id="city" class="mb-3 xl:grow" :errors="errors.city">
              <template #label>Ort</template>
              <Field id="city" name="city" as="input" label="Ort" rules="required" />
            </MatchdField>
          </div>
          <div class="xl:flex">
            <MatchdField id="firstName" class="xl:mr-3 mb-3 xl:grow" :errors="errors.firstName">
              <template #label>Vorname Ansprechperson</template>
              <Field id="firstName" name="firstName" as="input" label="Vorname" rules="required" />
            </MatchdField>
            <MatchdField id="lastName" class="mb-3 xl:grow" :errors="errors.lastName">
              <template #label>Nachname Ansprechperson</template>
              <Field id="lastName" name="lastName" as="input" label="Nachname" rules="required" />
            </MatchdField>
          </div>
          <MatchdField id="role" class="mb-3" :errors="errors.role">
            <template #label>Funktion</template>
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
            <template #label>E-Mail Ansprechperson</template>
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
            <template #label>Passwort</template>
            <Field
              id="password"
              name="password"
              as="input"
              :type="registration.passwordFieldType"
              label="Passwort"
              rules="required|password-strengh"
              autocomplete
            />
            <template #iconRight>
              <button
                type="button"
                class="h-full flex justify-center items-center p-2 mr-4"
                @click="registration.onTogglePasswordVisibility"
              >
                <component
                  :is="registration.passwordFieldType === 'password' ? 'IconShow' : 'IconHide'"
                  class="w-6"
                />
              </button>
            </template>
            <template #info>
              Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine
              Zahl und ein Sonderzeichen enthalten.
            </template>
          </MatchdField>

          <MatchdToggle id="dataProtection" class="mb-10" :errors="errors.dataProtection">
            <template #label>
              <a class="underline" :href="dataProtectionLink" target="_blank"
                >Datenschutzerklärung</a
              >
              von Matchd
            </template>
            <Field
              id="dataProtection"
              name="dataProtection"
              label="Datenschutzerklärung"
              type="checkbox"
              value="true"
              :rules="{ required: true }"
            />
            <template #value
              >Ja, ich habe die Datenschutzerklärung gelesen und akzeptiere sie</template
            >
          </MatchdToggle>

          <MatchdButton
            variant="outline"
            :disabled="companyRegistrationLoading"
            :loading="companyRegistrationLoading"
            >Registrieren</MatchdButton
          >
        </Form>
      </MatchdStep>
      <MatchdStep
        v-show="activeStep >= 4"
        step="4"
        class="col-start-1 col-span-8 xl:col-start-5 xl:col-span-8 row-start-2"
      >
        <template #title>
          Fast geschafft. Aktivieren Sie Ihren Matchd-Account über den Link, den Sie per E-Mail
          erhalten haben.
        </template>
      </MatchdStep>
    </div>
  </div>
</template>

<script lang="ts">
import IconHide from "@/assets/icons/hide.svg";
import IconShow from "@/assets/icons/show.svg";
import BackLink from "@/components/BackLink.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdStep from "@/components/MatchdStep.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import { useRegistration } from "@/composables/Registration";
import { config } from "@/config";
import type { CompanyRegistrationState } from "@/models/CompanyRegistrationState";
import type { NewCompanyAccount } from "@/models/NewAccount";
import type {
  RegistrationCompanyFormData,
  RegistrationCompanyFormUid,
} from "@/models/RegistrationCompanyForm";
import { ActionTypes as RegistrationActionTypes } from "@/store/modules/registration/action-types";
import type { FormActions } from "vee-validate";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue, setup } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    BackLink,
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
  dataProtectionLink = config.DATA_PROTECTION_URL;
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
    this.registration.scrollToStep(this.$route.path, nextStep);
  }

  onSubmitUid(form: RegistrationCompanyFormUid): void {
    this.form = {
      ...this.form,
      ...form,
    };
    this.isCompanyUidFormValid = true;
    this.registration.scrollToStep(this.$route.path, 3);
  }

  async onSubmitCompanyData(
    form: RegistrationCompanyFormData,
    actions: FormActions<Partial<RegistrationCompanyFormData>>,
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
    this.registration.scrollToStep(this.$route.path, 4);
  }
}
</script>

<style lang="postcss" scoped>
.attach-heading {
  top: 50%;
  transform: translateY(-50%);

  & .backlink {
    display: none;
  }

  & h1 {
    @apply text-display-sm;
  }
}

.attach-heading {
  top: 50%;
  transform: translateY(-50%);

  & .backlink {
    display: none;
  }

  & h1 {
    @apply text-display-sm;
  }
}

.register-company {
  counter-reset: step;
}
</style>

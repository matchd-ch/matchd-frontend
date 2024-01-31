<template>
  <div class="bg-grey-4">
    <div class="register-student grid grid-cols-8 xl:grid-cols-16 gap-x-4 xl:gap-x-5 px-4 xl:px-5">
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
        <template #title>Besuchst du im Kanton St.Gallen eine Bildungsinstitution?</template>
        <MatchdButton
          type="button"
          variant="outline"
          :active="isValidStudent === true"
          class="mb-3 xl:mb-0 mr-3"
          @click="onClickConfirmStudent(true)"
          >Ja</MatchdButton
        >
        <MatchdButton
          type="button"
          variant="outline"
          :active="isValidStudent === false"
          @click="onClickConfirmStudent(false)"
          >Nein</MatchdButton
        >
      </MatchdStep>
      <MatchdStep
        v-if="isValidStudent === false"
        v-show="activeStep >= 2"
        step="2"
        class="col-start-1 col-span-8 xl:col-start-5 xl:col-span-8 row-start-2"
      >
        <template #title
          >Suchst du in der Ostschweiz ein Praktikum, eine Lehrstelle oder Festanstellung?</template
        >
        <MatchdButton
          type="button"
          variant="outline"
          :active="isValidPosition"
          class="mb-3 xl:mb-0 mr-3"
          @click="onClickConfirmPosition(true)"
          >Ja</MatchdButton
        >
        <MatchdButton type="button" variant="outline" @click="registration.onClickNo()"
          >Nein</MatchdButton
        >
      </MatchdStep>
      <MatchdStep
        v-show="activeStep >= 3"
        step="3"
        class="col-start-1 col-span-8 xl:col-start-5 xl:col-span-8 row-start-2"
      >
        <template #title>
          Bei Matchd bist du genau richtig!
          <br />Schreib dich ein und deine Job- oder Challengesuche kann starten.
        </template>
        <Form v-slot="{ errors }" @submit="onSubmitStudentData">
          <div class="xl:flex">
            <MatchdField id="firstName" class="xl:mr-3 mb-3 xl:grow" :errors="errors.firstName">
              <template #label>Vorname</template>
              <Field id="firstName" name="firstName" as="input" label="Vorname" rules="required" />
            </MatchdField>
            <MatchdField id="lastName" class="mb-3 xl:grow" :errors="errors.lastName">
              <template #label>Nachname</template>
              <Field id="lastName" name="lastName" as="input" label="Nachname" rules="required" />
            </MatchdField>
          </div>
          <MatchdField id="email" class="mb-3" :errors="errors.email">
            <template #label>E-Mail</template>
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
            :disabled="studentRegistrationLoading"
            :loading="studentRegistrationLoading"
            >Ready to match</MatchdButton
          >
        </Form>
      </MatchdStep>
      <MatchdStep
        v-show="activeStep >= 4"
        step="4"
        class="col-start-1 col-span-8 xl:col-start-5 xl:col-span-8 row-start-2"
      >
        <template #title>
          Fast geschafft, {{ form.firstName }}! 🥳 <br />Aktiviere deinen Matchd-Account über den
          Link, den wir dir per E-Mail geschickt haben.
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
import type { NewStudentAccount } from "@/models/NewAccount";
import type { RegistrationStudentFormData } from "@/models/RegistrationStudentForm";
import type { StudentRegistrationState } from "@/models/StudentRegistrationState";
import { ActionTypes as RegistrationActionTypes } from "@/store/modules/registration/action-types";
import type { FormActions } from "vee-validate";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
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
export default class StudentRegister extends Vue {
  meta = setup(() => useMeta({}));
  isValidStudent: boolean | null = null;
  isValidPosition: boolean | null = null;
  isStudentDataFormValid = false;
  dataProtectionLink = config.DATA_PROTECTION_URL;
  form: NewStudentAccount = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "student",
  };

  registration = setup(() => useRegistration());

  get studentRegistrationLoading(): boolean {
    return this.$store.getters["studentRegistrationLoading"];
  }

  get studentRegistrationState(): StudentRegistrationState {
    return this.$store.getters["studentRegistrationState"];
  }

  get activeStep(): number {
    if (this.isValidStudent === null) {
      return 1;
    } else if (!this.isValidStudent && !this.isValidPosition) {
      return 2;
    } else if (!this.isStudentDataFormValid) {
      return 3;
    } else {
      return 4;
    }
  }

  mounted(): void {
    this.form.type = this.registration.urlToAccountTypeMapper(this.$route.path);
    this.meta.meta.title =
      this.form.type === "student" ? "Schüler registrieren" : "Student registrieren";
    this.registration.mounted("theme-student");
  }

  beforeUnmount(): void {
    this.registration.beforeUnmount("theme-student");
  }

  unmounted(): void {
    document.getElementById("app")?.classList.remove("theme-student");
  }

  onClickConfirmStudent(response: boolean): void {
    const nextStep = response ? 3 : 2;
    this.isValidStudent = response;
    this.isValidPosition = null;
    this.registration.scrollToStep(this.$route.path, nextStep);
  }

  onClickConfirmPosition(response: boolean): void {
    this.isValidPosition = response;
    this.registration.scrollToStep(this.$route.path, 3);
  }

  async onSubmitStudentData(
    form: RegistrationStudentFormData,
    actions: FormActions<Partial<RegistrationStudentFormData>>,
  ): Promise<void> {
    this.form = {
      ...this.form,
      ...form,
    };
    await this.$store.dispatch(RegistrationActionTypes.SAVE_STUDENT_REGISTRATION, this.form);
    if (this.studentRegistrationState.errors) {
      actions.setErrors(this.studentRegistrationState.errors);
      if (
        this.studentRegistrationState.errors.username &&
        this.studentRegistrationState.errors.username[0] === "unique"
      ) {
        actions.setErrors({
          email: "Mit dieser E-Mailadresse wurde bereits ein Account registriert.",
        });
      }
      return;
    }
    this.isStudentDataFormValid = true;
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

.register-student {
  counter-reset: step;
}
</style>

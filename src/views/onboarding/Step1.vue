<template>
  <Form @submit="onSubmit" v-slot="{ errors }">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <MatchdField id="firstName" class="mb-10" :errors="errors.firstName">
      <template v-slot:label>Dein Vorname*</template>
      <Field
        id="firstName"
        name="firstName"
        as="input"
        type="firstName"
        label="Vorname"
        rules="required"
        v-model="form.firstName"
      />
    </MatchdField>
    <MatchdField id="lastName" class="mb-10" :errors="errors.lastName">
      <template v-slot:label>Dein Nachname*</template>
      <Field
        id="lastName"
        name="lastName"
        as="input"
        type="lastName"
        label="Nachname"
        rules="required"
        v-model="form.lastName"
      />
    </MatchdField>
    <MatchdSelect id="birthdate" class="mb-10" :errors="errors.year">
      <template v-slot:label>Dein Geburtstag*</template>
      <fieldset id="birthdate" class="flex">
        <Field
          id="day"
          name="day"
          as="select"
          label="Tag"
          class="mr-3"
          rules="required"
          v-model="form.day"
        >
          <option value="" disabled selected hidden>Tag</option>
          <option v-for="(n, index) in 31" :value="n" :key="index">{{
            String(n).padStart(2, "0")
          }}</option>
        </Field>
        <Field
          id="month"
          name="month"
          as="select"
          label="Monat"
          class="mr-3"
          rules="required"
          v-model="form.month"
        >
          <option value="" disabled selected hidden>Monat</option>
          <option v-for="(n, index) in 12" :value="n" :key="index">{{
            String(n).padStart(2, "0")
          }}</option>
        </Field>
        <Field
          id="year"
          name="year"
          as="select"
          label="Jahr"
          rules="birthday:day,month,year"
          v-model="form.year"
        >
          <option value="" disabled selected hidden>Jahr</option>
          <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
        </Field>
      </fieldset>
    </MatchdSelect>
    <div class="lg:flex">
      <MatchdField id="zip" class="lg:mr-3 mb-3 lg:w-40" :errors="errors.zip">
        <template v-slot:label>PLZ</template>
        <Field id="zip" name="zip" as="input" label="PLZ" @blur="onBlurZip" v-model="form.zip" />
      </MatchdField>
      <MatchdField id="city" class="mb-3 lg:flex-grow" :errors="errors.city">
        <template v-slot:label>Ort</template>
        <Field id="city" name="city" as="input" label="Ort" v-model="form.city" />
      </MatchdField>
    </div>
    <MatchdField id="street" class="mb-3" :errors="errors.street">
      <template v-slot:label>Adresse</template>
      <Field id="street" name="street" as="input" label="Adresse" v-model="form.street" />
    </MatchdField>
    <MatchdField id="mobile" class="mb-10" :errors="errors.mobile">
      <template v-slot:label>Deine Mobile-Nummer</template>
      <Field
        id="mobile"
        name="mobile"
        as="input"
        label="Mobile-Nummer"
        rules="phone"
        v-model="form.mobile"
      />
      <template v-slot:info
        >Wir teilen deine Mobile-Nummer nur mit Firmen, für welche du dich ebenfalls
        interessierst.</template
      >
    </MatchdField>
    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading"
      :loading="onboardingLoading"
      theme="neutral"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import { StudentProfileStep1Form } from "@/models/StudentProfileStep1Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { UserWithProfileNode } from "api";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    MatchdField,
    MatchdSelect,
  },
})
export default class Step1 extends Vue {
  form: StudentProfileStep1Form = {
    firstName: "",
    lastName: "",
    zip: "",
    city: "",
    mobile: "",
    street: "",
    day: "",
    month: "",
    year: "",
  };

  get validYears(): number[] {
    const currentYear = new Date().getFullYear();
    const minAge = 13;
    const maxAge = 40;
    const validYears = [];
    for (let i = currentYear - minAge; currentYear - maxAge <= i; i--) {
      validYears.push(i);
    }
    return validYears;
  }

  get onboardingLoading() {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState() {
    return this.$store.getters["onboardingState"];
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }

  mounted() {
    this.$store.dispatch(ActionTypes.CITY_BY_ZIP);
    if (this.user) {
      this.form = {
        ...this.form,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      };
    }
  }

  async onBlurZip() {
    const city = this.$store.getters["cityByZip"]({ zip: this.form.zip });
    if (city) {
      this.form.city = city;
    }
  }

  async onSubmit(form: StudentProfileStep1Form) {
    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP1, {
      ...form,
      dateOfBirth: `${form.day}.${form.month}.${form.year}`,
    });
    if (this.onboardingState.success) {
      this.$router.push({ name: "OnboardingStep2" });
    }
  }
}
</script>

<style></style>

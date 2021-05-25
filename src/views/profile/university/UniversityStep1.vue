<template>
  <Form @submit="onSubmit" v-slot="{ errors }">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <MatchdField id="name" class="mb-10" :errors="errors.name">
      <template v-slot:label>Vollständiger Name der Bildungsinstitution*</template>
      <Field
        id="name"
        name="name"
        as="input"
        label="Vollständiger Name der Bildungsinstitution"
        rules="required"
        v-model="form.name"
      />
    </MatchdField>
    <MatchdField id="street" class="mb-10" :errors="errors.street">
      <template v-slot:label>Adresse*</template>
      <Field
        id="street"
        name="street"
        as="input"
        label="Adresse"
        v-model="form.street"
        rules="required"
      />
    </MatchdField>
    <div class="lg:flex">
      <MatchdField id="zip" class="lg:mr-3 mb-10 lg:w-40" :errors="errors.zip">
        <template v-slot:label>PLZ</template>
        <Field
          id="zip"
          name="zip"
          as="input"
          label="PLZ"
          maxlength="4"
          @blur="onBlurZip"
          v-model="form.zip"
        />
      </MatchdField>
      <MatchdField id="city" class="mb-10 lg:flex-grow" :errors="errors.city">
        <template v-slot:label>Ort</template>
        <Field id="city" name="city" as="input" label="Ort" v-model="form.city" />
      </MatchdField>
    </div>
    <MatchdField id="firstName" class="mb-10" :errors="errors.firstName">
      <template v-slot:label>Vorname*</template>
      <Field
        id="firstName"
        name="firstName"
        as="input"
        label="Vorname"
        rules="required"
        v-model="form.firstName"
      />
    </MatchdField>
    <MatchdField id="lastName" class="mb-10" :errors="errors.lastName">
      <template v-slot:label>Nachname*</template>
      <Field
        id="lastName"
        name="lastName"
        as="input"
        label="Nachname"
        rules="required"
        v-model="form.lastName"
      />
    </MatchdField>
    <MatchdField id="role" class="mb-10" :errors="errors.role">
      <template v-slot:label>Funktion*</template>
      <Field
        id="role"
        name="role"
        as="input"
        label="Funktion"
        rules="required"
        v-model="form.role"
      />
    </MatchdField>
    <MatchdField id="mobile" class="mb-10" :errors="errors.phone">
      <template v-slot:label>Telefonnummer*</template>
      <Field
        id="mobile"
        name="phone"
        as="input"
        label="Telefonnummer"
        rules="required|phone"
        v-model="form.phone"
      />
    </MatchdField>
    <!-- Website Field -->
    <MatchdField id="website" class="mb-10" :errors="errors.website">
      <template v-slot:label>Website*</template>
      <Field
        id="website"
        name="website"
        as="input"
        label="Website"
        v-model="form.website"
        rules="required|url"
      />
    </MatchdField>
    <!-- TopLevel Organisation Field -->
    <MatchdField
      id="topLevelOrganisationDescription"
      class="mb-10"
      :errors="errors.topLevelOrganisationDescription"
    >
      <template v-slot:label>Unsere Dachorganisation</template>
      <Field
        id="topLevelOrganisationDescription"
        name="topLevelOrganisationDescription"
        as="input"
        label="Unsere Dachorganisation"
        v-model="form.topLevelOrganisationDescription"
      />
      <template v-slot:info
        >Hier können sie angeben, zu welcher Bildungseinrichtung ihre Organisation gehört.</template
      >
    </MatchdField>
    <!-- TopLevel Organisation Website Field -->
    <MatchdField
      id="topLevelOrganisationWebsite"
      class="mb-10"
      :errors="errors.topLevelOrganisationWebsite"
    >
      <template v-slot:label>Webseite der Dachorganisation</template>
      <Field
        id="topLevelOrganisationWebsite"
        name="topLevelOrganisationWebsite"
        as="input"
        label="URL der Dachorganisation"
        v-model="form.topLevelOrganisationWebsite"
        rules="url"
      />
    </MatchdField>
    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading"
      :loading="onboardingLoading"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import { universityProfileStep1Mapper } from "@/api/mappers/universityProfileStep1InputMapper";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { OnboardingState } from "@/models/OnboardingState";
import { UniversityProfileStep1Form } from "@/models/UniversityProfileStep1Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import type { User } from "api";
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
  },
})
export default class UniversityStep1 extends Vue {
  form: UniversityProfileStep1Form = {
    name: "",
    zip: "",
    city: "",
    street: "",
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    website: "",
    topLevelOrganisationDescription: "",
    topLevelOrganisationWebsite: "",
  };

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  async mounted(): Promise<void> {
    this.$store.dispatch(ActionTypes.CITY_BY_ZIP);
    if (this.user) {
      this.form = {
        ...this.form,
        name: this.user.company?.name || "",
        zip: this.user.company?.zip || "",
        city: this.user.company?.city || "",
        street: this.user.company?.street || "",
        role: this.user.employee?.role || "",
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      };
    }
  }

  async onBlurZip(): Promise<void> {
    const city = this.$store.getters["cityByZip"]({ zip: this.form.zip });
    if (city) {
      this.form.city = city;
    }
  }

  async onSubmit(form: UniversityProfileStep1Form): Promise<void> {
    await this.$store.dispatch(
      ActionTypes.UNIVERSITY_ONBOARDING_STEP1,
      universityProfileStep1Mapper(form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt2" } });
    }
  }
}
</script>

<style></style>

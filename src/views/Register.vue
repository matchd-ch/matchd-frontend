<template>
  <div
    class="register-company grid grid-cols-16 gap-x-4 lg:gap-x-5 bg-grey-4 min-h-screen px-4 lg:px-5"
  >
    <h1 class="text-heading-90 text-pink-1 col-span-full mb-20">Registrierung</h1>
    <div class="step col-start-5 col-span-8 pb-40">
      <h2 class="step-heading relative text-heading-md flex items-center text-pink-1 mb-12">
        Bist du ein Arbeitgeber?
      </h2>
      <div>
        <MatchdButton
          type="button"
          variant="outline"
          :active="isCompany"
          @click="onClickCompanyYes"
          class="mb-3 lg:mb-0 mr-3"
          >Ja</MatchdButton
        >
        <MatchdButton type="button" variant="outline" @click="onClickCompanyNo">Nein</MatchdButton>
      </div>
    </div>
    <div class="step col-start-5 col-span-8 pb-40">
      <h2 class="step-heading relative text-heading-md flex items-center text-pink-1 mb-12">
        Bitte hinterlege als erstes die UID-Nr. deiner Unternehmung:
      </h2>
      <Form @submit="onSubmitUid" v-slot="{ errors }">
        <div class="mb-10">
          <label for="uid" class="form-label">UID-Nr.</label>
          <Field
            id="uid"
            name="uid"
            as="input"
            class="form-input mb-3"
            placeholder="CHE-xxx.xxx.xxx"
            label="UID-Nr."
            rules="required|regex:/^.*$/"
            :class="{ invalid: errors.uid }"
          />
          <div v-if="errors.uid" class="text-negative text-paragraph-sm px-8 mt-2">
            {{ errors.uid }}
          </div>
        </div>
        <MatchdButton variant="outline">Weiter</MatchdButton>
      </Form>
    </div>
    <div class="step disabled col-start-5 col-span-8 pb-40 min-h-screen">
      <h2 class="step-heading relative text-heading-md flex items-center text-pink-1 mb-12">
        Erzähl uns mehr zu dir
      </h2>
      <Form @submit="$emit('submit', $event)" v-slot="{ errors }">
        <div class="mb-3">
          <label for="companyName" class="form-label">Vollständiger Name der Unternehmung</label>
          <Field
            id="companyName"
            name="companyName"
            as="input"
            class="form-input"
            label="Name der Unternehmung"
            rules="required"
            :class="{ invalid: errors.companyName }"
          />
          <div v-if="errors.companyName" class="text-negative text-paragraph-sm px-8 mt-2">
            {{ errors.companyName }}
          </div>
        </div>
        <div class="lg:flex mb-3">
          <div class="lg:mr-3">
            <label for="zip" class="form-label">PLZ</label>
            <Field
              id="zip"
              name="zip"
              as="input"
              class="form-input"
              label="PLZ"
              rules="required"
              :class="{ invalid: errors.zip }"
            />
            <div v-if="errors.zip" class="text-negative text-paragraph-sm px-8 mt-2">
              {{ errors.zip }}
            </div>
          </div>
          <div class="mb-3 lg:mb-0 lg:flex-grow">
            <label for="city" class="form-label">Ort</label>
            <Field
              id="city"
              name="city"
              as="input"
              class="form-input"
              label="Ort"
              rules="required"
              :class="{ invalid: errors.city }"
            />
            <div v-if="errors.city" class="text-negative text-paragraph-sm px-8 mt-2">
              {{ errors.city }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Ansprechperson</label>
          <Field
            id="name"
            name="name"
            as="input"
            class="form-input"
            label="Ansprechperson"
            rules="required"
            :class="{ invalid: errors.name }"
          />
          <div v-if="errors.name" class="text-negative text-paragraph-sm px-8 mt-2">
            {{ errors.name }}
          </div>
        </div>
        <div class="mb-3">
          <label for="role" class="form-label">Funktion</label>
          <Field
            id="role"
            name="role"
            as="input"
            class="form-input"
            label="Funktion"
            rules="required"
            :class="{ invalid: errors.role }"
          />
          <div v-if="errors.role" class="text-negative text-paragraph-sm px-8 mt-2">
            {{ errors.role }}
          </div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">E-Mail</label>
          <Field
            id="email"
            name="email"
            as="input"
            type="email"
            class="form-input"
            label="E-Mail"
            rules="required|email"
            :class="{ invalid: errors.email }"
          />
          <div v-if="errors.email" class="text-negative text-paragraph-sm px-8 mt-2">
            {{ errors.email }}
          </div>
        </div>
        <div class="mb-10">
          <label for="email" class="form-label">Passwort</label>
          <Field
            id="password"
            name="password"
            as="input"
            type="password"
            class="form-input"
            label="Passwort"
            rules="required"
            :class="{ invalid: errors.password }"
          />
          <div v-if="errors.password" class="text-negative text-paragraph-sm px-8 mt-2">
            {{ errors.password }}
          </div>
        </div>
        <MatchdButton variant="outline">Registrieren</MatchdButton>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
// import { ActionTypes as RegistrationActionTypes } from "@/store/modules/registration/action-types";
import MatchdButton from "@/components/MatchdButton.vue";
import { MutationTypes } from "@/store/modules/registration/mutation-types";
import { Options, Vue } from "vue-class-component";
import { Form, Field, ErrorMessage } from "vee-validate";

@Options({
  components: {
    MatchdButton,
    Form,
    Field,
    ErrorMessage,
  },
})
export default class Home extends Vue {
  get isCompany() {
    return this.$store.getters["companyRegisterFormIsCompany"];
  }

  onClickCompanyYes() {
    this.$store.commit(MutationTypes.REGISTRATION_COMPANY_SET_CONFIRMATION, { isCompany: true });
  }

  onClickCompanyNo() {
    this.$store.commit(MutationTypes.REGISTRATION_COMPANY_SET_CONFIRMATION, { isCompany: false });
    this.$router.push({ name: "Triage" });
  }

  onSubmitUid(form: { uid: string }) {
    console.log(form);
    // this.$store.commit();
  }

  onSubmitCompanyData() {
    // this.$store.dispatch(RegistrationActionTypes.SAVE_REGISTRATION, {
    //   firstName: "test",
    //   lastName: "test",
    //   email: "test",
    //   password: "test",
    //   type: "student"
    // });
  }
}
</script>

<style lang="css" scoped>
.register-company {
  counter-reset: step;
}

.form-label {
  @apply block px-8 mb-2;
  @apply font-medium;
}

.form-input {
  @apply block w-full bg-white rounded-30 px-8 py-4;
  @apply border border-white focus:border-black;
  @apply text-lg placeholder-black placeholder-opacity-100;
  @apply focus:outline-none;

  &.invalid {
    @apply border-negative text-negative placeholder-negative;
  }
}

.step-heading {
  &::before {
    position: absolute;
    right: 100%;
    counter-increment: step;
    content: counter(step);
    width: 66px;
    height: 66px;
    @apply mr-8;
    @apply inline-flex justify-center items-center;
    @apply rounded-full bg-pink-1;
    @apply text-white text-heading-md;
  }
}

.step {
  &.disabled {
    @apply pointer-events-none;
  }
  &:not(:last-child) {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      right: calc(100% + 32px);
      width: 2px;
      height: 100%;
      @apply mr-8;
      @apply bg-pink-1;
    }
  }
}
</style>

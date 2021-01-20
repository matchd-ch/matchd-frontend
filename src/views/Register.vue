<template>
  <div
    class="register-company grid grid-cols-16 gap-x-4 lg:gap-x-5 bg-grey-4 min-h-screen px-4 lg:px-5"
  >
    <h1
      class="text-heading-90 text-pink-1 col-span-full lg:fixed lg:transition-all lg:top-0"
      :class="{ 'attach-heading': attached }"
    >
      Registrierung
    </h1>
    <MatchdStep step="1">
      <template v-slot:title>Bist du ein Arbeitgeber?</template>
      <MatchdButton
        type="button"
        variant="outline"
        :active="isCompany"
        @click="onClickCompanyYes"
        class="mb-3 lg:mb-0 mr-3"
        >Ja</MatchdButton
      >
      <MatchdButton type="button" variant="outline" @click="onClickCompanyNo">Nein</MatchdButton>
    </MatchdStep>
    <MatchdStep step="2">
      <template v-slot:title>Bitte hinterlege als erstes die UID-Nr. deiner Unternehmung:</template>
      <Form @submit="onSubmitUid" v-slot="{ errors }">
        <MatchdField id="uid" class="mb-10" :errors="errors.uid">
          <template v-slot:label>UID-Nr.</template>
          <Field
            id="uid"
            name="uid"
            as="input"
            placeholder="CHE-xxx.xxx.xxx"
            label="UID-Nr."
            rules="required"
          />
        </MatchdField>
        <MatchdButton variant="outline">Weiter</MatchdButton>
      </Form>
    </MatchdStep>
    <MatchdStep step="3">
      <template v-slot:title>
        Erzähl uns mehr zu dir
      </template>
      <Form @submit="onSubmitCompanyData" v-slot="{ errors }">
        <MatchdField id="name" class="mb-3" :errors="errors.name">
          <template v-slot:label>Vollständiger Name der Unternehmung</template>
          <Field
            id="name"
            name="name"
            as="input"
            class="form-input"
            label="Name der Unternehmung"
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
          <MatchdField id="firstName" class="lg:mr-3 mb-3 lg:flex-grow" :errors="errors.firstName">
            <template v-slot:label>Vorname</template>
            <Field
              id="firstName"
              name="firstName"
              as="input"
              class="form-input"
              label="Vorname"
              rules="required"
            />
          </MatchdField>
          <MatchdField id="lastName" class="mb-3 lg:flex-grow" :errors="errors.lastName">
            <template v-slot:label>Nachname</template>
            <Field
              id="lastName"
              name="lastName"
              as="input"
              class="form-input"
              label="Nachname"
              rules="required"
            />
          </MatchdField>
        </div>
        <MatchdField id="role" class="mb-3" :errors="errors.role">
          <template v-slot:label>Funktion</template>
          <Field
            id="role"
            name="role"
            as="input"
            class="form-input"
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
            class="form-input"
            label="E-Mail"
            rules="required|email"
          />
        </MatchdField>
        <MatchdField id="password" class="mb-10" :errors="errors.password">
          <template v-slot:label>Passwort</template>
          <Field
            id="password"
            name="password"
            as="input"
            type="password"
            class="form-input"
            label="Passwort"
            rules="required"
          />
        </MatchdField>
        <MatchdButton variant="outline">Registrieren</MatchdButton>
      </Form>
    </MatchdStep>
    <MatchdStep step="4">
      <template v-slot:title>
        Fast geschafft!<br />Aktiviere deinen Account. Wir haben deinen Aktivierungslink per E-Mail
        an abc@xyz.ch gesendet
      </template>
    </MatchdStep>
  </div>
</template>

<script lang="ts">
import { NewCompanyAccount } from "@/models/NewAccount";
import {
  RegistrationCompanyFormData,
  RegistrationCompanyFormUid,
} from "@/models/RegistrationCompanyForm";
import { ActionTypes as RegistrationActionTypes } from "@/store/modules/registration/action-types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdStep from "@/components/MatchdStep.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
    MatchdStep,
    MatchdField,
    Form,
    Field,
    ErrorMessage,
  },
})
export default class Home extends Vue {
  attached = false;
  isCompany: boolean | null = null;
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

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    this.attached = window.top.scrollY > 100;
  }

  onClickCompanyYes() {
    this.isCompany = true;
    this.$router.push({ hash: "#step-2" });
  }

  onClickCompanyNo() {
    this.$router.push({ name: "Triage", hash: "#nichts-passendes-gefunden" });
  }

  onSubmitUid(form: RegistrationCompanyFormUid) {
    this.form = {
      ...this.form,
      ...form,
    };
    this.$router.push({ hash: "#step-3" });
  }

  async onSubmitCompanyData(form: RegistrationCompanyFormData) {
    this.form = {
      ...this.form,
      ...form,
    };
    console.log(this.form);
    //await this.$store.dispatch(RegistrationActionTypes.SAVE_REGISTRATION, this.form);
    this.$router.push({ hash: "#step-4" });
  }
}
</script>

<style lang="css" scoped>
.attach-heading {
  top: 50%;
  transform: translateY(-50%);
  @apply text-display-sm;
}

.register-company {
  counter-reset: step;
}
</style>

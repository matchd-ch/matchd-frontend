<template>
  <Form v-if="branches.length > 0 && jobOptions.length > 0" @submit="onSubmit" v-slot="{ errors }">
    <GenericError v-if="jobPostingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    {{ form }}
    <!-- Bezeichnung Field -->
    <MatchdField id="description" class="mb-10" :errors="errors.description">
      <template v-slot:label>Geben Sie der Stelle eine passende Bezeichnung*</template>
      <Field
        id="description"
        name="description"
        as="input"
        label="Bezeichnung"
        rules="required"
        v-model="form.description"
      />
    </MatchdField>
    <!-- Art Field -->
    <SelectPillGroup :errors="errors.jobOptionId" class="mb-10">
      <template v-slot:label>Welche Art Stelle wollen Sie besetzen*</template>
      <template v-slot:field>
        <Field
          id="jobOptionId"
          name="jobOptionId"
          as="input"
          label="Art der Stelle"
          type="hidden"
          v-model="form.jobOptionId"
          rules="required"
        />
      </template>
      <SelectPill
        name="jobOptionPill"
        v-for="option in jobOptions"
        :key="option.id"
        :value="option.id"
        :checked="option.id === form.jobOptionId"
        @change="form.jobOptionId = $event"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Branch Field -->
    <SelectPillGroup :errors="errors.branchId" class="mb-10">
      <template v-slot:label>In diesem Bereich wird das junge Talent tätig sein*</template>
      <template v-slot:field>
        <Field
          id="branchId"
          name="branchId"
          as="input"
          label="In diesem Bereich wird das junge Talent tätig sein"
          type="hidden"
          v-model="form.branchId"
          rules="required"
        />
      </template>
      <SelectPill
        name="branchPill"
        v-for="branch in branches"
        :key="branch.id"
        :value="branch.id"
        :checked="branch.id === form.branchId"
        @change="form.branchId = $event"
        >{{ branch.name }}</SelectPill
      >
    </SelectPillGroup>
    <fieldset class="mb-10">
      <label class="block px-8 mb-2 font-medium">Arbeitspensum</label>
      <div>
        <!-- Vollzeit-Teilzeit Field -->
        <MatchdToggle id="fullTime" :errors="errors.fullTime">
          <input
            id="fullTime"
            name="fullTime"
            type="checkbox"
            v-model="form.fullTime"
            @change="onChangeFullTime"
          />
        </MatchdToggle>
        <!-- Arbeitspensum Field -->
        <MatchdSelect
          v-if="form.fullTime === false"
          id="workload"
          :errors="errors.workload"
          class="mt-3"
        >
          <template v-slot:label>Teilzeit Pensum</template>
          <Field
            id="workload"
            name="workload"
            as="select"
            label="Pensum"
            rules="required"
            v-model.number="form.workload"
          >
            <option v-for="(n, index) in 9" :value="n * 10" :key="index">{{ n * 10 }}%</option>
          </Field>
        </MatchdSelect>
      </div>
    </fieldset>
    <!-- Stellenantritt -->
    <div class="lg:flex">
      <MatchdSelect
        id="positionDateFrom"
        class="mb-10 flex-grow w-1/2"
        :errors="errors.jobFromDateMonth || errors.jobFromDateYear"
      >
        <template v-slot:label>Stellenantritt*</template>
        <fieldset id="positionDateFrom" class="flex">
          <Field
            id="jobFromDateMonth"
            name="jobFromDateMonth"
            as="select"
            label="Stellenantritt Monat"
            class="mr-3"
            rules="required"
            v-model="form.jobFromDateMonth"
          >
            <option value="" disabled selected hidden>Monat</option>
            <option v-for="(n, index) in 12" :value="n" :key="index">{{
              String(n).padStart(2, "0")
            }}</option>
          </Field>
          <Field
            id="jobFromDateYear"
            name="jobFromDateYear"
            as="select"
            label="Stellenantritt Jahr"
            v-model="form.jobFromDateYear"
            rules="required"
          >
            <option value="" disabled selected hidden>Jahr</option>
            <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
          </Field>
        </fieldset>
      </MatchdSelect>
      <!-- Endtermin -->
      <MatchdSelect
        id="positionDateTo"
        class="mb-10 lg:ml-3 flex-grow w-1/2"
        :errors="errors.jobToDateMonth || errors.jobToDateYear"
      >
        <template v-slot:label>Endtermin</template>
        <fieldset id="positionDateTo" class="flex">
          <Field
            id="jobToDateMonth"
            name="jobToDateMonth"
            as="select"
            label="Monat"
            class="mr-3 l"
            :rules="form.jobToDateYear !== '' ? 'required' : ''"
            v-model="form.jobToDateMonth"
          >
            <option value="" disabled selected hidden>Monat</option>
            <option v-for="(n, index) in 12" :value="n" :key="index">{{
              String(n).padStart(2, "0")
            }}</option>
          </Field>
          <Field
            id="jobToDateYear"
            name="jobToDateYear"
            as="select"
            label="Jahr"
            :rules="form.jobToDateMonth !== '' ? 'required' : ''"
            v-model="form.jobToDateYear"
          >
            <option value="" disabled selected hidden>Jahr</option>
            <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
          </Field>
        </fieldset>
      </MatchdSelect>
    </div>
    <!-- Link Ausschreibung Field -->
    <MatchdField id="url" class="mb-10" :errors="errors.url">
      <template v-slot:label>Link zur Ausschreibung</template>
      <Field
        id="url"
        name="url"
        as="input"
        label="Link zur Ausschreibung"
        v-model="form.url"
        rules="url"
      />
      <template v-slot:info>Weitere Informationen findest du hier.</template>
    </MatchdField>
    <MatchdButton
      variant="outline"
      :disabled="jobPostingLoading"
      :loading="jobPostingLoading"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
    <MatchdButton
      type="button"
      variant="outline"
      :disabled="jobPostingLoading"
      class="block w-full mt-5"
      @click="$router.push({ name: 'Home' })"
      >Abbrechen</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import { jobPostingStep1InputMapper } from "@/api/mappers/jobPostingStep1InputMapper";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import { UserWithProfileNode } from "api";
import { DateTime } from "luxon";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
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
    MatchdToggle,
    SelectPill,
    SelectPillGroup,
  },
})
export default class JobPostingStep1 extends Vue {
  form: JobPostingStep1Form = {
    description: "",
    fullTime: true,
    workload: 90,
    jobOptionId: "",
    branchId: "",
    jobFromDateMonth: "",
    jobFromDateYear: "",
    jobToDateMonth: "",
    jobToDateYear: "",
    url: "",
  };

  get currentJobPosting() {
    return this.$store.getters["currentJobPosting"];
  }

  get jobOptions() {
    return this.$store.getters["jobOptions"];
  }

  get branches() {
    return this.$store.getters["branches"];
  }

  get jobPostingLoading() {
    return this.$store.getters["jobPostingLoading"];
  }

  get jobPostingState() {
    return this.$store.getters["jobPostingState"];
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }

  get validYears(): number[] {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 10;
    const validYears = [];
    for (let i = currentYear; maxYear > i; i++) {
      validYears.push(i);
    }
    return validYears;
  }

  async mounted() {
    await Promise.all([
      this.$store.dispatch(ContentActionsTypes.JOB_OPTIONS),
      this.$store.dispatch(ContentActionsTypes.BRANCHES),
    ]);

    if (this.currentJobPosting) {
      this.populateForm();
    }
  }

  populateForm() {
    this.form = {
      description: this.currentJobPosting?.description || "",
      url: this.currentJobPosting?.url || "",
      fullTime: this.currentJobPosting?.workload === 100,
      workload: this.currentJobPosting?.workload || 90,
      jobOptionId: this.currentJobPosting?.jobOption?.id || "",
      branchId: this.currentJobPosting?.branch?.id || "",
      jobFromDateMonth: this.currentJobPosting?.jobFromDate
        ? DateTime.fromSQL(this.currentJobPosting?.jobFromDate).month.toString()
        : "",
      jobFromDateYear: this.currentJobPosting?.jobFromDate
        ? DateTime.fromSQL(this.currentJobPosting?.jobFromDate).year.toString()
        : "",
      jobToDateMonth: this.currentJobPosting?.jobToDate
        ? DateTime.fromSQL(this.currentJobPosting?.jobToDate).toString()
        : "",
      jobToDateYear: this.currentJobPosting?.jobToDate
        ? DateTime.fromSQL(this.currentJobPosting?.jobToDate).year.toString()
        : "",
    };
  }

  onChangeFullTime() {
    if (!this.form.fullTime) {
      this.form.workload = 90;
    }
  }

  async onSubmit(form: JobPostingStep1Form, actions: FormActions<Partial<JobPostingStep1Form>>) {
    if (
      form.jobFromDateMonth &&
      form.jobFromDateYear &&
      form.jobToDateMonth &&
      form.jobToDateYear
    ) {
      const toDate = DateTime.fromObject({
        month: +form.jobToDateMonth,
        year: +form.jobToDateYear,
      });
      const fromDate = DateTime.fromObject({
        month: +form.jobFromDateMonth,
        year: +form.jobFromDateYear,
      });
      if (toDate <= fromDate) {
        actions.setErrors({
          jobToDateMonth: 'Muss später als Feld "Stellenantritt" sein',
        });
        return;
      }
    }

    await this.$store.dispatch(
      ActionTypes.SAVE_JOBPOSTING_STEP1,
      jobPostingStep1InputMapper(this.currentJobPosting?.id, this.form)
    );
    if (this.jobPostingState.success) {
      if (!Number(this.$route.params?.id)) {
        await this.$router.replace({ params: { step: "schritt1", id: this.jobPostingState.id } });
      }
      this.$router.push({ params: { step: "schritt2", id: this.jobPostingState.id } });
    } else if (this.jobPostingState.errors) {
      actions.setErrors(this.jobPostingState.errors);
      if (this.jobPostingState.errors.jobFromDate) {
        actions.setErrors({ jobFromDateMonth: "Stellenantritt darf nicht leer sein." });
      }
      if (this.jobPostingState.errors.jobToDate) {
        actions.setErrors({ jobToDateMonth: "Endtermin darf nicht leer sein." });
      }
    }
  }
}
</script>

<style></style>

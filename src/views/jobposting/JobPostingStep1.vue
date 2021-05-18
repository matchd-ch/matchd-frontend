<template>
  <form v-if="branches.length && jobTypes.length" @submit="veeForm.onSubmit">
    <FormSaveError v-if="jobPostingState.errors" />
    <!-- Bezeichnung Field -->
    <MatchdField id="title" class="mb-10" :errors="veeForm.errors.title">
      <template v-slot:label>Geben Sie der Stelle eine passende Bezeichnung*</template>
      <Field
        id="title"
        name="title"
        as="input"
        label="Stellenbezeichnung"
        rules="required"
        maxlength="50"
      />
    </MatchdField>
    <!-- Art Field -->
    <SelectPillGroup :errors="veeForm.errors.jobTypeId" class="mb-10">
      <template v-slot:label>Diese Stellen-Art möchten Sie besetzen*</template>
      <template v-slot:field>
        <Field
          id="jobTypeId"
          name="jobTypeId"
          as="input"
          label="Art der Stelle"
          type="hidden"
          rules="required"
        />
      </template>
      <SelectPill
        name="jobTypePill"
        v-for="option in jobTypes"
        :key="option.id"
        :value="option.id"
        :checked="option.id === veeForm.values?.jobTypeId"
        @change="onChangeJobType"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Branch Field -->
    <SelectPillMultiple
      :options="branches"
      :errors="veeForm.errors.branches"
      @change="onChangeBranch"
      name="branches"
      class="mb-10"
    >
      <template v-slot:label
        >In diesem Bereich wird das junge Talent tätig sein*</template
      >
    </SelectPillMultiple>
    <!-- Stellenprozent Field -->
    <MatchdSelect id="workload" :errors="veeForm.errors.workload" class="mb-10">
      <template v-slot:label>Stellenprozent</template>
      <Field id="workload" name="workload" as="select" label="Stellenprozent" rules="required">
        <option value="" disabled selected hidden>Stellenprozent</option>
        <option v-for="(n, index) in 10" :value="n * 10" :key="index">{{ n * 10 }}%</option>
      </Field>
    </MatchdSelect>
    <!-- Stellenantritt -->
    <div class="lg:flex">
      <MatchdSelect
        id="positionDateFrom"
        class="mb-10 flex-grow w-1/2"
        :errors="veeForm.errors.jobFromDateMonth || veeForm.errors.jobFromDateYear"
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
          >
            <option value="" disabled selected hidden>Monat</option>
            <option v-for="(n, index) in 12" :value="n" :key="index">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
          <Field
            id="jobFromDateYear"
            name="jobFromDateYear"
            as="select"
            label="Stellenantritt Jahr"
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
        :errors="veeForm.errors.jobToDateMonth || veeForm.errors.jobToDateYear"
      >
        <template v-slot:label>Endtermin</template>
        <fieldset id="positionDateTo" class="flex">
          <Field
            id="jobToDateMonth"
            name="jobToDateMonth"
            as="select"
            label="Monat"
            class="mr-3 l"
            :rules="veeForm.values?.jobToDateYear !== '' ? 'required' : ''"
          >
            <option value="" disabled selected hidden>Monat</option>
            <option v-for="(n, index) in 12" :value="n" :key="index">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
          <Field
            id="jobToDateYear"
            name="jobToDateYear"
            as="select"
            label="Jahr"
            :rules="veeForm.values?.jobToDateMonth !== '' ? 'required' : ''"
          >
            <option value="" disabled selected hidden>Jahr</option>
            <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
          </Field>
        </fieldset>
      </MatchdSelect>
    </div>
    <!-- Beschreibung Field -->
    <MatchdField id="description" class="mb-10" :errors="veeForm.errors.description">
      <template v-slot:label>Beschreiben Sie die Besonderheiten der Stelle</template>
      <Field id="description" name="description" as="textarea" label="Beschreibung" class="h-72" />
    </MatchdField>
    <!-- Link Ausschreibung Field -->
    <MatchdField id="url" class="mb-10" :errors="veeForm.errors.url">
      <template v-slot:label>Link zur Ausschreibung</template>
      <Field id="url" name="url" as="input" label="Link zur Ausschreibung" rules="url" />
      <template v-slot:info
        >Link muss auf ein Stelleninserate auf Ihrer Website verlinken.</template
      >
    </MatchdField>
    <MatchdButton
      variant="outline"
      :disabled="jobPostingLoading"
      :loading="jobPostingLoading"
      class="block w-full"
    >
      <template v-if="currentJobPosting?.formStep > 3">Speichern</template>
      <template v-else>Speichern und weiter</template>
    </MatchdButton>
    <MatchdButton
      type="button"
      variant="outline"
      :disabled="jobPostingLoading"
      class="block w-full mt-5"
      @click="$router.push({ name: 'Dashboard' })"
    >
      Abbrechen
    </MatchdButton>
  </form>
</template>

<script lang="ts">
import { jobPostingStep1FormMapper } from "@/api/mappers/jobPostingStep1FormMapper";
import { jobPostingStep1InputMapper } from "@/api/mappers/jobPostingStep1InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { JobPostingState } from "@/models/JobPostingState";
import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import type { Branch, JobPosting as JobPostingType, JobType, User } from "api";
import cloneDeep from "clone-deep";
import { DateTime } from "luxon";
import { Field, useField, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdButton,
    MatchdField,
    MatchdSelect,
    MatchdToggle,
    SelectPill,
    SelectPillMultiple,
    SelectPillGroup,
  },
  emits: ["submitComplete", "changeDirty"],
})
export default class JobPostingStep1 extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<JobPostingStep1Form>();
    const { value: fullTime } = useField<boolean>("fullTime");
    const { value: branches } = useField<string[]>(
      "branches",
      (value: string[]) => {
        if (value?.length === 0) {
          return "In diesen Bereichen und Projekten wird das junge Talent tätig sein ist ein Pflichtfeld";
        }
        return true;
      },
      { label: "In diesen Bereichen und Projekten wird das junge Talent tätig sein" }
    );
    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        if (
          formData.jobFromDateMonth &&
          formData.jobFromDateYear &&
          formData.jobToDateMonth &&
          formData.jobToDateYear
        ) {
          const toDate = DateTime.fromObject({
            month: +formData.jobToDateMonth,
            year: +formData.jobToDateYear,
          });
          const fromDate = DateTime.fromObject({
            month: +formData.jobFromDateMonth,
            year: +formData.jobFromDateYear,
          });
          if (toDate <= fromDate) {
            form.setErrors({
              jobToDateMonth: 'Muss später als Feld "Stellenantritt" sein',
            });
            return;
          }
        }

        try {
          await store.dispatch(
            ActionTypes.SAVE_JOBPOSTING_STEP1,
            jobPostingStep1InputMapper(store.getters["currentJobPosting"]?.id, formData)
          );
          const jobPostingState = store.getters["jobPostingState"];
          if (jobPostingState.success) {
            this.$emit("submitComplete");
          } else if (jobPostingState.errors) {
            form.setErrors(jobPostingState.errors);
            if (jobPostingState.errors?.jobFromDate) {
              form.setErrors({ jobFromDateMonth: "Stellenantritt darf nicht leer sein." });
            }
            if (jobPostingState.errors?.jobToDate) {
              form.setErrors({ jobToDateMonth: "Endtermin darf nicht leer sein." });
            }
          }
        } catch (e) {
          console.log(e); // todo
        }
      }
    );

    return {
      ...form,
      onSubmit,
      fullTime,
      branches,
    };
  });
  formData = {} as JobPostingStep1Form;

  get currentJobPosting(): JobPostingType | null {
    return this.$store.getters["currentJobPosting"];
  }

  get jobPostingData(): JobPostingStep1Form {
    return jobPostingStep1FormMapper(this.currentJobPosting);
  }

  get jobTypes(): JobType[] {
    return this.$store.getters["jobTypes"];
  }

  get branches(): SelectPillMultipleItem[] {
    return this.$store.getters["branches"].map((branch) => {
      return {
        id: branch.id,
        name: branch.name,
        checked: !!this.veeForm.branches?.find(
          (selectedBranchId) => selectedBranchId === branch.id
        ),
      };
    });
  }

  get jobPostingLoading(): boolean {
    return this.$store.getters["jobPostingLoading"];
  }

  get jobPostingState(): JobPostingState {
    return this.$store.getters["jobPostingState"];
  }

  get user(): User | null {
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

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ContentActionsTypes.JOB_TYPE),
      this.$store.dispatch(ContentActionsTypes.BRANCHES),
    ]);

    this.veeForm.resetForm({
      values: cloneDeep(this.jobPostingData),
    });

    if (this.currentJobPosting?.formStep && this.currentJobPosting?.formStep > 1) {
      this.veeForm.setValues(cloneDeep(this.jobPostingData));
    }
  }

  onChangeJobType(jobTypeId: string): void {
    this.veeForm.setFieldValue("jobTypeId", jobTypeId);
  }

  onChangeBranch(branch: Branch): void {
    const branchExists = !!this.veeForm.branches.find(
      (selectedBranchId) => selectedBranchId === branch.id
    );
    if (branchExists) {
      this.veeForm.branches = this.veeForm.branches.filter(
        (selectedBranchId) => selectedBranchId !== branch.id
      );
    } else {
      this.veeForm.branches.push(branch.id);
      this.veeForm.branches.sort((a: string, b: string) => parseInt(a) - parseInt(b));
    }
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>

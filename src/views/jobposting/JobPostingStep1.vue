<template>
  <form v-if="branches.length && jobTypes.length" @submit="veeForm.onSubmit">
    <FormSaveError v-if="jobPostingState.errors" />
    <p v-if="!hasJobPostings" class="mb-14">
      Den Perfect-Match aus unserem Talentpool finden Sie, wenn Sie hier eine Stelle ausschreiben.
    </p>
    <!-- Bezeichnung Field -->
    <MatchdField id="title" class="mb-10" :errors="veeForm.errors.title">
      <template #label>Geben Sie der Stelle eine passende Bezeichnung*</template>
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
      <template #label>Diese Stellen-Art möchten Sie besetzen*</template>
      <template #field>
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
        v-for="option in jobTypes"
        :key="option.id"
        name="jobTypePill"
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
      name="branches"
      class="mb-10"
      @change="onChangeBranch"
    >
      <template #label>In diesem Bereich wird das junge Talent tätig sein*</template>
    </SelectPillMultiple>
    <!-- Stellenprozent Field -->
    <MatchdSelect id="workload" :errors="veeForm.errors.workload" class="mb-10">
      <template #label>Stellenprozent</template>
      <Field id="workload" name="workload" as="select" label="Stellenprozent" rules="required">
        <option value disabled selected hidden>Stellenprozent</option>
        <option v-for="(n, index) in 10" :key="index" :value="n * 10">{{ n * 10 }}%</option>
      </Field>
    </MatchdSelect>
    <!-- Stellenantritt -->
    <MatchdSelect
      id="positionDateFrom"
      class="mb-10 grow"
      :errors="veeForm.errors.jobFromDateMonth || veeForm.errors.jobFromDateYear"
    >
      <template #label>Stellenantritt*</template>
      <fieldset id="positionDateFrom" class="flex">
        <Field
          id="jobFromDateMonth"
          name="jobFromDateMonth"
          as="select"
          label="Stellenantritt Monat"
          class="mr-3"
          rules="required"
        >
          <option value disabled selected hidden>Monat</option>
          <option v-for="n in 12" :key="`jobFromDateMonth_${n}`" :value="n">
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
          <option value disabled selected hidden>Jahr</option>
          <option v-for="n in validYears" :key="`jobFromDateYear_${n}`" :value="n">
            {{ String(n).padStart(2, "0") }}
          </option>
        </Field>
      </fieldset>
    </MatchdSelect>
    <!-- Endtermin -->
    <MatchdSelect
      id="positionDateTo"
      class="mb-10 grow"
      :errors="veeForm.errors.jobToDateMonth || veeForm.errors.jobToDateYear"
    >
      <template #label>Endtermin</template>
      <MatchdToggle id="jobToDateOpenEnd">
        <Field id="jobToDateOpenEnd" name="jobToDateOpenEnd" type="checkbox" value="true" />
        <template v-if="jobToDateOpenEnd" #value>Befristet</template>
        <template v-else #value>Unbefristet</template>
      </MatchdToggle>
      <template v-if="jobToDateOpenEnd">
        <fieldset id="positionDateTo" class="flex mt-3">
          <Field
            id="jobToDateMonth"
            name="jobToDateMonth"
            as="select"
            label="Endtermin Monat"
            class="mr-3"
            rules="requiredIfNotEmpty:jobToDateYear"
          >
            <option value disabled selected hidden>Monat</option>
            <option v-for="n in 12" :key="`jobToDateMonth_${n}`" :value="n">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
          <Field
            id="jobToDateYear"
            name="jobToDateYear"
            as="select"
            label="Endtermin Jahr"
            rules="requiredIfNotEmpty:jobToDateMonth"
          >
            <option value disabled selected hidden>Jahr</option>
            <option v-for="n in validYears" :key="`jobToDateYear_${n}`" :value="n">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
        </fieldset>
      </template>
    </MatchdSelect>
    <!-- Beschreibung Field -->
    <MatchdField id="description" class="mb-10" :errors="veeForm.errors.description">
      <template #label>Beschreiben Sie die Besonderheiten der Stelle</template>
      <Field id="description" name="description" as="textarea" label="Beschreibung" class="h-72" />
    </MatchdField>
    <!-- Link Ausschreibung Field -->
    <MatchdField id="url" class="mb-10" :errors="veeForm.errors.url">
      <template #label>Link zur Ausschreibung</template>
      <Field id="url" name="url" as="input" label="Link zur Ausschreibung" rules="url" />
      <template #info>Link muss auf ein Stelleninserate auf Ihrer Website verlinken.</template>
    </MatchdField>
    <teleport to="footer">
      <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
        <MatchdButton
          type="button"
          variant="outline"
          :disabled="jobPostingLoading"
          class="mb-2 xl:mr-4 xl:mb-0"
          @click="$router.push({ name: 'Dashboard' })"
          >Abbrechen</MatchdButton
        >
        <MatchdButton
          type="button"
          variant="fill"
          :disabled="jobPostingLoading"
          :loading="jobPostingLoading"
          @click="veeForm.onSubmit"
        >
          <template v-if="currentJobPosting?.formStep && currentJobPosting.formStep > 3">
            Speichern
          </template>
          <template v-else>Speichern und weiter</template>
        </MatchdButton>
      </div>
    </teleport>
  </form>
</template>

<script lang="ts">
import { jobPostingStep1FormMapper } from "@/api/mappers/jobPostingStep1FormMapper";
import { jobPostingStep1InputMapper } from "@/api/mappers/jobPostingStep1InputMapper";
import type { Branch, JobPosting as JobPostingType, JobType, User } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import SelectPillMultiple, { SelectPillMultipleItem } from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { JobPostingState } from "@/models/JobPostingState";
import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
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
    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
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
    });

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

  get jobToDateOpenEnd(): boolean {
    return this.veeForm.values.jobToDateOpenEnd === "true";
  }

  get hasJobPostings(): boolean {
    return !!this.$store.getters["jobPostings"].length;
  }

  get jobTypes(): JobType[] {
    console.log(this.$store.getters["jobTypes"]);
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
      this.$store.dispatch(ContentActionsTypes.JOB_POSTINGS),
    ]);

    this.veeForm.resetForm({
      values: this.jobPostingData,
    });
    calculateMargins();
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
      this.veeForm.branches = [...this.veeForm.branches, branch.id];
    }
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>

<template>
  <form v-if="branches.length && companyDocumentsUploadConfigurations" @submit="onSubmit">
    <FormSaveError v-if="showError" />
    <!-- Branch Field -->
    <SelectPillMultiple :options="branches" name="branches" class="mb-10" @change="onChangeBranch">
      <template #label>
        In diesen Bereichen und Challenges können Talente bei Ihnen tätig werden
      </template>
    </SelectPillMultiple>
    <!-- Benefits Field -->
    <SelectIconGroup class="mb-10" :icons="benefits" name="benefits" @change="onChangeBenefits">
      <template #label>Das erwartet dich bei uns</template>
    </SelectIconGroup>
    <!-- Media -->
    <MatchdFileBlock>
      <template #label>Bilder und Videos Ihres Unternehmens und Ihres Teams</template>
      <MatchdFileView
        v-if="companyDocuments.length > 0 || companyDocumentsQueue.length > 0"
        :files="companyDocuments"
        :queued-files="companyDocumentsQueue"
        class="mb-3"
        :class="{
          'mb-10': companyDocumentsUploadConfigurations.maxFiles < companyDocuments.length,
        }"
        @delete-file="onDeleteCompanyDocuments"
      />
      <MatchdFileUpload
        v-if="companyDocumentsUploadConfigurations.maxFiles > companyDocuments.length"
        :formal="true"
        :upload-configuration="companyDocumentsUploadConfigurations"
        class="mb-10"
        @select-files="onSelectCompanyDocuments"
        >Fotos oder Videos auswählen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="emit('clickCancel')"
          >
            Abbrechen
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="onSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton type="button" variant="outline" class="mr-4" @click="emit('clickBack')">
        Zurück
      </MatchdButton>
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="onSubmit"
      >
        Speichern und weiter
      </MatchdButton>
    </template>
  </form>
</template>

<script setup lang="ts">
import { companyProfileStep3FormMapper } from "@/api/mappers/companyProfileStep3FormMapper";
import { companyProfileStep3InputMapper } from "@/api/mappers/companyProfileStep3InputMapper";
import type { Attachment, Benefit, Branch } from "@/api/models/types";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import SelectIconGroup from "@/components/SelectIconGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { SelectPillMultipleItem } from "@/types/selectPillMultiple";
import { useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(
  defineProps<{
    edit?: boolean;
  }>(),
  {
    edit: false,
  },
);

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
  (event: "clickBack"): void;
}>();

const store = useStore();
const veeForm = useForm<CompanyProfileStep3Form>();

const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.COMPANY_ONBOARDING_STEP3,
      companyProfileStep3InputMapper(formData),
    );
    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e);
  }
});

const branches = computed((): SelectPillMultipleItem[] => {
  return store.getters["branches"].map((branch) => {
    return {
      id: branch.id,
      name: branch.name,
      checked: !!veeForm.values.branches?.find(
        (selectedBranchId) => selectedBranchId === branch.id,
      ),
    };
  });
});

const benefits = computed(() => {
  return store.getters["benefits"].map((benefit) => {
    return {
      ...benefit,
      checked: !!veeForm.values.benefits?.find(
        (selectedBenefitId) => selectedBenefitId === benefit.id,
      ),
    };
  });
});

const user = computed(() => store.getters["user"]);
const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);
const companyDocumentsQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyDocuments }),
);
const companyDocuments = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments }),
);
const companyDocumentsUploadConfigurations = computed(() =>
  store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyDocuments }),
);

const profileData = computed(() => {
  if (!user.value) {
    return {} as CompanyProfileStep3Form;
  }
  return companyProfileStep3FormMapper(user.value);
});

const onChangeBranch = (branch: Branch) => {
  const branchExists = !!veeForm.values.branches.find(
    (selectedBranchId) => selectedBranchId === branch.id,
  );
  if (branchExists) {
    veeForm.setFieldValue(
      "branches",
      veeForm.values.branches.filter((selectedBranchId) => selectedBranchId !== branch.id),
    );
  } else {
    veeForm.setFieldValue("branches", [...veeForm.values.branches, branch.id]);
  }
};

const onChangeBenefits = (benefit: Benefit) => {
  const benefitExists = !!veeForm.values.benefits.find(
    (selectedBenefitId) => selectedBenefitId === benefit.id,
  );
  if (benefitExists) {
    veeForm.setValues({
      benefits: veeForm.values.benefits.filter(
        (selectedBenefitId) => selectedBenefitId !== benefit.id,
      ),
    });
  } else {
    veeForm.setValues({ benefits: [...veeForm.values.benefits, benefit.id] });
  }
};

const onSelectCompanyDocuments = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_FILE, {
    key: AttachmentKey.CompanyDocuments,
    files,
  });
};

const onDeleteCompanyDocuments = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_FILE, {
    key: AttachmentKey.CompanyDocuments,
    id: file.id,
  });
};

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActionTypes.BRANCHES),
    store.dispatch(ContentActionTypes.BENEFITS),
    store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.CompanyDocuments,
    }),
  ]);
  veeForm.resetForm({
    values: profileData.value,
  });

  calculateMargins();
});

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  },
);
</script>

<style></style>

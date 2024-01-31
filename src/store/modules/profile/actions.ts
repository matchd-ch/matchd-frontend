import { createApolloClient } from "@/api/apollo-client";
import type {
  CompanyProfileAdvantagesInput,
  CompanyProfileBaseDataInput,
  CompanyProfileRelationsInput,
  CompanyProfileValuesInput,
  DeleteUserMutationInput,
  StudentProfileAbilitiesInput,
  StudentProfileBaseDataInput,
  StudentProfileCharacterInput,
  StudentProfileConditionInput,
  StudentProfileEmploymentInput,
  StudentProfileSpecificDataInput,
  UniversityProfileBaseDataInput,
  UniversityProfileRelationsInput,
  UniversityProfileSpecificDataInput,
  UniversityProfileValuesInput,
  UpdateStudentMutationInput,
  UpdateUserMutationInput,
} from "@/api/models/types";
import { CompanyProfileAdvantagesDocument } from "@/api/mutations/companyProfileAdvantages.generated";
import { CompanyProfileBaseDataDocument } from "@/api/mutations/companyProfileBaseData.generated";
import { CompanyProfileRelationsDocument } from "@/api/mutations/companyProfileRelations.generated";
import { CompanyProfileValuesDocument } from "@/api/mutations/companyProfileValues.generated";
import { DeleteUserDocument } from "@/api/mutations/deleteUser.generated";
import type { PasswordChangeMutationVariables } from "@/api/mutations/passwordChange.generated";
import { PasswordChangeDocument } from "@/api/mutations/passwordChange.generated";
import { StudentProfileAbilitiesDocument } from "@/api/mutations/studentProfileAbilities.generated";
import { StudentProfileBaseDataDocument } from "@/api/mutations/studentProfileBaseData.generated";
import { StudentProfileCharacterDocument } from "@/api/mutations/studentProfileCharacter.generated";
import { StudentProfileConditionDocument } from "@/api/mutations/studentProfileCondition.generated";
import { StudentProfileEmploymentDocument } from "@/api/mutations/studentProfileEmployment.generated";
import { StudentProfileSpecificDataDocument } from "@/api/mutations/studentProfileSpecificData.generated";
import { UniversityProfileBaseDataDocument } from "@/api/mutations/universityProfileBaseData.generated";
import { UniversityProfileRelationsDocument } from "@/api/mutations/universityProfileRelations.generated";
import { UniversityProfileSpecificDataDocument } from "@/api/mutations/universityProfileSpecificData.generated";
import { UniversityProfileValuesDocument } from "@/api/mutations/universityProfileValues.generated";
import { UpdateStudentDocument } from "@/api/mutations/updateStudent.generated";
import { UpdateUserDocument } from "@/api/mutations/updateUser.generated";
import { ZipCityDocument } from "@/api/queries/zipCity.generated";
import { ensureNoNullsAndUndefineds } from "@/helpers/typeHelpers";
import type { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/profile/mutation-types";
import type { Mutations } from "@/store/modules/profile/mutations";
import type { State } from "@/store/modules/profile/state";
import type { ActionContext, ActionTree } from "vuex";
import { config } from "./../../../config";
import { ActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(config.API_URL);

export interface Actions {
  [ActionTypes.STUDENT_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: StudentProfileBaseDataInput,
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: StudentProfileEmploymentInput,
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: StudentProfileCharacterInput,
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: StudentProfileAbilitiesInput,
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP5](
    { commit }: AugmentedActionContext,
    payload: StudentProfileSpecificDataInput,
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP6](
    { commit }: AugmentedActionContext,
    payload: StudentProfileConditionInput,
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileBaseDataInput,
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileRelationsInput,
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileAdvantagesInput,
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileValuesInput,
  ): Promise<void>;
  [ActionTypes.UPDATE_USER](
    { commit }: AugmentedActionContext,
    payload: UpdateUserMutationInput,
  ): Promise<void>;
  [ActionTypes.UPDATE_STUDENT](
    { commit }: AugmentedActionContext,
    payload: UpdateStudentMutationInput,
  ): Promise<void>;
  [ActionTypes.DELETE_USER](
    { commit }: AugmentedActionContext,
    payload: DeleteUserMutationInput,
  ): Promise<void>;
  [ActionTypes.PASSWORD_CHANGE](
    { commit }: AugmentedActionContext,
    payload: PasswordChangeMutationVariables,
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: UniversityProfileBaseDataInput,
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: UniversityProfileSpecificDataInput,
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: UniversityProfileRelationsInput,
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileValuesInput,
  ): Promise<void>;
  [ActionTypes.CITY_BY_ZIP]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.STUDENT_ONBOARDING_STEP1]({ commit }, payload: StudentProfileBaseDataInput) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileBaseDataDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileBaseData ?? undefined,
    );
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP2]({ commit }, payload: StudentProfileEmploymentInput) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileEmploymentDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileEmployment ?? undefined,
    );
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP3]({ commit }, payload: StudentProfileCharacterInput) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileCharacterDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileCharacter ?? undefined,
    );
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP4]({ commit }, payload: StudentProfileAbilitiesInput) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileAbilitiesDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileAbilities ?? undefined,
    );
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP5](
    { commit },
    payload: StudentProfileSpecificDataInput,
  ) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileSpecificDataDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileSpecificData ?? undefined,
    );
    commit(MutationTypes.STUDENT_ONBOARDING_NICKNAME_SUGGESTIONS, {
      nicknameSuggestions: !response.data?.studentProfileSpecificData?.nicknameSuggestions
        ? []
        : ensureNoNullsAndUndefineds(
            response.data.studentProfileSpecificData.nicknameSuggestions.filter(
              (elem) => elem !== null,
            ),
          ),
    });
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP6]({ commit }, payload: StudentProfileConditionInput) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileConditionDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileCondition ?? undefined,
    );
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP1]({ commit }, payload: CompanyProfileBaseDataInput) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: CompanyProfileBaseDataDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.COMPANY_ONBOARDING_STEP_LOADED,
      response.data?.companyProfileBaseData ?? undefined,
    );
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP2]({ commit }, payload: CompanyProfileRelationsInput) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: CompanyProfileRelationsDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.COMPANY_ONBOARDING_STEP_LOADED,
      response.data?.companyProfileRelations ?? undefined,
    );
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP3]({ commit }, payload: CompanyProfileAdvantagesInput) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: CompanyProfileAdvantagesDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.COMPANY_ONBOARDING_STEP_LOADED,
      response.data?.companyProfileAdvantages ?? undefined,
    );
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP4]({ commit }, payload: CompanyProfileValuesInput) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: CompanyProfileValuesDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.COMPANY_ONBOARDING_STEP_LOADED,
      response.data?.companyProfileValues ?? undefined,
    );
  },
  async [ActionTypes.UPDATE_USER]({ commit }, payload: UpdateUserMutationInput) {
    commit(MutationTypes.UPDATE_USER_LOADING);
    const response = await apiClient.mutate({
      mutation: UpdateUserDocument,
      variables: { input: payload },
    });
    commit(MutationTypes.UPDATE_USER_LOADED, response.data?.updateUser ?? undefined);
  },
  async [ActionTypes.UPDATE_STUDENT]({ commit }, payload: UpdateStudentMutationInput) {
    commit(MutationTypes.UPDATE_STUDENT_LOADING);
    const response = await apiClient.mutate({
      mutation: UpdateStudentDocument,
      variables: { input: payload },
    });
    commit(MutationTypes.UPDATE_STUDENT_LOADED, response.data?.updateStudent ?? undefined);
  },
  async [ActionTypes.DELETE_USER]({ commit }) {
    commit(MutationTypes.DELETE_USER_LOADING);
    const response = await apiClient.mutate({
      mutation: DeleteUserDocument,
    });
    commit(MutationTypes.DELETE_USER_LOADED, response.data?.deleteUser ?? undefined);
  },
  async [ActionTypes.PASSWORD_CHANGE]({ commit }, payload: PasswordChangeMutationVariables) {
    commit(MutationTypes.PASSWORD_CHANGE_LOADING);
    const response = await apiClient.mutate({
      mutation: PasswordChangeDocument,
      variables: payload,
    });
    commit(MutationTypes.PASSWORD_CHANGE_LOADED, response.data ?? undefined);
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP1](
    { commit },
    payload: UniversityProfileBaseDataInput,
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: UniversityProfileBaseDataDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data?.universityProfileBaseData ?? undefined,
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP2](
    { commit },
    payload: UniversityProfileSpecificDataInput,
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: UniversityProfileSpecificDataDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data?.universityProfileSpecificData ?? undefined,
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP3](
    { commit },
    payload: UniversityProfileRelationsInput,
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: UniversityProfileRelationsDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data?.universityProfileRelations ?? undefined,
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP4](
    { commit },
    payload: UniversityProfileValuesInput,
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: UniversityProfileValuesDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data?.universityProfileValues ?? undefined,
    );
  },
  async [ActionTypes.CITY_BY_ZIP]({ commit }) {
    commit(MutationTypes.ZIP_CITY_LOADING);
    const response = await apiClient.query({
      query: ZipCityDocument,
    });
    commit(MutationTypes.ZIP_CITY_LOADED, response.data.zipCity);
  },
};

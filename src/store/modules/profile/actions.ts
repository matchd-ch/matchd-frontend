import { createApolloClient } from "@/api/apollo-client";
import {
  ICompanyProfileInputAdvantages,
  ICompanyProfileInputBaseData,
  ICompanyProfileInputRelations,
  ICompanyProfileInputValues,
  IStudentProfileInputAbilities,
  IStudentProfileInputBaseData,
  IStudentProfileInputCharacter,
  IStudentProfileInputCondition,
  IStudentProfileInputEmployment,
  IStudentProfileInputSpecificData,
  IUniversityProfileInputBaseData,
  IUniversityProfileInputRelations,
  IUniversityProfileInputSpecificData,
  IUniversityProfileInputValues,
} from "@/api/models/types";
import companyProfileAdvantagesMutation from "@/api/mutations/companyProfileAdvantages.gql";
import companyProfileBaseDataMutation from "@/api/mutations/companyProfileBaseData.gql";
import companyProfileRelationsMutation from "@/api/mutations/companyProfileRelations.gql";
import companyProfileValuesMutation from "@/api/mutations/companyProfileValues.gql";
import studentProfileAbilitiesMutation from "@/api/mutations/studentProfileAbilities.gql";
import studentProfileBaseDataMutation from "@/api/mutations/studentProfileBaseData.gql";
import studentProfileCharacterMutation from "@/api/mutations/studentProfileCharacter.gql";
import studentProfileConditionMutation from "@/api/mutations/studentProfileCondition.gql";
import studentProfileEmploymentMutation from "@/api/mutations/studentProfileEmployment.gql";
import studentProfileSpecificDataMutation from "@/api/mutations/studentProfileSpecificData.gql";
import universityProfileBaseDataMutation from "@/api/mutations/universityProfileBaseData.gql";
import universityProfileRelationsMutation from "@/api/mutations/universityProfileRelations.gql";
import universityProfileSpecificDataMutation from "@/api/mutations/universityProfileSpecificData.gql";
import universityProfileValuesMutation from "@/api/mutations/universityProfileValues.gql";
import zipCityQuery from "@/api/queries/zipCity.gql";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/profile/mutation-types";
import { Mutations } from "@/store/modules/profile/mutations";
import { State } from "@/store/modules/profile/state";
import { ActionContext, ActionTree } from "vuex";
import { config } from "./../../../config";
import { ActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(config.API_URL);

export interface Actions {
  [ActionTypes.STUDENT_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputBaseData
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputEmployment
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputCharacter
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputAbilities
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP5](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputSpecificData
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP6](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputCondition
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputBaseData
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputRelations
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputAdvantages
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputValues
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: IUniversityProfileInputBaseData
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: IUniversityProfileInputSpecificData
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: IUniversityProfileInputRelations
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: ICompanyProfileInputValues
  ): Promise<void>;
  [ActionTypes.CITY_BY_ZIP]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.STUDENT_ONBOARDING_STEP1]({ commit }, payload: IStudentProfileInputBaseData) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileBaseDataMutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileBaseData);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP2](
    { commit },
    payload: IStudentProfileInputEmployment
  ) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileEmploymentMutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileEmployment);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP3]({ commit }, payload: IStudentProfileInputCharacter) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileCharacterMutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileCharacter);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP4]({ commit }, payload: IStudentProfileInputAbilities) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileAbilitiesMutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileAbilities);
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP5](
    { commit },
    payload: IStudentProfileInputSpecificData
  ) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileSpecificDataMutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileSpecificData);
    commit(MutationTypes.STUDENT_ONBOARDING_NICKNAME_SUGGESTIONS, {
      nicknameSuggestions: response.data.studentProfileSpecificData?.nicknameSuggestions,
    });
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP6]({ commit }, payload: IStudentProfileInputCondition) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileConditionMutation,
      variables: payload,
    });
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADED, response.data.studentProfileCondition);
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP1]({ commit }, payload: ICompanyProfileInputBaseData) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: companyProfileBaseDataMutation,
      variables: payload,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADED, response.data.companyProfileBaseData);
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP2]({ commit }, payload: ICompanyProfileInputRelations) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: companyProfileRelationsMutation,
      variables: payload,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADED, response.data.companyProfileRelations);
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP3](
    { commit },
    payload: ICompanyProfileInputAdvantages
  ) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: companyProfileAdvantagesMutation,
      variables: payload,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADED, response.data.companyProfileAdvantages);
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP4]({ commit }, payload: ICompanyProfileInputValues) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: companyProfileValuesMutation,
      variables: payload,
    });
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADED, response.data.companyProfileValues);
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP1](
    { commit },
    payload: IUniversityProfileInputBaseData
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: universityProfileBaseDataMutation,
      variables: payload,
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data.universityProfileBaseData
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP2](
    { commit },
    payload: IUniversityProfileInputSpecificData
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: universityProfileSpecificDataMutation,
      variables: payload,
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data.universityProfileSpecificData
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP3](
    { commit },
    payload: IUniversityProfileInputRelations
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: universityProfileRelationsMutation,
      variables: payload,
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data.universityProfileRelations
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP4](
    { commit },
    payload: IUniversityProfileInputValues
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: universityProfileValuesMutation,
      variables: payload,
    });
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED, response.data.universityProfileValues);
  },
  async [ActionTypes.CITY_BY_ZIP]({ commit }) {
    commit(MutationTypes.ZIP_CITY_LOADING);
    const response = await apiClient.query({
      query: zipCityQuery,
    });
    commit(MutationTypes.ZIP_CITY_LOADED, response.data.zipCity);
  },
};

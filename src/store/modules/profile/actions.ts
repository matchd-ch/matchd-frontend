import { createApolloClient } from "@/api/apollo-client";
import type {
  CompanyProfileInputAdvantages,
  CompanyProfileInputBaseData,
  CompanyProfileInputRelations,
  CompanyProfileInputValues,
  StudentProfileInputAbilities,
  StudentProfileInputBaseData,
  StudentProfileInputCharacter,
  StudentProfileInputCondition,
  StudentProfileInputEmployment,
  StudentProfileInputSpecificData,
  UniversityProfileInputBaseData,
  UniversityProfileInputRelations,
  UniversityProfileInputSpecificData,
  UniversityProfileInputValues,
} from "@/api/models/types";
import { CompanyProfileAdvantagesDocument } from "@/api/mutations/companyProfileAdvantages.generated";
import { CompanyProfileBaseDataDocument } from "@/api/mutations/companyProfileBaseData.generated";
import { CompanyProfileRelationsDocument } from "@/api/mutations/companyProfileRelations.generated";
import { CompanyProfileValuesDocument } from "@/api/mutations/companyProfileValues.generated";
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
import { ZipCityDocument } from "@/api/queries/zipCity.generated";
import { ensureNoNullsAndUndefineds } from "@/helpers/typeHelpers";
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
    payload: StudentProfileInputBaseData
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: StudentProfileInputEmployment
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: StudentProfileInputCharacter
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: StudentProfileInputAbilities
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP5](
    { commit }: AugmentedActionContext,
    payload: StudentProfileInputSpecificData
  ): Promise<void>;
  [ActionTypes.STUDENT_ONBOARDING_STEP6](
    { commit }: AugmentedActionContext,
    payload: StudentProfileInputCondition
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileInputBaseData
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileInputRelations
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileInputAdvantages
  ): Promise<void>;
  [ActionTypes.COMPANY_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileInputValues
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: UniversityProfileInputBaseData
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: UniversityProfileInputSpecificData
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: UniversityProfileInputRelations
  ): Promise<void>;
  [ActionTypes.UNIVERSITY_ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: CompanyProfileInputValues
  ): Promise<void>;
  [ActionTypes.CITY_BY_ZIP]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.STUDENT_ONBOARDING_STEP1]({ commit }, payload: StudentProfileInputBaseData) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileBaseDataDocument,
      variables: { baseData: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileBaseData ?? undefined
    );
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP2]({ commit }, payload: StudentProfileInputEmployment) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileEmploymentDocument,
      variables: { employment: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileEmployment ?? undefined
    );
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP3]({ commit }, payload: StudentProfileInputCharacter) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileCharacterDocument,
      variables: { character: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileCharacter ?? undefined
    );
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP4]({ commit }, payload: StudentProfileInputAbilities) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileAbilitiesDocument,
      variables: { abilities: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileAbilities ?? undefined
    );
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP5](
    { commit },
    payload: StudentProfileInputSpecificData
  ) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileSpecificDataDocument,
      variables: { specificData: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileSpecificData ?? undefined
    );
    commit(MutationTypes.STUDENT_ONBOARDING_NICKNAME_SUGGESTIONS, {
      nicknameSuggestions: !response.data?.studentProfileSpecificData?.nicknameSuggestions
        ? []
        : ensureNoNullsAndUndefineds(
            response.data.studentProfileSpecificData.nicknameSuggestions.filter(
              (elem) => elem !== null
            )
          ),
    });
  },
  async [ActionTypes.STUDENT_ONBOARDING_STEP6]({ commit }, payload: StudentProfileInputCondition) {
    commit(MutationTypes.STUDENT_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: StudentProfileConditionDocument,
      variables: { condition: payload },
    });
    commit(
      MutationTypes.STUDENT_ONBOARDING_STEP_LOADED,
      response.data?.studentProfileCondition ?? undefined
    );
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP1]({ commit }, payload: CompanyProfileInputBaseData) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: CompanyProfileBaseDataDocument,
      variables: { baseData: payload },
    });
    commit(
      MutationTypes.COMPANY_ONBOARDING_STEP_LOADED,
      response.data?.companyProfileBaseData ?? undefined
    );
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP2]({ commit }, payload: CompanyProfileInputRelations) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: CompanyProfileRelationsDocument,
      variables: { relations: payload },
    });
    commit(
      MutationTypes.COMPANY_ONBOARDING_STEP_LOADED,
      response.data?.companyProfileRelations ?? undefined
    );
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP3]({ commit }, payload: CompanyProfileInputAdvantages) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: CompanyProfileAdvantagesDocument,
      variables: { advantages: payload },
    });
    commit(
      MutationTypes.COMPANY_ONBOARDING_STEP_LOADED,
      response.data?.companyProfileAdvantages ?? undefined
    );
  },
  async [ActionTypes.COMPANY_ONBOARDING_STEP4]({ commit }, payload: CompanyProfileInputValues) {
    commit(MutationTypes.COMPANY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: CompanyProfileValuesDocument,
      variables: { values: payload },
    });
    commit(
      MutationTypes.COMPANY_ONBOARDING_STEP_LOADED,
      response.data?.companyProfileValues ?? undefined
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP1](
    { commit },
    payload: UniversityProfileInputBaseData
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: UniversityProfileBaseDataDocument,
      variables: { baseData: payload },
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data?.universityProfileBaseData ?? undefined
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP2](
    { commit },
    payload: UniversityProfileInputSpecificData
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: UniversityProfileSpecificDataDocument,
      variables: { specificData: payload },
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data?.universityProfileSpecificData ?? undefined
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP3](
    { commit },
    payload: UniversityProfileInputRelations
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: UniversityProfileRelationsDocument,
      variables: { relations: payload },
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data?.universityProfileRelations ?? undefined
    );
  },
  async [ActionTypes.UNIVERSITY_ONBOARDING_STEP4](
    { commit },
    payload: UniversityProfileInputValues
  ) {
    commit(MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: UniversityProfileValuesDocument,
      variables: { values: payload },
    });
    commit(
      MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED,
      response.data?.universityProfileValues ?? undefined
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

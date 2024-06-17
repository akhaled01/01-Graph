import { AggregateSkills } from "@/logic/utils/aggregate";
import { GET_SKILLS_AMT } from "../queries";
import GenApolloClient from "./gen";

export interface Transaction {
  amount: number;
  type: string;
}

export interface SkillMax {
  skill: string;
  max: number;
}

export const GetSkills = async (): Promise<SkillMax[]> => {
  const { data } = await GenApolloClient().query({
    query: GET_SKILLS_AMT,
  });

  return AggregateSkills(data.transaction);
};

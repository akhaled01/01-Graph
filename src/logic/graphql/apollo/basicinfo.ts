import { BASE_INFO_QUERY, TOTAL_XP_FOR_USER } from "../queries";
import GenApolloClient from "./gen";

/**
 * Basic user info, like ID, login and the audit ratio
 */
export interface BasicUserInfo {
  id: number;
  login: string;
  auditRatio: number;
}

/**
 * contains XP of the user
 */
export interface XP {
  xp: number;
}

export const GetBasicUserInfo = async (): Promise<BasicUserInfo | null> => {
  try {
    const { data } = await GenApolloClient().query({
      query: BASE_INFO_QUERY,
    });

    console.warn(data.user[0]);

    const userInfo: BasicUserInfo = {
      id: data.user[0].id,
      login: data.user[0].login,
      auditRatio: data.user[0].auditRatio,
    };

    return userInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const GetXP = async (): Promise<XP | null> => {
  try {
    const { data } = await GenApolloClient().query({
      query: TOTAL_XP_FOR_USER,
    });

    const userXP: XP = {
      xp: data.transaction_aggregate.aggregate.sum.amount,
    };

    return userXP;
  } catch (error) {
    console.error(error);
    return null;
  }
};

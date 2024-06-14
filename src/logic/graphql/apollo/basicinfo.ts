import { BASE_INFO_QUERY, TOTAL_XP_FOR_USER } from "../queries";
import GenApolloClient from "./gen";

export interface BasicUserInfo {
  id: number;
  login: string;
  auditRatio: number;
  auditUp: number;
  auditDown: number;
  xp: number;
}

export type UserLogin = Pick<BasicUserInfo, "login">;
export type XP = Pick<BasicUserInfo, "xp">;

export const GetBasicUserInfo = async (): Promise<BasicUserInfo | null> => {
  try {
    const { data: userData } = await GenApolloClient().query({
      query: BASE_INFO_QUERY,
    });

    const { data: xpData } = await GenApolloClient().query({
      query: TOTAL_XP_FOR_USER,
    });

    if (
      !userData?.user?.[0] ||
      !xpData?.transaction_aggregate?.aggregate?.sum?.amount
    ) {
      console.warn("User data or XP data is not available");
      return null;
    }

    const userInfo: BasicUserInfo = {
      id: userData.user[0].id,
      login: userData.user[0].login,
      auditRatio: userData.user[0].auditRatio,
      auditUp: userData.user[0].totalUp,
      auditDown: userData.user[0].totalDown,
      xp: xpData.transaction_aggregate.aggregate.sum.amount,
    };

    return userInfo;
  } catch (error) {
    console.error("Error fetching basic user info:", error);
    return null;
  }
};

export const GetXP = async (): Promise<XP | null> => {
  try {
    const { data } = await GenApolloClient().query({
      query: TOTAL_XP_FOR_USER,
    });

    if (!data?.transaction_aggregate?.aggregate?.sum?.amount) {
      console.warn("XP data is not available");
      return null;
    }

    const userXP: XP = {
      xp: data.transaction_aggregate.aggregate.sum.amount,
    };

    return userXP;
  } catch (error) {
    console.error("Error fetching user XP:", error);
    return null;
  }
};

export const GetLogin = async (): Promise<UserLogin | null> => {
  try {
    const data = await GetBasicUserInfo();

    if (!data) {
      console.warn("Basic user info is not available");
      return null;
    }

    const userLogin: UserLogin = {
      login: data.login,
    };

    return userLogin;
  } catch (error) {
    console.error("Error fetching user login:", error);
    return null;
  }
};

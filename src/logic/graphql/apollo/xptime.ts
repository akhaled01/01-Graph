import { GET_XP_WITH_TIME } from "../queries";
import GenApolloClient from "./gen";

export interface XP_PROJ {
  name: string;
  amount: number;
  date: Date;
}

export const GetXPPerProj = async (): Promise<XP_PROJ[]> => {
  try {
    const { data } = await GenApolloClient().query({
      query: GET_XP_WITH_TIME,
    });

    const XP_PROJ_ARR: XP_PROJ[] = [];
    data.transaction.forEach((trans: any) => {
      let entry: XP_PROJ = {
        name: trans.object.name,
        amount: trans.amount,
        date: new Date(trans.createdAt),
      };

      console.warn(XP_PROJ_ARR);
      XP_PROJ_ARR.push(entry);
    });

    return XP_PROJ_ARR;
  } catch (error) {
    console.error("Error fetching XP with time:", error);
    return [];
  }
};

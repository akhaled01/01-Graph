import { FMT_XP } from "@/logic/utils/xp";
import { GET_ALL_PROJ_QUERY } from "../queries";
import GenApolloClient from "./gen";

export interface Project {
  name: string;
  XPamount: string;
  type: string;
  completed_date: string;
}

export const GetProjectStats = async (): Promise<Project[] | null> => {
  try {
    const { data } = await GenApolloClient().query({
      query: GET_ALL_PROJ_QUERY,
    });

    console.log(data.transaction);

    const projectArray: Project[] = [];
    data.transaction.forEach((trans: any) => {
      let proj: Project = {
        name: trans.object.name,
        XPamount: FMT_XP(trans.amount),
        type: trans.object.object_type.type,
        completed_date: new Date(trans.createdAt).toDateString(),
      };
      projectArray.push(proj);
    });

    return projectArray;
  } catch (error) {
    console.error("Error fetching project stats:", error);
    return null;
  }
};
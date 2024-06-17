import { Rank } from "@/logic/utils/rank";
import { GET_USER_LEVEL } from "../queries";
import GenApolloClient from "./gen";

export interface Level {
  level: number;
  Rank: string;
}

export const GetLevel = async (username: string): Promise<Level> => {
  const { data } = await GenApolloClient().query({
    query: GET_USER_LEVEL,
    variables: {
      userlogin: username,
    },
  });

  const level = data.event_user[0].level;
  const rank = Rank(level);

  const levelObj: Level = {
    level: level,
    Rank: rank,
  };

  return levelObj;
};

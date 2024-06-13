import { GetBasicUserInfo } from "../graphql/apollo/basicinfo";
import GenApolloClient from "../graphql/apollo/gen";

/**
 * sometimes, we need to set some information about the user to use later.
 * 
 * This method sets the username
 */
export const setSessionInfo = async () => {
  const data = await GetBasicUserInfo();
  sessionStorage.setItem("01-USERNAME", data?.login!);
};

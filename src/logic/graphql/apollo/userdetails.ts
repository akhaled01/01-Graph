import { GET_CURRENTLY_WORKING_ON, USER_DETAILS } from "../queries";
import GenApolloClient from "./gen";

export interface UserInfo {
  FullName: string;
  DOB: string;
  CurrentlyWorkingOn: string;
}

export const GetDetailedUserInfo = async (): Promise<UserInfo> => {
  const { data: userData } = await GenApolloClient().query({
    query: USER_DETAILS,
  });

  const { data: workingOnData } = await GenApolloClient().query({
    query: GET_CURRENTLY_WORKING_ON,
  });

  const maindata: UserInfo = {
    FullName:
      userData.user[0].attrs.firstName.trim() +
      " " +
      userData.user[0].attrs.lastName.trim(),
    DOB: new Date(userData.user[0].attrs.dateOfBirth).toDateString(),
    CurrentlyWorkingOn: workingOnData.progress[0].object.name,
  };

  return maindata;
};

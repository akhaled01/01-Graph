import { AUDIT_FAIL_NUM_QUERY, AUDIT_SUCCESS_NUM_QUERY } from "../queries";
import GenApolloClient from "./gen";

export interface AuditeePassRatio {
  pass: number;
  fail: number;
}

const GetAuditeePassRatio = async (username: string): Promise<any> => {
  const { data } = await GenApolloClient().query({
    query: AUDIT_SUCCESS_NUM_QUERY,
    variables: {
      userlogin: username,
    },
  });

  return data;
};

const GetAuditeeFailRatio = async (username: string): Promise<any> => {
  const { data } = await GenApolloClient().query({
    query: AUDIT_FAIL_NUM_QUERY,
    variables: {
      userlogin: username,
    },
  });

  return data;
};

export const GetAuditorStrictness = async (
  username: string
): Promise<AuditeePassRatio> => {
  const passcount = await GetAuditeePassRatio(username);
  const failcount = await GetAuditeeFailRatio(username);

  const data: AuditeePassRatio = {
    pass: passcount.audit_aggregate.aggregate.count,
    fail: failcount.audit_aggregate.aggregate.count,
  };

  return data;
};

export const GetAuditorPassRating = async (
  username: string
): Promise<string> => {
  const data = await GetAuditorStrictness(username);
  const percentage = (data.pass / (data.pass + data.fail)) * 100;

  return percentage + "%";
};

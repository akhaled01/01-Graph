import { AUDIT_FAIL_NUM_QUERY, AUDIT_SUCCESS_NUM_QUERY } from "../queries";
import GenApolloClient from "./gen";

export interface AuditeePassRatio {
  pass: number;
  fail: number;
}

const GetAuditeePassRatio = async (): Promise<any> => {
  const { data } = await GenApolloClient().query({
    query: AUDIT_SUCCESS_NUM_QUERY,
    variables: {
      userlogin: sessionStorage.getItem("01-USERNAME"),
    },
  });

  return data;
};

const GetAuditeeFailRatio = async (): Promise<any> => {
  const { data } = await GenApolloClient().query({
    query: AUDIT_FAIL_NUM_QUERY,
    variables: {
      userlogin: sessionStorage.getItem("01-USERNAME"),
    },
  });

  return data;
};

export const GetAuditorStrictness = async (): Promise<AuditeePassRatio> => {
  const passcount = await GetAuditeePassRatio();
  const failcount = await GetAuditeeFailRatio();

  const data: AuditeePassRatio = {
    pass: passcount.audit_aggregate.aggregate.count,
    fail: failcount.audit_aggregate.aggregate.count,
  };

  return data;
};

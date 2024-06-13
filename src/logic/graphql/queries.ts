import { gql } from "@apollo/client";

/**
 * Query for the basic info like
 *
 * user id
 * username
 *
 * Total XP in bytes
 */
export const BASE_INFO_QUERY = gql`
  query User {
    user {
      id
      login
      auditRatio
      totalDown
      totalUp
    }
  }
`;

/**
 * All projects (within the /bahrain/bh-module) done by the user.
 *
 * Projects can be of type excersise or project
 */
export const GET_ALL_PROJ_QUERY = gql`
  query Transaction {
    transaction(
      where: {
        type: { _eq: "xp" }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      amount
      path
      createdAt
      object {
        name
        object_type {
          type
        }
      }
    }
  }
`;

/**
 * Number of times a user failed someone
 */
export const AUDIT_FAIL_NUM_QUERY = gql`
  query Audit_aggregate($userlogin: string) {
    audit_aggregate(
      where: { grade: { _lt: "1" }, auditor: { login: { _eq: $userlogin } } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

/**
 * Number of times a user passed someone
 */
export const AUDIT_SUCCESS_NUM_QUERY = gql`
  query Audit_aggregate($userlogin: string) {
    audit_aggregate(
      where: { grade: { _gte: "1" }, auditor: { login: { _eq: $userlogin } } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

/**
 * Get the user's total XP
 */
export const TOTAL_XP_FOR_USER = gql`
  query Transaction_aggregate {
    transaction_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

/**
 * get the user's level
 *
 * REQUIRES PARAMETER USERLOGIN (user's username)
 */
export const GET_USER_LEVEL = gql`
  query Event_user($userlogin: String) {
    event_user(
      where: {
        userLogin: { _eq: $userlogin }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      level
    }
  }
`;

/**
 * Get every skill and their amount (for radial graph)
 */
export const GET_SKILLS_AMT = gql`
  query Transaction {
    transaction(
      where: {
        type: {
          _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])"
        }
      }
    ) {
      amount
      type
    }
  }
`;

/**
 * each XP transaction with time
 */
export const GET_XP_WITH_PROJECT = gql`
  query Transaction {
    transaction(
      where: {
        transaction_type: { type: { _eq: "xp" } }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      amount
      createdAt
      object {
        name
        type
      }
    }
  }
`;

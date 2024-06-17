import { SkillMax, Transaction } from "../graphql/apollo/skills";

/**
 * Aggregates skills coming in from graphql
 *
 * @param transactions - an array of skill transactions
 * @returns an array of skills with total transactions
 */
export const AggregateSkills = (transactions: Transaction[]): SkillMax[] => {
  const skillMax: { [key: string]: number } = {};

  transactions.forEach((transaction) => {
    if (
      skillMax[transaction.type.replace("skill_", "").toUpperCase()] !==
      undefined
    ) {
      if (transaction.amount > skillMax[transaction.type]) {
        skillMax[transaction.type.replace("skill_", "").toUpperCase()] =
          transaction.amount;
      }
    } else {
      skillMax[transaction.type.replace("skill_", "").toUpperCase()] =
        transaction.amount;
    }
  });

  return Object.entries(skillMax).map(([skill, max]) => ({
    skill,
    max,
  }));
};

export const Rank = (score: number): string => {
  if (score >= 0 && score < 10) {
    return "Aspiring";
  } else if (score >= 10 && score < 20) {
    return "Beginner";
  } else if (score >= 20 && score < 30) {
    return "Apprentice";
  } else if (score >= 30 && score < 40) {
    return "Assistant";
  } else if (score >= 40 && score < 50) {
    return "Basic";
  } else if (score >= 50 && score < 55) {
    return "Junior";
  } else if (score >= 55 && score < 60) {
    return "Confirmed";
  } else {
    return "Full stack";
  }
};

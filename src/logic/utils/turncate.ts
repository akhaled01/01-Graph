/**
 * function to turncate long project names
 *
 * @param name - project name
 * @returns - turncated name
 */
export const Turncate = (name: string): string => {
  if (name.split("-").length >= 4 || name.length > 8) {
    console.log("TURNCATE");
    return name.slice(0, 18) + "...";
  }
  return name;
};

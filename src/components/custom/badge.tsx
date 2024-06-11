import { XP_PROJ } from "@/logic/graphql/apollo/xptime";
import { SANS } from "@/styles/fonts";
import React, { FC } from "react";

const TypeBadge: FC<XP_PROJ> = ({ type }: XP_PROJ) => {
  let bgColor =
    type === "project"
      ? "bg-sunnyBlue"
      : type === "piscine"
      ? "bg-hgreen"
      : "bg-wateryYellow";

  let borderColor =
    type === "project"
      ? "border-lightBlue"
      : type === "piscine"
      ? "border-lightCyan"
      : "border-lightYellow";

  let shadowColor =
    type === "project"
      ? "shadow-indigo-600"
      : type === "piscine"
      ? "shadow-cyan-600"
      : "shadow-amber-600";

  return (
    <div
      className={`w-[95px] shadow-lg ${shadowColor} h-[20px] border-[1px] ${SANS.className} ${bgColor} ${borderColor} rounded-full flex items-center justify-center px-4 py-4`}
    >
      {type === "project" ? (
        <p>Project</p>
      ) : type === "piscine" ? (
        <p>Piscine</p>
      ) : (
        <p>Excersise</p>
      )}
    </div>
  );
};

export default TypeBadge;

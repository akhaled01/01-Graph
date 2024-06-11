import { GetXPPerProj, XP_PROJ } from "@/logic/graphql/apollo/xptime";
import { FMT_XP } from "@/logic/utils/xp";
import { MONO_THIN, SANS } from "@/styles/fonts";
import React, { FC, useEffect, useState } from "react";
import TypeBadge from "./badge";

const ProjectTable: FC = () => {
  const [data, setdata] = useState<XP_PROJ[]>([]);

  useEffect(() => {
    GetXPPerProj().then((data) =>
      setdata(data.sort((a, b) => a.date.getTime() - b.date.getTime()))
    );
  }, []);

  return (
    <div className="w-700 h-250 overflow-scroll bg-componentBg rounded-lg px-3 py-3">
      {data &&
        data.map((proj) => (
          <div
            className="flex items-center justify-between text-white mb-5 py-2"
            key={proj.name}
          >
            <div className={`text-left w-32 ${MONO_THIN.className}`}>
              {proj.name}
            </div>
            <div className={`text-left ${MONO_THIN.className}`}>
              {FMT_XP(proj.amount)}
            </div>
            <TypeBadge
              type={proj.type}
              name={proj.name}
              amount={proj.amount}
              date={proj.date}
            />
          </div>
        ))}
    </div>
  );
};

export default ProjectTable;

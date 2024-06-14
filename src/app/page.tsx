"use client";

import ProjectTable from "@/components/custom/projtable";
import Sidebar from "@/components/custom/sidebar";
import AuditRatioGraph from "@/components/graphs/auditratiograph";
import XPPROJCHART from "@/components/graphs/xpgraph";
import { MONO_NORMAL, MONO_THIN, SANS } from "@/styles/fonts";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/logic/context/redux";

export default function Home() {
  const jwt = useSelector((state: RootState) => state.jwt);
  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.push("/auth");
    }
  });

  return (
    <div className="w-screen h-screen bg-black overflow-scroll flex items-center gap-5">
      <Sidebar />
      <div
        id="graphs"
        className="w-full h-full flex flex-col items-center justify-center gap-4"
      >
        <div
          id="top-part"
          className="flex items-center justify-center gap-4 w-full"
        >
          <div id="last-10-xp" className="flex flex-col gap-2">
            <p className={`text-white ${SANS.className}`}>
              Top 10 finished Projects by XP
            </p>
            <XPPROJCHART />
          </div>
          <div id="project-table" className="flex flex-col gap-2 mr-3">
            <p className={`text-white ${SANS.className}`}>
              BH-MODULE Progress Table
            </p>
            <ProjectTable />
          </div>
        </div>
        <div
          id="bottom-part"
          className="flex items-center justify-between w-full"
        >
          <div className="w-350 h-350 bg-componentBg rounded-lg flex flex-col items-center gap-2 px-3 py-3">
            <p className={`text-white ${SANS.className} text-2xl mt-2`}>
              Audit Ratio
            </p>
            <AuditRatioGraph />
          </div>
          <div className="w-350 h-350 bg-componentBg rounded-lg"></div>
          <div className="w-350 h-350 bg-componentBg rounded-lg mr-3"></div>
        </div>
      </div>
    </div>
  );
}

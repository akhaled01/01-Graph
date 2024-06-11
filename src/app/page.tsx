"use client";

import ProjectTable from "@/components/custom/projtable";
import Sidebar from "@/components/custom/sidebar";
import XPPROJCHART from "@/components/graphs/xpgraph";
import { MONO_NORMAL } from "@/styles/fonts";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!hasCookie("JWT_TOKEN")) {
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
            <p className={`text-white ${MONO_NORMAL.className}`}>
              Top 10 finished Projects by XP
            </p>
            <XPPROJCHART />
          </div>
          <div id="project-table" className="flex flex-col gap-2 mr-3">
            <p className={`text-white ${MONO_NORMAL.className}`}>
              BH-MODULE Progress Table
            </p>
            <ProjectTable />
          </div>
        </div>
        <div
          id="bottom-part"
          className="flex items-center justify-between w-full"
        >
          <div className="w-350 h-350 bg-componentBg rounded-lg flex flex-col items-start gap-2 px-3 py-3">
            <p className={`text-white`}>Audit Ratio</p>
          </div>
          <div className="w-350 h-350 bg-componentBg rounded-lg"></div>
          <div className="w-350 h-350 bg-componentBg rounded-lg mr-3"></div>
        </div>
      </div>
    </div>
  );
}

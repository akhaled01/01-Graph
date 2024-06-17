"use client";

import ProjectTable from "@/components/custom/projtable";
import Sidebar from "@/components/custom/sidebar";
import AuditRatioGraph from "@/components/graphs/auditratiograph";
import XPPROJCHART from "@/components/graphs/xpgraph";
import { SANS } from "@/styles/fonts";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "@/logic/context/redux";
import Loading from "@/components/custom/loading";
import AuditeePassGraph from "@/components/graphs/auditeepassgraph";
import { GetAuditorPassRating } from "@/logic/graphql/apollo/auditeepassratio";
import { GetLogin } from "@/logic/graphql/apollo/basicinfo";
import InfoDialog from "@/components/custom/infodialog";

export default function Home() {
  const jwt = useSelector((state: RootState) => state.jwt);
  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.push("/auth");
    }
  });

  return jwt ? (
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
          <InfoDialog
            title="Top 10 Finished Projects By XP"
            desc="This chart comprises of all projects that are finished by you, sorts them by XP, and gets the top 10"
          >
            <div id="last-10-xp" className="flex flex-col gap-2">
              <XPPROJCHART />
            </div>
          </InfoDialog>
          <InfoDialog
            title="BH-MODULE progress table"
            desc="All projects, checkpoint excersises, and piscines finished by you"
          >
            <div id="project-table" className="flex flex-col gap-2 mr-3">
              <ProjectTable />
            </div>
          </InfoDialog>
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
          <div className="w-350 h-350 bg-componentBg rounded-lg flex flex-col items-center justify-center gap-2 py-3">
            <p className={`text-white ${SANS.className} text-2xl mt-2`}>
              Auditee Pass Rate
            </p>
            <AuditeePassGraph />
          </div>
          <div className="w-350 h-350 bg-componentBg rounded-lg mr-3"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen bg-black overflow-scroll flex items-center justify-center">
      <Loading />
    </div>
  );
}

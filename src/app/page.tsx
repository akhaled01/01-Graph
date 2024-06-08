"use client";

import ProfileCard from "@/components/custom/profilecard";
import ProjectTable from "@/components/custom/datatable";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!hasCookie("JWT_TOKEN")) {
      router.push("/auth");
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-black overflow-scroll">
      <ProfileCard />
      <ProjectTable />
    </div>
  );
}

"use client";

import Sidebar from "@/components/custom/sidebar";
import XPTimeGraph from "@/components/graphs/xpgraph";
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
      <XPTimeGraph />
    </div>
  );
}

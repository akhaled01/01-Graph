"use client";

import Loading from "@/components/custom/loading";
import { RootState } from "@/logic/context/redux";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const jwt = useSelector((state: RootState) => state.jwt);
  const router = useRouter();
  useEffect(() => {
    if (!jwt) {
      router.push("/auth");
    }
  }, []);

  const fetcher = createGraphiQLFetcher({
    url: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return jwt ? (
    <div className="h-screen">
      <GraphiQL fetcher={fetcher} />
    </div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <Loading />
    </div>
  );
};

export default Page;

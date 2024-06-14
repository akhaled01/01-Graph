"use client";

import { RootState } from "@/logic/context/redux";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const page = () => {
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

  return (
    <div className="h-screen">
      <GraphiQL fetcher={fetcher} />
    </div>
  );
};

export default page;

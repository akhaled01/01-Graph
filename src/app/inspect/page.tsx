"use client";

import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { getCookie, hasCookie } from "cookies-next";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!hasCookie("JWT_TOKEN")) {
      router.push("/auth");
    }
  }, []);

  const fetcher = createGraphiQLFetcher({
    url: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
    headers: {
      Authorization: `Bearer ${getCookie("JWT_TOKEN")}`,
    },
  });

  return (
    <div className="h-screen">
      <GraphiQL fetcher={fetcher} />
    </div>
  );
};

export default page;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SANS } from "@/styles/fonts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { JWT } from "@/logic/auth/JWT";
import { NetGraph } from "@/components/graphs/netgraph";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const page = () => {
  const [ident, setident] = useState("");
  const [pass, setpass] = useState("");
  const [error, seterror] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        document.getElementById("auth-submit")?.click();
      }
    });
    NetGraph();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        seterror("");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="flex flex-col items-center justify-center gap-4 w-1/2 ml-14">
        {error && (
          <Alert variant="destructive" className="w-3/4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>JWT Auth Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <h1 className={"text-4xl text-white font-extrabold " + SANS.className}>
          01-Graph
        </h1>
        <div className="flex flex-col items-center justify-center gap-5">
          <Input
            type="text"
            placeholder="01 Credential"
            className="text-white w-96"
            value={ident}
            onChange={(e) => {
              setident(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="01 password"
            className="text-white w-96"
            value={pass}
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          <Button
            variant="outline"
            id="auth-submit"
            onClick={async () => {
              JWT(ident, pass).then((error) => {
                if (error) {
                  switch (error) {
                    case "401":
                      seterror("Incorrect credentials used");
                      break;
                    case "500":
                      seterror("Internal server error");
                      break;
                  }
                } else {
                  router.push("/");
                }
              });
            }}
          >
            Login
          </Button>
        </div>
      </div>
      <div
        className="flex items-center justify-center w-full h-full"
        id="welcome_graph"
      ></div>
    </div>
  );
};

export default page;

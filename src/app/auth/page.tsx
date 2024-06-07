"use client";

import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SANS } from "@/styles/fonts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { JWT } from "@/logic/auth/JWT";
import { NetGraph } from "@/components/netgraph";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const page = () => {
  const [ident, setident] = useState("");
  const [pass, setpass] = useState("");
  const [error, seterror] = useState("");

  useEffect(() => {
    NetGraph();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black m-0">
      <div className="flex flex-col items-center justify-center gap-4">
        {error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>JWT Auth Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <h1 className={"text-4xl text-white font-extrabold " + SANS.className}>
          01-Profile
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <Input
            type="text"
            placeholder="username/email"
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
            onClick={async () => {
              const error = await JWT(ident, pass);

              if (error) {
                switch (error) {
                  case "401":
                    seterror("Incorrect credentials used");
                    break;
                  case "500":
                    seterror("Internal server error");
                    break;
                }
              }
            }}
          >
            Login
          </Button>
        </div>
      </div>
      <div
        className="flex items-center justify-start w-1/2 h-full"
        id="welcome_graph"
      ></div>
    </div>
  );
};

export default page;

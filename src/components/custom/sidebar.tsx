"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import profile from "@/assets/profile.svg";
import gqlIcon from "@/assets/graphql.svg";
import logout from "@/assets/logout.svg";
import {
  BasicUserInfo,
  GetBasicUserInfo,
} from "@/logic/graphql/apollo/basicinfo";
import { AppDispatch } from "@/logic/context/redux";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/logic/context/actions";

const Sidebar = () => {
  const [data, setdata] = useState<BasicUserInfo | null>();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    GetBasicUserInfo().then((data) => {
      setdata(data);
    });
  }, []);

  return (
    <div className="w-36 h-screen bg-componentBg flex flex-col justify-around items-center py-4 cursor-pointer">
      <div
        id="profile-btn"
        className="flex flex-col items-center gap-2 px-2 py-2 rounded-lg hover:bg-componentBgLighter duration-500"
      >
        <Image src={profile} alt="profile" width={50} title="Profile" />
        <div id="user-login" className="flex items-end justify-center">
          <p className="text-white">{data?.login}</p>
          <p className="text-white text-sm">#{data?.id}</p>
        </div>
      </div>
      <div
        id="graphiql-entry"
        className="px-2 py-2 rounded-lg hover:bg-componentBgLighter duration-500"
      >
        <Image
          src={gqlIcon}
          width={50}
          alt="graphiql"
          title="Graphiql"
          onClick={() => router.push("/inspect")}
        />
      </div>
      <div
        id="logout-btn"
        className="px-2 py-2 rounded-lg hover:bg-componentBgLighter duration-500"
      >
        <Image
          src={logout}
          width={50}
          alt="logout"
          title="Logout"
          onClick={() => {
            dispatch(clearCredentials());
            router.push("/auth");
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;

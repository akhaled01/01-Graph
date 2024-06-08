"use client";

import {
  BasicUserInfo,
  GetBasicUserInfo,
  GetXP,
  XP,
} from "@/logic/graphql/apollo/basicinfo";
import { FMT_XP } from "@/logic/utils/xp";
import React, { FC, useEffect, useState } from "react";

const ProfileCard: FC = () => {
  const [userInfo, setuserInfo] = useState<BasicUserInfo | null>();
  const [totalXP, settotalXP] = useState<XP | null>();

  useEffect(() => {
    GetBasicUserInfo().then((userInfo) => {
      setuserInfo(userInfo);
    });

    GetXP().then((userxp) => {
      settotalXP(userxp);
    });
  }, []);

  return (
    <div className="bg-white text-black w-full h-44 rounded-b-3xl duration-4000	hover:rounded-b-full hover:h-60 flex items-end justify-around">
      <div className="flex items-end">
        <div className="text-7xl">{userInfo?.login}</div>
        <div className="text-4xl">#{userInfo?.id}</div>
      </div>
      <div className="text-2xl font-bold">XP≈{FMT_XP(totalXP?.xp!)}</div>
    </div>
  );
};

export default ProfileCard;

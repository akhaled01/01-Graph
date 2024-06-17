import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MONO_THIN, SANS, SANS_BOLDER } from "@/styles/fonts";
import { GetLevel, Level } from "@/logic/graphql/apollo/level";
import { GetLogin, GetXP, XP } from "@/logic/graphql/apollo/basicinfo";
import { FMT_XP } from "@/logic/utils/xp";
import {
  GetDetailedUserInfo,
  UserInfo,
} from "@/logic/graphql/apollo/userdetails";

interface IntrinsicDrawer {
  children: ReactNode;
}

const ProfileDrawer: FC<IntrinsicDrawer> = ({ children }: IntrinsicDrawer) => {
  const [login, setlogin] = useState("");
  const [userinfo, setuserinfo] = useState<UserInfo>();
  const [level, setlevel] = useState<Level>();
  const [xp, setxp] = useState<XP>();

  useEffect(() => {
    GetLogin().then((login) => setlogin(login?.login!));
  }, []);

  useEffect(() => {
    if (!login) return;

    GetLevel(login).then((level) => setlevel(level));
    GetXP().then((xp) => setxp(xp!));
    GetDetailedUserInfo().then((userinfo) => setuserinfo(userinfo));
  }, [login]);

  return (
    level &&
    xp && (
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <div className={`text-3xl ${SANS.className}`}>Your Profile</div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="w-full h-[500px] grid grid-cols-3 grid-rows-2 place-items-center">
            <div className="w-3/4 h-44  rounded-lg bg-componentBgLighter flex flex-col items-center justify-center px-2">
              <p
                className={`text-[#323232d3] ${SANS_BOLDER.className} text-[2rem] mt-3`}
              >
                Full Name
              </p>
              <p className={`text-[1.5rem]`}>{userinfo?.FullName}</p>
            </div>
            <div className="w-3/4 h-44  rounded-lg bg-componentBgLighter flex flex-col items-center justify-center px-2">
              <p
                className={`text-[#323232d3] ${SANS_BOLDER.className} text-[2rem] mt-3`}
              >
                Working On
              </p>
              <p className={`text-[2rem] ${MONO_THIN.className}`}>
                {userinfo?.CurrentlyWorkingOn}
              </p>
            </div>
            <div className="w-3/4 h-44  rounded-lg bg-componentBgLighter flex flex-col items-center justify-center px-2">
              <p
                className={`text-[#323232d3] ${SANS_BOLDER.className} text-[2rem] mt-3`}
              >
                Rank
              </p>
              <p className={`text-[2.5rem]`}>{level.Rank}</p>
            </div>
            <div className="w-3/4 h-44  rounded-lg bg-componentBgLighter flex flex-col items-center justify-center px-2">
              <p
                className={`text-[#323232d3] ${SANS_BOLDER.className} text-[2rem] mt-3`}
              >
                Total XP
              </p>
              <p className={`text-[2.5rem]`}>{FMT_XP(xp.xp, 2)}</p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  );
};

export default ProfileDrawer;

import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface pdrawer {
  children: ReactNode;
}

const ProfileDrawer = ({ children }: pdrawer) => {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <div className="text-3xl">Your Profile</div>
          </DrawerTitle>
        </DrawerHeader>
        <div className="w-full h-460"></div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;

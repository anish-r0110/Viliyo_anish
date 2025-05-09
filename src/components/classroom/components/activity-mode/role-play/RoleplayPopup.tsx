import React, { useState } from "react";
import { Avatar, Box, Dialog } from "@radix-ui/themes";

const RoleplayPopup = ({ button }: any) => {
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>{button}</Dialog.Trigger>
        <Dialog.Content style={{ width: 360 }} className="p-0">
          <div className=" font-medium text-black rounded-xl">
            Oops! Some others clicked faster, so your've missed the opportunity
            this time!
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default RoleplayPopup;

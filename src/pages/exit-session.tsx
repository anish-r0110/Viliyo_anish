import React, { useState } from "react"; // Import React and useState

import { AppPage } from "@/layouts/types"; // Import AppPage type
import ExitSession from "@/components/popover/ExitSession"; // Import ExitSession component

import KebabMenuTable from "@/components/popover/KebabMenuTable";
import KebabMenuParticipants from "@/components/popover/KebabMenuParticipants";

const ExitSessionPage: AppPage = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        <div className="flex col-span-1">
          <ExitSession />
        </div>
        <div className="flex col-span-1">
          <KebabMenuTable />
        </div>
        <div className="flex col-span-1">
          <KebabMenuParticipants />
        </div>
      </div>
    </>
  );
};

export default ExitSessionPage;
ExitSessionPage.Layout = "Admin";

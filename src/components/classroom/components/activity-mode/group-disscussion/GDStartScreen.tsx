import React, { useState } from "react";
import Image from "next/image";
import searchWithEye from "../../../../../assets/images/searchWithEye.png";
import { GiRoundTable } from "react-icons/gi";
import CaseStudyStartScreenComponent from "../case-study/CaseStudyStartScreenComponent";

const CaseStudyStartScreen = () => {
  return (
    <div>
      <CaseStudyStartScreenComponent
        image={
          <div className="text-white text-8xl">
            <GiRoundTable />
          </div>
        }
        firstContent="Group Discussion setup in progress..."
        secondContent="Standby... You will shortly commence the discussion in groups"
      />
    </div>
  );
};
export default CaseStudyStartScreen;

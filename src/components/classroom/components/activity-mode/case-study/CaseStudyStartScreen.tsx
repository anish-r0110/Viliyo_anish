import React, { useState } from "react";
import Image from "next/image";
import searchWithEye from "../../../../../assets/images/searchWithEye.png";
import { GiRoundTable } from "react-icons/gi";
import CaseStudyStartScreenComponent from "./CaseStudyStartScreenComponent";

const CaseStudyStartScreen = () => {
  return (
    <div>
      <CaseStudyStartScreenComponent
        image={
          <Image src={searchWithEye} alt="" height={100} width={100}></Image>
        }
        firstContent="Case study setup in progress..."
        secondContent="Standby... You will shortly commence the Case Study & Analysis"
      />
    </div>
  );
};
export default CaseStudyStartScreen;

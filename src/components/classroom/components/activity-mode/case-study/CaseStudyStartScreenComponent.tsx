import React, { ReactNode } from "react";

interface CaseStudy {
  image: ReactNode;
  firstContent: string;
  secondContent: string;
}
const CaseStudyStartScreenComponent = ({
  image,
  firstContent,
  secondContent,
}: CaseStudy) => {
  return (
    <div className="p-6 flex justify-center ">
      <div className="border border-white rounded-xl flex bg-black p-4">
        <div className="text-white text-8xl">{image}</div>

        <div className="p-4 text-white w-80 ">
          <p className="text-xs">{firstContent}</p>
          <p>{secondContent}</p>
        </div>
      </div>
    </div>
  );
};
export default CaseStudyStartScreenComponent;

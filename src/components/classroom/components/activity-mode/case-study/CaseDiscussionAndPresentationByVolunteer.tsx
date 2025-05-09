import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import DiscussionAndPresentationComponent from "./DiscussionAndPresentationComponent";

const CaseDiscussionAndPresentationByVolunteer = () => {
  return (
    <div>
      <DiscussionAndPresentationComponent
        image={<ImSearch />}
        content=" Trainer would like your group to volunteer for group presentations"
        buttonName="Ready to Present"
      />
    </div>
    // <div className="bg-black w-full h-full flex flex-col justify-center items-center">
    //   <div className="relative text-6xl flex justify-center items-center  -bottom-16">
    //     <div className="text-white bg-app-yellow rounded-full p-4 border border-white">
    //       {gDPresentation ? <GiRoundTable /> : <ImSearch />}

    //     </div>
    //   </div>

    //   <div className="text-app-blue relative top-8  left-32 gap-x-2 text-xl ">
    //     <RxCrossCircled />
    //   </div>

    //   <div className="bg-blue-50  w-80 flex space-x-4 p-8 rounded-lg">
    //     <div className="pt-6 flex flex-col justify-center gap-y-2">
    //       {groupPresenting ? (
    //         <p className="text-black text-sm font-medium px-4">
    //           Your group Group Name will present Order of Presentation #1
    //         </p>
    //       ) : trainerAskToPresent ? (
    //         <p className="text-black text-sm font-medium px-4">
    //           Trainer has asked your group to present.
    //         </p>
    //       ) : (
    //         <p className="text-black text-sm font-medium px-4">
    //           Trainer would like your group to volunteer for group presentations
    //         </p>
    //       )}

    //       <div className="flex justify-center ">
    //         <button
    //           className={`text-white text-sm bg-green-600 rounded-2xl py-1 px-4 `}
    //         >
    //           {groupPresenting
    //             ? "Ok"
    //             : trainerAskToPresent
    //             ? "Ok"
    //             : "Ready to Present"}
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default CaseDiscussionAndPresentationByVolunteer;

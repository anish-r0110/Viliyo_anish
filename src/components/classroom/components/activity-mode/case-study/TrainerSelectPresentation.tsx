import React from "react";
import { ImSearch } from "react-icons/im";
import DiscussionAndPresentationComponent from "./DiscussionAndPresentationComponent";

const TrainerSelectPresentation = () => {
  return (
    <div>
      <DiscussionAndPresentationComponent
        image={<ImSearch />}
        content="Trainer has asked your group to present"
        buttonName="Ok"
      />
    </div>
  );
};
export default TrainerSelectPresentation;

import React from "react";
import { ImSearch } from "react-icons/im";
import DiscussionAndPresentationComponent from "./DiscussionAndPresentationComponent";

const SystemSelectPresentation = () => {
  return (
    <div>
      <DiscussionAndPresentationComponent
        image={<ImSearch />}
        content="Your group Group Name will present Order of Presentation #1"
        buttonName="Ok"
      />
    </div>
  );
};
export default SystemSelectPresentation;

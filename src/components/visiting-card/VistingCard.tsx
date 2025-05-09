import { Layout, VisitingCard } from "@/interfaces/VisitingCard";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

interface VisitingCardProps {
  layout: Layout;
  data: VisitingCard;
}

const VisitingCard: React.FC<VisitingCardProps> = ({ layout, data }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flex py-2">
      <div className="card-container">
        <div
          className={`card ${flipped ? "flipped" : ""}`}
          onClick={handleFlip}
        >
          <Transition
            show={!flipped}
            enter="transition duration-300 ease-out transform"
            enterFrom="rotate-y-180 opacity-0"
            enterTo="rotate-y-0 opacity-100"
            leave="transition duration-300 ease-in transform"
            leaveFrom="rotate-y-0 opacity-100"
            leaveTo="rotate-y-180 opacity-0"
          >
            {layout.front(data)}
          </Transition>
          <Transition
            show={flipped}
            enter="transition duration-300 ease-out transform"
            enterFrom="rotate-y-180 opacity-0"
            enterTo="rotate-y-0 opacity-100"
            leave="transition duration-300 ease-in transform"
            leaveFrom="rotate-y-0 opacity-100"
            leaveTo="rotate-y-180 opacity-0"
          >
            {layout.back(data)}
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default VisitingCard;

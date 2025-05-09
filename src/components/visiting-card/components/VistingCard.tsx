import { Layout} from "@/interfaces/VisitingCard";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Button } from '@radix-ui/themes'

interface VisitingCardProps {
  layout: Layout;
  data: User;
}

const VisitingCard: React.FC<VisitingCardProps> = ({ layout, data }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="w-full">
      <div className="card-container w-full">
        <div
          className={`card ${flipped ? "flipped" : ""} relative w-full`}
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
        <Button className="absolute right-2 bottom-8" onClick={handleFlip}>{flipped ? 'Front' :'More About Me'}</Button>
        </div>
      </div>
    </div>
  );
};

export default VisitingCard;
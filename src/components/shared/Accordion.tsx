import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

interface AccordionProps {
  index: number;
  title: string;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ index, title, content }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className="my-4">
      <button
        className="grid grid-cols-10 items-center rounded-lg bg-white text-zinc-600 justify-between  w-full p-3 text-left "
        onClick={toggleAccordion}
      >
        <div className="col-span-9">
          <span className="font-bold">Q.{index}</span>
          <span className="text-app-blue font-bold border-gray-200 p-2">
            {title}
          </span>
        </div>

        {isActive ? (
          <AiOutlineMinusCircle
            className="transition-transform duration-300 transform float-right"
            size={30}
          />
        ) : (
          <AiOutlinePlusCircle size={30} />
        )}
      </button>
      {isActive && (
        <div className="flex space-x-2 text-sm  font-sans italic p-3 bg-[#FFF7E5] text-[#52545A]">
          <span className="font-bold">Ans.</span>
          <p className="text-left" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
};

export default Accordion;

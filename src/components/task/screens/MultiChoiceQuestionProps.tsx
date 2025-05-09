import React, { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Flex, Text } from "@radix-ui/themes";

interface Option {
  answerId: number;
  value: string;
  isAnswer:string
}

interface MultipleChoiceQuestionProps {
  question: string;
  options: Option[];
  updateAnswers: Function;
  questionId: string;
  surveyState: Object;
  isMandatory: boolean;
  index:number;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  updateAnswers,
  questionId,
  isMandatory,
  surveyState,
  index
}) => {

  return (
    <div className="flex flex-col bg-white p-[1%] gap-2">
      <h2 className="block mb-2 text-normal font-bold text-app-gray-medium">
        {question} {isMandatory && <span className="text-red-600">*</span>}
      </h2>
      {options?.map((option) => (
        <div
          key={option.answerId}
          className={
            !Boolean(option.isAnswer)
              ? "p-[1%] border rounded-md shadow-sm"
              : "p-[1%] border rounded-md shadow-sm border-purple-600"
          }
        >
          <label className="flex space-x-2 cursor-pointer">
            <input
              type="checkbox"
              key={option.answerId}
              checked={Boolean(option.isAnswer)}
              onChange={() => updateAnswers(option, index)}
              className="w-4 h-4 my-auto border rounded-md border-purple-600 accent-purple-600 shadow-inner cursor-pointer focus:ring-transparent focus:ring-purple-600"
            />
            <span className="text-base text-gray-700">{option.value}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;

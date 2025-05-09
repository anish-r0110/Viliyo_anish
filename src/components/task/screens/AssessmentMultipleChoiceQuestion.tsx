import React, { useEffect, useState } from "react";

interface Option {
  id: number;
  text: string;
  answerOption?: string;
  rightAnswer: string | Boolean;
  traineeRightAnswer?: string | Boolean;
}

interface MultipleChoiceQuestionProps {
  question: string;
  options: Option[];
  updateAnswers: Function;
  questionId: string;
  dataStoreState: Object;
  isMandatory: boolean;
}

const AssessmentMultipleChoiceQuestion: React.FC<
  MultipleChoiceQuestionProps
> = ({
  question,
  options,
  updateAnswers,
  questionId,
  dataStoreState,
  isMandatory,
}) => {
  const isChecked = (option: any) => {
    let isCheckedValue = false;
    //let traineeRightAnswer = false;
    dataStoreState[questionId]?.answerOptions?.map((item) => {
      if (item.answerOption === option.answerOption)
        isCheckedValue = item.traineeRightAnswer;
    });

    return isCheckedValue;
  };

  return (
    <div className="flex flex-col bg-white p-[1%] gap-2">
      <p className="text-base  mb-4">
        {question}
        {isMandatory && <span className="text-red-500 text-2xl p-1">*</span>}
      </p>

      {options?.map((option, idx) => (
        <div
          key={idx}
          className={
            !isChecked(option)
              ? "p-[1%] border rounded-md shadow-sm"
              : "p-[1%] border rounded-md shadow-sm border-purple-600"
          }
        >
          <label className="flex space-x-2 cursor-pointer">
            <input
              type="checkbox"
              key={option.id}
              checked={isChecked(option)}
              onChange={() => updateAnswers(option, questionId)}
              className="w-4 h-4 my-auto border rounded-md border-purple-600 accent-purple-600 shadow-inner cursor-pointer focus:ring-transparent focus:ring-purple-600"
            />
            <span className="text-base text-gray-700">
              {option.answerOption}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default AssessmentMultipleChoiceQuestion;

import React, { useState } from "react";
import { Text } from "@radix-ui/themes";

interface OpenEndedQuestionProps {
  element: { question: string } & any;
  onAnswerChange: (el: any, answer: string) => void;
  answer: string;
  placeholder?: string;
}

const OpenEndedQuestion = ({
  element,
  onAnswerChange,
  answer,
  placeholder = "Write your response here",
}: OpenEndedQuestionProps) => {
  const [newAnswer, setNewAnswer] = useState(answer);

  const handleAnswerChange = (event: any) => {
    let currentAnswer = event.target.value;
    setNewAnswer(currentAnswer);
    onAnswerChange(element, currentAnswer);
  };

  return (
    <div>
      <div className=" w-full p-2">
        <Text className="text-lg font-bold mb-4 text-app-gray-medium">{element.question}</Text>
        <textarea
          className="w-full p-6  border shadow my-4 border-app-gray bg-white outline-app-blue text-black rounded-2xl"
          placeholder={placeholder}
          value={newAnswer || answer}
          onChange={handleAnswerChange}
        ></textarea>
      </div>
    </div>
  );
};

export default OpenEndedQuestion;

import { Flex, RadioGroup, RadioGroupItem, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface Option {
  answerId: string;
  value: string;
  isAnswer: string | Boolean;
}

interface SingleChoiceQuestionProps {
  onChoice: ( option:Option , index:number ) => void;
  question: string;
  options: Option[];
  isMandatory: boolean;
  index:number;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  question,
  options,
  isMandatory,
  index,
  onChoice,
}) => {

  const [ selectedOption , setSelectedOption ] = useState<Option>()

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option)
    onChoice(option, index);
  };

  return (
    <Flex direction="column" gap="2">
      <Text className="block mb-2 text-normal font-bold text-app-gray-medium" as="label" size="3">
        {question}
        {isMandatory && <span className="text-red-600">*</span>}
      </Text>
      <RadioGroup.Root
        defaultValue={selectedOption?.answerId}
        color="purple"
        variant="classic"
      >
        <Flex direction="column" gap="2">
          {options.map((option) => (
            <Text key={option.answerId} as="label" className="my-auto">
              <Flex
                gap="2"
                className={
                  option.answerId == selectedOption?.answerId || option.isAnswer
                    ? "border-[0.5px] border-purple-600 rounded-xl shadow-lg py-[1.5%] px-[1%]"
                    : "border-[1px] rounded-xl py-[1%] px-[1%] shadow-sm"
                }
              >
                <RadioGroupItem
                  className="my-auto"
                  value={option.answerId}
                  checked={Boolean(option.isAnswer)}
                  onClick={() => handleOptionChange(option)}
                />
                {option.value}
              </Flex>
            </Text>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Flex>
  );
};

export default SingleChoiceQuestion;

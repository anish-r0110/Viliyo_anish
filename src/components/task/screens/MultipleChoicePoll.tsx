import React, { useState } from "react";
import { Flex, Checkbox, Text , Heading } from "@radix-ui/themes";
import { IPollOption } from "@/models/Task";

interface Option {
  id: string;
  answerValue: string;
  isAnswer: boolean;
}

interface MultiChoicePollProps {
  onCheck: (option: IPollOption, index: number) => void;
  question: string;
  index:number;
  options: IPollOption[];
}

const MultiChoicePoll: React.FC<MultiChoicePollProps> = ({
  question,
  options,
  index,
  onCheck,
}) => {

  const handleOnCheck = ( option:IPollOption , index:number ) => {
    onCheck(option, index);
  };

  return (
    <Flex direction="column" gap="5">
       <Heading >
        {question}
      </Heading>
      <Flex direction="column" gap="2">
        {options.map((el) => (
          <Text as="label"  className="border-2 max-w-sm p-3 text-black font-semibold my-2 rounded-lg shadow-sm" key={el.id}>
            <Flex
              gap="2"
              className="space-x-2"
            >
              <Checkbox
                className="my-auto"
                checked={el.isSelected}
                onCheckedChange={() => handleOnCheck(el , index)}
              />
              {el.option}
            </Flex>
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default MultiChoicePoll;

import { Flex, RadioGroup, RadioGroupItem, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface Option {
  answerId: string;
  value: string;
  isAnswer: string | Boolean;
  scale_point:string
}

interface LinearScaleProps {
  onChoice: ( option:Option , index:number ) => void;
  question: string;
  options: Option[];
  isMandatory: boolean;
  index:number;
}

const LinearScale: React.FC<LinearScaleProps> = ({
  question,
  options,
  isMandatory,
  index,
  onChoice,
}) => {

  const [defaultValue, setDefault] = useState<Option | null>();

  const handleOptionChange = ( option:Option ) => {
     setDefault( option );
     onChoice( option , index )
  }

  return (
    <Flex direction="column" gap="2">
      <Text className="block mb-2 text-normal font-bold text-app-gray-medium" as="label" size="3">
        {question}
        {isMandatory && <span className="text-red-600">*</span>}
      </Text>
      <RadioGroup.Root
        defaultValue={defaultValue?.scale_point}
        color="purple"
        variant="classic"
      >
        <Flex direction="column" gap="2">
          {options.map((option) => (
            <Text key={option.answerId} as="label" className="my-auto">
              <Flex
                gap="2"
                className={
                  option.answerId == defaultValue?.scale_point || option.isAnswer
                    ? "border-[0.5px] border-purple-600 rounded-xl shadow-lg py-[1.5%] px-[1%]"
                    : "border-[1px] rounded-xl py-[1%] px-[1%] shadow-sm"
                }
              >
                <RadioGroupItem
                  className="my-auto"
                  value={option.scale_point}
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

export default LinearScale;

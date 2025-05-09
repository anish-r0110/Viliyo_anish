import React, { useEffect, useState } from "react";
import { Flex,  Text , RadioGroup , Heading} from "@radix-ui/themes";
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

const SingleChoicePoll: React.FC<MultiChoicePollProps> = ({
  question,
  options,
  index,
  onCheck,
}) => {

  const [defaultValue ,setDefault] = useState<string>('');

  useEffect(()=>{
     options.forEach( el => {
       if( el.isSelected ){
           setDefault( el.option );
       }
     })
  },[options])

  const handleOnCheck = ( option:IPollOption , index:number ) => {
    setDefault( option.option);
    onCheck(option, index);
  };

  return (
    <Flex direction="column" gap="5">
      <Heading >
        {question}
      </Heading>
      <RadioGroup.Root defaultValue={defaultValue}>
        <Flex gap="2" direction="column">
          {options.map((el) => (
            <Text
              key={el.id}
              className="border-2 max-w-sm p-3 text-black font-semibold my-2 rounded-lg shadow-sm"
              as="label"
              size="2"
            >
              <Flex gap="2" className="space-x-2">
                <RadioGroup.Item
                  value={el.option}
                  onClick={() => handleOnCheck(el ,index)}
                />
                <Text>
                  {el.option}
                </Text>
              </Flex>
            </Text>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Flex>
  );
};

export default SingleChoicePoll;

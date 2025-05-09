import { FeedbackQuestion } from "@/models/Task";
import { Flex, Heading, RadioGroup, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  element: FeedbackQuestion;
  onChange: (answer: string, element: FeedbackQuestion) => void;
}

const ClosedEndedQuestion: React.FC<Props> = ({ element, onChange }) => {
  const options = [
    { value: "1", text: "Yes" },
    { value: "2", text: "No" },
    { value: "3", text: "May be" },
  ];

  return (
    <Flex direction="column" gap="5" justify="center">
      <Heading>{element.question}</Heading>
      <RadioGroup.Root defaultValue={element.answer}>
        <Flex gap="2" direction="column">
          {options.map((option) => (
            <Text
              key={option.value}
              className="border-2 max-w-sm p-3 text-black font-semibold my-2 rounded-lg shadow-sm"
              as="label"
              size="2"
            >
              <Flex gap="2" className="space-x-2">
                <RadioGroup.Item
                  value={option.value}
                  onClick={() => onChange(option.value, element)}
                />
                <Text>{option.text}</Text>
              </Flex>
            </Text>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Flex>
  );
};

export default ClosedEndedQuestion;

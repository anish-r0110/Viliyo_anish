import { FeedbackQuestion } from "@/models/Task";
import { Flex, Heading, RadioGroup, Text } from "@radix-ui/themes";

interface Props {
  element: FeedbackQuestion;
  onChange: (rating: string, element: FeedbackQuestion) => void;
}

const LikelihoodRating = ({ element, onChange }: Props) => {
  const handleRatingChange = (rating: string) => {
    onChange(rating, element);
  };

  const options = [
    { value: "1", text: "Definitely Not" },
    { value: "2", text: "Probably Not" },
    { value: "3", text: "Possibly" },
    { value: "4", text: "Probably" },
    { value: "5", text: "Definitely" },
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
                  onClick={() => handleRatingChange(option.value)}
                />
                <Text>
                  {option.value} - {option.text}
                </Text>
              </Flex>
            </Text>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Flex>
  );
};

export default LikelihoodRating;

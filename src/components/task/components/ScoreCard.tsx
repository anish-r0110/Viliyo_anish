import { Flex, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

interface ScoreCardProps {
  score: number;
  totalScore: number;
  minimumScore: string;
  findingResult: string | ReactNode;
  assessmentType: string | undefined;
}

const ScoreCard = ({
  score,
  totalScore,
  findingResult,
  assessmentType,
  minimumScore,
}: ScoreCardProps) => {
  let findScoreStatus =
    score >= Number(minimumScore) ? "text-green-700" : "text-red-700";
  console.log("findScoreStatus", findScoreStatus);
  return (
    <div className="h-50 w-80 bg-gray-200 py-3 px-16 my-4 mx-4 rounded-3xl  ">
      <Flex className="w-full p-1 px-2">
        <Text className="px-4  text-xl "> Marks Scored </Text>
      </Flex>

      <Flex className="w-full px-4">
        <Text className={`px-4 font-bold text-2xl  ${findScoreStatus} `}>
          {score}
        </Text>
        <div className="font-bold text-2xl py-0.5">/</div>
        <Text className="px-4 font-bold  text-2xl"> {totalScore} </Text>
      </Flex>
      <Flex className="w-full  px-2 flex-col ">
        {assessmentType === "test" && (
          <Text className="text-xl px-8 "> Result </Text>
        )}
        <div>{findingResult}</div>
      </Flex>
    </div>
  );
};

export default ScoreCard;

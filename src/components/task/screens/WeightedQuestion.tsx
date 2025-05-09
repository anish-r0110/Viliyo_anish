import { Flex } from "@radix-ui/themes";
import { useState } from "react";

interface Option {
  answerId: number;
  value: string;
  isAnswer:string;
}

interface RankOrderQuestionProps {
  question: string;
  element:any;
  index:number;
  options: Option[];
  onWeight:( wieght:number , option:Option , index:number ) => void
}

const WeightedQuestion: React.FC<RankOrderQuestionProps> = ({
  element,
  index,
  question,
  options,
  onWeight
}) => {
  const [testState, setTestState]: any = useState({});
  const getSelection = (id: number) => {
    if (testState[id]) return testState[id];
    return "-";
  };

  const calculateTotalWeight = () => {
    let totalWeight = 0;
    Object.values(testState).forEach((weight: number) => {
      totalWeight += weight;
    });
    return totalWeight;
  };

  const updateSelection = (weight: number, option: Option) => {
    let temp = { ...testState };
    Object.keys(temp).map((newKey) => {
      if (temp[newKey] === weight + 1) {
        delete temp[newKey];
      }
    });
    temp[option.answerId] = weight + 1;
    setTestState(temp);
    onWeight( weight , option , index)
  };

  const totalWeight = calculateTotalWeight();

  return (
    <Flex direction="column" gap="3" style={{ maxWidth: 700 }}>
      <label className="block mb-2 text-normal font-bold text-app-gray-medium">
        {question}
        {element.Mandatory && <span className="text-red-600">*</span>}
      </label>

      {options.map((item: Option) => (
        <Flex key={item.id} justify={"between"} gap={"2"}>
          <div className="w-full break-words shadow-sm border rounded-xl px-2 py-2">
            {item.value}
          </div>
          <input
            type="text"
            className="border shadow-sm focus:outline-purple-700 px-1 py-1 rounded-xl w-32"
            onChange={(e) => {
              const weight = parseInt(e.target.value);
              if (!isNaN(weight) && totalWeight + weight <= 100) {
                updateSelection(weight, item);
              } else {
                alert("Total weight must not exceed 100");
              }
            }}
            value={item.isAnswer}
          />
        </Flex>
      ))}
      <div className="flex w-full justify-end">
        <div className="w-32 text-center">
          <label>Total Weight</label>
          <div className=" shadow-sm px-2 py-2 w-32 border rounded-xl bg-gradient-to-br from-purple-950 to-purple-500 text-white">
            {element.totalWeight}
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default WeightedQuestion;

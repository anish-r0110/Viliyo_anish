interface InstructionProps {
  instruction: string;
  type: string;
  onClick: () => void;
  questionCount: number;
  totalMarks: number;
  minimumMarks: number;
}

const InstructionScreen = ({
  instruction,
  onClick,
  type,
  questionCount,
  totalMarks,
  minimumMarks,
}: InstructionProps) => {
  return (
    <div>
      {type === "quiz" && (
        <div className="flex flex-col mx-7 gap-3 ">
          <div className="text-app-blue border-b-[1px] border-[#5F488A] w-[70%] flex justify-between">
            <p>Total Number Of Questions : {questionCount}</p>
          </div>

          <div className="text-sm italic">{instruction}</div>
        </div>
      )}
      {type === "test" && (
        <div className="flex flex-col mx-7 gap-3 ">
          <div className="text-app-blue border-b-[1px] border-[#5F488A] w-[70%] flex justify-between">
            <p>Total Number Of Questions: {questionCount}</p>
            <p>Total Marks: {totalMarks}</p>
          </div>

          <div className="text-sm italic">{instruction}</div>
          <div className="text-sm italic"> Minimum Makrs: {minimumMarks}</div>
        </div>
      )}

      <div className="border-t-2 mt-4 py-6 mx-6">
        <button onClick={onClick} className="btn-primary">
          Start {type}
        </button>
      </div>
    </div>
  );
};

export default InstructionScreen;

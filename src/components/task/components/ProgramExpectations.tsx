import ITask, {
  IProgramExpectations,
  IProgramExpectationActivityData,
} from "@/models/Task";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import OpenEndedQuestion from "../screens/OpenEndedQuestion";
import TaskService from "../../../services/TaskService";
import SaveAsDraftModal from "./SaveAsDraftModal";
import Wizard from "./Wizard";

enum Step {
  Question,
  Result,
}

interface ProgrammeExpectationsProps extends IProgramExpectations {
  task?: ITask;
  activityData: IProgramExpectationActivityData;
}
let initalObject: any = [];
const setInitalObject = (task: any) => {
  task.programExpectation.questions.map((item: any, index:number) => {
    initalObject[index] = { question: item, answer: "" };
  });

  localStorage.setItem("exp", JSON.stringify(initalObject));
};

const handleLsObject = (type: string, object = "") => {
  if (type == "set") localStorage.setItem("exp", JSON.stringify(object));

  if (type == "get") return localStorage.getItem("exp") || "";
};

const ProgrammeExpectations = ({
  task,
  questions,
}: ProgrammeExpectationsProps) => {
  const taskService = new TaskService();
  const router = useRouter();
  const [answers, setAnswers] = useState<any>({});
  const [step, setStep] = useState<Step>(Step.Question);
  const [programExpState, setprogramExpState] = useState([]);

  useEffect(() => {
    setInitalObject(task);
  }, []);

  const updateValue = (questionIndex: any, answers: any) => {
    let lsObject: any = {};

    lsObject = Object.values(JSON.parse(handleLsObject("get") as string));

    lsObject[questionIndex].answer = answers;

    handleLsObject("set", lsObject);
    setprogramExpState(lsObject);
  };

  const handleAnswerChange = (
    element: { question: string; index: number },
    newAnswer: string
  ) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [element.index]: newAnswer,
    }));

    updateValue(element.index, newAnswer);
  };

  let QuestionScreens: ReactNode[] = [];

  questions.map((el, index) =>
    QuestionScreens.push(
      <OpenEndedQuestion
        key={index}
        element={{ question: el, index: index }}
        answer={answers[index] || ""}
        onAnswerChange={handleAnswerChange}
      />
    )
  );

  const handleSubmit = async (task: any, answer: string[]) => {
    task.activityData.activity.questions = answer;
    const res:any = await taskService.submit(task.id, task.activityData.activity);

    if (res.code === 200) {
      setStep(Step.Result);
    }
  };

  return (
    <div>
      <div>
        {Step.Result === step && <div> Thank you !!</div>}
        {Step.Question === step && (
          <div className="px-2 ">Description: {task?.description}</div>
        )}
        {Step.Question === step && (
          <div>
            {
              <Wizard
                heading={"Question"}
                steps={QuestionScreens}
                handleSubmit={() => handleSubmit(task, programExpState)}
              ></Wizard>
            }
          </div>
        )}
      </div>

      <div className="mt-4 py-3 flex space-x-2 mobile:justify-between ">
        {Step.Result === step && (
          <div className="border-t-2 w-full py-4">
            <SaveAsDraftModal
              buttonName="Finish"
              dialogContent="Submitted Successfully"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammeExpectations;

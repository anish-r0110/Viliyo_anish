import ITask, { IPoll, IPollOption } from "@/models/Task";
import TaskService from "@/services/TaskService";
import {
  Button
} from "@radix-ui/themes";
import { produce } from "immer";
import { useRouter } from "next/router";
import React, { ReactNode, useState, useEffect } from "react";
import MultiChoicePoll from "../screens/MultipleChoicePoll";
import SingleChoicePoll from "../screens/SingleChoicePoll";
import { ConfirmSubmitPage } from "./ConfirmSubmitPage";
import axiosInstance from "@/config/axios";
import PollResultBySesId from "./PollResultBySesId";
import { alertInstance } from "@/components/alert";
import Wizard from "./Wizard";


enum Step {
  Poll,
  ConfirmSubmit,
  SubmitSuccess,
  ViewResult,
}

interface PollProps {
  task: ITask;
}

const SubmitSuccessScreen = ({ setStep, shouldDisplayViewResultButton, disabledButton }: { setStep: React.Dispatch<React.SetStateAction<Step>>, shouldDisplayViewResultButton: boolean | undefined, disabledButton: boolean | undefined }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 px-[1.5%]">
      <p>Thank You For Completing the Poll</p>
      <div className="flex flex-row gap-10">
        <Button
          color="purple"
          variant="solid"
          size="3"
          className="w-max"
          onClick={() => router.back()}
        >
          Ok
        </Button>

        {shouldDisplayViewResultButton && (
          <Button
            color="purple"
            variant="solid"
            size="3"
            className="w-max"
            onClick={() => setStep(Step.ViewResult)}
          >
            View Result
          </Button>
        )}

        {disabledButton && (
          <>
          <Button
          color="teal"
          variant="solid"
          size="3"
          className="w-max"
          disabled        
        >
          View Result
        </Button>
        <span className="ml-0">Poll results will be available on Closure Date</span>

          </>
        )}

      </div>
    </div>
  );
};

const PollComponent: React.FC<PollProps> = ({ task }) => {
  
  const [step, setStep] = useState<Step>(Step.Poll);
  const taskService = new TaskService();
  const [polls, setPolls] = useState<IPoll[]>(task.polls);
  const [shouldDisplayViewResultButton, setShouldDisplayViewResultButton] = useState<boolean | undefined>(undefined);
  const [disabledButton, setDisabledButton] = useState<boolean | undefined>(undefined);
  const [activityData, setActivityData] = useState<any>(null);
  const dueDate = task?.dueDate;
  console.log("🚀 ~ dueDate:", dueDate)

  

  const Screens: ReactNode[] = [];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.post("/programme/view_activity_status", { sessionSegmentId: task.id });
      const pollResultSettings = response.data.ActivityData[0]?.pollResultSettings;
      setShouldDisplayViewResultButton(pollResultSettings === 1);
      setDisabledButton((pollResultSettings === 2 && isPollClosed()))
      setActivityData(response.data.ActivityData)
    };

    fetchData();
  }, [task.id, task.dueDate]);

  function isPollClosed() {
    return new Date(dueDate as string) && new Date() > new Date(dueDate as string);
  }
  console.log("disabledButton = "+disabledButton);
  const handleMultichoiceAnswer = (option: IPollOption, index: number): void => {
    setPolls(produce(polls => {
      polls[index].options.map(el => {
        if (el.id === option.id) {
          el.isSelected = !el.isSelected;
        }
      });
    }));
  }

  const handleSinglechoiceAnswer = (option: IPollOption, index: number): void => {
    setPolls(produce(polls => {
      polls[index].options.map(el => {
        el.isSelected = el.id === option.id;
      })
    }));
  }

  polls.forEach((el, index) => {
    if (el.isMultipleChoice) {
      Screens.push(<MultiChoicePoll onCheck={handleMultichoiceAnswer} question={el.question} options={el.options} index={index}></MultiChoicePoll>)
    }
    else {
      Screens.push(<SingleChoicePoll onCheck={handleSinglechoiceAnswer} question={el.question} options={el.options} index={index}></SingleChoicePoll>)
    }
  })

  const handleSubmit = async () => {
    let requestData: [{ ans: any[] }] = [{ ans: [] }];

    polls.forEach(el => {
      let answer = {
        question: el.question,
        id: el.id,
        answer: el.options.map(el => {
          const answer: { id: string, participantsName: string, answerValue: string, isAnswer: boolean } = {
            id: el.id,
            participantsName: "",
            answerValue: el.option,
            isAnswer: el.isSelected,
          }
          return answer;
        }),
        allowMultipleVoting: el.isMultipleChoice,
        keepResponsesAnonymous: el.keepResponsesAnonymous
      }
      requestData[0].ans.push(answer);
      console.log("🚀 ~ file: PollComponent.tsx:169 ~ handleSubmit ~ answer:", answer)
    });

    const res:any = await taskService.submit(task?.id, requestData);
    if (res.code === 200) {
      setStep(Step.SubmitSuccess);
    } else {
      alertInstance.emit("showAlert", {
        type: "error",
        heading: "Something Went Wrong",
        buttonText: "ok",
      });
    }
  };

  return (
    <>
      {step === Step.Poll && (
        <Wizard
          heading={""}
          handleSubmit={() => setStep(Step.ConfirmSubmit)}
          steps={Screens}
        />
      )}

      {step === Step.ConfirmSubmit && (
        <ConfirmSubmitPage
          onSubmit={handleSubmit}
          setStep={setStep}
          prevStep={Step.Poll}
          reviewResponse={false}
        />
      )}
      {step === Step.SubmitSuccess && <SubmitSuccessScreen setStep={setStep} shouldDisplayViewResultButton={shouldDisplayViewResultButton} disabledButton={disabledButton} />}

      {step === Step.ViewResult && <PollResultBySesId sessionSegmentId={task.id} />}
    </>
  );
};

export default PollComponent;

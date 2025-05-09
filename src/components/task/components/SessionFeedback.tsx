import ITask, { FeedbackQuestion, FeedbackType } from "@/models/Task";
import TaskService from "@/services/TaskService";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode, useState } from "react";
import ClosedEndedQuestion from "../screens/CloseEndedQustion";
import OpenEndedQuestion from "../screens/OpenEndedQuestion";
import AgreementRating from "./AgreementRating";
import EmotionRating from "./EmotionRating";
import FrequencyRating from "./FrequencyRating";
import LikelihoodRating from "./LikelihoodRating";
import QualityRating from "./QualityRating";
import StarRating from "@/components/shared/StarRating";
import Wizard from "./Wizard";

enum Step {
  Instruction,
  Question,
  Thankyou,
}

const SessionFeedback = ({ task }: { task: ITask }) => {
  const [step, setStep] = useState<Step>(Step.Instruction);
  const [questions, setQuestions] = useState<FeedbackQuestion[]>(
    task.sessionFeedback.questions
  );

  const handleAnswerChange = (rating: string, element: FeedbackQuestion) => {
    const newState = produce(questions, (draft) => {
      const index = draft.findIndex((item) => item.id === element.id);
      draft[index].answer = rating;
    });
    setQuestions(newState);
  };

  const router = useRouter();

  let Screens: ReactNode[] = [];

  questions.forEach((el) => {
    if (el.type === FeedbackType.Agreement) {
      Screens.push(
        <AgreementRating element={el} onChange={handleAnswerChange} />
      );
    }
    if (el.type === FeedbackType.Frequency) {
      Screens.push(
        <FrequencyRating element={el} onChange={handleAnswerChange} />
      );
    }
    if (el.type === FeedbackType.Quality) {
      Screens.push(
        <QualityRating element={el} onChange={handleAnswerChange} />
      );
    }
    if (el.type === FeedbackType.Likelihood) {
      Screens.push(
        <LikelihoodRating element={el} onChange={handleAnswerChange} />
      );
    }
    if (el.type === FeedbackType.ClosedEnded) {
      Screens.push(
        <ClosedEndedQuestion element={el} onChange={handleAnswerChange} />
      );
    }
    if (el.type === FeedbackType.OpenEnded) {
      Screens.push(
        <OpenEndedQuestion
          element={el}
          onAnswerChange={(el, answer) =>
            handleAnswerChange(answer.toString(), el)
          }
          answer={el.answer || ""}
        />
      );
    }
    if (el.type === FeedbackType.Star) {
      Screens.push(
        <Box className="flex items-start space-y-6 flex-col">
          <Heading>{el.question}</Heading>
          <StarRating
            outOf={5}
            size={40}
            rating={(el.answer && parseInt(el.answer)) || 0}
            onRatingChange={(rating) => handleAnswerChange(rating, el)}
          />
        </Box>
      );
    }
    if (el.type === FeedbackType.EmotionIcon) {
      Screens.push(
        <EmotionRating
          element={el}
          onChange={(emotion) => {
            handleAnswerChange(emotion, el);
          }}
        ></EmotionRating>
      );
    }
  });

  const handleFeedback = async () => {
    const taskService = new TaskService();
    let data = {
      title: task.title,
      description: task.description,
      duration: task.duration,
      submission_date: "",
      question: questions.map((el) => {
        return {
          answerId: el.id,
          value: el.question,
          type: el.type,
          answer: el.answer,
        };
      }),
      share_work: 1,
      share_work_in_days: "",
      activity_submission_date: "",
      rating_scale: "",
      questions: "[]",
    };

    const response = await taskService.submit(task.id, data);
    setStep(Step.Thankyou);
  };

  return (
    <Fragment>
      <Flex direction="column" gap="3">
        {step === Step.Instruction && (
          <Box>
            <Text className="font-bold text-app-blue mb-2">
              Total number of questions: {questions.length}
            </Text>
            <div className="border-b-2 border-app-blue mb-2"></div>
            <Text className="block font-medium italic">Instruction:</Text>
            <Text>{task.description}</Text>
          </Box>
        )}
        {step === Step.Question && (
          <Box>
            <Wizard
              heading={"Questions"}
              steps={Screens}
              handleSubmit={handleFeedback}
            ></Wizard>
          </Box>
        )}

        {step === Step.Thankyou && (
          <Box>
            <Text>Thank you for attending the Feedback</Text>
          </Box>
        )}

        <Box className="border-t-2 mt-4 py-3 flex space-x-2 mobile:justify-between">
          {step === Step.Instruction && (
            <button
              className="btn-primary  bg-gradient-to-r from-app-blue  to-app-purple"
              onClick={() => setStep(Step.Question)}
            >
              {"Start " + task.type}
            </button>
          )}
          {/* {step === Step.Question && (
            <Button onClick={handleFeedback}>Done</Button>
          )} */}
          {step === Step.Thankyou && (
            <Button onClick={router.back}>Finish</Button>
          )}
        </Box>
      </Flex>
    </Fragment>
  );
};

export default SessionFeedback;

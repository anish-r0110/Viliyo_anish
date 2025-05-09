
import useUnsavedChanges from "@/hooks/useUnsaved";
import ITask, {
  AssignmentQuestion,
  IAssignment,
  IMedia,
  MediaType,
} from "@/models/Task";
import { Box, Flex, Text } from "@radix-ui/themes";
import { produce } from "immer";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import AudioScreen from "../screens/Audio";
import DocumentScreen from "../screens/Document";
import MediaLink from "../screens/MediaLink";
import OpenEndedQuestion from "../screens/OpenEndedQuestion";
import VideoScreen from "../screens/Video";
import TaskService from "@/services/TaskService";
import Wizard from "./Wizard";

enum Step {
  Instruction,
  Media,
  Question,
  Confirmation,
  Result,
}

interface IAssignmentProps extends IAssignment {
  task?: ITask;
}



const Assignment = ({ medias, questions, task }: IAssignmentProps) => {
  
  const [elements, setQuestions] = useState<AssignmentQuestion[]>(questions);
  const [step, setStep] = useState<Step>(Step.Instruction);
  const [ isSaved , setSave ] = useState<boolean>( false )
  const { isDialogOpen, DialogComponent } = useUnsavedChanges( !isSaved , { onConfirm:handleSaveDraft , onCancel:() => { router.back() }  });
  const router = useRouter();
  const taskService = new TaskService() 

async function  handleSaveDraft(){
    if( task){
      await taskService.saveAsDraft( task.id , elements );
      router.back();
    }
}


  let MediaScreens: ReactNode[] = [];
  let QuestionScreens: ReactNode[] = [];

  const handleAnswerChange = (element: any, newAnswer: string) => {
    setQuestions(
      produce((draft) => {
        draft[element.index].answer = newAnswer;
      })
    );
  };

  const handleSubmit = () => {
    if( task ){
        taskService.submit( task.id, elements );
        setSave( true );
        setStep(Step.Result);
    }
  }

  if (medias && medias.length > 0) {
    medias?.forEach((el: IMedia) => {
      if (el.type === MediaType.Document)
        MediaScreens.push(
          <DocumentScreen documentUrl={el.url}></DocumentScreen>
        );
      if (el.type === MediaType.Audio)
        MediaScreens.push(<AudioScreen audioSource={el.url}></AudioScreen>);
      if (el.type === MediaType.Video)
        MediaScreens.push(<VideoScreen videoSource={el.url}></VideoScreen>);
      if (el.type === MediaType.Link)
        MediaScreens.push(<MediaLink href={el.url}></MediaLink>);
    });
  }

  elements.forEach((el, index) =>
    QuestionScreens.push(
      <Box>
        <OpenEndedQuestion
          key={index}
          element={{ ...el, question: el.question, index: index }}
          answer={el.answer}
          onAnswerChange={(element, newAnswer) =>
            handleAnswerChange(element, newAnswer)
          }
        />
      </Box>
    )
  );

  return (
    <div>
      <div>
      { isDialogOpen && DialogComponent}
        {Step.Instruction === step && (
          <Box>
            <Text className="text-app-blue font-semibold">
              Total Number of questions: {questions.length}
            </Text>
            <div className="border-b-[1px] border-app-blue mb-2"></div>
            <div>
              <span className="block">Instructions:</span>
              <span>{task?.description}</span>
            </div>
          </Box>
        )}

        {Step.Confirmation === step && <Box>
            <Text>Are you sure you want to submit your responses? </Text>
            <div className="border-b my-5"></div>
            <Flex gap="5" >
            <button onClick={handleSubmit} className="btn-primary">Yes</button>
            <button onClick={()=> setStep(Step.Question)} className="btn-primary">No, Review Responses</button>
            </Flex>
          </Box>}
        {Step.Result === step && <div> Thank you !!</div>}

        {Step.Media === step && medias && medias.length > 0 && (
          <div>
            {
              <Wizard
                heading={"Media"}
                steps={MediaScreens}
                finishButtonText="Next"
                handleSubmit={() => setStep(Step.Question)}
              ></Wizard>
            }
          </div>
        )}
        {Step.Question === step && (
          <div>
            {
              <Wizard
                heading={"Question"}
                steps={QuestionScreens}
                handleSubmit={() => setStep(Step.Confirmation)}
              ></Wizard>
            }
          </div>
        )}
      </div>
      <div className="border-t-2 mt-4 py-3 flex space-x-2 mobile:justify-between ">
        {Step.Instruction === step && (
          <button
            onClick={() => {
              medias && medias.length > 0
                ? setStep(Step.Media)
                : setStep(Step.Question);
            }}
            className="btn-primary"
          >
            Start Assignment
          </button>
        )}

        {Step.Result === step && (
          <button onClick={router.back} className="btn-primary">
            Finish
          </button>
        )}

        
      </div>
    </div>
  );
};

export default Assignment;

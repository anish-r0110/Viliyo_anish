import { Box, Text } from "@radix-ui/themes";
import { produce } from "immer";
import { useState } from "react";
import Button from "../../buttons/Button";
import MultipleChoiceQuestion from "../screens/MultiChoiceQuestionProps";
import SingleChoiceQuestion from "../screens/SingleChoiceQuestion";
import { ConfirmSubmitPage } from "./ConfirmSubmitPage";
import Wizard from "./Wizard";


enum Step {
  Instruction,
  Assessment,
  ConfirmSubmit,
  Result,
  MandatoryRemaining,
}






const Quiz = ({ task }:{ task:any} ) => {

  const [questions, setQuestions] = useState<any>(task.assessment.questions.assessmentDetails.questionDetails);
  const [step, setStep] = useState<Step>(Step.Instruction);
  

  const handleSingleChoice = (option: any, index: number) => {
    setQuestions( produce( (questions:any) => {
        questions[index].answer = questions[index].answerOptions.map( (el:any , index:number ) => {
          if( index == option.answerId ){
            el.isAnswer = true;
          } else el.isAnswer = false;
          return el
        })
    }))
 };

 const updateMultiChoiceValue = ( option:any , index: number ) => {
  setQuestions( produce( (questions:any) => { 
       questions[index].answer = questions[index].answerOptions.map( (el:any , index:number ) => {
           if( index == option.answerId ){
             el.isAnswer = !el.isAnswer
           } 
           return el
       })
  }));
};






  

  

  return (
    <div>
     {step == Step.Instruction && (
         <Box>
         <Text className="font-bold text-app-blue mb-2">
           Total number of questions: {questions.length}
         </Text>
         <div className="border-b-2 border-app-blue mb-2"></div>
         <Text className="block font-medium italic">Instruction:</Text>
         <Text>{task.description}</Text>
          <Box className="mt-4">
             <button className="btn-primary" onClick={() => { setStep(Step.Assessment) }}>Start Quiz</button>
          </Box>
       </Box>
      )}

      {step === Step.Assessment && (
        <Wizard
          handleSubmit={() => setStep(Step.ConfirmSubmit)}
          // handleSubmit={() => handleSubmit(task, assessmentState)}
          heading={""}
          steps={questions.map(
            (item:any, index:number) => {
              if (item.questionType.toLowerCase() === "single choice")
                return (
                  <SingleChoiceQuestion
                  key = { index}
                  onChoice = {handleSingleChoice}
                  question = { item.question}
                  options = {item.answerOptions.map((el:any , key:number ) => ({ answerId: key , value: el.answerOption , isAnswer:el.isAnswer || false , isRightAnswer:el.rightAnswer }))}
                  isMandatory={false}
                  index={index}
                  />
                );
              if (item.questionType.toLowerCase() === "multiple choice")
                return (
                  <MultipleChoiceQuestion
                  key={index}
                  question={item.question}
                  options={item.answerOptions.map((el:any , key:number ) => ({ answerId: key , value: el.answerOption , isAnswer:el.isAnswer || false , isRightAnswer:el.rightAnswer }))}
                  index={index}
                  updateAnswers={updateMultiChoiceValue}
                  isMandatory={item.Mandatory}
                  questionId={item.id}
                  surveyState={task}
                />
                );
            }
          )}
        ></Wizard>
      )}

      {step === Step.ConfirmSubmit && (
        <ConfirmSubmitPage
          onSubmit={() => {  setStep(  Step.Result ) }}
          setStep={setStep}
          prevStep={Step.Assessment}
        />
      )}

      {Step.Result === step && (
        <div className="mx-4">
          {" "}
          Thankyou for completing the {task.assessmentType}
        </div>
      )}

      {step === Step.MandatoryRemaining && (
        <div className="flex flex-col gap-5 px-[1.5%]">
          <p>
            You have missed to respond to mandatory question/s. please go back
            and respond to all mandatory question to complete this Assessment.
          </p>
          <Button
            styles="border-2  border-app-blue outline-none py-2 w-32 bg-gradient-to-br from-purple-900  to-purple-500 text-white"
            onClick={() => setStep(Step.Assessment)}
          >
            Ok
          </Button>
        </div>
      )}

      {Step.Result === step && (
        <>
           Score
         
        </>
      )}
    </div>
  );
};

export default Quiz;

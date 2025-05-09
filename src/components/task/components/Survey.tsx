import ITask from "@/models/Task";
import TaskService from "@/services/TaskService";
import { Box, Button, Text } from "@radix-ui/themes";
import { produce } from "immer";
import { useState } from "react";
import DropDownQuestion from "../screens/DropDownQuestion";
import MinMaxRating from "../screens/MinMaxRating";
import MultipleChoiceQuestion from "../screens/MultiChoiceQuestionProps";
import RankOrderQuestion from "../screens/RankOrderQuestion";
import SingleChoiceQuestion from "../screens/SingleChoiceQuestion";
import SubjectiveQuestion from "../screens/SubjectiveQuestion";
import WeightedQuestion from "../screens/WeightedQuestion";
import { ConfirmSubmitPage } from "./ConfirmSubmitPage";
import IconRating from "./IconRating";
import { SubmitSuccessScreen } from "./SubmitSuccessPage";
import LinearScale from "../screens/LinearScale";
import { alertInstance } from "@/components/alert";
import Wizard from "./Wizard";


enum Step {
  Instruction,
  Survey,
  ConfirmSubmit,
  SubmitSuccess,
  MandatoryRemaining,
}

interface SurveyProps {
  task: ITask;
}



const Survey = ({ task }: SurveyProps) => {
 
  const [questions, setQuestions] = useState<any>(task.survey.questions);
  const [step, setStep] = useState<Step>(Step.Instruction);
  const taskService = new TaskService();


  const handleSingleChoice = (option: any, index: number) => {
      setQuestions( produce( (questions:any) => {
          questions[index].answer = questions[index].answer.map( (el:any) => {
            if( el.answerId == option.answerId ){
              el.isAnswer = true;
            } else el.isAnswer = false;
            return el
          })
      }))
  };

  const handleLinearScale = (option: any, index: number) => {
    setQuestions( produce( (questions:any) => {
       questions[index].answer =  questions[index].answer.map( (el:any) => {
            if(option.answerId === el.answerId ){
               el.isAnswer = true;
            }else el.isAnswer = false;
            return el
       })
    }))
  }; 

  const updateMultiChoiceValue = ( option:any , index: number ) => {
     setQuestions( produce( (questions:any) => { 
          questions[index].answer = questions[index].answer.map( (el:any) => {
              if( el.answerId == option.answerId ){
                el.isAnswer = !el.isAnswer
              } 
              return el
          })
     }));
  };

  
  const handleSubjectiveAnswer = ( answer:string , index:number) => {
      setQuestions( produce( (questions:any) => { 
         questions[index].answer[0].value = answer
      }));
  }

  const handleRankOrder = ( options:any , index:any  ) => {
    setQuestions( produce( (questions:any) => { 
      questions[index].answer = options
    }));
  }

  const handleWeight = ( weight:number , option:any , index:number) => {
    setQuestions( produce( (questions:any) => { 
      questions[index].answer = questions[index].answer.map( (el:any) => {
          if( el.answerId == option.answerId ){
            el.isAnswer = weight
          } 
          return el
      })
     }));
  }

  const handleScale = ( option:any , scale:string , index:number ) => { 
    setQuestions( produce( (questions:any) => { 
      questions[index].answer = questions[index].answer.map( (el:any) => {
          if( el.answerId == option.answerId ){
            el.isAnswer = scale
          } 
          return el
      })
     }));
  }

  const handleSelect =  (option: any, index: number) => {
    setQuestions( produce( (questions:any) => {
       questions[index].answer =  questions[index].answer.map( (el:any) => {
            if(option === el.value ){
               el.isAnswer = true;
            }else el.isAnswer = false;
            return el
       })
    }))
  };

  const handleRating = ( rating:string , index:number ) => {
    setQuestions( produce( (questions:any) => {
        questions[index].answer[0].value = rating
    }))
  }

  const validateTest = () => {
    let checkMandatoryQuestions = [];
    questions.map((item: any) => {
      if (item.Mandatory && !item.answer.some((item:any) => item.isAnswer === true))
        checkMandatoryQuestions.push(item.id);
    });
    return checkMandatoryQuestions.length ? false : true;
  };

  const handleSubmit = async (taskId = task?.id) => {
    if (!validateTest()) {
      setStep(Step.MandatoryRemaining);
    } else {
      const data = { ans: [...Object.values(questions)] };
      const res:any = await taskService.submit(taskId, data);
      if (res.code === 200) {
        setStep(Step.SubmitSuccess);
      } else {
        alertInstance.emit("showAlert", {
          type: "error",
          heading: "Something Went Wrong",
          buttonText: "ok",
        });
      }
    }
  };



  return (
    <>
      {step == Step.Instruction && (
         <Box>
         <Text className="font-bold text-app-blue mb-2">
           Total number of questions: {questions.length}
         </Text>
         <div className="border-b-2 border-app-blue mb-2"></div>
         <Text className="block font-medium italic">Instruction:</Text>
         <Text>{task.description}</Text>
          <Box className="mt-4">
             <button className="btn-primary" onClick={() => { setStep(Step.Survey) }}>Start Survey</button>
          </Box>
       </Box>
      )}

      {step === Step.Survey && (
        <Wizard
          heading={""}
          handleSubmit={() => setStep(Step.ConfirmSubmit)}
          steps={questions.map((item: any , index:number) => {    
            if (item.questionType === 1)
              return (
                <SingleChoiceQuestion
                  key={index}
                  question={item.question}
                  options={item.answer}
                  index={index}
                  isMandatory={item.Mandatory}
                  onChoice={handleSingleChoice}
                />
              );
            if (item.questionType === 2)
              return (
                <MultipleChoiceQuestion
                  key={index}
                  question={item.question}
                  options={item.answer}
                  index={index}
                  updateAnswers={updateMultiChoiceValue}
                  isMandatory={item.Mandatory}
                  questionId={item.id}
                  surveyState={task}
                />
              );
            if( item.questionType === 3 ){
                return ( <SubjectiveQuestion key={item.id} index={index} question={item.question} item={item} onAnswer={handleSubjectiveAnswer}  defaultAnswer={( item && item.answer && item.answer[0].value )? item.answer[0].value : ''}/>)
            }
            if (item.questionType === 4)
            return (
              <RankOrderQuestion
                key={item.id}
                element={item}
                question={item.question}
                options={ item.answer}
                elementIndex={index}
                onRank={handleRankOrder}
                numberOfOptiontoRank={item.rankingOption}
              />
            );
            if( item.questionType === 5 )
             return (
                  <LinearScale
                    key={index}
                    question={item.question}
                    options={item.answer}
                    index={index}
                    isMandatory={item.Mandatory}
                    onChoice={handleLinearScale}
                  />
              )
            if (item.questionType === 6)
                return(
                  <WeightedQuestion
                      key={index}
                      element={item}
                      index={index}
                      question={item.question}
                      options={item.answer}
                      onWeight={handleWeight}
                  />
                );
           

            if( item.questionType === 7)
                return <MinMaxRating  key={index} wantOptionRating={item.MinMaxscale.toLowerCase() === 'Min-Max-scale-for-each'.toLowerCase()} index={index} onScale={handleScale} element={item} />;
            if( item.questionType === 8)
            return (
              <DropDownQuestion
                key={item.id}
                element={item}
                index={index}
                onSelect={handleSelect}
              />
            );
            if( item.questionType === 9)
            return (
              <div key={item.id}>
                <label className="block mb-2 text-normal font-bold text-app-gray-medium">
                 { item.question}
                 {item.Mandatory && <span className="text-red-600">*</span>}
                </label>
                <Box className="flex flex-col w-[500px] mt-4 mobile:w-full shadow-md border-[1.5px] py-6 border-purple-700 rounded-lg ">
                  <IconRating rating={item.answer[0].value} shapeType={item.Shape} onRatingChange={(rating) =>  handleRating( rating ,index)}  outOf={5} />
                </Box>
              </div>
            );
          })}
        ></Wizard>
      )}

      {step === Step.ConfirmSubmit && (
        <ConfirmSubmitPage
          onSubmit={handleSubmit}
          setStep={setStep}
          prevStep={Step.Survey}
        />
      )}

      {step === Step.SubmitSuccess && <SubmitSuccessScreen />}
      {step === Step.MandatoryRemaining && (
        <div className="flex flex-col gap-5 px-[1.5%]">
          <p>
            You have missed to respond to mandatory question/s. please go back
            and respond to all mandatory question to complete this survey.
          </p>
          <Button
            color="purple"
            variant="solid"
            size="3"
            className="w-20"
            onClick={() => setStep(Step.Survey)}
          >
            Ok
          </Button>
        </div>
      )}
      {/* {Step.Result === step && <SubmitConfirmationModal />} */}
    </>
  );
};

export default Survey;

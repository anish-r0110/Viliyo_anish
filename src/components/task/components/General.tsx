
import TaskService from "@/services/TaskService";
import { Box, Button, Text } from "@radix-ui/themes";
import { produce } from "immer";
import { useState } from "react";
import LinearScale from "../screens/LinearScale";
import MinMaxRating from "../screens/MinMaxRating";
import MultipleChoiceQuestion from "../screens/MultiChoiceQuestionProps";
import RankOrderQuestion from "../screens/RankOrderQuestion";
import SingleChoiceQuestion from "../screens/SingleChoiceQuestion";
import SubjectiveQuestion from "../screens/SubjectiveQuestion";
import WeightedQuestion from "../screens/WeightedQuestion";
import { ConfirmSubmitPage } from "./ConfirmSubmitPage";
import { SubmitSuccessScreen } from "./SubmitSuccessPage";
import Wizard from "./Wizard";
import { alertInstance } from "@/components/alert";


enum Step {
    Instruction,
    Survey,
    ConfirmSubmit,
    SubmitSuccess,
    MandatoryRemaining,
  }

const GeneralAssessment  = ({task}:{task:any} ) => {
    const [questions, setQuestions] = useState<any>(task.assessment.questions.assessmentDetails.questionDetails);
    const [step, setStep] = useState<Step>(Step.Instruction);
    const taskService = new TaskService();
  
  
    const handleSingleChoice = (option: any, index: number) => {
     
        setQuestions( produce( (questions:any) => {
            questions[index].answer = questions[index].answerOptions.map( (el:any) => {
              if( el.answerOption == option.value ){
                el.rightAnswer = true;
              } else el.rightAnswer = false;
              return el
            })
        }))
    };
  
    const handleLinearScale = (option: any, index: number) => {
      setQuestions( produce( (questions:any) => {
         questions[index].answerOptions =  questions[index].answerOptions.map( (el:any) => {
          if(option.scale_point === el.scalePoint ){
                 el.isAnswer = true;
              }else el.isAnswer = false;
              return el
         })
      }))
    }; 
  
    const updateMultiChoiceValue = ( option:any , index: number ) => {
       setQuestions( produce( (questions:any) => { 
            questions[index].answer = questions[index].answerOptions.map( (el:any) => {
                if( el.answerOption == option.value ){
                  el.isAnswer = !el.isAnswer
                } 
                return el
            })
       }));
    };
  
    
    const handleSubjectiveAnswer = ( answer:string , index:number) => {
        setQuestions( produce( (questions:any) => { 
           questions[index].answerOptions[0].value = answer
        }));
    }
  
    const handleRankOrder = ( options:any , index:any  ) => {
      setQuestions( produce( (questions:any) => { 
        questions[index].answerOptions = options
      }));
    }
  
    const handleWeight = ( weight:number , option:any , index:number) => {
      setQuestions( produce( (questions:any) => { 
        questions[index].answerOptions = questions[index].answerOptions.map( (el:any) => {
            if( el.answerOption == option.value ){
              el.isAnswer = weight
            } 
            return el
        })
       }));
    }
  
    const handleScale = ( option:any , scale:string , index:number ) => { 
      console.log( option)
      setQuestions( produce( (questions:any) => { 
        questions[index].answerOptions = questions[index].answerOptions.map( (el:any) => {
          if( el.answerOption == option.value){
              el.isAnswer = scale
            } 
            return el
        })
       }));
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
               <button className="btn-primary" onClick={() => { setStep(Step.Survey) }}>Start General Assessment</button>
            </Box>
         </Box>
        )}
  
        {step === Step.Survey && (
          <Wizard
            heading={""}
            handleSubmit={() => setStep(Step.ConfirmSubmit)}
            steps={questions.map((item: any , index:number) => {         
              if (item.questionType === "Single Choice")
                return (
                  <SingleChoiceQuestion
                    key={index}
                    question={item.question}
                    options={item.answerOptions.map(( el:any , index:number) => ({
                         answerId:index ,
                         value:el.answerOption ,
                         isAnswer:el.rightAnswer
                    }))}
                    index={index}
                    isMandatory={item.Mandatory}
                    onChoice={handleSingleChoice}
                  />
                );
              if (item.questionType === "Multiple Choice")
                return (
                  <MultipleChoiceQuestion 
                    key={index}
                    question={item.question}
                    options={item.answerOptions.map(( el:any , index:number) => ({
                        answerId:index ,
                        value:el.answerOption ,
                        isAnswer:el.isAnswer
                   }))}
                    index={index}
                    updateAnswers={updateMultiChoiceValue}
                    isMandatory={item.Mandatory}
                    questionId={item.id}
                    surveyState={task}
                  />
                );
              if( item.questionType === "Subjective" ){
                  return ( <SubjectiveQuestion key={item.id} index={index} question={item.question} item={item} defaultAnswer={ (item.answerOptions && item.answerOptions[0] && item.answerOptions[0].value )? item.answerOptions[0].value:'' } onAnswer={handleSubjectiveAnswer} />)
              }
              if (item.questionType === "RankOrder")
              return (
                <RankOrderQuestion
                  key={index}
                  element={item}
                  question={item.question}
                  options={ item.answerOptions.map((el:any ,index:number) => {
                    if( el.answerOption ){
                        return {
                            answerId: index,
                            value: el.answerOption,
                            isAnswer:'',
                            rank:0  
                        }
                    }
                    else return el
                  })}
                  elementIndex={index}
                  onRank={handleRankOrder}
                  numberOfOptiontoRank={parseInt(item.noOfRankTop)}
                />
              );
              if( item.questionType === "LinearScale" )
               return (
                    <LinearScale
                      key={index}
                      question={item.question}
                      options={item.answerOptions.map(( el:any , index:number)=>{
                       return { 
                        answerId: index.toString(),
                        value: el.scaleDescriptor,
                        isAnswer:  el.isAnswer,
                        scale_point:el.scalePoint  }
                      })}
                      index={index}
                      isMandatory={item.Mandatory}
                      onChoice={handleLinearScale}
                    />
                )
              if (item.questionType === "Weighted")
                  return(
                    <WeightedQuestion
                        key={index}
                        element={item}
                        index={index}
                        question={item.question}
                        options={item.answerOptions.map((el:any , index:number)=>{
                            return {
                                answerId: index ,
                                value: el.answerOption,
                                isAnswer:(el.isAnswer)? el.isAnswer:''
                            }
                            
                        })}
                        onWeight={handleWeight}
                    />
                  );
             
  
              if( item.questionType ==="MinMax")
                  return <MinMaxRating key={index} wantOptionRating={!(item.typeOfMinMax.toLowerCase() === "minMaxQuestion".toLocaleLowerCase())} index={index} onScale={handleScale} element={item} />;
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
  
        {step === Step.SubmitSuccess && <SubmitSuccessScreen message="Thank you for completing the assessment" />}
        {step === Step.MandatoryRemaining && (
          <div className="flex flex-col gap-5 px-[1.5%]">
            <p>
              You have missed to respond to mandatory question/s. please go back
              and respond to all mandatory question to complete this assessment.
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
}

export default GeneralAssessment;
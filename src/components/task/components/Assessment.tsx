import GeneralAssessment from "./General";
import Quiz from "./Quiz";
import Test from "./Test";



enum AssesmentType {
  Quiz = "quiz",
  Test = "test",
  GeneralAssessment = "general",
}


interface AssesmentProps {
  task: any;
}

const Assessment = ({ task }: AssesmentProps) => {

  if( AssesmentType.Test == task.assessmentType ){
    return ( <Test task={task} ></Test> )
  }
  else if( AssesmentType.Quiz == task.assessmentType){
    return  (<Quiz task={task}></Quiz>)
  }
  else if( AssesmentType.GeneralAssessment == task.assessmentType){
    return ( <GeneralAssessment task={task}></GeneralAssessment> )
  }

};

export default Assessment;


import TaskCard from "../components/TaskCard";
import ITask, { TaskType } from "@/models/Task";
import SelfStudy from "../components/SelfStudy";

import Assignment from "../components/Assignment";
import Assessment from "../components/Assessment";
import Survey from "../components/Survey";
import ProgrammeExpectations from "../components/ProgramExpectations";
import SessionFeedback from "../components/SessionFeedback";
import PollComponent from "../components/PollComponent";
import UnderLineTitle from "@/components/shared/UnderlineTitle";

interface ITaskProps {
  task: ITask;
}

const TaskScreen = ({ task }: ITaskProps) => {
  return (
    <div className="bg-app-purple-100 w-full">
      {!!!task && <span> Loading Task ....</span>}
      {task && (
        <>
          <UnderLineTitle title={task?.title || "Heading"}></UnderLineTitle>
          <TaskCard controls={false} task={task}>
            {task.type === TaskType.SelfStudy && (
              <SelfStudy task={task}></SelfStudy>
            )}
            {task.type === TaskType.Poll && (<PollComponent task={task} />)}
            {task.type === TaskType.Assignment && (
              <Assignment
                task={task}
                medias={task.assignment.medias}
                questions={task.assignment.questions}
              />
            )}
            {task.type === TaskType.Survey && <Survey task={task} />}

            {task.type === TaskType.Assessment && <Assessment task={task} />}
            {task.type === TaskType.ProgramExpectaion && (
              <ProgrammeExpectations
                task={task}
                questions={task.programExpectation.questions}
              />
            )}
            {task.type === TaskType.SessionFeedback && (
              <SessionFeedback task={task} />
            )}
          </TaskCard>
        </>
      )}
    </div>
  );
};

export default TaskScreen;

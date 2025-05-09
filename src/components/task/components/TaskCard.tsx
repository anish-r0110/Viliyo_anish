import ITask from "@/models/Task";
import formatDateToDefault from "@/utils/formatDate";
import { ReactNode } from "react";
import { Text } from "@radix-ui/themes";

interface ICardProps {
  children: ReactNode;
  task: ITask;
  controls: boolean;
}

const TaskCard = ({ children, task }: ICardProps) => {
  return (
    <div className="flex flex-col my-10">
      <div className="h-12 bg-black p-4 rounded-t-lg"> </div>
      <div className="bg-white p-5">
        <div className="my-5 flex space-x-10 mobile:space-x-0 mobile:flex-col mobile:space-y-2">
          <Text className="text-app-blue mx-5 mobile:mx-1 font-bold">
            Duration : {task.duration} mins
          </Text>
          <Text className="text-gray-500 font-bold mx-5 mobile:mx-1">
            Closure Date: {formatDateToDefault(task.dueDate)}
          </Text>
        </div>
        <div> {children} </div>
      </div>
    </div>
  );
};

export default TaskCard;

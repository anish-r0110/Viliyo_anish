"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Box } from "@radix-ui/themes";
import { TaskItem } from "../task/components/TaskItem";
import Image from "next/image";
import taskIcon from '@/assets/images/task-icon.png'
import TaskService from "@/services/TaskService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getPendingTasks } from "@/store/reducers/tasks";


const PendingTaskPanel = () => {
  const { pendingTasks } = useSelector(( state:RootState) => state.tasks ) 
  const dispatch =  useDispatch<AppDispatch>()

  useEffect(() => {
      dispatch(getPendingTasks());
  }, []);

  if (pendingTasks.length <= 0)
    return (
      <div className="flex flex-col">
        <div className="flex justify-between mb-1 text-app-gray-medium">
          <span className="font-bold text-sm">Pending Tasks({pendingTasks.length})</span>
          <span className="">
            <Link className="flex mr-2 text-sm font-normal" href="/task-list">
              View all
            </Link>
          </span>
        </div>
        <Box className="flex bg-white rounded-2xl p-10 text-center flex-col gap-1 justify-stretch ">
              <div className="flex justify-center mb-10">
                <Image src={taskIcon} alt="Task Icon Image"></Image>
              </div> 
             
              <div className="flex flex-col justify-center items-center text-sm">
                Your tasks are all in one place, so you can complete them with one click!
              </div>
        </Box>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-app-gray-medium">
        <span className="font-semibold">Pending Tasks({pendingTasks.length})</span>
        <span className="">
          <Link className="flex mr-2" href="task-list">
            View all
          </Link>
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {pendingTasks &&
          pendingTasks
          .map((task) => <TaskItem key={task.id} task={task}></TaskItem>)
          .slice(0, 3)
          }
      </div>
    </div>
  );
};

export default PendingTaskPanel;

"use client";
import ITask, { TaskType } from "@/models/Task";
import Link from "next/link";
import { useState } from "react";
import { TaskItemMenu } from "@/components/task/components/ITaskItemMenu";

export const TaskItem = ({ task }: { task: ITask }) => {
  const { id, type, title, session, isRead, category } = task;

  const [isUnread, setUnread] = useState(!isRead);

  const backgroundColor = isUnread ? "bg-[#FEEEC6]" : "bg-[#F0F0F0]";

  return (
    <div
      className={`${backgroundColor} hover:bg-gradient-to-r  hover:from-app-blue hover:to-app-purple hover:text-white  hover:cursor-pointer relative w-full h-24 p-4 rounded-2xl`}
    >
      <div className="text-[12px] justify-items-stretch">
        <b>
          {category == "pre"
            ? "Pre-Work"
            : category == "post"
            ? "Post-Work"
            : "Reminder"}
          :
        </b>
        {type}
        <br />
        <b>Title:</b>
        {type === TaskType.Profile ? "Complete Your Profile" : title}
        <br />
        <b>Session:</b>
        {session?.name}
        <br />
        <Link
          className=" underline font-bold text-[12px]"
          href={type === TaskType.Profile ? "/profile" : `/task/${id}`}
        >
          {`Complete ${type}`}
        </Link>
      </div>
      <TaskItemMenu onUnread={() => setUnread(!isUnread)} setRead={isUnread} />
    </div>
  );
};

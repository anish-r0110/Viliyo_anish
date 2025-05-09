"use client";
import Session from "@/models/Session";
import { SessionInformation } from "./SessionInformation";
import EngagementCard from "./EngagementCard";
import ParticipationOverviewCard from "./ParticipationOverviewCard";
import Task from "./Task";
import Icon from "../../assets/icons";

import calculateDurationInMinutes from "../../utils/durationInMinutes";
import { useRouter } from "next/router";
import TaskService from "@/services/TaskService";
import { useEffect, useState } from "react";
import Link from "next/link";

import Image from "next/image";
import ITask from "@/models/Task";
import transformToTask from "@/middlewares/transform/task";
import { Text } from "@radix-ui/themes";

import formatDateToDefault from "@/utils/formatDate";
import { Loader } from "../shared";

interface ISessionTabProps {
  session: Session;
}

const TaskItem = ({ task }: { task: ITask }) => {

  console.log("task = " , task)

  return (
      <div className="flex flex-row mobile:flex-col items-start p-3 border-2 bg-white rounded-2xl mt-1 text-xs font-semibold">
        <div className="flex-1">
          <h3 className="text-gray-600 font-normal">
            Title: {task.title}
          </h3>
        </div>
        <div className="flex-1">
          <span className="text-start">Due By: </span>
          {formatDateToDefault(task.dueDate)}
        </div>
        <div className="flex flex-1 items-end justify-end mobile:ml-auto">
          <Link href={`../task/${task.id}`} className="flex items-end">
          
            <p className="text-purple-900 font-bold underline">
              Complete {task.type}
            </p>
            <Image
              className="mobile:hidden ml-14 mr-2"
              src={Icon.next}
              alt="Next"
              width={14}
              height={14}
            />
          </Link>
        </div>
      </div>
  );
};

const TaskList = ({ tasks }: { tasks: ITask[] }) => {
  for (let key in tasks) {
  let value = tasks[key];
  console.log("Key Value pair = " + key, value);
}

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  );
};

const SessionTab = ({ session }: ISessionTabProps) => {
  const router = useRouter();
  const [tabData, setTabData] = useState();

  useEffect(() => {
    const { programId } = router.query;
    const taskService = new TaskService();

    if (session.id)
      taskService
        .searchTask(Number(programId), session.id)
        .then((result: any) => {
          let preTasks = result.pre.map((el: any) => transformToTask(el));
          let postTasks = result.post.map((el: any) => transformToTask(el));

          let tabs: any = {};

          tabs["Pre Work ( " + result.pre.length +" )"] = [
            {
              id: 1,
              TabContent: <TaskList tasks={preTasks} />,
            },
          ];
          tabs["Post Work ( " + result.post.length +" )"] = [
            {
              id: 1,
              TabContent: <TaskList tasks={postTasks} />,
            },
          ];
          setTabData(tabs);
        });
  }, [session.id]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col w-3/4 mobile:w-full mobile:p-2 items-stretch justify-between">
          <div className="grid grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-1 justify-between items-baseline justify-items-center  gap-4 font-bold w-full">
            {/* Session block starts */}
            <div className="flex flex-col mobile:mt-2 flex-1 w-full flex-grow">
              <Text className="text-app-gray-medium">Session</Text>
              <SessionInformation
                title={session.name}
                status={session.status || "Not Applicable"}
                dateTime={`${formatDateToDefault(session?.date)} ${
                  session.startTime
                }-${session.endTime}`}
                //dateTime={formatDateToDefault(session?.date)} {...session?.startTime}  {session.endTime}
                duration={calculateDurationInMinutes(
                  session.startTime,
                  session.endTime
                )}
                trainerName={session.trainer?.fullName || "Not Applicable"}
              />
            </div>
            {/* Session block Ends here */}

            {/* Engagement block starts */}
            <div className="flex flex-col flex-grow w-full">
              <Text className="text-gray-500">Engagement</Text>
              <EngagementCard
                myEngagementScore={0}
                batchEngagementScore={0}
                myRating={0}
                groupRating={0}
              />
            </div>
            {/* Engagement block Ends */}

            {/* Participation Overview block starts */}
            <div className="flex flex-col flex-1 w-full">
              <Text className="text-app-gray-medium">
                Participation Overview
              </Text>
              <ParticipationOverviewCard sessionId={session.id} />
            </div>
            {/* Participation Overview block ends */}

            {/* Discarded by hiding  */}
            {/* Session Plan block starts */}
            {/* <div className="w-[240px] mobile:flex mobile:flex-col mobile:w-full tablet:flex tablet:flex-col">
              {session.segments && (
                <>
                  <Text className="font-bold font-sans text-gray-500">
                    Session Plan
                  </Text>
                  <SessionPlan session={session} />
                </>
              )}
            </div> */}
            {/* Session Plan block ends here this div will be hidden for Mobile */}
          </div>
        </div>
        <div className="flex mt-10 tablet:mt-24 mobile:mb-20 mobile:p-1 col-span-3 flex-col flex-grow justify-items-start tablet:order-2 mobile:order-3 mobile:mt-28 ">
              {!!tabData ? (
                <Task tasks={tabData} />
              ) : (
                <div className="">
                  <Loader size={40} />
                </div>
              )}
        </div>
        <div className="hidden ml-2 h-screen mobile:hidden tablet:hidden">
          {/* Session Plan block starts */}
          {/* <div className="flex flex-col mobile:hidden tablet:hidden">
            {session.segments && (
              <>
                <Text className="font-bold font-sans text-gray-500">
                  Session Plan
                </Text>
                <SessionPlan session={session} />
              </>
            )}
          </div> */}
          {/* Session Plan block ends here this div will be hidden for Mobile */}
        </div>
      </div>
    </>
  );
};

export default SessionTab;

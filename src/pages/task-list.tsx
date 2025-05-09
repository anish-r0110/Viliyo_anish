import { AppPage } from "@/layouts/types";
import Link from "next/link";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ITask from "@/models/Task";
import { useEffect, useState } from "react";
import formatDateToDefault from "@/utils/formatDate";
import TaskService from "@/services/TaskService";
import { ITabs, Tabs } from "@/components/tabs";
import { BackNavigation } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getAllTasks } from "@/store/reducers/tasks";

const Screen = ({ data }: { data: ITask[] }) => {
  const [tasksx, setTasks] = useState<ITask[]>([]);
  const [sortByDueDate, setSortByDueDate] = useState<"asc" | "desc">("asc");
  const { tasks } =  useSelector(( state:RootState) => state.tasks)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // setTasks(data);
    dispatch( getAllTasks() );
  }, []);

  // Function to sort tasks by due date
  const sortTasksByDueDate = () => {
    const sortedTasks = [...tasks]; // Create a copy of the tasks array

    if (sortByDueDate === "asc") {
      sortedTasks.sort((a, b) => {
        const dueDateA = a.dueDate ? new Date( a.dueDate).getTime() : 0;
        const dueDateB = b.dueDate ? new Date( b.dueDate).getTime() : 0;
        return dueDateA - dueDateB;
      });
    } else {
      sortedTasks.sort((a, b) => {
        const dueDateA = a.dueDate ? new Date( a.dueDate).getTime()  : 0;
        const dueDateB = b.dueDate ? new Date( b.dueDate).getTime()  : 0;
        return dueDateB - dueDateA;
      });
    }

    setTasks(sortedTasks);
  };

  console.log("taskss", tasks);

  return (
    <>
      <div className="flex tablet:hidden mobile:hidden">
        <table className="min-w-full font-normal text-app-gray-medium text-xs table-fixed">
          <thead>
            <tr className="text-left justify-between gap-2">
              <th className="w-1"></th>
              <th className="w-32 px-4">Title</th>
              <th className="w-20 px-4">Task Category</th>
              <th className="w-16 px-4">Task Type</th>
              <th className="w-16 px-4">Session</th>
              <th className="w-16 px-4">Programme</th>
              <th className="w-32 px-4">
                <p
                  className="justify-items-center flex items-center cursor-pointer whitespace-nowrap"
                  onClick={() => {
                    setSortByDueDate(sortByDueDate === "asc" ? "desc" : "asc");
                    sortTasksByDueDate();
                  }}
                >
                  Due Date
                  <span className="text-zinc-500 ml-1 font-extrabold text-[24px]">
                    {sortByDueDate === "asc" ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </span>
                </p>
              </th>
              <th className="w-4"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((el) => (
              <tr
                className="h-14 text-xs hover:bg-app-purple shadow-sm rounded divide-y-8 divide-app-purple-100 mb-5"
                key={el.id + Math.random() * 1000}
              >
                <td className="w-1"></td>
                <td className="w-32 px-4 bg-white font-bold whitespace-normal">
                  {el.title}
                </td>
                <td className="w-20 px-4 bg-white whitespace-normal">
                  {el.category === "pre"
                    ? "Pre-Work"
                    : el.category === "post"
                    ? "Post-Work"
                    : "Other"}
                </td>
                <td className="w-16 px-4 bg-white whitespace-normal">
                  {el.type === "Assessment"
                    ? el.type + "-" + el.assessmentType
                    : el.type}
                </td>
                <td className="w-16 px-4 bg-white whitespace-normal">
                  {el?.session?.name}
                </td>
                <td className="w-32 px-4 bg-white max-w-sm whitespace-normal">
                  <div className="max-w-md truncate">
                    {el?.description}
                  </div>
                </td>
                <td className="w-32 px-4 bg-white whitespace-normal">
                  {formatDateToDefault( new Date(el.dueDate as string)?.toDateString())}
                </td>
                <td className="w-4 px-4 bg-white font-bold underline whitespace-normal">
                  {el.isPending ? (
                    <Link href={`task/${el.id}`}>
                      {"Complete " + el.type}
                    </Link>
                  ) : (
                    'Completed'
                  )}
                </td>
                <td className="w-4 rounded-r-2xl font-bold text-purple-900 bg-white">
                  <MdOutlineArrowForwardIos />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hidden mobile:grid mobile:grid-cols-1 tablet:grid tablet:grid-cols-2 justify-between text-app-gray-medium gap-4">
        {tasks.map((el) => (
          <div
            className="bg-white shadow-md rounded-md p-4 grid grid-cols-2 gap-4"
            key={el.id}
          >
            <div className="col-span-2">
              <div className="col-span-2">
                <h2 className="font-bold">{el.title}</h2>
              </div>
              <div className="flex flex-row justify-stretch">
                <span className="font-semibold w-1/2">Task Type</span>
                <span className="w-1/2">
                  :&nbsp;
                  {el.category === "pre"
                    ? "Pre-Work"
                    : el.category === "post"
                    ? "Post-Work"
                    : "Other"}
                </span>
              </div>
  
              <div className="flex flex-row justify-between">
                <span className="font-semibold w-1/2">Session</span>
                <span className="w-1/2">:&nbsp;{el?.session?.name}</span>
              </div>
  
              <div className="flex flex-row justify-between">
                <span className="font-semibold w-1/2">Programme</span>
                <span className="w-1/2 overflow-x-hidden truncate">
                  :&nbsp;{el?.description}
                </span>
              </div>
  
              <div className="flex flex-row justify-between">
                <span className="font-semibold w-1/2">Due Date</span>
                <span className="w-1/2">
                  :&nbsp;{formatDateToDefault( new Date(el.dueDate as string)?.toDateString())}
                </span>
              </div>
  
              <div className="flex flex-row items-center justify-end text-sm font-semibold mt-1">
                <Link
                  href={`task/${el.id}`}
                  className={`underline ${
                    el.isPending ? "text-purple-900" : "text-green-400"
                  }`}
                >
                  {el.isPending ? el.redo ? 'Re-do' + el.type : 'Complete' : "Completed"}
                </Link>
                <MdOutlineArrowForwardIos />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
};

const TaskListPage: AppPage = () => {

  const taskService = new TaskService()
  const [tabData, setTabData] = useState<ITabs | null>(null);

  useEffect(() => {
    taskService.getAllTasks().then((tasks) => {
      let data: ITabs = {
        Pending: [
          {
            id: 2,
            TabContent: (
              <Screen data={tasks.filter((el) => el.isPending)}></Screen>
            ),
          },
        ],
        Completed: [
          {
            id: 3,
            TabContent: (
              <Screen data={tasks.filter((el) => !el.isPending)}></Screen>
            ),
          },
        ],
      };
      setTabData(data);
    });
  }, []);

  return (
    <div className="h-full">
      <BackNavigation title="Task List" />
      {!tabData && (
        <div className="h-full animate-bounce w-full flex text-xl justify-center items-center">
          Please wait while fetching your task list .....
        </div>
      )}
      {tabData && <Tabs data={tabData}></Tabs>}
    </div>
  );
};

export default TaskListPage;
TaskListPage.Layout = "Admin";

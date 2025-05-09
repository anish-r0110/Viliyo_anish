
import { BackNavigation } from "@/components/shared";
import TaskScreen from "@/components/task/screens/TaskScreen";
import { AppPage } from "@/layouts/types";
import { AppDispatch, RootState } from "@/store";
import { getTask, resetSelectTask } from "@/store/reducers/tasks";
import { useRouter } from "next/router";
import React, { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";


const TaskPage: AppPage = () => {
  const router = useRouter();
  const { selectedTask } = useSelector(( state:RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const { taskId } = router.query

  useEffect(() => {
    if( !taskId ) return
    dispatch(getTask( taskId as string))
    return () => { dispatch( resetSelectTask()) }
  }, [taskId]);

  return (
    <div className="h-full max-w-6xl">
      <BackNavigation title={selectedTask?.type || " Task Detail"} />
      {selectedTask && <TaskScreen task={selectedTask} />}
    </div>
  );
};

export default TaskPage;

TaskPage.Layout = "Admin";

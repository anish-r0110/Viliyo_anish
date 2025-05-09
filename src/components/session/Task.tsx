import { useState } from "react";
import Tabs from "../tabs/Tabs";

export const Task = ({ tasks }: { tasks: any }) => {
  const [workCategories] = useState(tasks);

  return (
    <div className="w-full">
      <Tabs data={workCategories}></Tabs>
    </div>
  );
};

export default Task;

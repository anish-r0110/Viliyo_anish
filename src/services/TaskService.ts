import axiosInstance from "@/config/axios";
import transformToTask from "@/middlewares/transform/task";
import ITask from "@/models/Task";

export default class TaskService {
  async getAllTasks(): Promise<ITask[]> {
    const url = "trainee/all_tasks"; // Replace with your API endpoint 

    try {
      const response:any = await axiosInstance.get(url);        
      const tasks:ITask[] = response?.response?.data?.map((el: any) => transformToTask(el));
      return tasks
    } catch (error) {
      return [];
    }
  }

  async getTask(taskId: string): Promise<ITask> {

    console.log( 'Task Id is' , taskId );

    const data = { id: taskId };

    const url = "trainee/get_pre_post_activity"; // Replace with your API endpoint

    try {
      const pendingTask: any = await axiosInstance.post(url, data);
      const task: ITask = transformToTask(pendingTask?.data);
      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async searchTask(programId: number, sessionId: number) {
    const response = await axiosInstance.post("trainee/trainee_pre_post", {
      programId,
      sessionId,
    });
    return response.data;
  }

  getCompletedTasks(): Promise<ITask[]> {
    throw new Error("Method not implemented.");
  }
  public markTaskAsCompleted(taskId: number): void {
    throw new Error("Method not implemented.");
  }
  
  public markTaskAsIncomplete(taskId: number): void {
    throw new Error("Method not implemented.");
  }

  public deleteTask(taskId: number): void {
    throw new Error("Method not implemented.");
  }

  async submit(taskId: number, answers: any = []) {
    const response = await axiosInstance.post(
      "trainee/trainee_completed_tasks",
      {
        session_segment_id: String(taskId),
        answers: JSON.stringify(answers),
        status: 1,
      }
    );

    return response;
  }

  async getAnsDraft(taskId: number) {
    const response = await axiosInstance.post("trainee/get_answer_draft", {
      id: taskId,
    });
    return response;
  }

  async saveAsDraft(taskId: number, answers: any = []) {
    const response = await axiosInstance.post("trainee/save_answer_draft", {
      session_segment_id: String(taskId),
      answers: JSON.stringify(answers),
      status: 0,
    });
    return response;
  }

  async getPendingTasks(): Promise<ITask[]> {
    const url = "trainee/pending_tasks"; // Replace with your API endpoint

    try {
      const pendingTask: any = await axiosInstance.get(url);
      const tasks: ITask[] = pendingTask?.response?.data?.map((el: any) =>
        transformToTask(el)
      );
      return tasks;
    } catch (error) {
      console.log( error );
      return [];
    }
  }
}

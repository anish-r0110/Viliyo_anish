import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axios';
import transformToTask from '@/middlewares/transform/task';
import ITask from '@/models/Task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getAllTasks = createAsyncThunk<ITask[], void>(
  'tasks/getAllTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosInstance.get('trainee/all_tasks');        
      const tasks: ITask[] = response.response?.data?.map((el: any) => transformToTask(el));
      return tasks;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTask = createAsyncThunk<ITask, string>(
  'tasks/getTask',
  async (taskId, { rejectWithValue }) => {
    const data = { id: taskId };

    try {
      const response: any = await axiosInstance.post('trainee/get_pre_post_activity', data);
      const task: ITask = transformToTask(response?.data);
      return task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchTask = createAsyncThunk<any, { programId: number; sessionId: number }>(
  'tasks/searchTask',
  async ({ programId, sessionId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('trainee/trainee_pre_post', {
        programId,
        sessionId,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPendingTasks = createAsyncThunk<ITask[], void>(
  'tasks/getPendingTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosInstance.get('trainee/pending_tasks');
      const tasks: ITask[] = response.response?.data?.map((el: any) => transformToTask(el));
      return tasks;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);





interface TaskState {
  tasks: ITask[];
  pendingTasks: ITask[];
  selectedTask: ITask | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  pendingTasks: [],
  selectedTask: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
     resetSelectTask :( state ) => {
       state.selectedTask = null;
     }
  },
  extraReducers: (builder) => {
    builder
      // getAllTasks
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getTask
      .addCase(getTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })
      .addCase(getTask.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // searchTask
      .addCase(searchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTask.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
      })
      .addCase(searchTask.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getPendingTasks
      .addCase(getPendingTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.loading = false;
        state.pendingTasks = action.payload;
      })
      .addCase(getPendingTasks.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { resetSelectTask } = taskSlice.actions
export default taskSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axios'; 
import transformProgram from '@/middlewares/transform/program'; 
import IProgram from '@/models/Program'; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getLatestPrograms = createAsyncThunk<IProgram[], void>(
  'programs/getLatestPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosInstance.post('trainee/program_list', { latestOnly: true });
      const programs: IProgram[] = response.data.map((el: any) => transformProgram(el.program));
      return programs;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllPrograms = createAsyncThunk<IProgram[], void>(
  'programs/getAllPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosInstance.post('trainee/program_list');
      const programs: IProgram[] = response.data.map((el: any) => transformProgram(el.program));
      return programs;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

interface ProgramDetailParams {
    id: string;
}

export const getProgramDetail = createAsyncThunk<IProgram, ProgramDetailParams>(
  'programs/getProgramDetail',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response: any = await axiosInstance.post('trainee/program_details', { id });
      return transformProgram(response.data );
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCompletedPrograms = createAsyncThunk<IProgram[], void>(
  'programs/getCompletedPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosInstance.post('trainee/program_list', { latestOnly: false });
      let programs: IProgram[] = response.data.map((el: any) => transformProgram(el.program));
      programs = programs.filter((el: IProgram) => el.status?.toLowerCase() === 'completed');
      return programs;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




interface ProgramState {
  latestPrograms: IProgram[];
  allPrograms: IProgram[];
  currentProgram: IProgram | null;
  completedPrograms: IProgram[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgramState = {
  latestPrograms: [],
  allPrograms: [],
  currentProgram: null,
  completedPrograms: [],
  loading: false,
  error: null,
};

const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
     resetCurrentProgram: (state) => {
        state.currentProgram = null;
     }
  },
  extraReducers: (builder) => {
    builder
      // getLatestPrograms
      .addCase(getLatestPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLatestPrograms.fulfilled, (state, action: PayloadAction<IProgram[]>) => {
        state.loading = false;
        state.latestPrograms = action.payload;
      })
      .addCase(getLatestPrograms.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getAllPrograms
      .addCase(getAllPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPrograms.fulfilled, (state, action: PayloadAction<IProgram[]>) => {
        state.loading = false;
        state.allPrograms = action.payload;
      })
      .addCase(getAllPrograms.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getProgramDetail
      .addCase(getProgramDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgramDetail.fulfilled, (state, action: PayloadAction<IProgram>) => {
        state.loading = false;
        state.currentProgram = action.payload;
      })
      .addCase(getProgramDetail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getCompletedPrograms
      .addCase(getCompletedPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompletedPrograms.fulfilled, (state, action: PayloadAction<IProgram[]>) => {
        state.loading = false;
        state.completedPrograms = action.payload;
      })
      .addCase(getCompletedPrograms.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCurrentProgram } = programSlice.actions
export default programSlice.reducer;

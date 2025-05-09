import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/config/axios"; 

export interface INoteData {
  title: string;
  content: string;
};


export interface ITraineeNote {
  id: number;
  traineeId: number;
  notes: INoteData;
  created_at: string;
  sessionSegment: {
    session: {
      program: {
        program_name: string;
      };
      session_name: string;
    };
    batchId: string;
  };
};


interface NotepadState {
  currentNote: INoteData | null;
  activeScreen: number;
  getTraineeNotes: ITraineeNote[];
  id: number | null;
}

export const getNotes = createAsyncThunk(
  "notepad/getNotes",
  async (sessionId:number) => {
    const response = await axiosInstance.post("/trainee/get_trainee_notes",{sessionId});
    return response.data;
  }
);


export const saveNotes = createAsyncThunk(
  "notepad/saveNotes",
  async ({ noteData, id }:{noteData : INoteData, id:number}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/trainee/create_trainee_notes", {
        notes: JSON.stringify(noteData),
        sessionSegmentId: 2764, // Replace with actual sessionSegmentId
        ...(id && { id }),
        
      }

    ) 
    return response
        ;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteNotes = createAsyncThunk<void, number>(
  "notepad/deleteNotes",
  async (noteId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/trainee/delete_trainee_notes/${noteId}`);
    } catch (error) {
      return rejectWithValue(error);
    }
    return;
  }
);

const initialState: NotepadState = {
  currentNote: null,
  activeScreen: 1,
  getTraineeNotes: [],
  id: null,
};

export const notepadSlice = createSlice({
  name: "notepad",
  initialState,
  reducers: {
    // Synchronous actions
    setActiveScreen: (state, action: PayloadAction<number>) => {
      state.activeScreen = action.payload;
    },
    setCurrentNote: (state, action: PayloadAction<INoteData | null>) => {
      state.currentNote = action.payload;
    },
    setId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (state, action) => {
        state.getTraineeNotes = action.payload;
      })
      .addCase(saveNotes.fulfilled, (state, action) => {
        console.log("Action logged here = ",action)
        // state.activeScreen = 1;
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.getTraineeNotes = state.getTraineeNotes.filter(
          (note) => note.id !== action.meta.arg
        );
      });
  },
});

export const { setActiveScreen, setCurrentNote, setId } = notepadSlice.actions;

export default notepadSlice.reducer;
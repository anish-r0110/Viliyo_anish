import axiosInstance from '@/config/axios';
import Video from '@/interfaces/Video';
import transformTutorial from '@/middlewares/transform/tutorial';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  videos: Video[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  videos: [],
  isLoading: false,
  error: null,
};



export const fetchTutorials = createAsyncThunk("video/fetch", async () => {
  try {
    const response: any = await axiosInstance.get("/support/get_viliyo_tutorials");
    let tutorials = response.data.allTutorials.map( (el:any) => transformTutorial( el ) )
    return tutorials;
  } catch (err) {
    throw err;
  }
});


const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    getVideoById(state, action: PayloadAction<number>) {
      const videoId = action.payload;
      const foundVideo = state.videos.find((video) => video.id === videoId);

      if (foundVideo) {
        // Update state with the found video
        state.videos = [foundVideo];
        state.isLoading = false;
        state.error = null;
      } else {
        // Handle video not found case
        state.videos = [];
        state.isLoading = false;
        state.error = 'Video not found';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTutorials.fulfilled,
        (state, action: PayloadAction<Video[]>) => {
          state.isLoading = false;
          state.videos = action.payload;
        }
      )
      .addCase(fetchTutorials.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  getVideoById,
} = videoSlice.actions;

export default videoSlice.reducer;

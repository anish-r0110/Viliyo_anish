import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import IEvent from '@/models/Event';
import axiosInstance from '@/config/axios';
import transformEvent from '@/middlewares/transform/event';

interface EventsState {
  items: IEvent[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchUpcomingEvents = createAsyncThunk('events/fetchUpcomingEvents', async ( ) => {
  try {
    
      const currentDate = new Date();
      const formatDate = (date:Date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day =  String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
      }

          // Get the first date of the current year
      let firstDateOfCurrentYear = new Date();
      firstDateOfCurrentYear.setMonth( currentDate.getMonth() -6 );


      // Get the last date of the previous year
      let lastDateOfPreviousYear =  new Date();
      lastDateOfPreviousYear.setMonth( currentDate.getMonth() + 6 )

      const response:any = await axiosInstance.post('/trainee/search_by_date' ,{
        session_start_date: formatDate(firstDateOfCurrentYear),
        session_end_date: formatDate(lastDateOfPreviousYear),
      });

      const events:IEvent[] = response.response.data.map( (el:any) => transformEvent(el) );

      return events
  } catch (error) {
    throw error
  }
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // Your other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});


export const selectEvents = (state: RootState) => state.events.items;
export const selectIsLoading = (state: RootState) => state.events.isLoading;
export const selectError = (state: RootState) => state.events.error;

export default eventsSlice.reducer;

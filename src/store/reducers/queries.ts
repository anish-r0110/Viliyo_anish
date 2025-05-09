import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axios';
import transformQuery from '@/middlewares/transform/query';
import IQuery, { IComment } from '@/interfaces/Query';


export interface QueriesState {
  items: IQuery[];
  selectedQuery: IQuery | null;
  loading: boolean;
  error: string | null;
}


export const initialState: QueriesState = {
  items: [],
  selectedQuery: null,
  loading: false,
  error: null,
};


export const fetchQueries = createAsyncThunk(
  'queries/fetchQueries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/trainer/list_queries', {});
      const queries = response.data.ListQuery.map((el: any) => transformQuery(el));
      return queries 
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error fetching queries');
    }
  }
);

export const fetchQueryById = createAsyncThunk(
  'queries/fetchQueryById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/trainer/list_queries_id', { id });
      const query = transformQuery(response.data.ListQueryId[0]);
      console.log( query);
      return query;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error fetching query');
    }
  }
);

export const postComment = createAsyncThunk(
  'queries/postComment',
  async (
    { reply, queryId, replyBy, replierIcon }: { reply: string; queryId: string; replyBy: string; replierIcon: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/trainee/reply_on_others_queries', {
        query: queryId,
        reply: reply,
        reply_by: replyBy,
        replier_Icon: replierIcon,
      });
      console.log( response );
      // const comments = response.data.ReplyQuery.map((el: any) => transformComment(el));
      return { queryID: queryId  }
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error posting comment');
    }
  }
);

const queriesSlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
      resetSelectQuery:( state ) => {
         state.selectedQuery = null;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQueries.fulfilled, (state, action: PayloadAction<IQuery[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchQueries.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQueryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQueryById.fulfilled, (state, action: PayloadAction<IQuery>) => {
        state.loading = false;
        state.selectedQuery = action.payload;
      })
      .addCase(fetchQueryById.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.loading = false;
        // state.comments = action.payload;
      })
      .addCase(postComment.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {resetSelectQuery } = queriesSlice.actions
export default queriesSlice.reducer;
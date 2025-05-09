import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '@/models';
import { transformResponseMessage } from '@/middlewares/transform/chat';


export const createChat = createAsyncThunk(
  'chat/createChat',
  async (payloadObject: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('session/create_chat', payloadObject);
      return response.data;
    } catch ( error:any ) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getChatsUsingRoomId = createAsyncThunk(
  'chat/getChatsUsingRoomId',
  async ({ room_id, session_map_id  }: { room_id: number; session_map_id: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('session/read_chat', {
        room_id,
        session_map_id
      });
      const chats:IMessage[] = response.data.map((el:any) => transformResponseMessage(el));
      return chats

    } catch ( error:any ) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTraineeChats = createAsyncThunk(
  'chat/getTraineeChats',
  async ({ traineeId, session_map_id}:{ traineeId:string , session_map_id:number } , { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post('session/get_chat_user_trainee', {
        traineeId,
        session_map_id
      });

      return response.data ;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




interface IThread {
  id:string ,
  messages: IMessage[]
}


interface ChatState {
  messages: IMessage[];
  threads: IThread[]
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  threads:[],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
     addChat:( state , action:PayloadAction<IMessage>)=> {
        state.messages.push( action.payload );
     }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action: PayloadAction<IMessage>) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getChatsUsingRoomId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatsUsingRoomId.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getChatsUsingRoomId.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTraineeChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTraineeChats.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.traineeChats = action.payload;
      })
      .addCase(getTraineeChats.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addChat } = chatSlice.actions
export default chatSlice.reducer;

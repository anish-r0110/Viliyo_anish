// livestreamSettingsSlice.ts
import Mode from "@/components/classroom/model/Mode";
import SeatingStyle from "@/components/classroom/model/SeatingStyle";
import axiosInstance from "@/config/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ro } from "date-fns/locale";


// Interface for the data which is to be stored in store for livestream settings page.

interface ISegment {
  [key:string]:any;
}

interface ISession {
  [key:string]:any
  mapID:string;
  startDate:string;
  segments:ISegment[];
  endDate:string;
  startTime:string,
  endTime:string
}

interface IParticipant {
  [key:string]:any
}

interface IBatch {
  [key:string]:any
}

interface ITrainer {
  [key:string]:any
}

export interface LiveStreamSettingsState {
  roomId?:string;
  error:string | null;
  isLoading:boolean
  mode: Mode;
  seatingStyle: SeatingStyle;
  session:ISession | null;
  trainer:ITrainer | null;
  batch:IBatch | null;
  video: boolean;
  audio: boolean;
  onSpeaker: boolean;
  badgesPanel:boolean;
  isMicAccessGranted:boolean;
  isCameraAccessGranted:boolean;
  isScreenPresented:boolean
  leftPanel: string | null;
  closeEntry: boolean;
  muteParticipants: boolean;
  allowSharingScreen: boolean;
  onlineParticipants: number;
  recordingOptions: {
    recordSession: boolean;
    recordGroupInteraction: boolean;
  };
}

// Defining the initial default state in store.
const initialState: LiveStreamSettingsState = {
  mode: Mode.NETWORKING,
  isLoading:false,
  error:null,
  seatingStyle: SeatingStyle.CLUSTER,
  session:null,
  trainer:null,
  batch:null,
  video: false,
  audio: false,
  onSpeaker: false,
  isScreenPresented:false,
  isMicAccessGranted:false,
  isCameraAccessGranted:false,
  leftPanel: null,
  badgesPanel:false,
  closeEntry: false,
  muteParticipants: false,
  allowSharingScreen: false,
  onlineParticipants:0,
  recordingOptions: {
    recordSession: false,
    recordGroupInteraction: false,
  },
};



export const fetchLiveSessionSettings = createAsyncThunk('livestreamSettings/fetchLiveSession', async ( roomID :string ) => {

  try {
    const response = await axiosInstance.post("/training/console_details", {id : roomID})
    const data = response.data.consoleDetails
    return data
    
  } catch (error) {
     throw error
  } 
})

export const fetchOnlineParticipants = createAsyncThunk('livestreamSettings/fetchOnlineParticipants', async ( roomID:string ) => {
    try {
      const onlineParticipants = await axiosInstance.post('/session/get_online_count',{sessionMapId : roomID});
      return onlineParticipants.data.onlineCount
      
    } catch (error) {
      throw error
    }
})

export const fetchSessionPlan = createAsyncThunk('livestreamSettings/fetchSessionPlan', async ({sessionID , mapID }:{ sessionID:string , mapID:string }) => {
  try {


    const payload = {
      session_id: sessionID,
      session_map_id:mapID ,
      type:'live',
      targetIndex:'',
      isQuickShuffling:false,
      isShuffling:false
    }

    const response:any = await axiosInstance.post('/trainer/session_plan_preview', payload);
    const data = response.data.responseData.prePlannedActivities;
    return data
    
  } catch (error) {
    throw error
  }
})



// Creating the slice for livestreamSettings and adding a reducer function for updating the values in slice-Store
const livestreamSettings = createSlice({
  name: "livestreamsettings",
  initialState,
  reducers: {
    toggleSpeaker(state) {
        state.onSpeaker = !state.onSpeaker;
    },
    toggleAudio(state) {
      state.audio = !state.audio;
    },
    toggleVideo(state) {
      state.video = !state.video;
    },
    toggleScreenPresentation( state ){
      state.isScreenPresented = !state.isScreenPresented;
    },
    updateLiveStreamSettings: (
      state,
      action: PayloadAction<Partial<LiveStreamSettingsState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: builder => {
     builder.addCase( fetchLiveSessionSettings.fulfilled , ( state , action:PayloadAction<any> ) => {
       state.isLoading = false;
       state.session =  action.payload.session
       if( state.session ){
         state.session.startTime = action.payload.session_start_time
         state.session.endTime = action.payload.session_end_time
         state.session.startDate = action.payload.session_start_date
         state.session.endDate = action.payload.session_end_date
         state.session.mapID = action.payload.id
       }
       state.batch = action.payload.batch
       state.trainer = action.payload.trainer
     })
     .addCase( fetchOnlineParticipants.fulfilled , ( state , action:PayloadAction<number> ) => {
         state.onlineParticipants = action.payload
     })
     .addCase( fetchSessionPlan.fulfilled , ( state , action:PayloadAction<any> ) => {
        if( state.session ) 
          state.session.segments = action.payload
     })
  }
});

// Exporting the reducer function so that we can access it from other components and use the useSelector hook for subscribing to the changes in data in store for the initial state.
export const { updateLiveStreamSettings, toggleSpeaker , toggleAudio , toggleVideo , toggleScreenPresentation} = livestreamSettings.actions;

export default livestreamSettings.reducer;

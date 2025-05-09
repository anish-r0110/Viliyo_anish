import { createSlice } from "@reduxjs/toolkit";

interface ApplicationSettingState {
   mode: 'dark' | 'light'
}

const initialState:ApplicationSettingState = {
   mode:'light'
}


const settingSlice = createSlice({
    name:'settings',
    initialState,
    reducers:{
       changeMode:( state , action )=>{
         state.mode = 'dark'
       }
    }
})

export const { changeMode } = settingSlice.actions
export default settingSlice.reducer
import { createSlice } from "@reduxjs/toolkit";




interface BadgeState{
    isLoading:boolean;
    batches:[];
    error:string | null;
}

const initialState:BadgeState = {
    isLoading:false,
    batches:[],
    error:null
}

const badgesSlice = createSlice({ 
    name:'badges',
    initialState,
    reducers:{}
})


export default badgesSlice.reducer;

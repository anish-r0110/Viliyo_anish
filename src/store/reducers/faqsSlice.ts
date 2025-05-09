// src/store/reducers/faqsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axios';
import transformFAQ from '@/middlewares/transform/faq';
import FAQItem from '@/interfaces/FAQ';


interface FaqState {
  items:FAQItem[],
  isLoading:boolean,
  error:string | null
}

// Define the initial state
const initialState : FaqState = {
  items: [],
  isLoading: false,
  error: null,
};

// Create an async thunk to fetch FAQs
export const fetchFAQs = createAsyncThunk('faqs/fetchFAQs', async () => {
   try {
    const response = await axiosInstance.get('/support/get_all_faq');
    return response.data.map((el:any) => transformFAQ(el));
   } catch (error) {
      throw error
   }
 
});

const faqsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action:PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default faqsSlice.reducer;


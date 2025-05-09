import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import axiosInstance from "../../config/axios";
import FAQItem from "@/interfaces/FAQ";
import transformFAQ from "@/middlewares/transform/faq";

interface FAQState {
  items: FAQItem[];
  isLoading: boolean;
}

const initialState: FAQState = {
  items: [],
  isLoading: true,
};

// Define the async thunk to fetch data from the API
export const fetchFaqs = createAsyncThunk("faqs/fetch", async () => {
  try {
    const response: any = await axiosInstance.get("/support/get_all_faq");
    let faqs = response.data.map((el: any) => transformFAQ(el));
    console.log( faqs );
    return faqs;
  } catch (err) {
    throw err;
  }
});

// Redux slice
const faqSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFaqs.fulfilled,
        (state, action: PayloadAction<FAQItem[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchFaqs.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export the slice reducer
export default faqSlice.reducer;

// Selector to access the FAQ state
export const isLoading = (state: RootState) => state.faqs.isLoading;

export const searchFAQ = (searchTerm: string , state:RootState ) => {
  let faqs = state.faqs.items.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return faqs;
};

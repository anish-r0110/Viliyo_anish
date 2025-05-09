import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axios';
import transformLanguage from '@/middlewares/transform/language';
import store from '@/store';
import ILanguage from '@/interfaces/Language';


export interface LanguagesState {
  items: ILanguage[];
  preferredLanguage: number | null;
  loading: boolean;
  error: string | null;
}

export const initialState: LanguagesState = {
  items: [],
  preferredLanguage: null,
  loading: false,
  error: null,
};


export const fetchAllLanguages = createAsyncThunk(
  'languages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('admin/get_all_languages');
      const languages = response.data.language.map((el: any) => transformLanguage(el));
      return languages as ILanguage[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching languages');
    }
  }
);

export const fetchPreferredLanguage = createAsyncThunk(
  'languages/fetchPreferred',
  async (_, { rejectWithValue }) => {
    const { user } = store.getState().auth;
    try {
      const response = await axiosInstance.post('admin/get_preferred_language', {
        userId: user?.id,
        isTrainee: true,
      });
      return response.data.language.id as number;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching preferred language');
    }
  }
);

export const updatePreferredLanguage = createAsyncThunk(
  'languages/updatePreferred',
  async (languageId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('admin/set_preferred_language', {
        languageId,
        isTrainee: true,
      });
      return response.data.languageId as number;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error updating preferred language');
    }
  }
);


const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    changeLanguage:( state , action: PayloadAction<number> ) => {
       state.preferredLanguage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLanguages.fulfilled, (state, action: PayloadAction<ILanguage[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllLanguages.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPreferredLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreferredLanguage.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.preferredLanguage = action.payload;
      })
      .addCase(fetchPreferredLanguage.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePreferredLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePreferredLanguage.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.preferredLanguage = action.payload;
      })
      .addCase(updatePreferredLanguage.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeLanguage } = languagesSlice.actions
export default languagesSlice.reducer;
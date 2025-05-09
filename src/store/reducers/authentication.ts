import axiosInstance from '@/config/axios';
// import transformSaveProfileData from '@/middlewares/transform/saveProfileData';
import { transformUser } from '@/middlewares/transform/transformerLogin';
import { User } from '@/models/User';
import AppStorage from '@/services/AppStorage';
import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface Token { tokenType:string , accessToken:string , refreshToken:string , expiresIn:string}


interface SaveProfileDataParams {
  firstName: string;
  lastName: string;
  ageGroup: string;
  industry: string;
  organization: string;
  designation: string;
  city: string;
  country: string;
  aboutMe: string;
  website: string;
  profileMessage: string;
  linkedinLink: string;
}

interface AuthState {
  token: Token | null;
  user: null | User;
  isLoading:boolean
  error: null | string;
}

const initialAuthState: AuthState = {
  isLoading:false,
  token:null,
  user: null,
  error: null,
};

const _storage = new AppStorage();


export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/trainee/login', {
        trainee_email: username,
        trainee_password: password,
      });
      const { token, user } = response.data;
      const transformedUser = transformUser(user);
      return { token, user: transformedUser };
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response:any = await axiosInstance.post('/trainee/sign_up_with_email', {
        trainee_name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        trainee_email: email,
        trainee_password: password,
        joineByCommonLink: true,
      });
      if (response.error) {
        return rejectWithValue(response.message);
      }
      const { token, user } = response.data;
      const transformedUser = transformUser(user);
      return { token, user: transformedUser };
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const saveProfileData = createAsyncThunk(
  'auth/saveProfileData',
  async (params: SaveProfileDataParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/trainee/save_trainee_profile_data', {
        first_name: params.firstName,
        last_name: params.lastName,
        age_group: params.ageGroup,
        industry: params.industry,
        organization: params.organization,
        role: params.designation,
        town_city: params.city,
        country: params.country,
        website: params.website,
        short_bio: params.profileMessage,
        aboutMe: params.aboutMe,
        linkedinLink: params.linkedinLink,
      });

      console.log( response );

      const profileData = {}
      return profileData;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const loginWithOtp = createAsyncThunk(
  'auth/loginWithOtp',
  async ({ username }: { username: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/trainee/login', {
        trainee_email: username,
        loginWithOtp: true,
      });
      const { token, user } = response.data;
      const transformedUser = transformUser(user);
      _storage.setItem('token', token);
      _storage.setItem('userData', transformedUser);
      return { token, user: transformedUser };
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
      logout: (state) => {
        state.token = null;
        state.user = null;
        window.localStorage.clear();
      },
   },
   extraReducers:( builder ) => {
     builder
     .addCase(login.pending , (state)=>{
      state.isLoading = true;
      state.error = null;
     })
     .addCase( login.fulfilled , ( state , action) =>{
      state.isLoading = false;
      state.token = action.payload.token;
      localStorage.setItem('token',action.payload.token.accessToken);
      state.user = action.payload.user;
     })
     .addCase(signup.pending , (state)=>{
      state.isLoading = true;
      state.error = null;
      state.user = null;
      state.token = null;
     })
     .addCase( signup.fulfilled , ( state , action) =>{
      state.error = null;
      state.isLoading = false;
      state.token = action.payload.token;
      localStorage.setItem('token',action.payload.token.accessToken);
      state.user = action.payload.user;
     })
     .addCase(signup.rejected , (state, action:PayloadAction<any>)=>{
      state.isLoading = false;
      state.error = action.payload;
     })
     .addCase(loginWithOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginWithOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    })
    .addCase(loginWithOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

   }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


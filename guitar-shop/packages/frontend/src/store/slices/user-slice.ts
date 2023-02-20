import { LoginUserRequest, RegisterUserRequest, UserResponse, UserTokenResponse } from '@guitar-shop/shared-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import { AuthorizationStatus, INCORRECT_FORM, LoadingStatus, SliceNameSpace } from '../../constants';
import { RootState } from '../../types/store';
import { dropToken, getToken, saveToken } from '../../services/token';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

interface UserState {
  user: UserResponse | null;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  status: LoadingStatus;
}

const initialState: UserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  status: LoadingStatus.Idle,
  error: null,
};

export const checkUser = createAsyncThunk('user/check', async () => {
  if (!getToken()) {
    throw new Error('Not found user token!');
  }

  const {data} = await api.get<UserResponse>('/auth/user');
  return data
});


export const loginUser = createAsyncThunk('user/login', async (credentials: LoginUserRequest) => {
  try {
    const {data} = await api.post<UserTokenResponse>('/auth/login', credentials);
    saveToken(data.accessToken);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === HttpStatusCode.Unauthorized) {
      toast.error(INCORRECT_FORM);
    }

    throw err;
  }
});


export const registerUser = createAsyncThunk('user/register', async (registerData: RegisterUserRequest) => {
  try {
    const {data} = await api.post<UserTokenResponse>('/auth/register', registerData);
    saveToken(data.accessToken);

    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === HttpStatusCode.BadRequest) {
      toast.error(INCORRECT_FORM);
    }

    throw err;
  }
});


export const logoutUser = createAsyncThunk('user/logout', async () => {
  dropToken();
});


export const userSlice = createSlice({
  name: SliceNameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkUser.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(checkUser.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(registerUser.pending, (state) => { state.status = LoadingStatus.Loading; })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = LoadingStatus.Succeeded;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = LoadingStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  },
});


export const selectUserLoadingStatus = (state: RootState) => state.user.status;
export const selectUser = (state: RootState) => state.user.user;
export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;


export const { setAuthorizationStatus } = userSlice.actions;
export default userSlice.reducer;

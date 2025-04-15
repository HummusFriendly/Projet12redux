import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { userLogin, postUserProfile, updateUserProfile } from "../utils/api";

interface UserState {
  userInfo: UserProfile | null;
  logged: boolean;
  authToken: string | null;
}

interface UserProfile {
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
  userInfo: null,
  logged: false,
  authToken: null,
};

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await userLogin(email, password);
      if (!res.token) {
        return rejectWithValue("error with the token");
      }
      return res.token;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userDataThunk = createAsyncThunk(
  "user/getUserData",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.user.authToken;
    if (!token) {
      return rejectWithValue("No token available");
    }
    try {
      const res = await postUserProfile(token);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUserDataThunk = createAsyncThunk(
  "user/updateUserData",
  async (
    { firstName, lastName, token }: { firstName: string; lastName: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      return await updateUserProfile(firstName, lastName, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.logged = false;
      state.userInfo = null;
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.logged = true;
        state.authToken = action.payload;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.logged = false;
        state.authToken = null;
      })
      .addCase(userDataThunk.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.logged = true;
        state.userInfo = action.payload;
      })
      .addCase(userDataThunk.rejected, (state) => {
        state.logged = false;
        state.userInfo = null;
      })
      .addCase(updateUserDataThunk.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.userInfo = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectLogged = (state: RootState) => state.user.logged;
export const selectToken = (state: RootState) => state.user.authToken;
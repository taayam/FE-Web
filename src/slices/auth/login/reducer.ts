import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  role: string;
}

interface LoginState {
  user: User | null;
  error: string;
  success: boolean;
  isUserLogout: boolean;
}

const initialState: LoginState = {
  user: null,
  error: "",
  success: false,
  isUserLogout: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess(state: LoginState, action: PayloadAction<User>) {
      state.user = action.payload;
      state.success = true;
    },
    loginError(state: LoginState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.success = false;
    },
    logoutSuccess(state: LoginState, action: PayloadAction<boolean>) {
      state.isUserLogout = action.payload;
    },
  },
});
export const { loginSuccess, loginError, logoutSuccess } = loginSlice.actions;
export default loginSlice.reducer;

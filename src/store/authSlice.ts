import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, Character } from "../types";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  searchCount: 0,
  lastSearchTime: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Character>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.searchCount = 0;
      state.lastSearchTime = Date.now();
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.searchCount = 0;
    },
    incrementSearchCount(state) {
      state.searchCount += 1;
      state.lastSearchTime = Date.now();
    },
  },
});

export const { login, logout, incrementSearchCount } = authSlice.actions;
export default authSlice.reducer;

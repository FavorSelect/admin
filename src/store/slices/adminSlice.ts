import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Admin = {
  name: string;
  email: string;
  profileImage?: string;
};

type UserState = {
  adminInfo: Admin | null;
  isLoggedIn: boolean;
  isTwoFactorEnabled: boolean;
};

const initialState: UserState = {
  adminInfo: null,
  isLoggedIn: false,
  isTwoFactorEnabled: false,
};

const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.adminInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.adminInfo = null;
      state.isLoggedIn = false;
    },
    setTwoFactorStatus(state, action: PayloadAction<boolean>) {
      state.isTwoFactorEnabled = action.payload;
    },
  },
});

export const { setAdmin, logout, setTwoFactorStatus } = userSlice.actions;
export default userSlice.reducer;

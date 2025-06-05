import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  isMobileMenuOpen: false,
};

const toggleSidebarSlice = createSlice({
  name: "toggleSidebar",
  initialState,
  reducers: {
    toggleAppSlidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
  },
});

export const { toggleAppSlidebar, toggleMobileMenu, setMobileMenuOpen } =
  toggleSidebarSlice.actions;
export default toggleSidebarSlice.reducer;

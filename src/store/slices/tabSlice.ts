import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  recentActivityActiveTab: string;
  productCategoriesActiveTab: string;
  membershipActiveTab: string;
  productModerationActiveTab: string;
  sellersActiveTab: string;
  ticketActiveTab: string;
}

const initialState: TabState = {
  recentActivityActiveTab: "New Users",
  productCategoriesActiveTab: "List",
  membershipActiveTab: "List",
  productModerationActiveTab: "List",
  sellersActiveTab: "All Sellers",
  ticketActiveTab: "Seller Tickets",
};

const tabSlice = createSlice({
  name: "recentActivityTab",
  initialState,
  reducers: {
    setRecentActivityTab(state, action: PayloadAction<string>) {
      state.recentActivityActiveTab = action.payload;
    },
    setProductCategoryTab(state, action: PayloadAction<string>) {
      state.productCategoriesActiveTab = action.payload;
    },
    setMembershipTab(state, action: PayloadAction<string>) {
      state.membershipActiveTab = action.payload;
    },
    setProductModerationTab(state, action: PayloadAction<string>) {
      state.productModerationActiveTab = action.payload;
    },
    setSellersTab(state, action: PayloadAction<string>) {
      state.sellersActiveTab = action.payload;
    },
    setTicketTab(state, action: PayloadAction<string>) {
      state.ticketActiveTab = action.payload;
    },
  },
});

export const {
  setRecentActivityTab,
  setProductCategoryTab,
  setMembershipTab,
  setProductModerationTab,
  setSellersTab,
  setTicketTab,
} = tabSlice.actions;
export default tabSlice.reducer;

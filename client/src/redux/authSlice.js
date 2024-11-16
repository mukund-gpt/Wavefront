import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: null,
    userProfile: null,
    selectedUser: null,
    chatsOfSelectedUser: null,
  },
  reducers: {
    //actions
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setChatsOfSelectedUser: (state, action) => {
      state.chatsOfSelectedUser = action.payload;
    },
  },
});

export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
  setChatsOfSelectedUser,
} = authSlice.actions;
export default authSlice.reducer;

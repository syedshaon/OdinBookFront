import { createSlice } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL;
const backUrl = import.meta.env.VITE_BACK_URL;
const dUser = { id: "", username: "", firstName: "", lastName: "", bio: "", pendingFriends: [], friends: [], following: [], profilePicture: "", coverPicture: "" };

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: dUser, token: localStorage.getItem("token"), expire: localStorage.getItem("expire"), backendURL: apiUrl, backSiteURL: backUrl },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.expire) {
        state.expire = action.payload.expire;
      }
      //   localStorage.setItem("token", action.payload.token);
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = dUser;
      state.token = null;
      state.expire = null;
      //   localStorage.removeItem("token");
      //   clear cookie
    },
    update: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;

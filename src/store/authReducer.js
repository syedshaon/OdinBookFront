import { createSlice } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL;
const backUrl = import.meta.env.VITE_BACK_URL;
const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const IMAGEKIT_AUTH_END = import.meta.env.VITE_IMAGEKIT_AUTH_END;
const IMAGEKIT_THUMB = import.meta.env.VITE_IMAGEKIT_THUMB;

const dUser = { id: "", username: "", firstName: "", lastName: "", bio: "", pendingFriends: [], friends: [], following: [], profilePicture: "", coverPicture: "" };
const imgKit = {
  IMAGEKIT_PUBLIC_KEY: IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_URL_ENDPOINT: IMAGEKIT_URL_ENDPOINT,
  IMAGEKIT_AUTH_END: IMAGEKIT_AUTH_END,
  IMAGEKIT_THUMB: IMAGEKIT_THUMB,
};

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: dUser, token: localStorage.getItem("token"), expire: localStorage.getItem("expire"), backendURL: apiUrl, backSiteURL: backUrl, imgKit: imgKit },
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

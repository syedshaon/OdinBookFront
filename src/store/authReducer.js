import { createSlice } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL;
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, firstName: "", token: localStorage.getItem("token"), expire: localStorage.getItem("expire"), backendURL: apiUrl },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.firstName = action.payload.firstName;
      state.token = action.payload.token;
      if (action.payload.expire) {
        state.expire = action.payload.expire;
      }
      //   localStorage.setItem("token", action.payload.token);
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.firstName = "";
      state.token = null;
      state.expire = null;
      //   localStorage.removeItem("token");
      //   clear cookie
    },
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;

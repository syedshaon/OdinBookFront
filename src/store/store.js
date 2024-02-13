import { configureStore } from "@reduxjs/toolkit";

// import slices

// import numberReducer from "./blogReducer";
import authReducer from "./authReducer";
import usersReducer from "./userReducer";
import messengerReducer from "./messenger_reducer";

// Declaring store
const Store = configureStore({
  reducer: {
    // math: numberReducer,
    auth: authReducer,
    users: usersReducer,
    messenger: messengerReducer,
    // Other reducers go here
  },
});

export default Store;

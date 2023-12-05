import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./authReducer";

const validateLoginStatus = async () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  if (authState.token) {
    try {
      const response = await fetch("https://good-news-backend.onrender.com/authorAPI/validateLoginStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.firstName) {
        dispatch(authActions.login({ firstName: responseData.firstName, token: authState.token }));
      }
    } catch (error) {
      // console.error("Error in validateLoginStatus:", error);
    }
  }
};

export default validateLoginStatus;

import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./authReducer";

const validateLoginStatus = async () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  if (authState.token) {
    try {
      const response = await fetch(authState.backendURL + "/validateLoginStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.user) {
        dispatch(authActions.login({ user: responseData.user, token: authState.token }));
      }
    } catch (error) {
      // console.error("Error in validateLoginStatus:", error);
    }
  }
};

export default validateLoginStatus;

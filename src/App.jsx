import Router from "./Router";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
// import validateLoginStatus from "./store/validateLoginStatus";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authReducer";

function App() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const validateLoginStatus = async () => {
    // console.log("validation ran");
    if (localStorage.getItem("token")) {
      try {
        const response = await fetch(authState.backendURL + "/validateLoginStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        });

        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.user) {
          dispatch(authActions.login({ user: responseData.user, token: localStorage.getItem("token"), expire: localStorage.getItem("expire") }));
        } else {
          localStorage.removeItem("token");
          dispatch(authActions.logout());
        }
      } catch (error) {
        // console.error("Error in validateLoginStatus:", error);
      }
    }
  };

  useEffect(() => {
    validateLoginStatus();
  }, []);

  const RefreshJwtToken = async () => {
    // console.log(new Date(Date.now() + 60 * 15 * 1000));
    // console.log(new Date(Date.now() + 60 * 15 * 1000).toISOString());

    let tokenExpires = new Date(authState.expire); // Convert the string to a Date object

    // Calculate the difference between tokenExpires and the current time
    let timeDifferenceMs = (tokenExpires - new Date()) / (60 * 1000);

    console.log("JWT token will get refreshed in " + (timeDifferenceMs - 1) + "minutes.");

    if (authState.token && timeDifferenceMs < 1) {
      console.log("RefreshJwtToken ran");
      try {
        const response = await fetch(authState.backendURL + "/refresh", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.user) {
          dispatch(authActions.login({ user: responseData.user, token: responseData.token, expire: responseData.expire }));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("expire");
          dispatch(authActions.logout());
        }
      } catch (error) {
        // console.error("Error in validateLoginStatus:", error);
      }
    }
  };

  useEffect(() => {
    // Function to run the test
    // const runTest = () => {
    //   console.log("Running test...");
    //   // Add your test logic here
    // };
    console.log("CONSOLE LOGGING INTENTIONALLY :> ");
    RefreshJwtToken();

    // Run the test every minute (60 seconds * 1000 milliseconds)
    const intervalId = setInterval(RefreshJwtToken, 60 * 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [authState.expire, authState.isLoggedIn]); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <Router />
    </>
  );
}

export default App;

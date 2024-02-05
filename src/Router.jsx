import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Verify_signup from "./pages/User/Verify_signup";
import GetVerificationEmail from "./pages/User/GetVerificationEmail";
import ProfilePage from "./pages/User/ProfilePage";

import GetResetPw from "./pages/User/GetResetPw";
import Reset_pw from "./pages/User/Reset_pw";
import Settings from "./pages/User/Settings";

// import Testimonials from "./pages/Testimonials";
import ErrorPage from "./pages/ErrorPage";
import Update from "./pages/Update";
import Create_Post from "./pages/Create_Post";

import Read_Post from "./pages/Read_Post";

import Edit_Post from "./pages/Edit_Post";

import PeopleDetails from "./pages/PeopleDetails";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userReducer";

const Router = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(authState.backendURL + "/peopleDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        // Handle error if needed
        return;
      }
      if (response.ok) {
        dispatch(userActions.setAllUsers({ users: responseData }));
      }

      // Handle error if needed
      return;
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    isLoggedIn && fetchAllUsers();
  }, [authState.backendURL, authState.token, dispatch, isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />

        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:vtoken" element={<Verify_signup />} />
        <Route path="/get-verification-email" element={<GetVerificationEmail />} />
        <Route path="/get-reset-password" element={<GetResetPw />} />
        <Route path="/reset-password/:vtoken" element={<Reset_pw />} />
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Login />} />
        <Route path="/user/:uid" element={isLoggedIn ? <ProfilePage /> : <Login />} />
        <Route path="/allpeople" element={isLoggedIn ? <PeopleDetails /> : <Login />} />

        <Route path="/update" element={isLoggedIn ? <Update /> : <Home />} />
        {/* <Route path="/logout" element={<Testimonials />} /> */}
        <Route path="/new_post" element={isLoggedIn ? <Create_Post /> : <Login />} />
        <Route path="/post/:postId" element={isLoggedIn ? <Read_Post /> : <Login />} />
        <Route path="/editpost/:postId" element={isLoggedIn ? <Edit_Post /> : <Login />} />
        <Route path="/products/:productId" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authReducer";

export const ProfilePicUploadButton = ({ setRefresh }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleFileChange = async (e) => {
    const ProfilePic = e.target.files[0];
    // Access the selected file
    const uploads = { file: ProfilePic };
    const postData = new FormData();
    Object.entries(uploads).forEach(([key, value]) => {
      postData.append(key, value);
    });

    try {
      const response = await fetch(authState.backendURL + "/updateProfilePic", {
        method: "PUT",
        encType: "multipart/form-data",
        headers: {
          authorization: authState.token,
        },
        body: postData,
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        // console.log("Response from backend:", responseData.message);
        console.log(responseData);
        return;
      }
      if (response.ok) {
        // console.log("Response from backend:", responseData.message);
        setRefresh((prev) => prev + 1);
        dispatch(authActions.update({ user: responseData.user }));
        return;
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      console.log("Error sending data to backend: " + err.message);
    }
  };

  const handleClick = (e) => {
    // Trigger the file input
    e.stopPropagation();
    document.getElementById("fileInput1").click();
  };

  return (
    <div>
      <CiEdit className="w-10 h-10" onClick={handleClick} />
      <input type="file" id="fileInput1" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
    </div>
  );
};

export const CoverUploadButton = ({ setRefresh }) => {
  const authState = useSelector((state) => state.auth);

  const handleFileChange = async (e) => {
    const Cover = e.target.files[0];
    // Access the selected file
    const uploads = { file: Cover };
    const postData = new FormData();
    Object.entries(uploads).forEach(([key, value]) => {
      postData.append(key, value);
    });

    try {
      const response = await fetch(authState.backendURL + "/updateCoverPic", {
        method: "PUT",
        encType: "multipart/form-data",
        headers: {
          authorization: authState.token,
        },
        body: postData,
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        // console.log("Response from backend:", responseData.message);
        console.log(responseData);
        return;
      }
      if (response.ok) {
        // console.log("Response from backend:", responseData.message);
        setRefresh((prev) => prev + 1);
        dispatch(authActions.update({ user: responseData.user }));
        return;
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      console.log("Error sending data to backend: " + err.message);
    }
  };

  const handleClick = () => {
    // Trigger the file input
    document.getElementById("fileInput2").click();
  };

  return (
    <div>
      <CiEdit className="w-10 h-10" onClick={handleClick} />
      <input type="file" id="fileInput2" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
    </div>
  );
};

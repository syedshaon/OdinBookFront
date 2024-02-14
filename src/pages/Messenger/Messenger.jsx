import Navbar from "../Navbar";

import People from "./People";
import MsgArea from "./MsgArea";
import { messengerActions } from "../../store/messenger_reducer";

import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

function Messenger() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.availAbleUsers);
  const authState = useSelector((state) => state.auth);

  const fetchMessages = async () => {
    console.log("fetch messages");
    try {
      const response = await fetch(authState.backSiteURL + "msg/getAllConversations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });
      const responseData = await response.json();

      console.log(responseData);
      if (!response.ok) {
        console.log(responseData);
        // setShowError(true);
        // Handle error if needed
        return;
      }
      if (response.ok) {
        dispatch(messengerActions.setAllConversations(responseData.conversations));
        // console.log(responseData.conversations);
      }
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <Navbar />

      <div className="h-screen w-full flex antialiased text-black   overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="border-b-2 border-gray-800 p-2 flex flex-row z-20">
            <div className="bg-red-600 w-3 h-3 rounded-full mr-2" />
            <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
            <div className="bg-green-500 w-3 h-3 rounded-full mr-2" />
          </div>
          <main className="flex-grow   flex flex-row min-h-0">
            <People />
            <MsgArea />
          </main>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Messenger;

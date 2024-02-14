import { messengerActions } from "../../store/messenger_reducer";
const startsWithUploads = /^uploads/;
import { IoPersonSharp } from "react-icons/io5";
import SortedUsers from "./SortedUsers";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import Loading from "../Loading";
// Get visitor's timezone offset in minutes
const visitorTimezoneOffset = new Date().getTimezoneOffset();

function People_Contacts() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.availAbleUsers);
  const authState = useSelector((state) => state.auth);
  const allConversations = useSelector((state) => state.messenger.allConversations);

  const sortedUsers = SortedUsers();

  return (
    <div className="contacts p-2 flex-1 overflow-y-scroll mb-32">
      {allUsers &&
        allConversations &&
        sortedUsers.map((user) => {
          return (
            <div onClick={() => dispatch(messengerActions.setActiveReciepient(user))} key={user._id} className=" cursor-pointer flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative">
              <div className="w-16 h-16 relative flex flex-shrink-0">
                {user.profilePicture ? <img className=" shadow-md rounded-full w-full h-full object-cover " src={startsWithUploads.test(user.profilePicture) ? authState.backSiteURL + user.profilePicture : user.profilePicture} alt={`Profile of ${user.username}`} /> : <IoPersonSharp className="shadow-md rounded-full w-full h-full object-cover" />}

                <div className="absolute bg-gray-200 p-1 rounded-full bottom-0 right-0">
                  <div className="bg-green-500 rounded-full w-3 h-3" />
                </div>
              </div>
              <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                <p className="font-bold">{`${user.firstName} ${user.lastName}`}</p>
              </div>
              <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block" />
            </div>
          );
        })}
    </div>
  );
}

export default People_Contacts;

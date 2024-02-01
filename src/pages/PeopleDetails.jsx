import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userReducer";

import UserList from "../services/UserList";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PeopleDetails() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const usersState = useSelector((state) => state.users);

  const [refresh, setRefresh] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [sentFrndRequest, setSentFriendRequest] = useState([]);
  const [rcvdFrndRequest, setRcvdFriendRequest] = useState([]);
  const [followingPeople, setFollowingPeople] = useState([]);
  const [ohterPeople, setOtherPople] = useState([]);
  // Received friend request, friends, friend request sent, people I am following, Other Users

  const fetchData = async () => {
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

        // setAllUsers(responseData);
        // setMyFriends(responseData.filter((user) => user.friends.includes(authState.user.id)));
        // setSentFriendRequest(responseData.filter((user) => user.pendingFriends.includes(authState.user.id)));

        // setFollowingPeople(responseData.filter((user) => user.followers.includes(authState.user.id)));
        // setRcvdFriendRequest(responseData.filter((user) => authState.user.pendingFriends.includes(user._id)));
        // // People who are not in above lists
        // setOtherPople(
        //   responseData.filter((user) => {
        //     return !user.pendingFriends.includes(authState.user.id) && !authState.user.pendingFriends.includes(user._id) && !authState.user.friends.includes(user._id) && !authState.user.following.includes(user._id);
        //   })
        // );
      }

      // Handle error if needed
      return;
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div>
      <Navbar />
      <div className="container max-w-[95vw] mx-auto mt-[120px] md:mt-20 ">
        <div>
          <h1>Received Friend Request</h1>
          <UserList setRefresh={setRefresh} users={usersState.rcvdFrndRequest} listType={"acceptfriend"} />
        </div>
        <div>
          <h1>Friends</h1>
          <UserList setRefresh={setRefresh} users={usersState.myFriends} listType={"deletefriend"} />
        </div>
        <div>
          <h1>Friend Request Sent</h1>
          <UserList setRefresh={setRefresh} users={usersState.sentFrndRequest} listType={"deletefriendrequest"} />
        </div>
        <div>
          <h1>People You Follow</h1>
          <UserList setRefresh={setRefresh} users={usersState.followingPeople} listType={"unfollow"} />
        </div>
        <div>
          <h1>People You may Know</h1>
          <UserList setRefresh={setRefresh} users={usersState.ohterPeople} listType={"others"} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PeopleDetails;

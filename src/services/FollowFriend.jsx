import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function FollowFriend({ fndNumber, flwNumber, personToFollow, setRefresh, showPendingfriend, showUnfriend, showUnfollow }) {
  const authState = useSelector((state) => state.auth);
  const [showFollowers, setShowFollowers] = useState(false);

  useEffect(() => {
    if (personToFollow === authState.user.username) {
      setShowFollowers(true);
    }
  }, []);

  const handleAddFriend = async () => {
    try {
      const response = await fetch(authState.backendURL + "/sendFriendRequest/" + personToFollow, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await fetch(authState.backendURL + "/follow-username/" + personToFollow, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const handleUnFollow = async () => {
    try {
      const response = await fetch(authState.backendURL + "/unfollow-username/" + personToFollow, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error sending data to backend:", responseData.message);
        // setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);

      if (response.ok) {
      }
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    <div className="connect flex justify-end items-start gap-3 col-start-3 col-end-4 ">
      {showFollowers && (
        <div className=" flex  cursor-pointer ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Followers</p>
          <p className="py-1 px-3 bg-blue-400">{flwNumber ? flwNumber : "0"}</p>
        </div>
      )}
      {!showFollowers && !showUnfollow && (
        <div onClick={handleFollow} className=" flex  cursor-pointer ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Follow</p>
          <p className="py-1 px-3 bg-blue-400">{flwNumber ? flwNumber : "0"}</p>
        </div>
      )}
      {!showFollowers && showUnfollow && (
        <div onClick={handleUnFollow} className=" flex  cursor-pointer ml-5 text-white ">
          <p className="py-1 px-3 bg-blue-500">Unfollow</p>
          <p className="py-1 px-3 bg-blue-400">{flwNumber ? flwNumber : "0"}</p>
        </div>
      )}
      <div onClick={handleAddFriend} className=" flex  cursor-pointer ml-5 text-white ">
        <p className="py-1 px-3 bg-blue-500">Add Friend</p>
        <p className="py-1 px-3 bg-blue-400">{fndNumber ? fndNumber : "0"} </p>
      </div>
    </div>
  );
}

export default FollowFriend;

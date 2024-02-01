import React from "react";
const startsWithUploads = /^uploads/;
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userReducer";
import { IoPersonSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const UserList = ({ users, listType, setRefresh }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const usersState = useSelector((state) => state.users);

  const handleAddFriend = async (personToFollow) => {
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
      console.log("Error sending data to backend:", err.message);
      // setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const handleFollow = async (personToFollowID) => {
    try {
      const response = await fetch(authState.backendURL + "/follow-id/" + personToFollowID, {
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

      dispatch(userActions.handleFollow({ personToFollowID: personToFollowID }));
      // setRefresh((prev) => prev + 1);
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };
  const handleUnFollow = async (personToUnfollowID) => {
    try {
      const response = await fetch(authState.backendURL + "/unfollow-id/" + personToUnfollowID, {
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

      // setRefresh((prev) => prev + 1);
      dispatch(userActions.handleUnFollow({ personToUnfollowID: personToUnfollowID }));
      // Handle the successful response (if needed)
      const responseData = await response.json();

      console.log("Response from backend:", responseData);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users.map((user) => (
        <div key={user._id} className="   bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
          <NavLink to={`../user/${user.username}`}>{user.profilePicture ? <img className="  w-40 h-40 object-cover rounded-full mb-4 " src={startsWithUploads.test(user.profilePicture) ? authState.backSiteURL + user.profilePicture : user.profilePicture} alt={`Profile of ${user.username}`} /> : <IoPersonSharp className="w-40   h-40 rounded-full" />}</NavLink>
          <NavLink to={`../user/${user.username}`}>
            <h2 className="text-xl font-bold mb-2">{`${user.firstName} ${user.lastName}`}</h2>
          </NavLink>
          {listType === "acceptfriend" && (
            <div className="flex">
              <div className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-blue-500">Accept Request</p>
              </div>

              <div className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-red-500">Reject</p>
              </div>
            </div>
          )}
          {listType === "deletefriend" && (
            <div className="flex">
              <div className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-blue-500">Unfriend</p>
              </div>
            </div>
          )}
          {listType === "deletefriendrequest" && (
            <div className="flex">
              <div className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-green-500">Cancel Request</p>
              </div>
            </div>
          )}
          {listType === "unfollow" && (
            <div className="flex">
              <div onClick={() => handleUnFollow(user._id)} className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-red-500">Unfollow</p>
              </div>
            </div>
          )}
          {listType === "others" && (
            <div className="flex">
              <div onClick={() => handleFollow(user._id)} className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-blue-500">Follow</p>
                <p className="py-1 px-3 bg-blue-400">{user.followers.length}</p>
              </div>

              <div onClick={() => handleAddFriend(user.username)} className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-green-500">Add Friend</p>
                <p className="py-1 px-3 bg-green-400">{user.friends.length} </p>
              </div>
            </div>
          )}

          {/* <div className="flex">
              <div className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-blue-500">Follow</p>
                <p className="py-1 px-3 bg-blue-400">{user.followers.length}</p>
              </div>

              <div className=" flex  cursor-pointer ml-5 text-white ">
                <p className="py-1 px-3 bg-green-500">Add Friend</p>
                <p className="py-1 px-3 bg-green-400">{user.friends.length} </p>
              </div>
            </div> */}
        </div>
      ))}
    </div>
  );
};

export default UserList;

import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: { currentUser: JSON.parse(localStorage.getItem("currentUser")), allUsers: [], myFriends: [], sentFrndRequest: [], rcvdFrndRequest: [], followingPeople: [], ohterPeople: [] },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload.users;
      // Update myFriends using a selector
      state.myFriends = action.payload.users.filter((user) => user.friends.includes(state.currentUser.id));
      state.sentFrndRequest = action.payload.users.filter((user) => user.pendingFriends.includes(state.currentUser.id));
      state.rcvdFrndRequest = action.payload.users.filter((user) => state.currentUser.pendingFriends.includes(user._id));
      state.followingPeople = action.payload.users.filter((user) => user.followers.includes(state.currentUser.id));
      state.ohterPeople = action.payload.users.filter((user) => {
        return !user.pendingFriends.includes(state.currentUser.id) && !state.currentUser.pendingFriends.includes(user._id) && !state.currentUser.friends.includes(user._id) && !state.currentUser.following.includes(user._id);
      });

      // state.followingPeople = "";
      // state.ohterPeople = "";
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    handleFollow: (state, action) => {
      const personToFollowID = action.payload.personToFollowID;

      const personToFollow = state.allUsers.filter((user) => user._id == personToFollowID);
      console.log(personToFollow);

      state.currentUser.following.push(personToFollowID);

      state.followingPeople.push(personToFollow[0]);
      state.ohterPeople = state.ohterPeople.filter((user) => user._id !== personToFollowID);
    },
    handleUnFollow: (state, action) => {
      const personToUnfollowID = action.payload.personToUnfollowID;

      const personToUnfollow = state.allUsers.filter((user) => user._id == personToUnfollowID);
      console.log(personToUnfollow);

      state.currentUser.following = state.currentUser.following.filter((userId) => userId !== personToUnfollowID);

      state.followingPeople = state.followingPeople.filter((user) => user._id !== personToUnfollowID);
      state.ohterPeople.push(personToUnfollow[0]);
    },
  },
});

export default usersSlice.reducer;

export const userActions = usersSlice.actions;

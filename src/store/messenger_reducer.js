import { createSlice } from "@reduxjs/toolkit";

const messengerSlice = createSlice({
  name: "messenger",
  initialState: { currentUser: JSON.parse(localStorage.getItem("currentUser")), allConversations: "", activeReciepient: "", activeConversation: "", allGroupConversations: "", activeGroupReciepient: "", activeGroupConversation: "", contactView: true },
  reducers: {
    alterContactView: (state, action) => {
      state.contactView = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    setAllConversations: (state, action) => {
      state.allConversations = action.payload;
      state.activeConversation = action.payload.find((conversation) => {
        return conversation.participants.some((participant) => participant === state.activeReciepient._id);
      });
      // Update myFriends using a selector
    },
    setActiveReciepient: (state, action) => {
      //   console.log(action);
      state.activeReciepient = action.payload;

      state.activeConversation = state.allConversations.find((conversation) => {
        return conversation.participants.some((participant) => participant === action.payload._id);
      });
    },
    updateAllConversations: (state, action) => {
      const replacementObject = action.payload.conversation;

      //   console.log(action.payload.conversation._id);
      const targetConversationId = action.payload.conversation._id;

      // Check if replacementObject already exists in allConversations
      const conversationIndex = state.allConversations.findIndex((conversationObj) => conversationObj._id === targetConversationId);

      if (conversationIndex !== -1) {
        // If replacementObject exists, update it
        state.allConversations[conversationIndex] = replacementObject;
      } else {
        // If replacementObject does not exist, add it to the array
        state.allConversations.push(replacementObject);
      }

      state.activeConversation = state.allConversations.find((conversation) => {
        return conversation.participants.some((participant) => participant === state.activeReciepient._id);
      });

      // Update myFriends using a selector
    },
    setAllGroupConversations: (state, action) => {
      state.allGroupConversations = action.payload;
      state.activeGroupConversation = action.payload[0];
      state.activeGroupReciepient = action.payload[0].participants.filter((id) => id !== state.currentUser.id);

      // state.activeGroup = action.payload.find((conversation) => {
      //   return conversation.participants.some((participant) => participant === state.activeReciepient._id);
      // });
      // Update myFriends using a selector
    },
    setActiveGroup: (state, action) => {
      //   console.log(action);
      state.activeGroupReciepient = action.payload.participants.filter((id) => id !== state.currentUser.id);
      state.activeGroupConversation = action.payload;
      //   state.allConversations &&
      //   state.allConversations.find((conversation) => {
      //     return conversation.participants.some((participant) => participant === action.payload._id);
      //   });
    },
    updateGroupConversations: (state, action) => {
      // console.log(action.payload.conversation);
      const replacementObject = action.payload.conversation;
      //   console.log(action.payload.conversation._id);
      const targetConversationId = action.payload.conversation._id;
      // Check if replacementObject already exists in allConversations
      const conversationIndex = state.allGroupConversations.findIndex((conversationObj) => conversationObj._id === targetConversationId);
      if (conversationIndex !== -1) {
        // If replacementObject exists, update it
        state.allGroupConversations[conversationIndex] = replacementObject;
      } else {
        // If replacementObject does not exist, add it to the array
        state.allGroupConversations.push(replacementObject);
      }
      state.activeGroupConversation = state.allGroupConversations.find((conversation) => {
        return conversation._id === state.activeGroupConversation._id;
      });
    },
    addGroupConversations: (state, action) => {
      // const newConversation = action.payload;
      if (!state.allGroupConversations) {
        state.allGroupConversations = [];
      }

      state.allGroupConversations.push(action.payload);
      state.activeGroupConversation = action.payload;
    },
  },
});

export default messengerSlice.reducer;

export const messengerActions = messengerSlice.actions;

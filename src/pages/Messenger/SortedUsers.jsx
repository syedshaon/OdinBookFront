import { useDispatch, useSelector } from "react-redux";

function SortedUsers() {
  const allUsers = useSelector((state) => state.users.availAbleUsers);
  const allConversations = useSelector((state) => state.messenger.allConversations);

  // console.log(allUsers);

  const usersToSort = [...allUsers];

  // Extract unique user IDs from the participants array in allConversations
  const participantUserIds =
    allConversations &&
    allConversations.reduce((userIds, conversation) => {
      const participants = conversation.participants;
      return userIds.concat(participants.filter((id) => !userIds.includes(id)));
    }, []);

  // Sort allUsers based on whether _id is in conversationUserIds
  // Sort allUsers based on the order of appearance in participantUserIds
  const sortedUsers =
    allUsers &&
    usersToSort.sort((userA, userB) => {
      const indexA = participantUserIds.indexOf(userA._id);
      const indexB = participantUserIds.indexOf(userB._id);

      // Users not found in the participants array should appear at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });

  console.log("AllUsers", allUsers);
  console.log("allConversations", allConversations);
  console.log("sortedUsers", sortedUsers);
  // function sortUsersByMessagePresence(allUsers, allMsgs) {
  //   // Create a set of all user IDs who participated in any message.
  //   const allParticipantIds = new Set(allMsgs.flatMap((msg) => msg.participants.map((participant) => participant._id)));

  //   // Filter users based on their participation in messages.
  //   const usersInAllMsgs = allUsers.filter((user) => allParticipantIds.has(user._id) && allMsgs.every((msg) => msg.participants.some((participant) => participant._id === user._id)));
  //   const usersInSomeMsgs = allUsers.filter((user) => allParticipantIds.has(user._id) && !allMsgs.every((msg) => msg.participants.some((participant) => participant._id === user._id)));
  //   const usersNotInMsgs = allUsers.filter((user) => !allParticipantIds.has(user._id));

  //   // Combine the filtered lists in the desired order.
  //   return [...usersInAllMsgs, ...usersInSomeMsgs, ...usersNotInMsgs];
  // }

  // const sortedUsers = allUsers && allConversations && sortUsersByMessagePresence(usersToSort, allConversations);
  return sortedUsers;
}

export default SortedUsers;

//  65ca241d2d0b24fab561526c 65b67d09db0fb3802374e2f5 65c4e9086b61b3957e8e397f

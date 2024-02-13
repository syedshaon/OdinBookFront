import { useDispatch, useSelector } from "react-redux";

function SortedUsers() {
  const allUsers = useSelector((state) => state.users.availAbleUsers);
  const allConversations = useSelector((state) => state.messenger.allConversations);

  // console.log(allUsers);

  const usersToSort = [...allUsers];

  function sortUsersByMessagePresence(allUsers, allMsgs) {
    // Create a set of all user IDs who participated in any message.
    const allParticipantIds = new Set(allMsgs.flatMap((msg) => msg.participants.map((participant) => participant._id)));

    // Filter users based on their participation in messages.
    const usersInAllMsgs = allUsers.filter((user) => allParticipantIds.has(user._id) && allMsgs.every((msg) => msg.participants.some((participant) => participant._id === user._id)));
    const usersInSomeMsgs = allUsers.filter((user) => allParticipantIds.has(user._id) && !allMsgs.every((msg) => msg.participants.some((participant) => participant._id === user._id)));
    const usersNotInMsgs = allUsers.filter((user) => !allParticipantIds.has(user._id));

    // Combine the filtered lists in the desired order.
    return [...usersInAllMsgs, ...usersInSomeMsgs, ...usersNotInMsgs];
  }

  const sortedUsers = allUsers && allConversations && sortUsersByMessagePresence(usersToSort, allConversations);
  return sortedUsers;
}

export default SortedUsers;

import { useSelector } from "react-redux";

const startsWithUploads = /^uploads/;
import { IoPersonSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function RecieverHeading() {
  const contactView = useSelector((state) => state.messenger.contactView);
  const activeReciepient = useSelector((state) => state.messenger.activeReciepient);
  const authState = useSelector((state) => state.auth);
  const allUsers = useSelector((state) => state.users.allUsers);
  const allGroupConversations = useSelector((state) => state.messenger.allGroupConversations);
  const activeGroupConversation = useSelector((state) => state.messenger.activeGroupConversation);

  return (
    <>
      {/* Contacts View */}
      {contactView && (
        <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
          <div className="flex">
            <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
              <img className="border border-gray-500 shadow-md rounded-full w-full h-full object-cover" src={startsWithUploads.test(activeReciepient.profilePicture) ? authState.backSiteURL + activeReciepient.profilePicture : activeReciepient.profilePicture} alt={`Profile of ${activeReciepient.username}`} />
            </div>
            <div className="text-sm">
              <NavLink to={`../user/${activeReciepient.username}`}>
                <p className="font-bold">
                  {activeReciepient.firstName} {activeReciepient.lastName}
                </p>
              </NavLink>
              <p>Active 1h ago</p>
            </div>
          </div>
          {/* <div className="flex">
            <a href="#" className="flex justify-center items-center rounded-full hover:bg-gray-200 bg-gray-300 w-10 h-10 p-2">
              <FaPhone className="text-blue-700 text-xl" />
            </a>
          </div> */}
        </div>
      )}

      {/* Contacts View Ends*/}

      {/* Group View */}
      {!contactView && activeGroupConversation && (
        <div className="mx-2  bg-gray-300 rounded-md mb-5 flex-col items-center  ">
          <h3 className="text-center text-xl font-bold">{activeGroupConversation.groupName}</h3>
          <div className="overflow-hidden   flex justify-center">
            {activeGroupConversation.participants.map((participantId) => {
              const participant = allUsers.find((user) => user._id === participantId);
              if (participant) {
                return (
                  <div className="w-12 h-12 relative flex flex-shrink-0" key={participant._id}>
                    {/* <img src={participant.profilePicture} alt={participant.username} /> */}

                    {participant.profilePicture ? <img className=" shadow-md rounded-full w-full h-full object-cover " src={startsWithUploads.test(participant.profilePicture) ? authState.backSiteURL + participant.profilePicture : participant.profilePicture} alt={`Profile of ${participant.username}`} /> : <IoPersonSharp className="shadow-md rounded-full w-full h-full object-cover" />}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default RecieverHeading;

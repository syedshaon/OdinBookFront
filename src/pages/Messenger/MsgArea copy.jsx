// Show all messages between users

import { useDispatch, useSelector } from "react-redux";

import { GrGallery } from "react-icons/gr";
import { FaThumbsDown } from "react-icons/fa";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import RecieverHeading from "./RecieverHeading";
import Conversations from "./Conversations";
import { messengerActions } from "../../store/messenger_reducer";

function MsgArea() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  // const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messengerState = useSelector((state) => state.messenger);
  const contactView = useSelector((state) => state.messenger.contactView);

  // const socket = io("http://localhost:3000", { withCredentials: true, query: { id: authState.user.id } });

  useEffect(() => {
    const newSocket = io(authState.backSiteURL, { withCredentials: true, query: { sender: authState.user.id } });
    setSocket(newSocket);
    // Connect to Socket.IO server
    newSocket.connect();

    const receiveMessageHandler = (message) => {
      // console.log(message);
      // setMessages((prevMessages) => [...prevMessages, message]);
      dispatch(messengerActions.updateAllConversations(message));
    };
    const receiveGroupMessageHandler = (message) => {
      // console.log(message);
      // setMessages((prevMessages) => [...prevMessages, message]);
      dispatch(messengerActions.updateGroupConversations(message));
    };

    // Listen for incoming messages
    newSocket.on("receiveMessage", receiveMessageHandler);
    newSocket.on("receiveGroupMessage", receiveGroupMessageHandler);

    // Clean up socket connection and event listener on unmount
    return () => {
      newSocket.disconnect();
      newSocket.off("receiveMessage", receiveMessageHandler);
      newSocket.off("receiveGroupMessage", receiveGroupMessageHandler);
    };
  }, [authState]); // Empty dependency array ensures the effect runs only once on mount

  const handleKeyDown = (e) => {
    // console.log("works 1");
    if (e.key === "Enter" && !e.shiftKey) {
      // console.log("works 2");
      e.preventDefault(); // Prevents the default behavior (e.g., form submission)
      // Emit a message to the server
      if (contactView) {
        socket.emit("sendMessage", { text: messageInput, recievers: [messengerState.activeReciepient._id] });
      } else {
        socket.emit("groupMessage", { text: messageInput, recievers: messengerState.activeGroupReciepient });
      }

      // Clear the input field
      setMessageInput("");
    } else if (e.key === "Enter" && e.shiftKey) {
      // console.log("works 3");
      // Add a new line to the input area
      setMessageInput((prevValue) => prevValue + "\n");
    }
  };

  return (
    <section className="msgArea mt-[108px] md:mt-14   flex   w-full relative   flex-col flex-auto justify-between border-l border-gray-800">
      <>
        <RecieverHeading />
        <Conversations />
      </>

      <div className="chat-footer w-full   flex-none">
        <div className="flex flex-row items-center p-4">
          <button type="button" className="flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6">
            <GrGallery className="text-xl" />
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="relative flex-grow"
          >
            <label>
              <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={handleKeyDown} className="  overflow-hidden   leading-3   rounded-full py-5 pl-5 pr-10 w-full border border-gray-800 focus:border-gray-700   focus:outline-none text-gray-800 focus:shadow-md transition duration-300 ease-in" type="text" placeholder="Aa" />
            </label>
          </form>
          <button type="button" className="flex  flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">
            <FaThumbsDown className="text-xl rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}
export default MsgArea;

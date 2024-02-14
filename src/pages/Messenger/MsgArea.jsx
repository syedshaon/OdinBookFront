// Show all messages between users

import { useDispatch, useSelector } from "react-redux";
import { IKContext, IKUpload } from "imagekitio-react";

import { GrGallery } from "react-icons/gr";
import { BsFillSendFill } from "react-icons/bs";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import RecieverHeading from "./RecieverHeading";
import Conversations from "./Conversations";
import { messengerActions } from "../../store/messenger_reducer";
import Authenticator from "../ImageKit/Authenticator";
function MsgArea() {
  const [imgUrl, setImgUrl] = useState(null);
  const [textDisabled, setTextDisabled] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgKitImgUrl, setImgKitImgUrl] = useState("");
  const [showError, setShowError] = useState(false);

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

  const sendMessage = (e) => {
    e.preventDefault();
    if (imgUrl) {
      if (contactView === true) {
        socket.emit("image", { text: imgKitImgUrl, recievers: [messengerState.activeReciepient._id], conId: messengerState.activeConversation ? messengerState.activeConversation._id : null });
      } else {
        socket.emit("groupImage", { text: imgKitImgUrl, recievers: messengerState.activeGroupReciepient, conId: messengerState.activeGroupConversation._id });
      }
    } else {
      if (contactView === true) {
        // Emit a message to the server
        socket.emit("sendMessage", { text: messageInput, recievers: [messengerState.activeReciepient._id], conId: messengerState.activeConversation ? messengerState.activeConversation._id : null });
      } else {
        socket.emit("groupMessage", { text: messageInput, recievers: messengerState.activeGroupReciepient, conId: messengerState.activeGroupConversation._id });
      }
    }

    setTextDisabled(false);
    setMessageInput("");
    setImgUrl(null);
  };
  const handleKeyDown = (e) => {
    if (imgUrl) {
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      // console.log("works 1");
      // console.log("works 2");

      sendMessage();

      // Clear the input field
    } else if (e.key === "Enter" && e.shiftKey) {
      // console.log("works 3");
      // Add a new line to the input area
      setMessageInput((prevValue) => prevValue + "\n");
    }
  };

  const handleFileChange = async (e) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setTextDisabled(true);
  };

  const handleIconClick = (e) => {
    // Trigger the file input
    e.stopPropagation();
    document.getElementById("imageInput").click();
  };

  const validateFileFunction = (file) => {
    console.log("validating");
    if (file.size < 5000000) {
      // Less than 1mb
      console.log("less than 5mb");
      return true;
    }
    console.log("more than 5mb");
    alert("Images must be less than 5mb");
    return false;
  };

  const onUploadStart = (state) => {
    setTextDisabled(true);
    setSendDisabled(true);
  };
  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onError = (err) => {
    setShowError(true);
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    setImgKitImgUrl(res.filePath);
    setSendDisabled(false);
    console.log("Success", res.filePath);
  };

  return (
    <section className="msgArea mt-[108px] md:mt-14   flex   w-full relative   flex-col flex-auto justify-between border-l border-gray-800">
      <>
        <RecieverHeading />
        <Conversations />
      </>

      <div className="chat-footer w-full   flex-none">
        <form onSubmit={sendMessage} className="flex flex-row   p-4 justify-center items-center">
          <GrGallery className="mx-2 cursor-pointer text-blue-600 hover:text-blue-700 w-6 h-6 " onClick={handleIconClick} />
          {/* <input type="file" id="imageInput" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" /> */}
          <IKContext publicKey={authState.imgKit.IMAGEKIT_PUBLIC_KEY} urlEndpoint={authState.imgKit.IMAGEKIT_URL_ENDPOINT} authenticator={Authenticator}>
            <IKUpload onUploadStart={onUploadStart} onChange={handleFileChange} id="imageInput" style={{ display: "none" }} accept="image/*" validateFile={validateFileFunction} onUploadProgress={onUploadProgress} fileName="msg.png" onError={onError} onSuccess={onSuccess} />
          </IKContext>

          <div className={`w-20 h-16 bg-contain mr-6 bg-no-repeat  ${!imgUrl && "hidden"}`} style={{ backgroundImage: `url(${imgUrl})` }}></div>

          <textarea disabled={textDisabled === true} value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={handleKeyDown} className="  overflow-hidden resize-none  leading-3   rounded-lg py-5 pl-5 pr-10 w-full border border-gray-800 focus:border-gray-700   focus:outline-none text-gray-800 focus:shadow-md transition duration-300 ease-in" type="text" placeholder="Aa" />

          <button disabled={sendDisabled === true} type="submit" className="flex justify-center items-center bg-blue-500  focus:outline-none mx-2   text-white hover:text-gray-200 w-40   h-14    py-8 rounded-lg ">
            <BsFillSendFill className="text-xl " />
          </button>
        </form>
      </div>
    </section>
  );
}
export default MsgArea;

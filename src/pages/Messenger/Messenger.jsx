import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import People from "./People";
import MsgArea from "./MsgArea";

function Messenger() {
  const [conversationId, setConversatioid] = useState("");
  const [recievers, setRecievers] = useState("");

  return (
    <>
      <Navbar />

      <div className="h-screen w-full flex antialiased text-black   overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="border-b-2 border-gray-800 p-2 flex flex-row z-20">
            <div className="bg-red-600 w-3 h-3 rounded-full mr-2" />
            <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
            <div className="bg-green-500 w-3 h-3 rounded-full mr-2" />
          </div>
          <main className="flex-grow   flex flex-row min-h-0">
            <People />
            <MsgArea />
          </main>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Messenger;

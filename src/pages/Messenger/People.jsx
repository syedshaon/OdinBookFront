// All users of Odinbook, sorted by interation time

import { useState } from "react";
import People_Contacts from "./People_Contacts";
import People_Groups from "./People_Groups";
import { useDispatch, useSelector } from "react-redux";
import { messengerActions } from "../../store/messenger_reducer";

function People() {
  // const [contactView, setContactsView] = useState(true);
  const contactView = useSelector((state) => state.messenger.contactView);
  const dispatch = useDispatch();

  return (
    <section className="relative flex flex-col flex-none overflow-auto w-24 mt-[100px] md:mt-5  group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
      {/* Heading */}
      <div className="header p-4 flex flex-col  justify-center items-center  ">
        <p className="text-md font-bold  block group-hover:block">{contactView ? "Contacts" : "Groups"}</p>
        <hr className="my-3 bg-blue-500 w-full h-1" />
      </div>
      {/* Heading Ends*/}

      {contactView && <People_Contacts />}
      {!contactView && <People_Groups />}

      {/* Change between Contacts and Groups */}
      <div className="absolute bottom-0  w-full   flex gap-0 md:gap-2  flex-col md:flex-row">
        <div onClick={() => dispatch(messengerActions.alterContactView(true))} className={`w-full rounded md:w-1/2  py-5 px-3 flex justify-center font-bold  bg-blue-500 text-white  hover:bg-blue-800 ${!contactView && "cursor-pointer"}`}>
          Contacts
        </div>
        <div onClick={() => dispatch(messengerActions.alterContactView(false))} className={`w-full rounded md:w-1/2 py-5 px-3 flex justify-center font-bold bg-gray-500 hover:text-white hover:bg-gray-700  ${contactView && "cursor-pointer"}  `}>
          Groups
        </div>
      </div>
    </section>
  );
}

export default People;

import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { ProfilePicUploadButton, CoverUploadButton } from "../../contents/ImageUploadButton";
import { NameUpdateForm, BioUpdateForm } from "../../contents/NameUpdate";

function ProfilePage() {
  const { uid } = useParams();

  const authState = useSelector((state) => state.auth);
  const [searchedUser, setSearchedUser] = useState({});
  const [showEditButton, setShowEditButton] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [showEditName, SetShowEditName] = useState(false);
  const [showEditBio, SetShowEditBio] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(authState.backendURL + "/profile-details/" + uid, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        // Handle error if needed
        return;
      }
      if (responseData.searchedUser) {
        setSearchedUser(responseData.searchedUser);
        console.log(responseData.searchedUser.username);
        console.log(authState.user.username);
        // Handle error if needed
        if (responseData.searchedUser.username === authState.user.username) {
          setShowEditButton(true);
        }

        return;
      }
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };
  useEffect(() => {
    if (uid === authState.username) {
      setShowEditButton(true);
    }
    fetchData();
  }, [refresh]);

  const backgroundImageStyle = searchedUser.coverPicture
    ? {
        backgroundImage: `url(${authState.backSiteURL + searchedUser.coverPicture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundPosition: "center", backgroundSize: "cover" };

  return (
    <>
      <Navbar />
      <div className="h-screen    ">
        <div className="mt-14     shadow bg-white h-screen">
          {/* PROFILE HEADER */}
          <div className="   bg-slate-200 mb-3 pb-3">
            <div className=" w-full flex justify-center h-[348px] ">
              <div className="flex flex-col container">
                <div
                  style={backgroundImageStyle}
                  className="h-[348px] w-full   md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
                >
                  {showEditButton && (
                    <div className="cursor-pointer absolute top-1 right-1 text-white w-10 h-10 rounded bg-blue-500">
                      <CoverUploadButton setRefresh={setRefresh} />
                    </div>
                  )}
                  {/* // cover photo */}

                  <div className=" rounded-full md:absolute top-48 inset-x-96 border-4 border-white bg-slate-500 w-40 h-40 flex justify-center items-center overflow-hidden" style={{ left: "calc(50% - 5rem)" }}>
                    {/* profile photo */}
                    {searchedUser.profilePicture && <img className="  w-40 h-40  " src={authState.backSiteURL + searchedUser.profilePicture} alt="Profile picture" />}
                    {showEditButton && (
                      <div className="cursor-pointer absolute top-3 right-3 text-white  rounded bg-blue-500">
                        <ProfilePicUploadButton setRefresh={setRefresh} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* // INFOS */}
            <div className="container flex justify-center flex-col mt-5 mb-3.5">
              <div className="name  flex items-center justify-center">
                {!showEditName && <h1 className="text-center text-blue-500 font-bold text-3xl">{searchedUser.firstName + " " + searchedUser.lastName}</h1>}
                {!showEditName && showEditButton ? <CiEdit onClick={() => SetShowEditName(true)} className="  cursor-pointer  w-6 h-6  text-blue-500" /> : ""}
                {showEditName && showEditButton ? <NameUpdateForm SetShowEditName={SetShowEditName} setRefresh={setRefresh} /> : ""}
              </div>

              <div className="bio flex items-center justify-center">
                {searchedUser.bio && <div className="flex   justify-center">{!showEditBio && <p className="w-2/3  text-center  ">{searchedUser.bio}</p>}</div>}

                {searchedUser.bio && !showEditBio && showEditButton ? <CiEdit onClick={() => SetShowEditBio(true)} className="  cursor-pointer  w-6 h-6  text-blue-500" /> : ""}
                {showEditBio && showEditButton ? <BioUpdateForm SetShowEditBio={SetShowEditBio} setRefresh={setRefresh} /> : ""}
              </div>

              {/* When there is no bio and bio is editable(owner is visitor) */}
              {!searchedUser.bio && showEditButton && !showEditBio ? (
                <div className="bio flex items-center justify-center">
                  <p onClick={() => SetShowEditBio(true)} className="  cursor-pointer font-bold    text-gray-600">
                    Add Bio?
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* // END INFOS */}
          </div>
          {/* END PROFILE HEADER */}

          {/* // CONTENT */}

          <div className="bg-gray-100 p-3 rounded-2xl container mx-auto">
            <div className="flex justify-center  ">
              <div>
                {/* // POST */}
                <div className="shadow bg-white mt-4 rounded-lg  ">
                  {/* POST AUTHOR */}
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex space-x-2 items-center">
                      <div className="relative">
                        <img src="./images/profile_photo_cat.jpg" alt="Profile picture" className="w-10 h-10 rounded-full" />
                        <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                      </div>
                      <div>
                        <div className="font-semibold">Can Canbolat</div>
                        <span className="text-sm text-gray-500">10h</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer">
                      <i className="bx bx-dots-horizontal-rounded"></i>
                    </div>
                  </div>
                  {/* END POST AUTHOR */}

                  {/* POST CONTENT */}
                  <div className="text-justify px-4 py-2">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with d</p>
                  </div>
                  {/* END POST CONTENT */}
                  {/* POST EVENTS */}
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-row-reverse items-center">
                        <span className="ml-2 text-gray-500">55</span>
                      </div>
                      <div className="text-gray-500">
                        <span className="cursor-pointer">10 comments</span>
                      </div>
                    </div>
                  </div>
                  {/* END POST EVENTS */}

                  {/* POST ACTION */}
                  <div className="py-2 px-4">
                    <div className="border border-gray-200 border-l-0 border-r-0 py-1">
                      <div className="flex space-x-2">
                        <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
                          <i className="bx bx-like"></i>
                          <span className="text-sm font-semibold">Like</span>
                        </div>
                        <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
                          <i className="bx bx-comment"></i>
                          <span className="text-sm font-semibold">Comment</span>
                        </div>
                        <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
                          <i className="bx bx-share bx-flip-horizontal"></i>
                          <span className="text-sm font-semibold">Share</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END POST ACTION */}
                </div>
                {/* // END POST */}
                {/* // POST */}
                <div className="shadow bg-white mt-4 rounded-lg  ">
                  {/* POST AUTHOR */}
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex space-x-2 items-center">
                      <div className="relative">
                        <img src="./images/profile_photo_cat.jpg" alt="Profile picture" className="w-10 h-10 rounded-full" />
                        <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                      </div>
                      <div>
                        <div className="font-semibold">Can Canbolat</div>
                        <span className="text-sm text-gray-500">10h</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer">
                      <i className="bx bx-dots-horizontal-rounded"></i>
                    </div>
                  </div>
                  {/* END POST AUTHOR */}

                  {/* POST CONTENT */}
                  <div className="text-justify px-4 py-2">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with d</p>
                  </div>
                  {/* END POST CONTENT */}
                  {/* POST EVENTS */}
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-row-reverse items-center">
                        <span className="ml-2 text-gray-500">55</span>
                      </div>
                      <div className="text-gray-500">
                        <span className="cursor-pointer">10 comments</span>
                      </div>
                    </div>
                  </div>
                  {/* END POST EVENTS */}

                  {/* POST ACTION */}
                  <div className="py-2 px-4">
                    <div className="border border-gray-200 border-l-0 border-r-0 py-1">
                      <div className="flex space-x-2">
                        <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
                          <i className="bx bx-like"></i>
                          <span className="text-sm font-semibold">Like</span>
                        </div>
                        <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
                          <i className="bx bx-comment"></i>
                          <span className="text-sm font-semibold">Comment</span>
                        </div>
                        <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
                          <i className="bx bx-share bx-flip-horizontal"></i>
                          <span className="text-sm font-semibold">Share</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END POST ACTION */}
                </div>
                {/* // END POST */}
              </div>
            </div>
          </div>

          {/* // END CONTENT */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;

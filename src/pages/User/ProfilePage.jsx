import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { ProfilePicUploadButton, CoverUploadButton } from "../Components/ImageUploadButton";
import { NameUpdateForm, BioUpdateForm } from "../Components/NameUpdate";

import FollowFriend from "../Components/FollowFriend";
import CreatePostForm from "../Components/CreatePostForm";

import SinglePost from "../Components/SinglePost";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import ErrorPage from "../ErrorPage";
import Loading from "../Loading";

function ProfilePage() {
  const { uid } = useParams();
  const usersState = useSelector((state) => state.users);

  const authState = useSelector((state) => state.auth);
  const [searchedUser, setSearchedUser] = useState({});
  const [showEditButton, setShowEditButton] = useState(false);
  const [refresh, setRefresh] = useState(0);
  // const [updateFrndFlw, setUpdateFrndFlw] = useState(false);
  const [showEditName, SetShowEditName] = useState(false);
  const [showEditBio, SetShowEditBio] = useState(false);
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [showUnfriend, setShowUnfriend] = useState(false);
  const [showPendingfriend, setPendingfriend] = useState(false);
  const [showAcceptFriend, setAccedptFriend] = useState(false);
  const [allPosts, SetAllPosts] = useState([]);

  const [frndNumber, setFrndNumber] = useState(0);
  const [flwNumber, setFlwNumber] = useState(0);
  const [showErorr, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(usersState.followingPeople);
    // console.log(uid);
    // console.log(usersState.followingPeople.some((user) => user.username === uid));
    setShowUnfollow(usersState.followingPeople.some((user) => user.username === uid));

    setShowUnfriend(usersState.myFriends.some((user) => user.username === uid));
    setPendingfriend(usersState.sentFrndRequest.some((user) => user.username === uid));
    setAccedptFriend(usersState.rcvdFrndRequest.some((user) => user.username === uid));
    // setSearchedUser(usersState.currentUser.username === uid ? usersState.currentUser : usersState.availAbleUsers.find((user) => user.username === uid));

    // // Handle error if needed
    if (uid === usersState.currentUser.username) {
      setShowEditButton(true);
    }
  }, [uid, usersState]);
  const fetchProfileDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(authState.backendURL + "/profile-details/" + uid, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const responseData = await response.json();
      // console.log(responseData);

      if (!response.ok) {
        console.log(responseData);
        setShowError(true);
        // Handle error if needed
        return;
      }
      if (responseData.searchedUser) {
        setSearchedUser(responseData.searchedUser);
        setFrndNumber(responseData.searchedUser.friends.length);
        setFlwNumber(responseData.searchedUser.followers.length);
        SetAllPosts(responseData.searchedUser.posts);

        // setUpdateFrndFlw((prev) => !prev);
        return;
      }
    } catch (error) {
      console.log(error);
      // Handle error if needed
    } finally {
      // Set loading to false after fetch, whether successful or not
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileDetails();
  }, [uid, refresh]);

  // Following is required as some image url is added through faker.js
  const startsWithUploads = /^uploads/;
  const backgroundImageStyle = searchedUser.coverPicture
    ? {
        backgroundImage: `url(${startsWithUploads.test(searchedUser.coverPicture) ? authState.backSiteURL + searchedUser.coverPicture.replace(/\\/g, "/") : searchedUser.coverPicture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundPosition: "center", backgroundSize: "cover" };

  return (
    <>
      <Navbar />
      {loading && <Loading />}

      {!showErorr && !loading && (
        <div className="     ">
          <div className="mt-[108px] md:mt-14     shadow bg-white  ">
            {/* PROFILE HEADER */}
            <div className="   bg-slate-200 mb-3 pb-3">
              <div className=" w-full flex justify-center h-[348px] ">
                <div className="flex flex-col container">
                  <div style={backgroundImageStyle} className="h-[348px] w-full   relative bg-gray-100 rounded-bl-lg rounded-br-lg                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400">
                    {showEditButton && (
                      <div className="cursor-pointer absolute top-1 right-1 text-white w-10 h-10 rounded bg-blue-500">
                        <CoverUploadButton setRefresh={setRefresh} />
                      </div>
                    )}
                    {/* // cover photo */}

                    <div className=" rounded-full absolute  top-48 inset-x-96 border-4 border-white bg-slate-500 w-40 h-40 flex justify-center items-center overflow-hidden" style={{ left: "calc(50% - 5rem)" }}>
                      {/* profile photo */}
                      {searchedUser.profilePicture && <img className="  w-40 h-40  " src={startsWithUploads.test(searchedUser.profilePicture) ? authState.backSiteURL + searchedUser.profilePicture : searchedUser.profilePicture} alt="Profile picture" />}
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
                <div className="name mb-2 flex flex-col items-center lg:grid   lg:grid-cols-3 grid-flow-col">
                  <div className="col-start-2 col-end-3 flex justify-center items-center">
                    {!showEditName && <h1 className="  text-center text-blue-500 font-bold text-3xl">{searchedUser.firstName + " " + searchedUser.lastName}</h1>}
                    {!showEditName && showEditButton ? <CiEdit onClick={() => SetShowEditName(true)} className="  cursor-pointer  w-6 h-6  text-blue-500" /> : ""}
                    {showEditName && showEditButton ? <NameUpdateForm SetShowEditName={SetShowEditName} setRefresh={setRefresh} /> : ""}
                  </div>
                  {!showEditButton && <FollowFriend showAcceptFriend={showAcceptFriend} setAccedptFriend={setAccedptFriend} showPendingfriend={showPendingfriend} showUnfriend={showUnfriend} showUnfollow={showUnfollow} setRefresh={setRefresh} fndNumber={frndNumber} setFrndNumber={setFrndNumber} flwNumber={flwNumber} setFlwNumber={setFlwNumber} personToFollow={searchedUser._id} />}
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
            {/* Create Post Area */}
            {showEditButton && <CreatePostForm SetAllPosts={SetAllPosts} />}
            {/* Create Post Area Ends*/}

            {/* // CONTENT */}

            <div className=" min-h-[40vh]  container mx-auto">
              <div className="flex flex-col items-center w-full justify-center  ">
                {/* // POST */}
                {allPosts.length > 0 ? (
                  allPosts.map((post) => <SinglePost key={post._id} searchedUser={searchedUser} post={post} allPosts={allPosts} SetAllPosts={SetAllPosts} />)
                ) : (
                  <div className="flex flex-col justify-center items-center min-h-[40vh]  w-full">
                    <MdOutlineContentPasteSearch className="text-red-500 bold text-7xl" />
                    <h3 className="text-blue-500 bold text-5xl">No Posts published yet.!</h3>
                  </div>
                )}
                {/* // END POST */}
              </div>
            </div>

            {/* // END CONTENT */}
          </div>
        </div>
      )}
      {!loading && showErorr && <ErrorPage />}
      <Footer />
    </>
  );
}

export default ProfilePage;

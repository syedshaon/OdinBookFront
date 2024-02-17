//
// Used to show Single post on any user's profile
//
// Post's that appear on the homepage uses FollowedSinglePost.jsx
//

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AddCommentForm from "./AddCommentForm";
import { IKImage } from "imagekitio-react";

import ToggleLikesForm from "./ToggleLikesForm";
import { BiSolidCommentAdd } from "react-icons/bi";
import CommentList from "./CommentList";
import { IoPersonSharp } from "react-icons/io5";

function SinglePost({ post, searchedUser, SetAllPosts, allPosts }) {
  const authState = useSelector((state) => state.auth);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const startsWithUploads = /^uploads/;
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  return (
    <div className="w-full bg-white p-4 my-4 mt-10 rounded-md shadow-lg  ">
      {/* POST AUTHOR */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-2 items-center">
          <div className="relative">
            {/* Assuming you have a variable for the profile picture */}

            {searchedUser.profilePicture ? <img src={startsWithUploads.test(searchedUser.profilePicture) ? authState.backSiteURL + searchedUser.profilePicture : searchedUser.profilePicture} alt="Profile picture" className="w-10 h-10 rounded-full" /> : <IoPersonSharp className="w-10 h-10 rounded-full" />}
          </div>
          <div>
            <NavLink to={`../user/${searchedUser.username}`}>
              <p className="font-semibold text-blue-500">{searchedUser.firstName + " " + searchedUser.lastName}</p>
            </NavLink>

            <span className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleDateString("en-US", options)}</span>
          </div>
        </div>
        <div className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer">
          <i className="bx bx-dots-horizontal-rounded"></i>
        </div>
      </div>
      {/* END POST AUTHOR */}
      {/* POST CONTENT */}
      <div className="text-justify  px-4 py-2">
        {/* {post.thumbnail && <img src={`data:image/png;base64,${post.thumbnail}`} alt="Thumbnail Preview" className="max-w-full max-h-[500px] mx-auto h-auto rounded" />} */}

        {post.thumbnail && <IKImage className="max-w-full max-h-[500px] mx-auto h-auto rounded" urlEndpoint="https://ik.imagekit.io/odinbook" alt="Thumbnail Preview" path={post.thumbnail} />}
      </div>
      <div className="text-justify px-4 py-2">
        <p className="bold  mx-10">{post.text}</p>
      </div>
      {/* END POST CONTENT */}
      {/* POST ACTION */}
      <div className="py-2 px-4">
        <div className="border border-gray-200 border-l-0 border-r-0 py-1">
          <div className="flex justify-between items-center space-x-2">
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
              <i className="bx bx-like"></i>
              <span className=" text-sm font-semibold   text-blue-500 flex items-center gap-3">
                <ToggleLikesForm SetAllPosts={SetAllPosts} allPosts={allPosts} postId={post._id} /> {post.likes.length}
              </span>
            </div>
            <div onClick={() => setShowAddComment((prev) => !prev)} className="flex justify-center items-center w-1/3 hover:bg-gray-100   py-2 rounded-lg  cursor-pointer text-blue-500 font-semibold">
              <BiSolidCommentAdd />
            </div>
            <div
              onClick={() => {
                setShowComment((prev) => !prev);
              }}
              className=" w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100   py-2 rounded-lg cursor-pointer text-gray-500"
            >
              <span className="text-sm  text-blue-500 font-semibold">{post.comments.length} comments</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`transition-opacity duration-500 ${showAddComment ? "opacity-100" : "opacity-0"}`}>{showAddComment && <AddCommentForm SetAllPosts={SetAllPosts} allPosts={allPosts} searchedUser={searchedUser} postId={post._id} />}</div>
      <div className={`transition-opacity duration-500 ${showComment ? "opacity-100" : "opacity-0"}`}>{showComment && <CommentList comments={post.comments} />}</div>

      {/* END POST ACTION */}
    </div>
  );
}

export default SinglePost;

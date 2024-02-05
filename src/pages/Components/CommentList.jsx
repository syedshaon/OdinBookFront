import React from "react";
import { useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const CommentList = ({ comments }) => {
  const authState = useSelector((state) => state.auth);
  const startsWithUploads = /^uploads/;
  return (
    <div className="space-y-4">
      {comments
        .slice()
        .reverse()
        .map((comment) => (
          <div key={comment._id} className="flex items-start space-x-4">
            {comment.provider.profilePicture ? <img src={startsWithUploads.test(comment.provider.profilePicture) ? authState.backSiteURL + comment.provider.profilePicture : comment.provider.profilePicture} alt="Profile picture" className="w-10 h-10 rounded-full" /> : <IoPersonSharp className="w-10 h-10 rounded-full" />}

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <NavLink to={`../user/${comment.provider.username}`}>
                  <span className="font-semibold text-blue-500">
                    {comment.provider.firstName} {comment.provider.lastName}
                  </span>
                </NavLink>

                <span className="text-gray-500 text-sm">{formatTime(comment.time)}</span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

const formatTime = (timeString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  return new Date(timeString).toLocaleDateString("en-US", options);
};

export default CommentList;

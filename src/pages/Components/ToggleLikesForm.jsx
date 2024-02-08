import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegThumbsUp } from "react-icons/fa";

const ToggleLikesForm = ({ postId, SetAllPosts, allPosts }) => {
  const authState = useSelector((state) => state.auth);
  const handleToggleLike = async () => {
    try {
      const response = await fetch(authState.backendURL + "/posts/toggleLike/" + postId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });
      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        console.log("Response from backend:", responseData.message);

        return;
      }

      // Find the post in the current state
      const updatedPosts = allPosts.map((p) => {
        if (p._id === postId) {
          // Check if the user has already liked the post
          const isLiked = p.likes.some((like) => like.provider === authState.user._id);

          if (isLiked) {
            // If liked, remove the like
            p.likes = p.likes.filter((like) => like.provider !== authState.user._id);
          } else {
            // If not liked, add the like
            p.likes.push({ provider: authState.user._id });
          }
        }
        return p;
      });

      // Update the state with the modified posts array
      SetAllPosts(updatedPosts);
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
    }
  };

  return <FaRegThumbsUp className="cursor-pointer" onClick={handleToggleLike} />;
};

export default ToggleLikesForm;

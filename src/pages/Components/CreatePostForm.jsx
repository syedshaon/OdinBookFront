import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";

const CreatePostForm = ({ SetAllPosts }) => {
  const authState = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const startsWithUploads = /^uploads/;
  const inputRef = useRef();

  useEffect(() => {
    // Focus on the input element when the component mounts
    inputRef.current.focus();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  // {authState.user.profilePicture ? <img src={startsWithUploads.test(authState.user.profilePicture) ? authState.backSiteURL + authState.user.profilePicture : authState.user.profilePicture} alt="Profile picture" className="w-9 h-9 rounded-full" /> : <IoPersonSharp className="w-9 h-9 rounded-full" />}

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (e.target.value) {
      setShowError(false);
    }
  };

  const handleThumbnailChange = (e) => {
    // Assuming you have a single file input for the thumbnail
    const file = e.target.files[0];
    if (file) {
      setShowError(false);
    }
    setThumbnail(file);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!text && !thumbnail) {
      setShowError(true);
      return;
    }
    if (text.replace(/\s/g, "").length == 0 && !thumbnail) {
      setShowError(true);
      return;
    }

    // console.log(formData);

    // Call a function to send data to the backend API
    sendDataToBackend({ text: text, thumbnail: thumbnail });
  };

  const sendDataToBackend = async (data) => {
    const postData = new FormData();
    // postData.append("file", file);
    Object.entries(data).forEach(([key, value]) => {
      postData.append(key, value);
    });
    try {
      const response = await fetch(authState.backendURL + "/posts/create", {
        method: "POST",
        encType: "multipart/form-data",
        headers: {
          authorization: authState.token,
        },
        body: postData,
      });
      const responseData = await response.json();
      console.log(responseData);
      setThumbnail(null);
      setText("");
      if (!response.ok) {
        console.log("Response from backend:", responseData.message);
        seterrorMessage(responseData.message);
        return;
      }

      SetAllPosts((prevPosts) => [responseData, ...prevPosts]);

      // Handle the successful response (if needed)

      // console.log("Response from backend:", responseData.message);

      // Hide signup form
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
    }
  };

  return (
    <div className="bg-white p-4 my-4 rounded-md shadow-md container">
      <div className="flex">
        {authState.user.profilePicture ? <img src={startsWithUploads.test(authState.user.profilePicture) ? authState.backSiteURL + authState.user.profilePicture : authState.user.profilePicture} alt="Profile picture" className="rounded-full h-10 w-10 mr-2" /> : <IoPersonSharp className="rounded-full h-10 w-10 mr-2" />}

        <textarea ref={inputRef} maxLength="200" placeholder={`What's on your mind ${authState.user.firstName}?`} value={text} onChange={handleTextChange} className="bg-gray-300 text-black placeholder:text-black rounded-md flex-1 min-h-[90px] px-3 py-2 border  resize-none focus:outline-none" />
      </div>

      {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail Preview" className="my-2 rounded-md mx-auto shadow-md max-h-40" />}

      <div className="flex justify-between items-center">
        <label className="my-2 ml-12 flex items-center space-x-2">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">Choose Image</span>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
        </label>
        {errorMessage && <p className="text-red-500 errorMessage">{errorMessage}</p>}

        <div className="relative  ">
          <button onClick={handlePostSubmit} className="bg-blue-500 text-white px-8 py-2   rounded-md hover:bg-blue-600 focus:outline-none">
            Post
          </button>
          {showError && <p className="absolute text-red-400 font-semibold top-3 w-[165px]  right-24">Text/Image Required!</p>}
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;

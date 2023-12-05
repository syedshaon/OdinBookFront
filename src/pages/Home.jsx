import Navbar from "./Navbar";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// const postsData = [
//   {
//     _id: 1,
//     title: "Sample Post",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ipsum dolor sit amet, consectetur adipiscing elit. ipsum dolor sit amet, consectetur adipiscing elit. ...",
//   },
//   // Add more posts as needed
// ];

function Home() {
  const authState = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [msg, setMsg] = useState("");
  const [responseFromBackEnd, setResponseFromBackEnd] = useState(null);
  const navigateTo = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("https://good-news-backend.onrender.com/authorAPI/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      const responseData = await response.json();
      // console.log(responseData);
      if (!response.ok) {
        console.log(responseData.message);
        // Handle error if needed
        return;
      }
      if (responseData.message) {
        console.log(responseData.message);
        // Handle error if needed
        setMsg(responseData.message);
        return;
      }

      setPosts(responseData.posts);
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (postId) => {
    // Implement delete functionality
    // setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    // console.log(`Delete post with id ${postId}`);

    try {
      const response = await fetch("https://good-news-backend.onrender.com/authorAPI/posts/" + postId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      const responseData = await response.json();
      // console.log(responseData);

      if (!response.ok) {
        // console.log("Response from backend:", responseData.message);
        setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }

      // Handle the successful response (if needed)

      // console.log("Response from backend:", responseData.message);

      // Hide signup form
      setResponseFromBackEnd(responseData.message);

      // Redirect to "/login" after 1500 milliseconds (1.5 seconds)
      const timeoutId = setTimeout(() => {
        navigateTo(0);
      }, 2500);

      // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);

      // Reset the form after successful submission
      setFormData({
        title: "",
        published: "draft",
      });
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  const DateFormat = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-8 mb-16">
        <h1 className="text-3xl font-bold mb-4">{posts.length > 0 ? "Post List" : "You have no posts yet."}</h1>
        {responseFromBackEnd && <h3 className="response text-orange-500 text-xl font-bold container mx-auto text-center">{responseFromBackEnd}</h3>}
        <div className="grid grid-cols-1  gap-4">
          {posts.length > 0 &&
            posts.map((post) => (
              <div key={post._id} className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">
                  {post.title} -- <span className="italic">({post.published})</span>
                </h2>

                <div className="mt-2 grid grid-cols-1 xl:grid-cols-4 gap-4  ">
                  <div className="text col-span-3  " dangerouslySetInnerHTML={{ __html: post.text }}></div>

                  <div className="details flex gap-2 items-center  justify-between col-span-1">
                    <p className="ml-auto">Published On: {post.timestamp ? new Date(post.timestamp).toISOString().split("T")[0] : "N/A"}</p>
                    <NavLink to={`/editpost/${post._id}`}>
                      <button className="  bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Edit</button>
                    </NavLink>
                    <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

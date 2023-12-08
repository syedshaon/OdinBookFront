import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button3 } from "../contents/Button";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authReducer";

function Read_Post() {
  const authState = useSelector((state) => state.auth);
  const [post, setPosts] = useState(null);
  const [msg, setMsg] = useState("");
  const [responseFromBackEnd, setResponseFromBackEnd] = useState(null);
  const navigateTo = useNavigate();

  const { postId } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(authState.backendURL + "authorAPI/posts/" + postId, {
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

      setPosts(responseData);
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
    const userConfirmed = confirm("Do you want to delete that post?");
    if (userConfirmed) {
      try {
        const response = await fetch(authState.backendURL + "authorAPI/posts/" + postId, {
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
          navigateTo("/");
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
    } else {
      console.log("User Cancelled.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 mb-16 min-h-[800px]">
        {post && (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            {post.thumbnail && <img className="mx-auto" src={authState.backendURL + post.thumbnail} alt="post thumbnail"></img>}
            {post.excerpt && <p className="text-sm p-2 bg-emerald-50">{post.excerpt}</p>}
            <h2 className="text-xl pb-2  border-b-8  border-orange-600   mt-10 font-bold mb-2">
              {post.title} -- <span className="italic">({post.published})</span>
            </h2>
            <p className=" ">Published On: {post.timestamp ? new Date(post.timestamp).toISOString().split("T")[0] : "N/A"}</p>
            <div className="mt-10   ">
              <div className="text    " dangerouslySetInnerHTML={{ __html: post.text }}></div>

              <div className="details mt-10 flex gap-6  justify-start col-span-1">
                <NavLink to={`/editpost/${postId}`}>
                  <button className="    text-blue-600 border border-blue-600 px-4 py-2 rounded hover:text-orange-500 hover:border-orange-500    focus:border-orange-500 text-sm">Edit</button>
                </NavLink>
                <button onClick={() => handleDelete(postId)} className="    text-red-500 border border-red-500 px-4 py-2 rounded hover:text-emerald-500 hover:border-emerald-500    focus:border-emerald-500 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Read_Post;

import Navbar from "./Navbar";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FollowedSinglePost from "./Components/FollowedSinglePost";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import CreatePostForm from "./Components/CreatePostForm";
import Loading from "./Loading";

function Home() {
  const authState = useSelector((state) => state.auth);
  const [allPosts, SetAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Set loading to true while fetching data
      setLoading(true);
      const response = await fetch(authState.backendURL + "/posts/followedUsersPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      const responseData = await response.json();
      // console.log(responseData.posts);
      if (!response.ok) {
        console.log(responseData);
        // Handle error if needed
        return;
      }
      // console.log(responseData);
      SetAllPosts(responseData.posts);
    } catch (error) {
      console.log(error);
      // Handle error if needed
    } finally {
      // Set loading to false after fetch, whether successful or not
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-[120px] md:mt-20  ">
        <CreatePostForm />
      </div>

      <div className=" min-h-[40vh]   container mx-auto">
        {loading && <Loading />}
        {!loading && (
          <div className="flex flex-col items-center w-full justify-center  ">
            {/* // POST */}
            {allPosts.length > 0 ? (
              allPosts.map((post) => <FollowedSinglePost SetAllPosts={SetAllPosts} allPosts={allPosts} key={post._id} post={post} />)
            ) : (
              <div className="flex flex-col justify-center items-center min-h-[40vh]  w-full">
                <MdOutlineContentPasteSearch className="text-red-500 bold text-7xl" />
                <h3 className="text-blue-500 bold text-5xl">No Posts to check.!</h3>
              </div>
            )}
            {/* // END POST */}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;

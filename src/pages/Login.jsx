import Footer from "./Footer";
import Navbar from "./Navbar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authReducer";

function Login() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const navigateTo = useNavigate();

  // if (authState.isLoggedIn) {
  //   navigateTo("/");
  //   return;
  // }

  useEffect(() => {
    // Check if the user is logged in
    if (authState.isLoggedIn) {
      // Redirect to the homepage
      navigateTo("/");
    }
  }, [authState.isLoggedIn]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [responseFromBackEnd, setResponseFromBackEnd] = useState(null);
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSigInSubmit = (e) => {
    e.preventDefault();

    // Call a function to send data to the backend API
    sendDataToBackend(formData);
  };

  // Function to send data to the backend API using fetch
  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch("https://good-news-backend.onrender.com/authorAPI/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

        credentials: "include",
      });

      if (!response.ok) {
        const responseData = await response.json();
        // console.log("Response from backend:", responseData.message);
        setResponseFromBackEnd(responseData.message);
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }
      // Handle the successful response (if needed)
      const responseData = await response.json();
      console.log("Response from backend:", responseData);

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expire", responseData.expire);
      dispatch(authActions.login({ firstName: responseData.firstName, token: responseData.token, expire: responseData.expire }));

      // Hide signup form
      setResponseFromBackEnd("Logged In Successfully. Redirecting to homepage....");

      // Redirect to "/home" after 1500 milliseconds (1.5 seconds)
      const timeoutId = setTimeout(() => {
        navigateTo("/");
      }, 1500);

      // // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);

      // Reset the form after successful submission
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    !authState.isLoggedIn && (
      <div>
        <Navbar />
        <div className="bg-emerald-100 h-screen relative lg:py-20">
          {responseFromBackEnd && <h3 className="response text-orange-500 text-xl font-bold container mx-auto text-center">{responseFromBackEnd}</h3>}
          <div
            className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row"
          >
            <div className="flex flex-col items-center justify-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <form
                  onSubmit={handleSigInSubmit}
                  className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10"
                >
                  <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Sign In</p>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                      <input
                        value={formData.email}
                        onChange={handleInputChange}
                        name="email"
                        placeholder="123@ex.com"
                        type="email"
                        className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <p
                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
                      >
                        Password
                      </p>
                      <input
                        value={formData.password}
                        onChange={handleInputChange}
                        name="password"
                        placeholder="Password"
                        type="password"
                        className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <button
                        className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-emerald-500
                  rounded-lg transition duration-200 hover:bg-emerald-600 ease"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
                <svg
                  viewBox="0 0 91 91"
                  className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-orange-300
            fill-current"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g fillRule="nonzero">
                      <g>
                        <g>
                          <circle cx="3.261" cy="3.445" r="2.72" />
                          <circle cx="15.296" cy="3.445" r="2.719" />
                          <circle cx="27.333" cy="3.445" r="2.72" />
                          <circle cx="39.369" cy="3.445" r="2.72" />
                          <circle cx="51.405" cy="3.445" r="2.72" />
                          <circle cx="63.441" cy="3.445" r="2.72" />
                          <circle cx="75.479" cy="3.445" r="2.72" />
                          <circle cx="87.514" cy="3.445" r="2.719" />
                        </g>
                        <g transform="translate(0 12)">
                          <circle cx="3.261" cy="3.525" r="2.72" />
                          <circle cx="15.296" cy="3.525" r="2.719" />
                          <circle cx="27.333" cy="3.525" r="2.72" />
                          <circle cx="39.369" cy="3.525" r="2.72" />
                          <circle cx="51.405" cy="3.525" r="2.72" />
                          <circle cx="63.441" cy="3.525" r="2.72" />
                          <circle cx="75.479" cy="3.525" r="2.72" />
                          <circle cx="87.514" cy="3.525" r="2.719" />
                        </g>
                        <g transform="translate(0 24)">
                          <circle cx="3.261" cy="3.605" r="2.72" />
                          <circle cx="15.296" cy="3.605" r="2.719" />
                          <circle cx="27.333" cy="3.605" r="2.72" />
                          <circle cx="39.369" cy="3.605" r="2.72" />
                          <circle cx="51.405" cy="3.605" r="2.72" />
                          <circle cx="63.441" cy="3.605" r="2.72" />
                          <circle cx="75.479" cy="3.605" r="2.72" />
                          <circle cx="87.514" cy="3.605" r="2.719" />
                        </g>
                        <g transform="translate(0 36)">
                          <circle cx="3.261" cy="3.686" r="2.72" />
                          <circle cx="15.296" cy="3.686" r="2.719" />
                          <circle cx="27.333" cy="3.686" r="2.72" />
                          <circle cx="39.369" cy="3.686" r="2.72" />
                          <circle cx="51.405" cy="3.686" r="2.72" />
                          <circle cx="63.441" cy="3.686" r="2.72" />
                          <circle cx="75.479" cy="3.686" r="2.72" />
                          <circle cx="87.514" cy="3.686" r="2.719" />
                        </g>
                        <g transform="translate(0 49)">
                          <circle cx="3.261" cy="2.767" r="2.72" />
                          <circle cx="15.296" cy="2.767" r="2.719" />
                          <circle cx="27.333" cy="2.767" r="2.72" />
                          <circle cx="39.369" cy="2.767" r="2.72" />
                          <circle cx="51.405" cy="2.767" r="2.72" />
                          <circle cx="63.441" cy="2.767" r="2.72" />
                          <circle cx="75.479" cy="2.767" r="2.72" />
                          <circle cx="87.514" cy="2.767" r="2.719" />
                        </g>
                        <g transform="translate(0 61)">
                          <circle cx="3.261" cy="2.846" r="2.72" />
                          <circle cx="15.296" cy="2.846" r="2.719" />
                          <circle cx="27.333" cy="2.846" r="2.72" />
                          <circle cx="39.369" cy="2.846" r="2.72" />
                          <circle cx="51.405" cy="2.846" r="2.72" />
                          <circle cx="63.441" cy="2.846" r="2.72" />
                          <circle cx="75.479" cy="2.846" r="2.72" />
                          <circle cx="87.514" cy="2.846" r="2.719" />
                        </g>
                        <g transform="translate(0 73)">
                          <circle cx="3.261" cy="2.926" r="2.72" />
                          <circle cx="15.296" cy="2.926" r="2.719" />
                          <circle cx="27.333" cy="2.926" r="2.72" />
                          <circle cx="39.369" cy="2.926" r="2.72" />
                          <circle cx="51.405" cy="2.926" r="2.72" />
                          <circle cx="63.441" cy="2.926" r="2.72" />
                          <circle cx="75.479" cy="2.926" r="2.72" />
                          <circle cx="87.514" cy="2.926" r="2.719" />
                        </g>
                        <g transform="translate(0 85)">
                          <circle cx="3.261" cy="3.006" r="2.72" />
                          <circle cx="15.296" cy="3.006" r="2.719" />
                          <circle cx="27.333" cy="3.006" r="2.72" />
                          <circle cx="39.369" cy="3.006" r="2.72" />
                          <circle cx="51.405" cy="3.006" r="2.72" />
                          <circle cx="63.441" cy="3.006" r="2.72" />
                          <circle cx="75.479" cy="3.006" r="2.72" />
                          <circle cx="87.514" cy="3.006" r="2.719" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <svg
                  viewBox="0 0 91 91"
                  className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-emerald-500
            fill-current"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g fillRule="nonzero">
                      <g>
                        <g>
                          <circle cx="3.261" cy="3.445" r="2.72" />
                          <circle cx="15.296" cy="3.445" r="2.719" />
                          <circle cx="27.333" cy="3.445" r="2.72" />
                          <circle cx="39.369" cy="3.445" r="2.72" />
                          <circle cx="51.405" cy="3.445" r="2.72" />
                          <circle cx="63.441" cy="3.445" r="2.72" />
                          <circle cx="75.479" cy="3.445" r="2.72" />
                          <circle cx="87.514" cy="3.445" r="2.719" />
                        </g>
                        <g transform="translate(0 12)">
                          <circle cx="3.261" cy="3.525" r="2.72" />
                          <circle cx="15.296" cy="3.525" r="2.719" />
                          <circle cx="27.333" cy="3.525" r="2.72" />
                          <circle cx="39.369" cy="3.525" r="2.72" />
                          <circle cx="51.405" cy="3.525" r="2.72" />
                          <circle cx="63.441" cy="3.525" r="2.72" />
                          <circle cx="75.479" cy="3.525" r="2.72" />
                          <circle cx="87.514" cy="3.525" r="2.719" />
                        </g>
                        <g transform="translate(0 24)">
                          <circle cx="3.261" cy="3.605" r="2.72" />
                          <circle cx="15.296" cy="3.605" r="2.719" />
                          <circle cx="27.333" cy="3.605" r="2.72" />
                          <circle cx="39.369" cy="3.605" r="2.72" />
                          <circle cx="51.405" cy="3.605" r="2.72" />
                          <circle cx="63.441" cy="3.605" r="2.72" />
                          <circle cx="75.479" cy="3.605" r="2.72" />
                          <circle cx="87.514" cy="3.605" r="2.719" />
                        </g>
                        <g transform="translate(0 36)">
                          <circle cx="3.261" cy="3.686" r="2.72" />
                          <circle cx="15.296" cy="3.686" r="2.719" />
                          <circle cx="27.333" cy="3.686" r="2.72" />
                          <circle cx="39.369" cy="3.686" r="2.72" />
                          <circle cx="51.405" cy="3.686" r="2.72" />
                          <circle cx="63.441" cy="3.686" r="2.72" />
                          <circle cx="75.479" cy="3.686" r="2.72" />
                          <circle cx="87.514" cy="3.686" r="2.719" />
                        </g>
                        <g transform="translate(0 49)">
                          <circle cx="3.261" cy="2.767" r="2.72" />
                          <circle cx="15.296" cy="2.767" r="2.719" />
                          <circle cx="27.333" cy="2.767" r="2.72" />
                          <circle cx="39.369" cy="2.767" r="2.72" />
                          <circle cx="51.405" cy="2.767" r="2.72" />
                          <circle cx="63.441" cy="2.767" r="2.72" />
                          <circle cx="75.479" cy="2.767" r="2.72" />
                          <circle cx="87.514" cy="2.767" r="2.719" />
                        </g>
                        <g transform="translate(0 61)">
                          <circle cx="3.261" cy="2.846" r="2.72" />
                          <circle cx="15.296" cy="2.846" r="2.719" />
                          <circle cx="27.333" cy="2.846" r="2.72" />
                          <circle cx="39.369" cy="2.846" r="2.72" />
                          <circle cx="51.405" cy="2.846" r="2.72" />
                          <circle cx="63.441" cy="2.846" r="2.72" />
                          <circle cx="75.479" cy="2.846" r="2.72" />
                          <circle cx="87.514" cy="2.846" r="2.719" />
                        </g>
                        <g transform="translate(0 73)">
                          <circle cx="3.261" cy="2.926" r="2.72" />
                          <circle cx="15.296" cy="2.926" r="2.719" />
                          <circle cx="27.333" cy="2.926" r="2.72" />
                          <circle cx="39.369" cy="2.926" r="2.72" />
                          <circle cx="51.405" cy="2.926" r="2.72" />
                          <circle cx="63.441" cy="2.926" r="2.72" />
                          <circle cx="75.479" cy="2.926" r="2.72" />
                          <circle cx="87.514" cy="2.926" r="2.719" />
                        </g>
                        <g transform="translate(0 85)">
                          <circle cx="3.261" cy="3.006" r="2.72" />
                          <circle cx="15.296" cy="3.006" r="2.719" />
                          <circle cx="27.333" cy="3.006" r="2.72" />
                          <circle cx="39.369" cy="3.006" r="2.72" />
                          <circle cx="51.405" cy="3.006" r="2.72" />
                          <circle cx="63.441" cy="3.006" r="2.72" />
                          <circle cx="75.479" cy="3.006" r="2.72" />
                          <circle cx="87.514" cy="3.006" r="2.719" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  );
}

export default Login;

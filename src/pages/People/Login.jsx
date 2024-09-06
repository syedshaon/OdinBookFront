import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authReducer";
import { userActions } from "../../store/userReducer";
import { messengerActions } from "../../store/messenger_reducer";
import Loading from "../Loading";
import { FcGoogle } from "react-icons/fc";

const isFacebookApp = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
};

function Login() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [showLoading, setShowLoading] = useState(true);
  const [showResetPW, setResetPW] = useState(false);
  const [showVerify, setVerify] = useState(false);

  const navigateTo = useNavigate();

  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    if (isFacebookApp() && !window.location.href.includes("redirect_fb")) {
      setIsWebView(true);
    }
  }, []);

  if (authState.isLoggedIn) {
    navigateTo("/");
    return;
  }

  useEffect(() => {
    // Check if the user is logged in
    if (authState.isLoggedIn) {
      // Redirect to the previous page or a default page
      const previousPage = navigateTo.location.state?.from || "/";

      // Redirect to the previous page after 1500 milliseconds (1.5 seconds)
      const timeoutId = setTimeout(() => {
        // Use navigate from 'react-router-dom' instead of history.push
        navigateTo(previousPage);
      }, 1500);

      // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);
    }
  }, [authState.isLoggedIn, navigateTo]);

  setTimeout(() => {
    setShowLoading(false);
  }, 1000);

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

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    // Call a function to send data to the backend API
    sendDataToBackend(formData);
  };

  // Function to send data to the backend API using fetch
  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/signin", {
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
        if (responseData.type === "verify") {
          setVerify(true);
        }
        if (responseData.type === "wrongPW") {
          setResetPW(true);
        }
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }
      // Handle the successful response (if needed)
      const responseData = await response.json();
      // console.log("Response from backend:", responseData);

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expire", responseData.expire);
      localStorage.setItem("currentUser", JSON.stringify(responseData.user));

      dispatch(authActions.login({ user: responseData.user, token: responseData.token, expire: responseData.expire }));
      dispatch(userActions.setCurrentUser({ user: responseData.user }));
      dispatch(messengerActions.setCurrentUser({ user: responseData.user }));

      // Hide signup form
      setResponseFromBackEnd("Logged In Successfully. ....");

      // Redirect to the previous page or a default page
      const previousPage = navigateTo.location.state?.from || "/";

      // Redirect to "/home" after 1500 milliseconds (1.5 seconds)
      const timeoutId = setTimeout(() => {
        history.push(previousPage);
        // navigateTo("/");
      }, 1500);

      // // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    <>
      {!showLoading ? (
        <>
          <section className="mt-5 md:mt-0 text-gray-600 body-font bg-gray-100 h-screen flex pt-[20%] md:pt-0 items-start md:items-center ">
            <div className="container xl:px-32 px-5  mx-auto flex flex-wrap items-center justify-center  ">
              <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 className="title-font font-bold lg:text-4xl text-3xl text-blue-600 text-center md:text-left ">Odinbook</h1>
                <p className="leading-relaxed mt-4 lg:text-xl text-md lg:max-w-xl font-medium  text-black text-center md:text-left ">Odinbook helps you connect and share with the people.</p>
              </div>
              <div className="mt-4 lg:w-2/6 md:w-1/2 bg-white shadow-xl  rounded-lg p-8">
                {responseFromBackEnd && <h3 className="response mb-3 text-orange-500 text-md font-bold container mx-auto text-center">{responseFromBackEnd}</h3>}
                <form onSubmit={handleSignInSubmit} className=" flex flex-col md:ml-auto w-full  ">
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="  mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required className="  mb-2 md:mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                  <button className=" mt-3  cursor-pointer text-white border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-blue-600 ">Sign In</button>

                  <div className="flex w-full items-center justify-center gap-3 my-3">
                    <button
                      onClick={() =>
                        sendDataToBackend({
                          email: "Blake_Brekke91@gmail.com",
                          password: "AQ222sdddfdg3234!@",
                        })
                      }
                      className="w-1/2 cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-blue-600 "
                    >
                      Guest 1
                    </button>
                    <button
                      onClick={() =>
                        sendDataToBackend({
                          email: "Khalil_Stark16@gmail.com",
                          password: "AQ222sdddfdg3234!@",
                        })
                      }
                      className="w-1/2 cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-blue-600 "
                    >
                      Guest 2
                    </button>
                  </div>

                  <hr className="my-3" />

                  <div className="flex w-full items-center justify-between    mb-3">
                    <button onClick={() => navigateTo("/signup")} className="w-1/2 cursor-pointer text-black  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-gray-200">
                      Sign Up
                    </button>

                    {!isWebView && (
                      <>
                        <a className="ml-2 flex items-center gap-2 w-1/2 cursor-pointer text-black  border-0 py-2 px-3 lg:px-8 focus:outline-none font-medium  rounded text-md bg-gray-200 " href={`${authState.backSiteURL}auth/google_signin`}>
                          <FcGoogle /> Sign In
                        </a>

                        <hr className="my-3" />
                      </>
                    )}
                  </div>

                  {showResetPW && (
                    <>
                      <hr className="my-3" />

                      <button onClick={() => navigateTo("/get-reset-password")} className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-600">
                        Reset Password
                      </button>
                    </>
                  )}

                  {showVerify && (
                    <>
                      <hr className="my-3" />

                      <button onClick={() => navigateTo("/get-verification-email")} className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-700 ">
                        Get Verification Email
                      </button>
                    </>
                  )}
                </form>
                {/* <div className=" flex flex-col md:ml-auto w-full  "> */}
                {/* <hr className="my-3" />

                <a className="fb btn cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-md bg-green-600 flex justify-center" href={`${authState.backSiteURL}auth/facebook_signin`}>
                  <i className="fa fa-facebook fa-fw" /> Continue with Facebook
                </a> */}

                {/* </div> */}
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Login;

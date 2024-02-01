import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authReducer";
import { userActions } from "../../store/userReducer";

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
        // console.error("Error sending data to backend:", response);
        // throw new Error("Network response was not ok");
        return;
      }
      // Handle the successful response (if needed)
      const responseData = await response.json();
      console.log("Response from backend:", responseData);

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expire", responseData.expire);
      localStorage.setItem("currentUser", JSON.stringify(responseData.user));

      dispatch(authActions.login({ user: responseData.user, token: responseData.token, expire: responseData.expire }));
      dispatch(userActions.setCurrentUser({ user: responseData.user }));

      // Hide signup form
      setResponseFromBackEnd("Logged In Successfully. Redirecting to homepage....");

      // Redirect to "/home" after 1500 milliseconds (1.5 seconds)
      const timeoutId = setTimeout(() => {
        navigateTo("/");
      }, 1500);

      // // Cleanup the timeout on component unmount or if the redirect happens
      return () => clearTimeout(timeoutId);
    } catch (err) {
      // console.log("Error sending data to backend:", err.message);
      setResponseFromBackEnd("Error sending data to backend: " + err.message);
    }
  };

  return (
    !authState.isLoggedIn && (
      <section className="text-gray-600 body-font bg-gray-100 h-screen flex items-center ">
        <div className="container xl:px-32 px-5  mx-auto flex flex-wrap items-center justify-center  ">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-bold lg:text-5xl text-6xl text-blue-600 text-center md:text-left ">Odinbook</h1>
            <p className="leading-relaxed mt-4 lg:text-2xl text-xl lg:max-w-xl font-medium  text-black text-center md:text-left ">Odinbook helps you connect and share with the people in your life.</p>
          </div>
          <div className="mt-10 lg:w-2/6 md:w-1/2 bg-white shadow-lg rounded-lg p-8">
            {responseFromBackEnd && <h3 className="response text-orange-500 text-xl font-bold container mx-auto text-center">{responseFromBackEnd}</h3>}
            <form onSubmit={handleSignInSubmit} className=" flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="  mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

              <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required className="  mb-4  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

              <button className=" mt-4  cursor-pointer text-white border-0 py-2 px-8 focus:outline-none font-medium  rounded text-xl bg-blue-600 ">Log In</button>

              <hr className="my-3" />

              <button onClick={() => navigateTo("/signup")} className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-xl bg-green-500 ">
                Sign Up
              </button>

              <hr className="my-3" />

              <button onClick={() => navigateTo("/get-reset-password")} className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-xl bg-green-600">
                Reset Password
              </button>

              <hr className="my-3" />

              <button onClick={() => navigateTo("/get-verification-email")} className="cursor-pointer text-white  border-0 py-2 px-8 focus:outline-none font-medium  rounded text-xl bg-green-700 ">
                Get Verification Email
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  );
}

export default Login;

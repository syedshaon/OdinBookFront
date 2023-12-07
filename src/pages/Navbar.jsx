import NavElmnt from "../contents/NavElmnt";
import Button, { Button3 } from "../contents/Button";

import { useState } from "react";
import { NavLink } from "react-router-dom";
// import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigateTo = useNavigate();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const Logout = async () => {
    try {
      const response = await fetch(authState.backendURL + "authorAPI/signout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: authState.token,
        },
      });

      const responseData = await response.json();

      if (responseData.logout === true) {
        localStorage.removeItem("token");
        localStorage.removeItem("expire");
        dispatch(authActions.logout());
        navigateTo("/");
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-emerald-100 bg-gradient-to-r from-white to-emerald-200     py-5">
      <div className="container  px-2 md:px-7  mx-auto    flex justify-between items-center">
        <NavLink to="/">
          <h1 className="flex items-start space-x-1">
            <span className="text-black text-xl font-bold ">Author</span>
            <span className="text-orange-600 text-xl font-bold ">Zone</span>
          </h1>
        </NavLink>

        <nav className="lg:flex hidden items-center space-x-30">
          {authState.isLoggedIn && <p className="mr-5">Hello {authState.firstName}!</p>}

          {authState.isLoggedIn && (
            <NavLink to="/new_post">
              <Button text="Create a new post" hoverBG="emerald" />
            </NavLink>
          )}
          {authState.isLoggedIn && (
            <NavLink to="/update">
              <Button text="Update Profile" color="emerald" />
            </NavLink>
          )}

          {!authState.isLoggedIn && (
            <NavLink to="/login">
              <Button text="Login" hoverBG="emerald" />
            </NavLink>
          )}
          {!authState.isLoggedIn && (
            <NavLink to="/signup">
              <Button text="Sign Up" color="emerald" />
            </NavLink>
          )}

          {authState.isLoggedIn && (
            <NavLink onClick={Logout}>
              <Button3 text="Logout" color="orange" />
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu (Hamburger Icon) */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-black text-xl focus:outline-none transition-transform transform">
            {isMenuOpen ? (
              <span>&times;</span> // "X" icon
            ) : (
              <span>&#9776;</span> // Hamburger Icon
            )}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <nav className="lg:hidden fixed z-50 top-16 left-0 h-full w-full bg-fgreen bg-gradient-to-b from-emerald-100 to-emerald-100 ">
            <ul className=" text-center p-4 flex flex-col items-center space-y-4">
              {authState.isLoggedIn && <p className="mr-5">Hello {authState.firstName}!</p>}

              {authState.isLoggedIn && (
                <NavElmnt onClick={closeMenu}>
                  <NavLink to="/new_post">
                    <Button text="Create a new post" hoverBG="emerald" />
                  </NavLink>
                </NavElmnt>
              )}
              {authState.isLoggedIn && (
                <NavElmnt onClick={closeMenu}>
                  <NavLink to="/update">
                    <Button text="Update Profile" color="emerald" />
                  </NavLink>
                </NavElmnt>
              )}

              {!authState.isLoggedIn && (
                <NavElmnt onClick={closeMenu}>
                  <NavLink to="/login">
                    <Button text="Login" hoverBG="emerald" />
                  </NavLink>
                </NavElmnt>
              )}
              {!authState.isLoggedIn && (
                <NavElmnt onClick={closeMenu}>
                  <NavLink to="/signup">
                    <Button text="Sign Up" color="emerald" />
                  </NavLink>
                </NavElmnt>
              )}

              {authState.isLoggedIn && (
                <NavElmnt onClick={closeMenu}>
                  <NavLink onClick={Logout}>
                    <Button3 text="Logout" color="orange" />
                  </NavLink>
                </NavElmnt>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;

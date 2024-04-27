import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../../redux/slices/authSlice";
import useLocalStorage from "../../../customHooks/useLocalStorage";

function Navbar() {
  const { setDataToRedux } = useLocalStorage();

  useEffect(() => {
    setDataToRedux();
  }, []);
  const navigate = useNavigate();
  const { isUserLoggedIn, userData, userType, userId } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const redirectUserLogin = () => {
    navigate("/user-login");
  };
  const redirectFreelancerLogin = () => {
    navigate("/freelancer-login");
  };
  const redirectFreelancer = () => {
    navigate("/freelancer");
  };
  const redirectHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    if (localStorage.getItem("freelancerData")) {
      localStorage.removeItem("freelancerData");
    }
    dispatch(logoutSuccess());
    navigate("/");
  };
  const redirectUserRequest = () => {
    navigate("/user-request");
  };
  const redirectViewRequests = () => {
    navigate("/view-request");
  };

  const redirectMyRequests = () => {
    navigate("/user-myrequests");
  };
  const redirectProfile = () => {
    if (userType === "user") {
      navigate("/user-profile");
    }else if (userType === "freelancer") {
      navigate("/freelancer-profile");
    }
  }
  return (
    <div className="container-fluid bg-connect ">
      <div className="connect justify-content-center">
        <span>Marketplace Connect</span>
        <i className="bi bi-gear-wide-connected mx-3"></i>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav1"
            aria-controls="navbarNav1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav1"
          >
            <ul className="navbar-nav">
              <li
                className="nav-item m-3"
                style={{ cursor: "pointer" }}
                onClick={redirectHome}
              >
                <p className="nav-link">Home</p>
              </li>
              <li
                className="nav-item m-3"
                style={{ cursor: "pointer" }}
                onClick={redirectFreelancer}
              >
                <p className="nav-link">Freelancers</p>
              </li>

              {userType === "user" && (
                <li
                  style={{ cursor: "pointer" }}
                  className="nav-item m-3"
                  onClick={redirectUserRequest}
                >
                  <p className="nav-link">Request Work</p>
                </li>
              )}
              {userType === "freelancer" && (
                <li
                  className="nav-item m-3"
                  style={{ cursor: "pointer" }}
                  onClick={redirectViewRequests}
                >
                  <p className="nav-link">View Requests</p>
                </li>
              )}
              {userType === "user" && (
                <li
                  style={{ cursor: "pointer" }}
                  className="nav-item m-3"
                  onClick={redirectMyRequests}
                >
                  <p className="nav-link">My Requests</p>
                </li>
              )}
              {isUserLoggedIn ? (
                <>
                  <li className="nav-item m-3" style={{cursor: "pointer"}}>
                    {/* <p className="nav-link">Profile</p> */}
                    <p className="nav-link" onClick={redirectProfile}>Profile</p>
                  </li>
                  <li className="nav-item m-3 ">
                    {/* <p className="nav-link">Profile</p> */}
                    <p
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                      className="nav-link text-danger fw-bold"
                    >
                      Logout
                    </p>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown m-3">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Login
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li
                      onClick={redirectUserLogin}
                      style={{ cursor: "pointer" }}
                    >
                      <a className="dropdown-item">User</a>
                    </li>
                    <li
                      onClick={redirectFreelancerLogin}
                      style={{ cursor: "pointer" }}
                    >
                      <p className="dropdown-item">Freelancer</p>
                    </li>
                    {/* <li>
                    <a className="dropdown-item" href="#">
                      Admin
                    </a>
                  </li> */}
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

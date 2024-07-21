import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../../redux/slices/authSlice";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import { toast } from "react-hot-toast";

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

  const userFreelancerChat = () => {
    navigate("/user-freelancer-chat");
  };
  const userConsultancyChat = () => {
    navigate("/user-consultancy-chat");
  };

  const viewAllConsultancies = () => {
    navigate("/user-view-consultancies");
  };

  const redirectConsultancyLogin = () => {
    navigate("/consultancy-login");
  };

  const freelancerUserChat = () => {
    navigate("/freelancer-user-chat");
  };
  const handleLogout = () => {
    if (localStorage.getItem("freelancerData")) {
      localStorage.removeItem("freelancerData");
    }
    dispatch(logoutSuccess());

    if (userType === "user") {
      navigate("/user-login");
    } else if (userType === "freelancer") {
      navigate("/freelancer-login");
    } else if (userType === "consultancy") {
      navigate("/consultancy-login");
    } else {
      navigate("/");
    }
    toast.success("Logout Successfull");
  };

  const redirectViewRequests = () => {
    navigate("/view-request");
  };
  const redirectUserRequests = () => {
    navigate("/user-myrequests");
  };

  const redirectProfile = () => {
    if (userType === "user") {
      navigate("../user-profile");
    } else if (userType === "freelancer") {
      navigate("../freelancer-profile");
    } else if (userType === "consultancy") {
      navigate("../view-profile");
    }
  };
  const redirectWorkVacancies = () => {
    navigate("../consultancy-vacancy-request");
  };
  const redirectViewAllVacancies = () => {
    navigate("../view-all-vacancies");
  };

  const redirectMyVacancies = () => {
    navigate("../consultancy-my-vacancies");
  };

  const redirectToAppliedVacancies = () => {
    navigate("../view-all-applied-works");
  };
  const redirectToFreelancerAppliedVacancies = () => {
    navigate('/freelancer-applied-vacancies')
  }
  const redirectToFreelancerWorks = () => {
    navigate('/freelancer-my-works')
  }
  const consChatWithUser = () => {
    navigate("/consultancy-user-chat");
  };

  const redirectUserRequestWork = () => {
    navigate("/user-request");
  };

  const navigateToChat = (e) => {
    const value = e.target.value;
    console.log("Value", value);
    if (value === "freelancer-chat") {
      userFreelancerChat();
    } else if (value === "consultancyChat") {
      userConsultancyChat();
    }
  };
  return (
    <div className="container-fluid bg-connect " id="freelance-common-navbar">
      <div className="connect justify-content-center ">
        <span>FreelanceFlow</span>
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
                className="nav-item me-3"
                style={{ cursor: "pointer" }}
                onClick={redirectHome}
              >
                <p className="nav-link">Home</p>
              </li>
              <li
                className="nav-item me-3"
                style={{ cursor: "pointer" }}
                onClick={redirectFreelancer}
              >
                <p className="nav-link">Freelancers</p>
              </li>
              <li
                className="nav-item me-3"
                style={{ cursor: "pointer" }}
                onClick={viewAllConsultancies}
              >
                <p className="nav-link">Consultancies</p>
              </li>

              {userType === "user" && (
                <>
                  <li
                    style={{ cursor: "pointer" }}
                    className="nav-item me-3"
                    onClick={redirectUserRequestWork}
                  >
                    <p className="nav-link">Request Work</p>
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="nav-item me-3"
                    onClick={redirectUserRequests}
                  >
                    <p className="nav-link">My Requests</p>
                  </li>
                  <li style={{ cursor: "pointer" }} className="chat-drop-down nav-item me-3">
                    <select onChange={navigateToChat}>
                      <option value=""> Chat </option>
                      <option value="freelancer-chat"> Freelancer</option>
                      <option value="consultancyChat"> Consultancy </option>
                    </select>
                  </li>
                </>
              )}
              {userType === "consultancy" && (
                <>
                  <li
                    style={{ cursor: "pointer" }}
                    className="nav-item me-3"
                    onClick={redirectWorkVacancies}
                  >
                    <p className="nav-link">Add vacancies</p>
                  </li>

                  <li
                    style={{ cursor: "pointer" }}
                    className="nav-item me-3"
                    onClick={redirectMyVacancies}
                  >
                    <p className="nav-link">My Vacancies</p>
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="nav-item me-3"
                    onClick={redirectToAppliedVacancies}
                  >
                    <p className="nav-link">Applied Vacancies</p>
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="nav-item me-3"
                    onClick={consChatWithUser}
                  >
                    <p className="nav-link">Chat</p>
                  </li>
                </>
              )}
              {userType === "freelancer" && (
                <>
                  <li
                    className="nav-item me-3"
                    style={{ cursor: "pointer" }}
                    onClick={redirectViewRequests}
                  >
                    <p className="nav-link">View Requests</p>
                  </li>
                  <li
                    className="nav-item me-3"
                    style={{ cursor: "pointer" }}
                    onClick={redirectViewAllVacancies}
                  >
                    <p className="nav-link">View Vacancies</p>
                  </li>
                  <li
                    className="nav-item me-3"
                    style={{ cursor: "pointer" }}
                    onClick={freelancerUserChat}
                  >
                    <p className="nav-link">Chat</p>
                  </li>
                  <li
                    className="nav-item me-3"
                    style={{ cursor: "pointer" }}
                    onClick={redirectToFreelancerWorks}
                  >
                    <p className="nav-link">Works</p>
                  </li>
                  <li
                    className="nav-item me-3"
                    style={{ cursor: "pointer" }}
                    onClick={redirectToFreelancerAppliedVacancies}
                  >
                    <p className="nav-link"> Vacancies</p>
                  </li>
                </>
              )}
              {isUserLoggedIn ? (
                <>
                  <li className="nav-item me-3" style={{ cursor: "pointer" }}>
                    {/* <p className="nav-link">Profile</p> */}
                    <p className="nav-link" onClick={redirectProfile}>
                      Profile
                    </p>
                  </li>
                  <li className="nav-item me-3 ">
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
                <li className="nav-item dropdown me-3">
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
                      <p className="m-0 dropdown-item">Freelancer</p>
                    </li>
                    <li
                      onClick={redirectConsultancyLogin}
                      style={{ cursor: "pointer" }}
                    >
                      <p className="dropdown-item">Consultancy</p>
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

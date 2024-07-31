import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../../redux/slices/authSlice";
import useLocalStorage from "../../../customHooks/useLocalStorage";

export const LandingNavbar = () => {
  const { setDataToRedux } = useLocalStorage();

  useEffect(() => {
    setDataToRedux();
  }, []);
  const navigate = useNavigate();
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

  const viewAllConsultancies = () => {
    navigate("/user-view-consultancies");
  };

  const redirectConsultancyLogin = () => {
    navigate("/consultancy-login");
  };
  const redirectAdminLogin = () => {
    navigate("/admin");
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
              <li
                className="nav-item m-3"
                style={{ cursor: "pointer" }}
                onClick={viewAllConsultancies}
              >
                <p className="nav-link">Consultancies</p>
              </li>

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
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li onClick={redirectUserLogin} style={{ cursor: "pointer" }}>
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
                    <p className="m-0 dropdown-item">Consultancy</p>
                  </li>
                  <li
                    onClick={redirectAdminLogin}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="m-0 dropdown-item">Admin</p>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      Admin
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import { isEmailValid } from "../../../utils/validations/emailValidation";
import {useDispatch} from 'react-redux';
import { loginSuccess } from "../../../redux/slices/authSlice";
import "./consultancyLogin.css";

export  function ConsultancyLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [freelancerData, setFreelancerData] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFreelancerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let { email, password } = freelancerData;

    if (!email || !password) {
      alert("Please Fill All Details");
      return;
    }

    if (!isEmailValid(email)) {
      alert("Please Enter Valid Email");
      return;
    }

    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      let res = await axiosInstance.post("/consultancyLogin", freelancerData);
      if (res.status === 200) {
        alert("Login Successfull");

        let data = res?.data?.data || null;
        if (data && data._id) {
          let obj = {
            userData: data,
            userId: data._id,
            userType: "consultancy",
          }
          dispatch(loginSuccess(obj));
          localStorage.setItem("freelancerData",JSON.stringify(obj));
        }
        setTimeout(() => {
          // TODO
          // Redirect here to consultany  home page
          navigate("/consultancy-home");
        }, 1500);
      }
    } catch (error) {
      let responseStatus = error.response?.status || null;
      if (responseStatus === 400 || responseStatus === 404) {
        const responseMessage = error.response?.data?.message || null;
        if (responseMessage) {
          alert(responseMessage);
        } else {
          alert("Some Error Occured. Please try again after some time");
        }
      } else {
        alert("Server Error Occured. Please try again after some time");
      }
      console.log("Error on freelancer login ", error);
    }
  };
  const redirectConsultancyRegister = () => {
    navigate("/consultancy-register");
  };
  return (
    <div className="freelancer-login container-fluid">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-4">
              <div className="card mb-0 p-4">
                <div className="card-body">
                  <h2 className="text-center freelancer-login-heading mb-2">
                    Consultancy Login
                  </h2>
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label user-login-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        id="exampleInputEmail1"
                        name="email"
                        value={freelancerData.email}
                        onChange={handleChanges}
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label user-login-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        className="form-control"
                        name="password"
                        value={freelancerData.password}
                        onChange={handleChanges}
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input primary"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                        />
                      </div>
                      <a className="user-login-label" href="">
                        {" "}
                        Forgot Password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="btn  w-100 py-8 fs-4 mb-4 rounded-2 user-login-button text-white"
                    >
                      Sign In
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p
                        style={{ cursor: "pointer" }}
                        className="fs-5 mb-0 fw-bold"
                        onClick={redirectConsultancyRegister}
                      >
                        Create an Consultancy account
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React from "react";
import { useState } from "react";
import LoginImg3 from "../../../Assets/new/login-img-3.png";

import { useNavigate } from "react-router-dom";
import {
  isEmailValid,
  isPhoneNumberValid,
} from "../../../utils/validations/emailValidation";
import { axiosMultipartInstance } from "../../../apis/axiosMultipart";
import "./consultancyRegister.css";
import { toast } from "react-hot-toast";
import Footer from "../../Common/Footer/footer";
import { LandingNavbar } from "../../Common/Navbar/landingNavbar";
export function ConsultancyRegister() {
  const navigate = useNavigate();
  const [consultancyData, setConsultancyData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    licenseId: "",
    profilepic: null,
    address: "",
  });
  // For Testing
  // const [consultancyData, setConsultancyData] = useState({
  //   name: "myname",
  //   contact: "1234567890",
  //   email: "co3@gmail.com",
  //   password: "12341234",
  //   licenseId: "bcom",
  //   profilepic: null,
  //   address: "co address",
  // });

  const handleRegister = (e) => {
    e.preventDefault();
    let { name, email, password, contact, licenseId, address, profilepic } =
      consultancyData;

    console.log("consul data", consultancyData);
    if (!name || !email || !password || !contact || !licenseId || !address) {
      toast.error("Please Fill All Details");
      return;
    }
    if (!isEmailValid(email)) {
      toast.error("Please Enter Valid Email");
      return;
    }
    if (!isPhoneNumberValid(contact)) {
      toast.error("Please Enter Valid Phone Number");
      return;
    }

    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      let res = await axiosMultipartInstance.post(
        "/consultancyRegistration",
        consultancyData
      );
      if (res.status === 201) {
        toast.success("Registration Successfull");
        redirectConsultancyLogin();
      }
    } catch (error) {
      let responseStatus = error.response?.status || null;
      if (responseStatus === 400) {
        const responseMessage = error.response?.data?.message || null;
        if (responseMessage) {
          toast.error(responseMessage);
        } else {
          toast.error("Some Error Occured. Please try again after some time");
        }
      } else {
        toast.error("Server Error Occured. Please try again after some time");
      }
    }
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setConsultancyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const redirectConsultancyLogin = () => {
    navigate("/consultancy-login");
  };

  return (
    <>
      <LandingNavbar />
      <div className="user-register container">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className=" mt-5 w-100">
            <h2 className="text-center fw-bold freelancer-register-heading mb-3">
              Consultancy Registration
            </h2>
            <div className="row d-flex justify-content-around w-100 my-4 gap-3">
              <div className="col-5  d-flex align-items-center">
                <div style={{ width: "auto", height: "370px" }}>
                  <img
                    src={LoginImg3}
                    className="w-100 h-100"
                    alt="user_register"
                  />
                </div>
              </div>
              <div className="col-5">
                <div className="card mb-0 p-4">
                  <div className="card-body">
                    <form onSubmit={handleRegister}>
                      <div className="mb-3">
                        <label
                          htmlFor="firstName"
                          className="form-label user-login-label"
                        >
                          {" "}
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Name"
                          required
                          name="name"
                          onChange={handleChanges}
                          value={consultancyData.name}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="contact"
                          className="form-label user-login-label"
                        >
                          Contact
                        </label>
                        <input
                          type="tel"
                          className={`form-control`}
                          id="contact"
                          placeholder="Contact"
                          minLength="10"
                          maxlength="10"
                          pattern="[0-9]{10}"
                          required
                          name="contact"
                          onChange={handleChanges}
                          value={consultancyData.contact}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label user-login-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                          aria-describedby="emailHelp"
                          required
                          value={consultancyData.email}
                          onChange={handleChanges}
                          name="email"
                        />
                        <div id="emailHelp" className="form-text">
                          We'll never share your email with anyone else.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="password"
                          className="form-label user-login-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="form-control"
                          id="password"
                          minLength="6"
                          required
                          value={consultancyData.password}
                          onChange={handleChanges}
                          name="password"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="qualification"
                          className="form-label user-login-label"
                        >
                          {" "}
                          License No (10 digits)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="licenseId"
                          placeholder="License Id"
                          name="licenseId"
                          required
                          minLength="10"
                          maxLength="10"
                          onChange={handleChanges}
                          value={consultancyData.licenseId}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="qualification"
                          className="form-label user-login-label"
                        >
                          {" "}
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="Address"
                          className="form-control"
                          id="address"
                          required
                          name="address"
                          onChange={handleChanges}
                          value={consultancyData.address}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="qualification"
                          className="form-label user-login-label"
                        >
                          {" "}
                          Profile Picture
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="profilepic"
                          name="profilepic"
                          onChange={(e) => {
                            setConsultancyData((prevData) => {
                              return {
                                ...prevData,
                                profilepic: e.target.files[0],
                              };
                            });
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn w-100 py-8 fs-4 mb-4 rounded-2 user-login-button text-white"
                      >
                        Register
                      </button>
                    </form>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fs-5 mb-0 fw-bold">
                      Already have an account?
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={redirectConsultancyLogin}
                        className="fw-bold ms-2 text-decoration-none text-primary"
                      >
                        Login
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import React from "react";
import { useState } from "react";
import "./freelancer_register.css";
import { useNavigate } from "react-router-dom";
import {
  isEmailValid,
  isPhoneNumberValid,
} from "../../../utils/validations/emailValidation";
import LoginImg2 from "../../../Assets/new/login-img-2.png";
import { axiosMultipartInstance } from "../../../apis/axiosMultipart";
import { toast } from "react-hot-toast";
import Footer from "../../Common/Footer/footer";
import { LandingNavbar } from "../../Common/Navbar/landingNavbar";
function Freelancer_register() {
  const navigate = useNavigate();
  const [freelancerData, setFreelancerData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    qualification: "",
    jobrole: "",
    profilepic: null,
  });
  // For Testing
  // const [freelancerData, setFreelancerData] = useState({
  //   name: "myname",
  //   email: "freelancer@gmail.com",
  //   password: "12341234",
  //   contact: "1234567890",
  //   qualification: "bcom",
  //   jobrole: "designer",
  //   profilepic: null,
  // });

  const handleRegister = (e) => {
    e.preventDefault();
    let { name, email, password, contact, qualification, jobrole, profilepic } =
      freelancerData;

    if (
      !name ||
      !email ||
      !password ||
      !contact ||
      !qualification ||
      !jobrole
    ) {
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

    if (!/^[a-zA-Z ]+$/.test(name)) {
      toast.error("Name should not contain numbers and special characters");
      return;
    }


    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      let res = await axiosMultipartInstance.post(
        "/freelancerRegistration",
        freelancerData
      );
      if (res.status === 201) {
        toast.success("Registration Successfull");
        redirectFreelancerLogin();
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
    setFreelancerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const redirectFreelancerLogin = () => {
    navigate("/freelancer-login");
  };

  return (
    <>
      <LandingNavbar />
      <div className="user-register container">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className=" w-100 mt-3">
            <h2 className="text-center freelancer-register-heading fw-bold mb-3">
              Freelancer Registration
            </h2>
            <div className="row justify-content-center w-100 mt-5">
              <div className="col-5  d-flex align-items-center">
                <div style={{ width: "auto", height: "370px" }}>
                  <img
                    src={LoginImg2}
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
                          value={freelancerData.name}
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
                          value={freelancerData.contact}
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
                          placeholder="Enter email"
                          className="form-control"
                          id="email"
                          aria-describedby="emailHelp"
                          required
                          value={freelancerData.email}
                          onChange={handleChanges}
                          name="email"
                        />
                        <div id="emailHelp" className="form-text">
                          {/* We'll never share your email with anyone else. */}
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
                          value={freelancerData.password}
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
                          Qualification
                        </label>
                        <input
                          type="text"
                          placeholder="Qualification"
                          className="form-control"
                          id="qualification"
                          name="qualification"
                          onChange={handleChanges}
                          value={freelancerData.qualification}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="qualification"
                          className="form-label user-login-label"
                        >
                          {" "}
                          Job Role
                        </label>
                        <input
                          type="text"
                          placeholder="Job Role"
                          className="form-control"
                          id="jobrole"
                          required
                          name="jobrole"
                          onChange={handleChanges}
                          value={freelancerData.jobrole}
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
                            setFreelancerData((prevData) => {
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
                        onClick={redirectFreelancerLogin}
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
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default Freelancer_register;

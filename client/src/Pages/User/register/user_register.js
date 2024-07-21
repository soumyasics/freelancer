import React from "react";
import "./user_register.css";
import { useState } from "react";
import { isEmailValid } from "../../../utils/validations/emailValidation";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LandingNavbar } from "../../Common/Navbar/landingNavbar";
import Footer from "../../Common/Footer/footer";
import LoginImg1 from "../../../Assets/new/login-img-1.png";
function User_register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigateUserLogin = () => {
    navigate("/user-login");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = userData;
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please Fill All Details");
      return;
    }

    if (!isEmailValid(userData.email)) {
      toast.error("Please Enter Valid Email");
      return;
    }
    sendDataToServer();
  };

  const redirectToUserLogin = () => {
    navigate("/user-login");
  };

  const sendDataToServer = async () => {
    try {
      let res = await axiosInstance.post("/userRegistration", userData);
      if (res.status === 201) {
        toast.success("Registration Successfull");

        redirectToUserLogin();
      }
    } catch (error) {
      let responseStatus = error.response?.status || null;
      if (
        responseStatus === 401 ||
        responseStatus === 400 ||
        responseStatus === 404
      ) {
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
  return (
    <>
      <LandingNavbar />
      <div className="user-register container">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="mt-5">
            <div>
              <h2 className="text-center  user-register-heading">
                User Registration
              </h2>
            </div>
            <div className="row justify-content-between gap-4 w-100  ">
              <div className="col-5 ">
                <img
                  src={LoginImg1}
                  className="w-100 h-100"
                  alt="user_register"
                />
              </div>
              <div className="col-5 ">
                <div className="card mb-0 p-4">
                  <div className="card-body">
                    <form onSubmit={handleSubmit} className="needs-validation">
                      <div className="mb-3">
                        <label
                          htmlFor="firstName"
                          className="form-label user-login-label"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="form-control"
                          id="firstName"
                          onChange={handleChanges}
                          value={userData.firstName}
                          name="firstName"
                          required
                        />

                        <div class="invalid-feedback">
                          Please provide your first Name.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="lastName"
                          className="form-label user-login-label"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="form-control"
                          id="lastName"
                          required
                          onChange={handleChanges}
                          name="lastName"
                          value={userData.lastName}
                        />
                      </div>
                      <div className="mb-3 ">
                        <label
                          htmlFor="email"
                          for="validationCustomUsername"
                          className="form-label user-login-label"
                        >
                          Email address
                        </label>

                        <input
                          type="email"
                          placeholder="Enter email"
                          className="form-control"
                          id="email"
                          onChange={handleChanges}
                          value={userData.email}
                          name="email"
                          aria-describedby="emailHelp"
                          required
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
                          onChange={handleChanges}
                          name="password"
                          value={userData.password}
                          required
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
                        onClick={navigateUserLogin}
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

export default User_register;

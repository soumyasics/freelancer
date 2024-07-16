import React from "react";
import { useNavigate } from "react-router-dom";
import { isEmailValid } from "../../../utils/validations/emailValidation";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./user_login.css";
import { toast } from "react-hot-toast";
function User_login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigateToUserRegister = () => {
    navigate("/user-register");
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = userData;

    if (!email || !password) {
      toast.error("Please Fill All Details");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Please Enter Valid Email");
      return;
    }

    sendDataToServer();
  };

  const navigateToUserForgot = () => {
    navigate("/user-forgot-password");
  };

  const sendDataToServer = async () => {
    try {
      let res = await axiosInstance.post("/userLogin", userData);
      if (res.status === 200) {
        console.log("res daa", res.data.data);
        let data = res?.data?.data || null;
        if (data && data._id) {
          let obj = {
            userData: data,
            userId: data._id,
            userType: "user",
          };
          dispatch(loginSuccess(obj));
          localStorage.setItem("freelancerData", JSON.stringify(obj));
        }

        toast.success("Login Successfull");
        navigate("/");
        
      }
    } catch (error) {
      let responseStatus = error.response?.status || null;
      if (responseStatus === 400 || responseStatus === 404) {
        const responseMessage = error.response?.data?.message || null;
        console.log("response message", responseMessage);
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
    <div className="user-login container">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-4">
              <div className="card mb-0 p-4">
                <div className="card-body">
                  <h2 className="text-center user-login-heading">User Login</h2>
                  <form onSubmit={handleSubmit}>
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
                        aria-describedby="emailHelp"
                        name="email"
                        value={userData.email}
                        onChange={handleChanges}
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
                        className="form-control"
                        required
                        id="exampleInputPassword1"
                        minLength="6"
                        name="password"
                        value={userData.password}
                        onChange={handleChanges}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        {/* <input
                          className="form-check-input primary"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                        />
                        <label
                          className="form-check-label user-login-label"
                          htmlFor="flexCheckChecked"
                        >
                          Remember Me
                        </label> */}
                      </div>
                      <p
                        style={{ cursor: "pointer" }}
                        className="user-login-label"
                        onClick={navigateToUserForgot}
                      >
                        {" "}
                        Forgot Password?
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="submit" className="btn btn-primary mx-auto">
                        {" "}
                        Sign In
                      </button>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={navigateToUserRegister}
                        className="fs-5 mb-0 mt-3 fw-bold"
                      >
                        Create an User account
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

export default User_login;

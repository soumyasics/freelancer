import React from "react";
import { useState } from "react";
import "./forgot_password.css";
import { isEmailValid } from "../../../utils/validations/emailValidation";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";
export const ConsultancyForgot_password = () => {
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, newPassword, confirmPassword } = data;
    if (!email) {
      toast.error("Please Enter Email");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Please Enter Valid Email");
      return;
    }

    if (!newPassword) {
      toast.error("Please Enter New Password");
      return;
    }

    if (!confirmPassword) {
      toast.error("Please Enter Confirm Password");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    sendDataToServer();
    console.log("data", data);
  };
  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("consultancyForgotPassowrd", data);
      if (res.status === 200) {
        toast.success("Password Reset Successful");
        navigate("/consultancy-login");
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404) {
        toast.error("Please check your email and try again");
      } else {
        toast.error("Internal Server Error");
      }
    }
  };
  return (
    <div className="user-forgot w-100">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-4">
              <div className="card mb-0 p-4">
                <div className="card-body">
                  <h2 className="text-center user-forgot-heading mb-3">
                    Forgot Password?
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="Email"
                        className="form-label user-login-label"
                      >
                        Email
                      </label>
                      <input
                        name="email"
                        onChange={handleChanges}
                        value={data.email}
                        type="email"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="newPassword"
                        className="form-label user-login-label"
                      >
                        New Password
                      </label>
                      <input
                        name="newPassword"
                        onChange={handleChanges}
                        value={data.newPassword}
                        type="password"
                        minLength="6"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="newPassword"
                        className="form-label user-login-label"
                      >
                        Confirm New Password
                      </label>
                      <input
                        name="confirmPassword"
                        onChange={handleChanges}
                        value={data.confirmPassword}
                        type="password"
                        minLength="6"
                        className="form-control"
                        id="newPassword"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-8 fs-4 mb-2 rounded-2 user-login-button text-white"
                    >
                      Reset Password
                    </button>
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


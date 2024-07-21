import React from "react";
import "./admin_login.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LandingNavbar } from "../../Common/Navbar/landingNavbar";
import Footer from "../../Common/Footer/footer";

function Admin_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin@123") {
      navigate("/admin-dashboard");
    } else {
      toast.error("Please enter correct email and password");
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="user-login container-fluid">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-5 ">
                <div className="card mb-0 p-4">
                  <div className="card-body">
                    <h2 className="text-center user-login-heading">
                      Admin Login
                    </h2>
                    <form>
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
                          placeholder="Enter email"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
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
                          placeholder="Enter password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>

                      <div className="text-center">
                        <Button onClick={handleSubmit}>Sign In</Button>
                      </div>
                    </form>
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

export default Admin_login;

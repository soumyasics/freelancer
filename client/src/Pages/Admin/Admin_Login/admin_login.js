import React from "react";
import "./admin_login.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

function Admin_login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    
    if (email === "admin@gmail.com" && password === "admin@123") {
      navigate('/admin-dashboard');
    }else {
      alert("Please enter correct email and password");
    }
  };

  return (
    <div className="user-login container-fluid">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-4">
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
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    {/* <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" />
                  <label className="form-check-label  user-login-label" htmlFor="flexCheckChecked"> Remember this Device </label>
                </div>
                <a className="user-login-label" href=""> Forgot Password?</a>
              </div> */}
                    <div className="text-center">
                      <Button onClick={handleSubmit}>Sign In</Button>
                    </div>
                    {/* <div className="d-flex align-items-center justify-content-center">
                <p className="fs-5 mb-0 fw-bold"><a className="fw-bold ms-2 text-decoration-none user-login-label" href=""> Create an User account</a></p>
                
              </div> */}
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

export default Admin_login;

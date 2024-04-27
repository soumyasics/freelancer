import "./App.css";
import Admin_login from "./Pages/Admin/Admin_Login/admin_login.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Freelancer_login from "./Pages/Freelancers/login/freelancer_login";
import Freelancer_register from "./Pages/Freelancers/register/freelancer_register";
import User_login from "./Pages/User/login/user_login";
import User_register from "./Pages/User/register/user_register";
import Home from "./Pages/Common/Home/home";
import Forgot_password from "./Pages/User/forgot_password/forgot_password";
import ViewAllFreelancers from "./Pages/User/ViewAllFreelancers/ViewAllFreelancers";
import Payment from "./Pages/User/payment/Payment";
import UserRequest from "./Pages/User/userRequest/userRequest";
import MyRequests from "./Pages/User/my_request/my_request";
import Testing from "./testing";
import ViewAllUsersRequests from "./Pages/Freelancers/View_Request/view_request";
import DetailedViewFreelancers from "./Pages/User/DetailedViewFreelancers/DetailedViewFreelancers";
import {ViewResponseDetails} from "./Pages/User/responseDetails/responseDetails.jsx";
import User_Profile from "./Pages/User/User_Profile/User_Profile";
import Admin_Dashboard from "./Pages/Admin/Admin_Dashboard/Admin_Dashboard.jsx";
import Admin_ViewAllUsers from "./Pages/Admin/Admin_ViewAllUsers/Admin_ViewAllUsers.jsx";
import Admin_ViewAllFreelancers from "./Pages/Admin/Admin_ViewAllFreelancers/Admin_ViewAllFreelancers.jsx";
import Admin_ViewAllRequests from "./Pages/Admin/Admin_ViewAllRequests/Admin_ViewAllRequests.jsx";
import Freelancer_Profile from "./Pages/Freelancers/Freelancer_Profile/Freelancer_Profile.jsx";
import View_Request_Details from "./Pages/Freelancers/View_Request_Details/View_Request_Details.jsx";
import Payment_Details from "./Pages/User/Payment_Details/Payment_Details.jsx";

function App() {
  return (
    <div className="container-fluid bg-hero m-auto " style={{ padding: 0 }}>
      <BrowserRouter>
        <Routes>
          {/* user routes  */}
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<User_login />} />
          <Route path="/user-register" element={<User_register />} />
          <Route path="/user-request" element={<UserRequest />} />
          <Route path="/user-myrequests" element={<MyRequests />} />
          <Route path="/user-forgot-password" element={<Forgot_password />} />
          <Route path="/view-responses/:id" element={<ViewResponseDetails />} />
          <Route
            path="/view-all-freelancers"
            element={<ViewAllFreelancers />}
          />
          <Route path="/user-profile" element={<User_Profile />} />

          <Route path="/view-all-freelancers" element={<ViewAllFreelancers />} />
          {/* <Route path='/detailed-view-freelancers' element={<DetailedViewFreelancers />} /> */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-details" element={<Payment_Details />} />

          <Route path="/freelancer" element={<ViewAllFreelancers />} />
          <Route path="/freelancer/:id" element={<DetailedViewFreelancers />} />
          {/* <Route path="" /> */}

          {/* Freelancer routes  */}
          <Route path="/freelancer-login" element={<Freelancer_login />} />
          <Route
            path="/freelancer-register"
            element={<Freelancer_register />}
          />
          <Route path="/freelancer-profile" element={<Freelancer_Profile/>} />
          <Route path="/view-request" element={<ViewAllUsersRequests />} />
          <Route path="/view-request/:id" element={<View_Request_Details />} />
          {/* Admin routes  */}
          <Route path="/admin" element={<Admin_login />} />
          <Route path="/admin-dashboard" element={<Admin_Dashboard  />}/>
          <Route path="/admin-view-all-users" element={<Admin_ViewAllUsers />}/>
          <Route path="/admin-view-all-freelancers" element={<Admin_ViewAllFreelancers />}/>
          <Route path="/admin-view-all-requests" element={<Admin_ViewAllRequests />}/>
          <Route path="/testing" element={<Testing />} />
          <Route path="/*" element={<h1> Please re-check the Route </h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

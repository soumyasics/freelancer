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
import { ViewResponseDetails } from "./Pages/User/responseDetails/responseDetails.jsx";
import User_Profile from "./Pages/User/User_Profile/User_Profile";
import Admin_Dashboard from "./Pages/Admin/Admin_Dashboard/Admin_Dashboard.jsx";
import Admin_ViewAllUsers from "./Pages/Admin/Admin_ViewAllUsers/Admin_ViewAllUsers.jsx";
import Admin_ViewAllFreelancers from "./Pages/Admin/Admin_ViewAllFreelancers/Admin_ViewAllFreelancers.jsx";
import Admin_ViewAllRequests from "./Pages/Admin/Admin_ViewAllRequests/Admin_ViewAllRequests.jsx";
import Freelancer_Profile from "./Pages/Freelancers/Freelancer_Profile/Freelancer_Profile.jsx";
import View_Request_Details from "./Pages/Freelancers/View_Request_Details/View_Request_Details.jsx";
import Payment_Details from "./Pages/User/Payment_Details/Payment_Details.jsx";
import { ConsultancyRegister } from "./Pages/consultancy/register/consultancyRegister.jsx";
import { ConsultancyLogin } from "./Pages/consultancy/login/consultancyLogin.jsx";
import Vacancy_request from "./Pages/consultancy/vacancy_request/Vacancy_request.jsx";
import ViewAllVacancies from "./Pages/Freelancers/ViewAllVacancies/ViewAllVacancies.jsx";
import ConsultancyHome from "./Pages/consultancy/home/ConsultancyHome.jsx";
import { AdminViewAllConsultancy } from "./Pages/Admin/Admin_ViewAllConsultancy/Admin_ViewAllConsultancy.jsx";
import ViewAllAppliedWorks from "./Pages/consultancy/ViewAllAppliedWorks/ViewAllAppliedWorks.jsx";
import { MyVacanccies } from "./Pages/consultancy/my_vacancies/my_vacancies.jsx";
import { MyWorks } from "./Pages/Freelancers/MyWorks/myWorks.jsx";
import {  MyCompletedWorks} from "./Pages/Freelancers/MyWorks/myCompletedWorks.jsx";
import MyOrders from "./Pages/User/MyOrders/MyOrders.jsx";
import ConsultancyProfile from "./Pages/consultancy/profile/ConsultancyProfile.jsx";
import { ViewAllFreelancerAppliedVacancies } from "./Pages/Freelancers/ViewAllAppliedVacancy/ViewAllAppliedVacancy.jsx";
import { FreelancerForgot_password } from "./Pages/Freelancers/forgot_password/forgot_password.js";
import { ConsultancyForgot_password } from "./Pages/consultancy/forgot_password/forgot_password.js";
import { UserViewAllConsultancy } from "./Pages/User/viewAllConsultancies/viewAllConsultancies.jsx";
import { FreelancerViewAllConsultancy } from "./Pages/Freelancers/viewAllConsultancies/viewAllConsultancies.jsx";
import { UserChatDashboard } from "./Pages/User/usersChat/userChatDashboard/userChatDashboard.jsx";
import { FreelancerChatDashboard } from "./Pages/Freelancers/freelancersChat/userChatDashboard/userChatDashboard.jsx";
import { UserConsultancyChatDashboard } from "./Pages/User/usersChatConsultancy/userChatDashboard/userChatDashboard.jsx";
import { ConsultancyChatDashboard } from "./Pages/consultancy/chat/userChatDashboard/userChatDashboard.jsx";
import { UserViewWorkStatus } from "./Pages/User/viewWorkStatus/viewWorkStatus.jsx";
import { UserChatDashboardWithId } from "./Pages/User/usersChat/userChatDashboard/userChatDashboardWithId.jsx";
import { FreelancerViewWorkStatus } from "./Pages/User/viewWorkStatus/freelancerWorkStatus.jsx";
import { FreelancerChatDashboardWithId } from "./Pages/Freelancers/freelancersChat/userChatDashboard/freelancerChatDashboardId.jsx";
import { UserCompletedWorks } from "./Pages/User/my_request/completedWorks.jsx";

function App() {
  return (
      <BrowserRouter basename="freelancers_marketplace">
        <Routes>
          {/* user routes  */}
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<User_login />} />
          <Route path="/user-register" element={<User_register />} />
          <Route path="/user-request" element={<UserRequest />} />
          <Route path="/user-myrequests" element={<MyRequests />} />
          <Route path="/user-completed-works" element={<UserCompletedWorks />} />
          <Route path="/user-forgot-password" element={<Forgot_password />} />
          <Route path="/user-view-consultancies" element={<UserViewAllConsultancy/>} />
          <Route path="/user-freelancer-chat" element={<UserChatDashboard/>} />
          <Route path="/user-freelancer-chat/:id/:name" element={<UserChatDashboardWithId/>} />
          <Route path="/user-consultancy-chat" element={<UserConsultancyChatDashboard/>} />
          <Route path="/view-responses/:id" element={<ViewResponseDetails />} />
          <Route path="/user-view-work-status/:id" element={<UserViewWorkStatus />} />
          <Route
            path="/view-all-freelancers"
            element={<ViewAllFreelancers />}
          />
          <Route path="/user-profile" element={<User_Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route
            path="/view-all-freelancers"
            element={<ViewAllFreelancers />}
          />
          {/* <Route path='/detailed-view-freelancers' element={<DetailedViewFreelancers />} /> */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-details" element={<Payment_Details />} />
          <Route path="/freelancer" element={<ViewAllFreelancers />} />
          <Route path="/freelancer/:id" element={<DetailedViewFreelancers />} />
          <Route path="/freelancer-view-work-status/:id" element={<FreelancerViewWorkStatus />} />


          {/* Freelancer routes  */}
          <Route path="/freelancer-login" element={<Freelancer_login />} />
          <Route
            path="/freelancer-register"
            element={<Freelancer_register />}
          />
          <Route path="/freelancer-forgot-password" element={<FreelancerForgot_password />} />
          <Route path="/freelancer-view-consultancies" element={<FreelancerViewAllConsultancy />} />
          <Route path="/freelancer-my-works" element={<MyWorks />} />
          <Route path="/freelancer-completed-works" element={<MyCompletedWorks />} />
          <Route path="/freelancer-user-chat" element={<FreelancerChatDashboard />} />
          <Route path="/freelancer-user-chat/:id/:name" element={<FreelancerChatDashboardWithId />} />
          
          <Route
            path="/freelancer-applied-vacancies"
            element={<ViewAllFreelancerAppliedVacancies />}
          />
          <Route path="/freelancer-profile" element={<Freelancer_Profile />} />
          <Route path="/view-request" element={<ViewAllUsersRequests />} />
          <Route path="/view-request/:id" element={<View_Request_Details />} />
          <Route path="/view-all-vacancies" element={<ViewAllVacancies />} />
          {/* consultancy routes  */}
          <Route
            path="/consultancy-register"
            element={<ConsultancyRegister />}
          />
          <Route path="/consultancy-login" element={<ConsultancyLogin />} />
          <Route path="/consultancy-forgot-password" element={<ConsultancyForgot_password />} />
          <Route path="/consultancy-my-vacancies" element={<MyVacanccies />} />
          <Route path="/consultancy-user-chat" element={<ConsultancyChatDashboard />} />
          <Route
            path="/consultancy-vacancy-request"
            element={<Vacancy_request />}
          />
          <Route path="/consultancy-home" element={<ConsultancyHome />} />
          <Route
            path="/view-all-applied-works"
            element={<ViewAllAppliedWorks />}
          />
          <Route path="/view-profile" element={<ConsultancyProfile />} />

          {/* Admin routes  */}
          <Route path="/admin" element={<Admin_login />} />
          <Route path="/admin-dashboard" element={<Admin_Dashboard />} />
          <Route
            path="/admin-view-all-users"
            element={<Admin_ViewAllUsers />}
          />

          <Route
            path="/admin-view-all-freelancers"
            element={<Admin_ViewAllFreelancers />}
          />
          <Route
            path="/admin-view-all-requests"
            element={<Admin_ViewAllRequests />}
          />
          <Route
            path="/admin-view-all-consultancy"
            element={<AdminViewAllConsultancy />}
          />
          <Route path="/testing" element={<Testing />} />



          <Route path="/*" element={<h1> Please re-check the Route </h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

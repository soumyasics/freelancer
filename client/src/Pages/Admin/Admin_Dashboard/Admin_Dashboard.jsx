import React, { useState } from "react";
import "./Admin_Dashboard.css";
import { Container, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsGrid, BsPerson } from "react-icons/bs";
import Admin_ViewAllFreelancers from "../Admin_ViewAllFreelancers/Admin_ViewAllFreelancers";
import Admin_ViewAllUsers from "../Admin_ViewAllUsers/Admin_ViewAllUsers";
import Admin_ViewAllRequests from "../Admin_ViewAllRequests/Admin_ViewAllRequests";
import { AdminViewAllConsultancy } from "../Admin_ViewAllConsultancy/Admin_ViewAllConsultancy";
import { SlLogout } from "react-icons/sl";
import Footer from "../../Common/Footer/footer";
import { Admin_ViewAllPendingFreelancers } from "../Admin_ViewAllFreelancers/Admin_ViewAllPendingFreelancers";
import { AdminViewAllPendingConsultancy } from "../Admin_ViewAllConsultancy/Admin_ViewAllPendingConsultancy";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiPassPendingLine } from "react-icons/ri";
import { MdOutlineWorkHistory } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { Admin_ViewAllFreelancersCompliants } from "../AdminViewAllFreelancerCompliants/FreelancerCompliants";
import { Admin_ViewAllFreelancersReviews } from "../AdminViewAllFreelancerReviews/FreelancerReviews";
import { IoWarningOutline } from "react-icons/io5";
import { GoCodeReview } from "react-icons/go";
import { RiErrorWarningLine } from "react-icons/ri";
import { AdminViewAllUsersCompliants } from "../AdminViewAllUserCompliants/UserCompliants";
import { FaUsers } from "react-icons/fa6";
import AdminOverview from "../AdminOverview/adminOverview";
function Admin_Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activePage, setActivePage] = useState("overview");
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <Container fluid className="p-0">
        <header className="d-flex justify-content-between align-items-center bg-light p-3">
          <Button className="bg-color border-0" onClick={toggleSidebar}>
            ☰
          </Button>
          <h5>Admin Dashboard</h5>
        </header>

        <Offcanvas
          show={showSidebar}
          onHide={toggleSidebar}
          placement="start"
          className="bg-color text-white"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Admin Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="list-unstyled">
              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("overview");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <BsGrid className="me-2" />
                  Overview
                </Link>
              </li>
              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("users");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <FaUsers className="me-2" />
                  Users
                </Link>
              </li>

              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("freelancers");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <BsPerson className="me-2" />
                  Freelancers
                </Link>
              </li>
              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("consultancies");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <RiPassPendingLine className="me-2" />
                  Consultancies
                </Link>
              </li>
              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("pending-freelancers");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <MdOutlinePending className="me-2" />
                  Pending Freelancers
                </Link>
              </li>
              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("pending-consultancies");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <MdOutlinePendingActions className="me-2" />
                  Pending Consultancies
                </Link>
              </li>
              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("requests");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <MdOutlineWorkHistory className="me-2" />
                  Work Requests
                </Link>
              </li>
              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("freelancer-compliants");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <IoWarningOutline className="me-2" />
                  Freelancer Compliants
                </Link>
              </li>
              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("freelancer-reviews");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <GoCodeReview className="me-2" />
                  Freelancer Reviews
                </Link>
              </li>

              <li className="nav-item m-1 p-1">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setActivePage("user-compliants");
                  }}
                  className="nav-link m-3 d-flex align-items-center text-decoration-none"
                  style={{ color: "inherit" }}
                >
                  <RiErrorWarningLine className="me-2" />
                  User Compliants
                </Link>
              </li>

              <li className="nav-item m-1 p-1">
                <Link
                  to="/admin"
                  className="nav-link m-3 d-flex align-items-center text-decoration-none fw-bold text-danger"
                  style={{ color: "inherit" }}
                >
                  <SlLogout className="me-2" />
                  Logout
                </Link>
              </li>
              {/* Add more menu items */}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main content */}
        <main className="mt-3">
          {/* Add your dashboard content here */}
          {activePage === "overview" && <AdminOverview />}
          {activePage === "users" && <Admin_ViewAllUsers />}
          {activePage === "freelancers" && <Admin_ViewAllFreelancers />}
          {activePage === "pending-freelancers" && (
            <Admin_ViewAllPendingFreelancers />
          )}
          {activePage === "requests" && <Admin_ViewAllRequests />}
          {activePage === "consultancies" && <AdminViewAllConsultancy />}
          {activePage === "freelancer-compliants" && (
            <Admin_ViewAllFreelancersCompliants />
          )}
          {activePage === "user-compliants" && <AdminViewAllUsersCompliants />}
          {activePage === "freelancer-reviews" && (
            <Admin_ViewAllFreelancersReviews />
          )}
          {activePage === "pending-consultancies" && (
            <AdminViewAllPendingConsultancy />
          )}
        </main>
      </Container>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default Admin_Dashboard;

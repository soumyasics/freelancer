import React, { useState } from "react";
import "./Admin_Dashboard.css";
import { Container, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsGrid, BsPeople, BsPerson, BsCollectionFill } from "react-icons/bs";
import Admin_ViewAllFreelancers from "../Admin_ViewAllFreelancers/Admin_ViewAllFreelancers";
import Admin_ViewAllUsers from "../Admin_ViewAllUsers/Admin_ViewAllUsers";
import Admin_ViewAllRequests from "../Admin_ViewAllRequests/Admin_ViewAllRequests";

function Admin_Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activePage, setActivePage] = useState("users");
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <Container fluid className="p-0">
      <header className="d-flex justify-content-between align-items-center bg-light p-3">
        <Button className="bg-color border-0" onClick={toggleSidebar}>
          ☰
        </Button>
        <h1 className="fs-2">Admin Dashboard</h1>
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
                  setActivePage("users");
                }}
                className="nav-link m-3 d-flex align-items-center text-decoration-none"
                style={{ color: "inherit" }}
              >
                <BsGrid className="me-2" />
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
                  setActivePage("requests");
                }}
                className="nav-link m-3 d-flex align-items-center text-decoration-none"
                style={{ color: "inherit" }}
              >
                <BsCollectionFill className="me-2" />
                Requests
              </Link>
            </li>
            {/* Add more menu items */}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main content */}
      <main className="mt-3">
        {/* Add your dashboard content here */}
        {activePage === "users" && <Admin_ViewAllUsers />}
        {activePage === "freelancers" && <Admin_ViewAllFreelancers />}
        {activePage === "requests" && <Admin_ViewAllRequests />}
      </main>
    </Container>
  );
}

export default Admin_Dashboard;

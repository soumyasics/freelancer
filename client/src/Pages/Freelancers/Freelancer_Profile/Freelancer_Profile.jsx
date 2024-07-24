import React, { useState } from "react";
import "./Freelancer_Profile.css";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { FaEdit, FaListAlt, FaTasks } from "react-icons/fa";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import profilePic from "../../../Assets/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";
import profileIllu from "../../../Assets/depositphotos_68082973-stock-illustration-workplace-designer-flat-modern-illustration.jpg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../../../Assets/user-placeholder-img.jpg";
import { BASE_URL } from "../../../apis/baseUrl";
import { toast } from "react-hot-toast";
import { FreelancereditProfileCard } from "../userEditProfileCard/userEditProfileCard";

function Freelancer_Profile({ user }) {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState({});
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isUserLoggedIn) {
      toast.error("Login first");
      navigate("/freelancer-login");
    }
  }, []);
  const redirectToMyWorks = () => {
    navigate("/freelancer-completed-works");
  };
  const redirectToFreelancerAppliedVacancies = () => {
    navigate("/freelancer-applied-vacancies");
  };

  useEffect(() => {
    let filename = userData?.profilepic?.filename || null;
        let profilePicUrl = placeholderImg;
        if (filename) {
          profilePicUrl = BASE_URL + filename;
        }
        setProfilePicture(profilePicUrl);
  }, [userData])
  return (
    <>
      <Navbar />
      <Container fluid className="bg-light h-75 w-100">
        <h1 className="m-5 p-5 text-center">Freelancer Profile</h1>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              {/* <Image
                src={user && user.profilepic ? user.profilepic : profilePic}
                alt="Profile Picture"
                roundedCircle
                width={200}
                height={200}
                className="m-5"
              /> */}
              <div className="m-5 fs-3">
                <h3 className="m-4">Name: {userData && userData.name}</h3>
                <p className="m-4 fs-6">Email: {userData && userData.email}</p>
                <p className="m-4 fs-6">
                  Qualification: {userData && userData.qualification}
                </p>
                <p className="m-4 fs-6">
                  Job Role: {userData && userData.jobrole}
                </p>
                <p className="m-4 fs-6">
                  Contact: {userData && userData.contact}
                </p>
              </div>
            </div>
            <Row className="justify-content-center mt-5">
              <Col xs="auto" className="me-3">
       
              </Col>
              <Col xs="auto" className="me-3">
            
              </Col>
              <Col
                xs="auto"
                style={{paddingLeft: "82px"}}
                className="d-flex  w-100 justify-content-between"
              >
                <FreelancereditProfileCard />
                <Button onClick={redirectToMyWorks}>Completed works</Button>
                <Button
                  variant="success"
                  onClick={redirectToFreelancerAppliedVacancies}
                >
                  Applied vacancies
                </Button>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Image
              src={profilePicture}
              alt="Profile Picture"
              className="m-3"
              width={300}
              height={300}
            />
          </Col>
        </Row>
      </Container>

      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default Freelancer_Profile;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ConsultancyProfile.css";
import defaultProfilePic from "../../../Assets/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";
import defaultIllustration from "../../../Assets/illustration-graphic-cartoon-character-of-freelancer-programmer-outsourcer-vector.jpg";
import { axiosInstance } from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseUrl";
import { toast } from "react-hot-toast";
import { ConsultancyeditProfileCard } from "../userEditProfileCard/userEditProfileCard";
function ConsultancyProfile() {
  const navigate = useNavigate();
  const { userData: consultancyData, userId } = useSelector(
    (state) => state.auth
  );

  const [proPic, setProPic] = useState(defaultProfilePic);
  useEffect(() => {
    if (!userId) {
      toast.error("Please login again..");
      navigate("../consultancy-login");
      
    } else {
      // getConsultancyProfile();
    }
  }, []);

  useEffect(() => {
    if (consultancyData && consultancyData.profilepic) {
      let filename = consultancyData.profilepic.filename;
      const imageUrl = BASE_URL + filename;
      setProPic(imageUrl);
    }
  }, []);
  console.log("consultancyData", consultancyData);


  return (
    <>
      <Navbar />
      <Container fluid className="bg-light h-75 w-100">
        <h1 className="m-5 p-5 text-center">Consultancy Profile</h1>
        {consultancyData && (
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                {/* <Image
                  src={proPic}
                  alt="Profile Picture"
                  roundedCircle
                  width={200}
                  height={200}
                  className="m-5"
                /> */}
                <div className="m-5 fs-3">
                  <h3 className="m-4">Name: {consultancyData.name}</h3>
                  <p className="m-4 fs-5">Email: {consultancyData.email}</p>
                  <p className="m-4 fs-5">Contact: {consultancyData.contact}</p>
                  <p className="m-4 fs-5">
                    License ID: {consultancyData.licenseId}
                  </p>
                  <p className="m-4 fs-5">Address: {consultancyData.address}</p>
                </div>
              </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <Image
                src={defaultIllustration}
                alt="Profile Illustration"
                className="m-3"
                width={300}
                height={300}
              />
            </Col>
          </Row>
        )}
        <ConsultancyeditProfileCard />
      </Container>
      <Footer />
    </>
  );
}

export default ConsultancyProfile;

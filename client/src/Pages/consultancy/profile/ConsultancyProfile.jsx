import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ConsultancyProfile.css";
import defaultProfilePic from "../../../Assets/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";
import defaultIllustration from "../../../Assets/illustration-graphic-cartoon-character-of-freelancer-programmer-outsourcer-vector.jpg";
import axios from "axios";

function ConsultancyProfile() {
  const [consultancyData, setConsultancyData] = useState(null);
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userId) {
      alert("Please login again..");
      setTimeout(() => {
        navigate("../consultancy-login");
      }, 0);
    } else {
      getConsultancyProfile();
    }
  }, []);

  const getConsultancyProfile = async () => {
    try {
      const res = await axios.get(`/getConsultancyById/${userId}`);
      if (res.status === 200) {
        setConsultancyData(res.data.data);
      } else {
        console.log("Error fetching consultancy profile");
      }
    } catch (error) {
      console.log("Error fetching consultancy profile", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="bg-light h-75 w-100">
        <h1 className="m-5 p-5 text-center">Consultancy Profile</h1>
        {consultancyData && (
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <Image
                  src={consultancyData.profilepic || defaultProfilePic}
                  alt="Profile Picture"
                  roundedCircle
                  width={200}
                  height={200}
                  className="m-5"
                />
                <div className="m-5 fs-3">
                  <h3 className="m-4">Name: {consultancyData.name}</h3>
                  <p className="m-4 fs-5">Email: {consultancyData.email}</p>
                  <p className="m-4 fs-5">Contact: {consultancyData.contact}</p>
                  <p className="m-4 fs-5">License ID: {consultancyData.licenseId}</p>
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
      </Container>
      <Footer />
    </>
  );
}

export default ConsultancyProfile;

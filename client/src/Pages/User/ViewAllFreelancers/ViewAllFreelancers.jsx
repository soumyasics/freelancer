import React from "react";
import "./ViewAllFreelancers.css";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  InputGroup,
  Form,
} from "react-bootstrap";
import { IoSearchSharp } from "react-icons/io5";
import Navbar from "../../Common/Navbar/navbar";
import profilePic from "../../../Assets/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg";
import placeholderImg from "../../../Assets/user-placeholder-img.jpg";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../../apis/baseUrl";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import Footer from "../../Common/Footer/footer";
import { useSelector } from "react-redux";
function ViewAllFre1elancers() {
  const navigate = useNavigate();
  const [allFreelancersData, setAllFreelancersData] = useState([]);
  const [fixedFreelancers, setFixedFreelancers] = useState([]);
  
  useEffect(() => {
    getAllFreelancers();
  }, []);

  const navigateToDetailedView = (id) => {
    navigate(`/freelancer/${id}`);
  };
  const getAllFreelancers = async () => {
    try {
      let res = await axiosInstance.get("/getAllFreelancers");
      let data = res?.data?.data || [];
      setAllFreelancersData(data);
      setFixedFreelancers(data);
    } catch (error) {
      console.log("Error on getting all freelancers", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const searchFreelancers = (e) => {
    const search = e.target.value;
    if (search) {
      let filteredData = fixedFreelancers.filter((el) => {
        return el.name.toLowerCase().includes(search.toLowerCase());
      });
      setAllFreelancersData(filteredData);
    } else {
      setAllFreelancersData(fixedFreelancers);
    }
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, pa0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
        className="container my-5  rounded"
      >
        {allFreelancersData.length > 0 && (
          <h3 className="text-center m-5 text-dark">View All Freelancers</h3>
        )}
        <div>
          <form className="shadow w-25" onSubmit={handleSubmit}>
            {/* <input
              onChange={searchFreelancers}
              type="text"
              placeholder="Search Freelancers here..."
              className="form-control "
            /> */}

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <IoSearchSharp />
              </InputGroup.Text>
              <Form.Control
                onChange={searchFreelancers}
                type="text"
                placeholder="Search Freelancers here..."
                className="form-control "
              />
            </InputGroup>
          </form>

          <Container
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
            className="d-flex justify-content-center flex-wrap gap-5 mt-4 py-5"
          >
            {allFreelancersData.length === 0 && (
              <h1 className="text-center m-5 text-dark">
                Freelancers Data Not Found
              </h1>
            )}
            {allFreelancersData.map((freelancer) => {
              let filename = freelancer?.profilepic?.filename || null;
              let profilePicUrl = placeholderImg;
              if (filename) {
                profilePicUrl = BASE_URL + filename;
              }

              return (
                <div key={freelancer._id} className=" shadow">
                  <Col md={12}>
                    <Card className="m-3" style={{ maxWidth: "400px" }}>
                      <Row className="g-0">
                        <Col md={8}>
                          <Card.Body className="text-center">
                            <Card.Title className=" my-3 mx-2 ">
                              {" "}
                              Name: &nbsp;
                              {freelancer.name}
                            </Card.Title>
                            <Card.Text>
                              Qualification: {freelancer.qualification}
                            </Card.Text>
                            <Card.Text>
                              Job Role: {freelancer.jobrole}
                            </Card.Text>
                            <button
                              
                              className=" my-3 mx-2 button-30 border-0 "
                              
                              onClick={() => {
                                navigateToDetailedView(freelancer._id);
                              }}
                            >
                              View More
                            </button>{" "}
                          </Card.Body>
                        </Col>
                        <Col
                          md={4}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <Card.Img
                            src={profilePicUrl}
                            className="img-fluid rounded-start m-5"
                            alt="profile pic"
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </div>
              );
            })}
          </Container>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default ViewAllFre1elancers;

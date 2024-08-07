import React, { useState, useEffect } from "react";
import Navbar from "../../Common/Navbar/navbar";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseUrl";
import placeholderImg from "../../../Assets/user-placeholder-img.jpg";
import "./DetailedViewFreelancers.css";
import Footer from "../../Common/Footer/footer";
import { useNavigate } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { ReviewModal } from "./reviewModel";
function DetailedViewFreelancers() {
  const { id } = useParams();
  const [freelancerData, setFreelancerData] = useState(null);
  const [profilePic, setProfilePic] = useState(placeholderImg);
  const [showReview, setShowReview] = useState(false);
  const { userType } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getFreelancerData();
    }
  }, [id]);
  const getFreelancerData = async () => {
    try {
      let res = await axiosInstance.post("getFreelancerById/" + id);
      let data = res?.data?.data || null;
      if (data) {
        setFreelancerData(data);
        let filename = data?.profilepic?.filename || null;
        let profilePicUrl = placeholderImg;
        if (filename) {
          profilePicUrl = BASE_URL + filename;
        }
        setProfilePic(profilePicUrl);
      } else {
        console.log("Freelancer data not found");
      }
    } catch (error) {
      console.log("error on get freelancer data", error);
    }
  };
  const startChatWithFreelancer = (id, name) => {
    navigate(`/user-freelancer-chat/${id}/${encodeURIComponent(name)}`);
  };

  const handleClose = () => {
    setShowReview(false);
  };
  const handleOpen = () => {
    setShowReview(true);
  }
  return (
    <>
      <Navbar />

      <div>
        <Container className="mt-5 ">
          <h3 className="text-center m-5 text-dark">Details</h3>

          <ReviewModal show={showReview} handleClose={handleClose} id={id} />
          <Row
            style={{ backgroundColor: "#eee" }}
            className=" border-0 text-white"
          >
            <Col>
              <Card
                className="mb-3  border-0 text-white"
                style={{ margin: "auto", background: "inherit" }}
              >
                <Card.Body className="m-3 text-dark">
                  <Card.Title className="font-weight-bolder">
                    Name: {freelancerData?.name}
                  </Card.Title>
                  <Card.Text>Contact: {freelancerData?.contact}</Card.Text>
                  <Card.Text>Email: {freelancerData?.email}</Card.Text>
                  <Card.Text>
                    Qualification: {freelancerData?.qualification}
                  </Card.Text>
                  <Card.Text>Job Role: {freelancerData?.jobrole}</Card.Text>

                  {userType === "user" && (
                    <button
                      className="button-30"
                      onClick={() => {
                        startChatWithFreelancer(
                          freelancerData._id,
                          freelancerData.name
                        );
                      }}
                    >
                      Chat with {freelancerData?.name} &nbsp;
                      <IoChatbubbleEllipsesOutline />
                    </button>
                  )}
                  <Button
                    className="ms-5"
                    variant="success"
                    onClick={handleOpen}
                  >
                    View Reviews
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <div className="text-center ">
                <img
                  src={profilePic}
                  className="img-fluid rounded m-5"
                  alt="profile pic"
                  style={{ width: "50%" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default DetailedViewFreelancers;

import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useParams } from "react-router-dom";
import placeholderImg from "../../../Assets/istockphoto-955148158-612x612-removebg-preview.png";
import "./View_Request_Details.css";

function View_Request_Details() {
  const { id } = useParams();
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    if (id) {
      getRequestData();
    }
  }, [id]);

  const getRequestData = async () => {
    try {
      const res = await axiosInstance.get(`/getWorkRequestById/${id}`);
      const data = res?.data?.data || null;
      if (data) {
        setRequestData(data);
      } else {
        console.log("Request data not found");
      }
    } catch (error) {
      console.log("Error fetching request data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5 ">
        <h1 className="text-center m-5 text-white">Request Details</h1>
        <Row className="border-0 bg-white m-5 ">
          <Col className="mb-3 border-0 ">
            <Card className="border-0 ">
              <Card.Body className="m-3">
                <Card.Title className="font-weight-bolder m-3">
                  Work Title: {requestData?.title}
                </Card.Title>
                <Card.Text className="m-3">
                  Description: {requestData?.description}
                </Card.Text>
                <Card.Text className="m-3">
                  Category: {requestData?.category}
                </Card.Text>
                <Card.Text className="m-3">
                  Budget: {requestData?.budget}
                </Card.Text>
                <Card.Text className="m-3">
                  Deadline: {requestData?.deadline?.substring(0, 10)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className=" border-0 bg-white text-center rounded ">
            <Image
              src={placeholderImg}
              alt="Filler image"
              className="m-3"
              width={300}
              height={300}
            />
          </Col>
        </Row>
      </Container>
      <div className="position-relative" style={{ top: "200px" }}>
        <Footer />
      </div>
    </>
  );
}

export default View_Request_Details;

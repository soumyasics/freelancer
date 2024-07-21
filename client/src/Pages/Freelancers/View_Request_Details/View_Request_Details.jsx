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
        <h3 className="text-center m-5 table-heading">Request Details</h3>
        <Row className="border-0 bg-white m-5 ">
          <Col className=" border-0 shadow">
            <Card className="border-0 ">
              <Card.Body className="m-3">
                <Card.Title className="font-weight-bolder text-center">
                  Work request details
                </Card.Title>

                <Card.Text className="m-3">
                  <span className="fw-bold me-2">Title:</span>
                  {requestData?.title}
                </Card.Text>

                <Card.Text className="m-3">
                  <span className="fw-bold me-2">Category:</span>
                  {requestData?.category}
                </Card.Text>
                <Card.Text className="m-3">
                  <span className="fw-bold me-2">Budget:</span>
                  {requestData?.budget}
                </Card.Text>
                <Card.Text className="m-3">
                  <span className="fw-bold me-2">Deadline:</span>
                  {requestData?.deadline?.substring(0, 10)}
                </Card.Text>
           
                <Card.Text className="m-3">
                  <span className="fw-bold me-2">Client Name:</span>
                  {requestData?.userId?.firstName}{" "}
                  {requestData?.userId?.lastName}
                </Card.Text>
                <Card.Text className="m-3">
                  <span className="fw-bold me-2">Email:</span>
                  {requestData?.userId?.email}
                </Card.Text>
                <Card.Text className="m-3">
                  <span className="fw-bold me-2">Description:</span>
                  {requestData?.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className=" border-0  align-items-center rounded shadow d-flex justify-content-center ">
            <Image
              src={placeholderImg}
              alt="Filler image"
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

export default View_Request_Details;

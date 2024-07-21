import { useEffect, useState } from "react";
import Footer from "../../Common/Footer/footer";
import Navbar from "../../Common/Navbar/navbar";
import { useParams } from "react-router-dom";
import statusImg from "../../../Assets/illustrations/status.jpg";
import { axiosInstance } from "../../../apis/axiosInstance";
import { Button, Col, Image, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { FaUser } from "react-icons/fa";
import noResponseImg from "../../../Assets/illustrations/no-response.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPayment } from "../../../redux/slices/paymentSlice";
export const ViewResponseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState(null);
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    if (id) {
      getRequestData(id);
    }
  }, []);

  const getRequestData = async (id) => {
    try {
      let res = await axiosInstance.get("/getWorkRequestById/" + id);
      let data = res?.data?.data || null;
      if (data) {
        setRequestData(data);
        setResponses(data?.freelancerResponses);
      }
    } catch (err) {
      console.log("Error on get request data", err);
    }
  };
  const redirectToViewFreelancer = (id) => {
    navigate("/freelancer/" + id);
  };
  const acceptOffer = (freelancerId, amount) => {
    let collectData = {
      workId: id,
      freelancerId,
      amount,
    };
    dispatch(addPayment(collectData));
    navigate("/payment");
  };
  return (
    <>
      <Navbar />
      <div
        className="mx-auto p-3 rounded shadow"
        style={{ backgroundColor: "#ffffff", width: "95%" }}
      >
        <h1 className="text-center">Request Status</h1>

        <div className="d-flex gap-5 justify-content-between">
          <div className="p-4 w-50 shadow">
            <h4 className="text-center"> Work Details</h4>

            <p>
              <span className="fs-6 fw-bold">Title: </span>{" "}
              {requestData?.title || "..."}
            </p>
            <p>
              <span className="fs-6 fw-bold">Category: </span>{" "}
              {requestData?.category || "..."}
            </p>
            <p>
              <span className="fs-6 fw-bold">Budget: </span> ₹{" "}
              {requestData?.budget || "..."}
            </p>
            <p>
              <span className="fs-6 fw-bold">Deadline: </span>{" "}
              {requestData?.deadline.substring(0, 10) || "..."}
            </p>
            <p>
              <span className="fs-6 fw-bold">Current Status :</span>{" "}
              {requestData?.status}
            </p>
            <p>
              <span className="fs-6 fw-bold">Description: </span>{" "}
              {requestData?.description || "..."}
            </p>
          </div>

          <div
            style={{ minHeight: "420px" }}
            className="d-flex justify-content-center align-items-center w-50"
          >
            <Image className="w-75  mx-auto" src={statusImg} alt="status" />
          </div>
        </div>

        <div className="shadow w-75 mx-auto">
          {responses.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h5 className="mt-5 text-center">
                Freelancers did not give any responses yet.{" "}
              </h5>
              <Image
                className="w-25  mt-3"
                src={noResponseImg}
                alt="no-response"
              />
            </div>
          ) : (
            <div
              style={{ overflowY: "scroll", height: "400px" }}
              className="mt-4 shadow"
            >
              <h3 className="mt-5 text-center">Freelancer Responses.</h3>

              <ListGroup as="ul">
                {responses.map((res, index) => {
                  return (
                    <ListGroup.Item
                      key={index}
                      style={{ backgroundColor: "white", color: "black" }}
                      as="li"
                      active
                      className="mb-3"
                    >
                      <Row className="d-flex justify-content-start">
                        <Col className="d-flex align-items-center" md={5}>
                          <FaUser />
                          <span className="ms-2">{res?.message} </span>
                        </Col>
                        <Col className="d-flex align-items-center">
                          <Button
                            onClick={() => {
                              redirectToViewFreelancer(res?.freelancerId);
                            }}
                            className="ms-5 text-light d-flex justify-content-center align-items-center"
                            variant="info"
                          >
                            {" "}
                            View Freelancer{" "}
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            onClick={() => {
                              acceptOffer(
                                res?.freelancerId,
                                requestData?.budget
                              );
                            }}
                            className="ms-5 m-3"
                            variant="success"
                          >
                            {" "}
                            Accept Offer{" "}
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

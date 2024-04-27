import { useEffect, useState } from "react";
import Footer from "../../Common/Footer/footer";
import Navbar from "../../Common/Navbar/navbar";
import { useParams } from "react-router-dom";
import statusImg from "../../../Assets/illustrations/status.jpg";
import { axiosInstance } from "../../../apis/axiosInstance";
import { Button, Image } from "react-bootstrap";
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
      amount
    };
    dispatch(addPayment(collectData));
    navigate("/payment");
  };
  return (
    <>
      <Navbar />
      <div
        className="mx-auto p-3 rounded shadow"
        style={{ backgroundColor: "#ffffff", width: "95%", minHeight: "800px" }}
      >
        <h1 className="text-center">Request Status</h1>

        <div className="d-flex gap-5 justify-content-between">
          <div style={{ height: "800px" }} className="p-4 w-50 shadow">
            <h1 className="">Title: {requestData?.title || "..."}</h1>
            <h5>Description: {requestData?.description || "..."}</h5>
            <h5>Category: {requestData?.category || "..."}</h5>
            <h5>Budget: ₹ {requestData?.budget || "..."}</h5>
            <h5>Deadline: {requestData?.deadline.substring(0, 10) || "..."}</h5>
            <h5>Current Status: {requestData?.status}</h5>

            {responses.length === 0 ? (
              <div>
                <h3 className="mt-5">
                  Freelancers did not give any respones yet.{" "}
                </h3>
                <Image
                  className="w-50  mx-auto"
                  src={noResponseImg}
                  alt="no-response"
                />
              </div>
            ) : (
              <div
                style={{ overflowY: "scroll", height: "400px" }}
                className="mt-4 shadow"
              >
                <h2 className="mt-5">Freelancer Responses.</h2>

                <ListGroup as="ul">
                  {responses.map((res, index) => {
                    return (
                      <ListGroup.Item
                        key={index}
                        as="li"
                        active
                        className="mb-3"
                      >
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center">
                            <FaUser />
                            <span className="ms-2">{res?.message} </span>
                          </div>
                          <div>
                            <Button
                              onClick={() => {
                                redirectToViewFreelancer(res?.freelancerId);
                              }}
                              className="ms-5"
                              variant="warning"
                            >
                              {" "}
                              View Freelancer{" "}
                            </Button>
                            <Button
                              onClick={() => {
                                acceptOffer(res?.freelancerId, requestData?.budget);
                              }}
                              className="ms-5"
                              variant="success"
                            >
                              {" "}
                              Accept Offer{" "}
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            )}
          </div>
          <div
            style={{ height: "500px" }}
            className="d-flex justify-content-center align-items-center w-50"
          >
            <Image className="w-75  mx-auto" src={statusImg} alt="status" />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

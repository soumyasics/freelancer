import { useEffect, useState } from "react";
import Footer from "../../Common/Footer/footer";
import Navbar from "../../Common/Navbar/navbar";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import placeholderImg from "../../../Assets/user-placeholder-img.jpg";
import { BASE_URL } from "../../../apis/baseUrl";
import { Col, Row } from "react-bootstrap";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PaymentPaidDetails from "./viewPaymentPaidDetails";
export const FreelancerViewWorkStatus = () => {
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});
  const [freelancerData, setFreelancerData] = useState({});
  const [profilePic, setProfilePic] = useState(placeholderImg);
  const navigate = useNavigate();
  console.log("work request data", requestData);
  useEffect(() => {
    if (id) {
      getWorkRequestDetails();
    }
  }, [id]);

  const getWorkRequestDetails = async () => {
    try {
      let res = await axiosInstance.get("getWorkRequestById/" + id);
      if (res.status === 200) {
        let data = res?.data?.data || null;
        const freelancerId = data?.assignedFreelancerId || null;
        if (freelancerId) {
          getFreelancerData(freelancerId);
        }
        if (data) {
          setRequestData(data);
        }
      }
    } catch (err) {
      console.log("Error on get request data", err);
    }
  };

  const getFreelancerData = async (freelancerId) => {
    try {
      const res = await axiosInstance.post("getFreelancerById/" + freelancerId);
      if (res.status === 200) {
        const data = res?.data?.data || null;
        setFreelancerData(res.data.data);
        let filename = data?.profilepic?.filename || null;
        let profilePicUrl = placeholderImg;
        if (filename) {
          profilePicUrl = BASE_URL + filename;
        }
        setProfilePic(profilePicUrl);
      }
    } catch (error) {
      console.log("Error on get freelancers", error);
    }
  };
  console.log("freel", freelancerData);

  const startChatWithFreelancer = (id, name) => {
    navigate(`/user-freelancer-chat/${id}/${encodeURIComponent(name)}`);
  };
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "450px" }}>
        <div className="mt-5 px-5">
          <div>
            <h3 className="text-center">Work status</h3>
          </div>

          <div className="d-flex gap-5  justify-content-between">
            <div className="p-4 w-50 shadow">
              <h4 className="text-center"> Work Details</h4>
              <Row className="mt-3">
                <Col>
                  <p>
                    <span className="fs-6 fw-bold">Title: </span>{" "}
                    {requestData?.title || "..."}
                  </p>
                  <p>
                    <span className="fs-6 fw-bold">Category: </span>{" "}
                    {requestData?.category || "..."}
                  </p>
                  <p>
                    <span className="fs-6 fw-bold">Current Status :</span>{" "}
                    {requestData?.status}
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className="fs-6 fw-bold">Budget: </span> ₹{" "}
                    {requestData?.budget || "..."}
                  </p>
                  <p>
                    <span className="fs-6 fw-bold">Deadline: </span>{" "}
                    {requestData?.deadline?.substring(0, 10) || "..."}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <p className="text-center">
                    {requestData?.description || "..."}
                  </p>
                </Col>
              </Row>
              <Row className="mt-3 justify-content-center d-flex">
                <button
                  className="button-50"
                  style={{ backgroundColor: "#ed1616", width: "135px" }}
                  role="button"
                >
                  Send Complaint
                </button>
              </Row>
            </div>

            <div className="p-4 w-50 shadow" style={{ minHeight: "400px" }}>
              <h4 className="text-center"> Client Details</h4>

              <Row className="mt-3">
                <Col>
                  <p>
                    <span className="fs-6 fw-bold">Name: </span>{" "}
                    {requestData?.userId?.firstName}{" "}
                    {requestData?.userId?.lastName}
                  </p>
                  <p>
                    <span className="fs-6 fw-bold">Email: </span>{" "}
                    {requestData?.userId?.email || "..."}
                  </p>
                </Col>
                <Col>
                  <div className="d-flex justify-content-center">
                    <button
                      className="button-30"
                      onClick={() => {
                        startChatWithFreelancer(
                          freelancerData._id,
                          freelancerData.name
                        );
                      }}
                    >
                      Chat
                      <IoChatbubbleEllipsesOutline />
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div>
          <PaymentPaidDetails workId={id} />
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

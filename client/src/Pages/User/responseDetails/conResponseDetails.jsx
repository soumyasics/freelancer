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
import vac2Img from "../../../Assets/new/vac-2.png";
import { FreelancersCard } from "./freelancersCard";
export const ViewVacancyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  useEffect(() => {
    if (id) {
      getRequestData(id);
    }
  }, []);

  const getRequestData = async (id) => {
    try {
      let res = await axiosInstance.get("con-getWorkRequestById/" + id);
      let data = res?.data?.data || null;
      if (data) {
        setRequestData(data);
        let revFreelancers = data?.appliedFreelancers?.reverse() || []
        setFreelancers(revFreelancers);
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

  const redirectToWorkStatus = (id) => {
    navigate("/user-view-work-status/" + id);
  };
  return (
    <>
      <Navbar />
      <div
        className="mx-auto p-3 rounded"
        style={{ backgroundColor: "#ffffff", width: "95%" }}
      >
        <h3 className="text-center">Vacancy Details</h3>

        <div className="d-flex gap-5 justify-content-between">
          <div
            style={{ minHeight: "420px" }}
            className="d-flex justify-content-center align-items-center w-50"
          >
            <Image className="w-75  mx-auto" src={vac2Img} alt="status" />
          </div>

          <div className="p-4 w-50 shadow">
            <h4 className="text-center"> Details</h4>

            <p>
              <span className="fs-6 fw-bold">Title: </span>{" "}
              {requestData?.title || "..."}
            </p>
            {/* <p>
              <span className="fs-6 fw-bold">Category: </span>{" "}
              {requestData?.category || "..."}
            </p> */}
            <p>
              <span className="fs-6 fw-bold">Budget: </span> ₹{" "}
              {requestData?.budget || "..."}
            </p>
            <p>
              <span className="fs-6 fw-bold">Deadline: </span>{" "}
              {requestData?.deadline?.substring(0, 10) || "..."}
            </p>
            <p>
              <span className="fs-6 fw-bold">Current Status :</span>{" "}
              {requestData?.status}
            </p>
            <p style={{ maxHeight: "200px", overflowY: "auto" }}>
              <span className="fs-6 fw-bold">Description: </span>{" "}
              {requestData?.description || "..."}
            </p>

            {requestData?.assignedFreelancerId && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="button-17"
                  onClick={() => {
                    redirectToWorkStatus(requestData._id);
                  }}
                >
                  Work Status
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="shadow w-100 mx-auto p-3 mt-3">
          {freelancers.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h5 className="mt-5 text-center">No one has applied yet. </h5>
              <Image
                className="w-25  mt-3"
                src={noResponseImg}
                alt="no-response"
              />
            </div>
          ) : (
            <div
              style={{ overflowY: "scroll", height: "600px" }}
              className="mt-4 "
            >
              <h3 className="my-5 text-center">Applicants details.</h3>

              <ListGroup as="ul">
                {freelancers.map((data, index) => {
                  if (data.freelancerId === null) return null;
                  return (
                    <div key={index}>
                      <FreelancersCard data={data} num={index + 1} />
                    </div>
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

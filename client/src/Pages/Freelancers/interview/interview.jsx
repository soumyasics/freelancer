import React, { useState, useEffect } from "react";
import { Container, Table, Button, InputGroup, Form } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./interview.css";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
export function FreelancerScheduledInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [fixedReqs, setFixedReqs] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      getInterviewSchedule(userId);
    }
  }, []);
  const getInterviewSchedule = async (userId) => {
    try {
      const res = await axiosInstance.get(
        "/getAllInterviewsByFreelancerId/" + userId
      );
      if (res.status === 200) {
        let data = res.data?.data || [];
        let revData = data.reverse();
        setFixedReqs(revData);
        setInterviews(revData);
      } else {
        console.log("Error on getting interviews");
      }
    } catch (error) {
      console.log("Error on getting interviews", error);
    }
  };

  const searchApplicants = (e) => {
    const value = e.target.value;
    if (value) {
      let filteredData = fixedReqs.filter((el) => {
        return el.consultancyId?.name
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setInterviews(filteredData);
    } else {
      setInterviews(fixedReqs);
    }
  };

  const acceptInterview = async (id) => {
    try {
      const res = await axiosInstance.patch(
        "/applicantAcceptScheduleById/" + id
      );
      if (res.status === 200) {
        toast.success(
          "You accepted interview schedule successfully. Please attend on time"
        );
        getInterviewSchedule(userId);
      } else {
        console.log("Error on deleting interviews");
      }
    } catch (error) {
      console.log("Error on accept interviews", error);
    }
  };

  console.log("Intev", interviews);
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light">
        <Container>
          <h3 className="table-heading text-dark m-5 text-center mt-5">
            Scheduled Interviews
          </h3>
          <div className="d-flex justify-content-between align-items-center ">
            <InputGroup style={{ width: "35%", height: "42px" }}>
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search consultancy here.."
                type="text"
                onChange={searchApplicants}
              />
            </InputGroup>
          </div>
          <Table striped bordered hover className="mt-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Consultancy Name</th>
                <th>Scheduled Date </th>
                <th>Time</th>
                <th>Mode</th>
                <th>My response</th>
                <th>More info</th>

                <th>Accept</th>
                <th>Reject</th>
                <th>Vacancy details</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {interviews.map((req, index) => {
                return (
                  <tr key={req._id}>
                    <td>{index + 1} </td>
                    <td>{req.consultancyId?.name}</td>
                    <td>{req.interviewDate?.substring(0, 10)}</td>
                    <td>{req.interviewDate?.substring(11, 16)}</td>
                    <td>{req.interviewMode}</td>
                    <td>{req.applicantStatus}</td>
                    <td>{req?.description?.substring(0, 50)}</td>
                    <td>
                      <Button
                        disabled={req.applicantStatus !== "Pending"}
                        variant="success"
                        onClick={() => {
                          acceptInterview(req._id);
                        }}
                      >
                        Accept
                      </Button>
                    </td>
                    <td>
                      <Button
                        disabled={req.applicantStatus !== "Pending"}
                        variant="danger"
                      >
                        Reject 
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          navigate(
                            `/freelancer-view-vacancy-details/${req?.vacencyId?._id}`
                          );
                        }}
                      >
                        View More
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
      <div style={{ position: "relative", top: "400px" }}>
        <Footer />
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Container, Table, Button, InputGroup, Form } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./interview.css";
import { FaSearch } from "react-icons/fa";
export function ConsScheduledInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [fixedReqs, setFixedReqs] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      getRequestsData(userId);
    }
  }, []);
  const getRequestsData = async (userId) => {
    try {
      const res = await axiosInstance.get(
        "/getAllInterviewsByConsultancyId/" + userId
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
        return el.freelancerId?.name.toLowerCase().includes(value.toLowerCase());
      });
      setInterviews(filteredData);
    } else {
      setInterviews(fixedReqs);
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
                placeholder="Search applicants here.."
                type="text"
                onChange={searchApplicants}
              />
            </InputGroup>
          </div>
          <Table striped bordered hover className="mt-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Scheduled Date </th>
                <th>Time</th>
                <th>Mode</th>
                <th>Applicant status</th>
                <th>More info</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {interviews.map((req, index) => {
                return (
                  <tr key={req._id}>
                    <td>{index + 1} </td>
                    <td>{req.freelancerId?.name}</td>
                    <td>{req.freelancerId?.email}</td>
                    <td>{req.interviewDate?.substring(0, 10)}</td>
                    <td>{req.interviewDate?.substring(11, 16)}</td>
                    <td>{req.interviewMode}</td>
                    <td>{req.applicantStatus}</td>
                    <td>{req?.description?.substring(0, 50)}</td>
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

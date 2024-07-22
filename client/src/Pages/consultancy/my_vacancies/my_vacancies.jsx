import React, { useState, useEffect } from "react";
import { Container, Table, Button, InputGroup, Form } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./my_vacancies.css";
import { FaSearch } from "react-icons/fa";
export function MyVacanccies() {
  const [requests, setRequests] = useState([]);
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
        "/con-getWorkRequestsByUserid/" + userId
      );
      if (res.status === 200) {
        let data = res.data?.data || [];
        let revData = data.reverse();
        setFixedReqs(revData);
        setRequests(revData);
      } else {
        console.log("Error on getting requests");
      }
    } catch (error) {
      console.log("Error on getting requests", error);
    }
  };
  const redirectToViewResponses = (id) => {
    navigate("/viewVacancyDetails/" + id);
  };
  const searchWorkReqs = (e) => {
    const value = e.target.value;
    if (value) {
      let filteredData = fixedReqs.filter((el) => {
        return el.title.toLowerCase().includes(value.toLowerCase());
      });
      setRequests(filteredData);
    } else {
      setRequests(fixedReqs);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light">
        <Container>
          <h3 className="table-heading text-dark m-5 text-center mt-5">
            My Work Vacancies
          </h3>
          <div className="d-flex justify-content-between align-items-center ">
            <InputGroup style={{ width: "35%", height: "42px" }}>
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search work requests here.."
                type="text"
                onChange={searchWorkReqs}
              />
            </InputGroup>
          </div>
          <Table striped bordered hover className="mt-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>Contact </th>
                <th>View More</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {requests.map((req, index) => {
                return (
                  <tr key={req._id}>
                    <td>{index + 1} </td>
                    <td>{req.title}</td>
                    <td>{req.category}</td>
                    <td>{req.budget}</td>
                    <td>{req.deadline?.substring(0, 10)}</td>
                    <td>{req.consultancyPhoneNumber}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => redirectToViewResponses(req._id)}
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

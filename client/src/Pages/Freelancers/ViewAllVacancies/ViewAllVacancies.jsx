import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./ViewAllVacancies.css";

function ViewAllVacancies() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getVacanciesData();
  }, []);

  const getVacanciesData = async () => {
    try {
      const res = await axiosInstance.get("/con-getAllWorkRequest");
      if (res.status === 200) {
        let data = res.data?.data || [];
        setRequests(data);
      } else {
        console.log("Error on getting vacancy requests");
      }
    } catch (error) {
      console.log("Error on getting vacancy requests", error);
    }
  };

  const viewVacancyStatus = (vacancy) => {
    navigate(`/view-vacancy/${vacancy._id}`);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "0" }}>
        <Container>
          <h1 className="table-heading text-dark m-5 text-center mt-5">
            Consultancy Vacancy Requests
          </h1>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>Consultancy Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {requests.map((vacancy, index) => (
                <tr key={vacancy._id}>
                  <td>{index + 1}</td>
                  <td>{vacancy.title}</td>
                  <td>{vacancy.description}</td>
                  <td>{vacancy.category}</td>
                  <td>{vacancy.budget}</td>
                  <td>{vacancy.deadline?.substring(0, 10)}</td>
                  <td>{vacancy.consultancyPhoneNumber}</td>
                  <td>
                    <Button
                      onClick={() => viewVacancyStatus(vacancy)}
                      variant="warning"
                    >
                      View Status
                    </Button>
                  </td>
                </tr>
              ))}
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

export default ViewAllVacancies;

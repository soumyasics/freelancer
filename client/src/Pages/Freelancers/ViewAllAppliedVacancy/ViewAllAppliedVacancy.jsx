import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

export function ViewAllFreelancerAppliedVacancies() {
  const [appliedWorks, setAppliedWorks] = useState([]);
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userId) {
      toast.error("Please login again..");
      setTimeout(() => {
        navigate("../consultancy-login");
      }, 0);
    } else {
      getAppliedWorksData();
    }
  }, []);

  const getAppliedWorksData = async () => {
    try {
      const res = await axiosInstance.get(
        "/viewAllAppliedVacencyByFreelancerId/" + userId
      );
      if (res.status === 200) {
        const data = res.data?.data || [];
        setAppliedWorks(data);
      } else {
        console.log("Error fetching applied works");
      }
    } catch (error) {
      console.log("Error fetching applied works", error);
    }
  };

  const viewWorkStatus = (work) => {
    navigate(`/view-work/${work._id}`);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "0" }}>
        <Container>
          <h3 className="table-heading text-dark m-5 text-center mt-5">
            Vacancies applied by you
          </h3>

          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Vacancy Title</th>
                <th>Vacancy Category</th>
                <th>Vacancy Description</th>
                <th>Consultancy Name</th>
                <th>Consultancy Email</th>
                <th>Consultancy Contact</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {appliedWorks.map((work, index) => {
                console.log("workkk", work)
                return (
                  <tr key={work._id}>
                    <td>{index + 1}</td>
                    <td>{work?.vacencyId?.title}</td>
                    <td>{work?.vacencyId?.category}</td>
                    <td>{work.vacencyId?.description}</td>
                    <td>{work?.consultancyId?.name}</td>
                    <td>{work?.consultancyId?.email}</td>
                    <td>{work?.consultancyId?.contact}</td>
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


import React, { useState, useEffect } from "react";
import { Container, Table, Button, InputGroup, Form } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

export function ViewAllFreelancerAppliedVacancies() {
  const { userId, userType } = useSelector((state) => state.auth);
  const [appliedWorks, setAppliedWorks] = useState([]);
  const [fixedWorks , setFixedWorks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || userType !== "freelancer") {
      toast.error("Please login again..");
      setTimeout(() => {
        navigate("/freelancer-login");
      }, 0);
    } else {
      getAppliedWorksData();
    }
  }, []);

  const getAppliedWorksData = async () => {
    try {
      const res = await axiosInstance.get(
        "/getAllAppliedWorksByFreelancerId/" + userId
      );
      if (res.status === 200) {
        let data = res.data?.data || [];
        setAppliedWorks(data);
        setFixedWorks(data);
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

  const searchVacancy = (e) => {
    const value = e.target.value;
    if (value) {
      let filteredData = fixedWorks.filter((el) => {
        return el.title?.toLowerCase().includes(value.toLowerCase());
      });
      setAppliedWorks(filteredData);
    } else {
      setAppliedWorks(fixedWorks);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "0" }}>
        <Container>
          <h3 className="table-heading text-dark m-5 text-center mt-5">
            Vacancies applied by you
          </h3>
          <div className="d-flex justify-content-between align-items-center ">
            <InputGroup style={{ width: "30%", height: "42px" }}>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search vacancy.."
                type="text"
                onChange={searchVacancy}
              />
            </InputGroup>
          </div>

          <Table striped bordered hover className="mt-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Vacancy Title</th>
                <th>Vacancy Category</th>
                <th>Salary</th>
                <th>Consultancy Name</th>
                <th>Consultancy Email</th>
                <th>Consultancy Contact</th>
                <th>View More</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {appliedWorks.map((work, index) => {
                console.log("workkk", work);
                return (
                  <tr key={work._id}>
                    <td>{index + 1}</td>
                    <td>{work?.title}</td>
                    <td>{work?.category}</td>
                    <td>{work?.budget}</td>
                    <td>{work?.conId?.name}</td>
                    <td>{work?.conId?.email}</td>
                    <td>{work?.conId?.contact}</td>
                    <td>
                      <Button onClick={() => {
                        navigate(`/freelancer-view-vacancy-details/${work._id}`)
                      }}>
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

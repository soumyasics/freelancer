import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ViewAllAppliedWorks() {
  const [appliedWorks, setAppliedWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userId) {
      alert("Please login again..");
      setTimeout(() => {
        navigate("../consultancy-login");
      }, 0);
    } else {
      getAppliedWorksData();
    }
  }, []);

  const getAppliedWorksData = async () => {
    try {
      const res = await axiosInstance.get("/getAllAppliedWorks");
      if (res.status === 200) {
        const data = res.data?.data || [];
        setAppliedWorks(data);
      } else {
        console.log("Error fetching applied works");
      }
    } catch (error) {
      console.log("Error fetching applied works", error);
    } finally {
      setIsLoading(false);
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
          <h1 className="table-heading text-dark m-5 text-center mt-5">
            Applied Works
          </h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : appliedWorks.length === 0 ? (
            <p>No Applied Works</p>
          ) : (
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
                {appliedWorks.map((work, index) => (
                  <tr key={work._id}>
                    <td>{index + 1}</td>
                    <td>{work.title}</td>
                    <td>{work.description}</td>
                    <td>{work.category}</td>
                    <td>{work.budget}</td>
                    <td>{work.deadline?.substring(0, 10)}</td>
                    <td>{work.consultancyPhoneNumber}</td>
                    <td>
                      <Button
                        onClick={() => viewWorkStatus(work)}
                        variant="warning"
                      >
                        View Status
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </div>
      <div style={{ position: "relative", top: "400px" }}>
        <Footer />
      </div>
    </>
  );
}

export default ViewAllAppliedWorks;

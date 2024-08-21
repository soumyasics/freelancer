import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./ViewAllVacancies.css";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { UploadResumeModal } from "./resumeModal";
import { axiosMultipartInstance } from "../../../apis/axiosMultipart";

export default function ViewAllVacancies() {
  const { userId } = useSelector((state) => state.auth);
  const [requests, setRequests] = useState([]);
  const [vacancyId, setVacancyId] = useState("");
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  const [clickedVac, setClickedVac] = useState({});
  useEffect(() => {
    getVacanciesData();
  }, []);

  const getVacanciesData = async () => {
    try {
      const res = await axiosInstance.get("/con-getAllWorkRequest");
      if (res.status === 200) {
        let data = res.data?.data || [];
        data.reverse();
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

  const applyVacency = (vacencyId, consultancyId) => {
    if (!userId) {
      toast.error("Login again.");
      navigate("../freelancer-login");
      return;
    }
    let obj = {
      vacencyId,
      freelancerId: userId,
      consultancyId,
    };
    if (obj.vacencyId && obj.freelancerId && obj.consultancyId) {
      sendDataToServer(obj);
    } else {
      console.log("error on apply vacency", obj);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }
    sendDataToServer();
  };
  const sendDataToServer = async () => {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("freelancerId", userId);
    try {
      let res = await axiosMultipartInstance.post(
        `applyConVacancy/${clickedVac._id}`,
        formData
      );
      if (res.status === 200) {
        toast.success("Applied successfully");
        navigate("/freelancer-applied-vacancies");
      }
    } catch (error) {
      const stauts = error?.response?.status;
      if (
        stauts === 401 ||
        stauts === 400 ||
        stauts === 404 ||
        stauts === 500
      ) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
      console.log("Error on applying vacency", error);
    } finally {
      setResume(null);
      setClickedVac({});
      getVacanciesData();
    }
  };

  const isAlreadyApplied = (vacancy) => {
    const applied = vacancy?.appliedFreelancers?.find((freelancer) => {
      console.log("che", freelancer.freelancerId, userId);
      if (freelancer.freelancerId === userId) {
        return true;
      }
      return false;
    });
    if (applied) {
      return true;
    }
    return false;
  };
  console.log("resu", resume);
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "500px" }}>
        <Container>
          <h3 className="table-heading text-dark m-5 text-center mt-5">
            Consultancies Vacancy
          </h3>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Category</th>
                <th>Salary</th>
                <th>Deadline</th>
                <th>Consultancy Phone Number</th>
                <th>Apply</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {requests.map((vacancy, index) => (
                <tr key={vacancy._id}>
                  <td>{index + 1}</td>
                  <td>{vacancy.title}</td>
                  <td>{vacancy.category}</td>
                  <td>{vacancy.budget}</td>
                  <td>{vacancy.deadline?.substring(0, 10)}</td>
                  <td>{vacancy.consultancyPhoneNumber}</td>
                  <td>
                    {clickedVac._id === vacancy._id ? (
                      <form className="d-flex flex-column m-3">
                        <label> Upload your resume</label>
                        <input
                          className="my-3"
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            setResume(e.target.files[0]);
                          }}
                        />
                        <input
                          type="submit"
                          onClick={handleSubmit}
                          value="Submit"
                        />
                      </form>
                    ) : (
                      <>
                        {!isAlreadyApplied(vacancy) ? (
                          <Button
                            onClick={() => {
                              setClickedVac(vacancy);
                            }}
                            variant="success"
                          >
                            Apply
                          </Button>
                        ) : (
                          <h6 className="text-success">Applied</h6>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

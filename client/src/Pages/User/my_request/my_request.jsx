import React, { useState, useEffect } from "react";
import { Container, Table, Button, InputGroup, Form } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./my_request.css";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [fixedReqs, setFixedReqs] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      getRequestsData();
    }
  }, []);
  const getRequestsData = async () => {
    try {
      const res = await axiosInstance.get("/getWorkRequestsByUserId/" + userId);
      if (res.status === 200) {
        let data = res.data?.data || [];
        let revData = data.reverse();
        setRequests(revData);
        setFixedReqs(revData);
      } else {
        console.log("Error on getting requests");
      }
    } catch (error) {
      console.log("Error on getting requests", error);
    }
  };
  const redirectToViewResponses = (id) => {
    navigate("/view-responses/" + id);
  };
  const deleteUserWorkRequestById = async (id) => {
    try {
      let res = await axiosInstance.delete("deleteUserWorkRequestById/" + id);
      if (res.status === 200) {
        toast.success("Request deleted successfully");
        getRequestsData();
      } else {
        console.log("Error on deleting request");
      }
    } catch (error) {
      toast.error("Network issue. Please try again");
      console.log("Error on deleting request", error);
    }
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

  const filterWorkReqs = (e) => {
    const category = e.target.value;
    if (category) {
      let filteredData = fixedReqs.filter((el) => {
        return el.category === category;
      });
      setRequests(filteredData);
    } else {
      setRequests(fixedReqs);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "500px" }}>
        <Container>
          <h1 className="table-heading text-dark m-5 text-center mt-5">
            My Work Requests
          </h1>
          <div className="d-flex justify-content-between ">
            <InputGroup className="mb-3 mx-auto" style={{ width: "35%" }}>
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search work requests here.."
                type="text"
                onChange={searchWorkReqs}
              />
            </InputGroup>
            <Form.Select
              name="category"
              onChange={filterWorkReqs}
              style={{ width: "35%" }}
            >
              <option value="">Filter work request by category</option>
              <option value="Website Creation">Website Creation</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="SEO Services">SEO Services</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Social Media Management">
                Social Media Management
              </option>
              <option value="Translation Services">Translation Services</option>
              <option value="Virtual Assistance">Virtual Assistance</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Data Entry">Data Entry</option>
              <option value="Photography">Photography</option>
              <option value="Illustration">Illustration</option>
              <option value="Copywriting">Copywriting</option>
              <option value="UX/UI Design">UX/UI Design</option>
              <option value="IT Support">IT Support</option>
              <option value="Project Management">Project Management</option>
              <option value="Other">Other</option>
            </Form.Select>
          </div>
          <Table striped bordered hover className="m-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Title</th>

                <th>Category</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>View Responses</th>
                <th>Delete Request</th>
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

                    <td>
                      <Button
                        variant="success"
                        onClick={() => {
                          redirectToViewResponses(req._id);
                        }}
                      >
                        View Responses
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteUserWorkRequestById(req._id);
                        }}
                      >
                        Delete Request
                      </Button>
                    </td>
                  </tr>
                );
              })}
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

export default MyRequests;

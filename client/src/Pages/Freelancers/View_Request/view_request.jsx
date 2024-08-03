import React, { useState, useEffect } from "react";
import { Container, Table, Button, InputGroup, Form } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./view_request.css";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

function ViewAllUsersRequests() {
  const [requests, setRequests] = useState([]);
  const [fixedReq, setFixedReq] = useState([]);
  const [isInterestClicked, setIsInterestClicked] = useState(false);
  const [clickedRequest, setClickedRequest] = useState(null);
  const navigate = useNavigate();

  const [freelancerResponse, setFreelancerResponse] = useState({
    freelancerId: "",
    message: "",
  });
  const { userId } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userId) {
      setFreelancerResponse({
        ...freelancerResponse,
        freelancerId: userId,
      });
    } else {
      toast.error("Please login again..");
      navigate("../freelancer-login");
    }
    getRequestsData();
  }, []);
  const getRequestsData = async () => {
    try {
      const res = await axiosInstance.get("/getAllWorkRequest");
      if (res.status === 200) {
        let data = res.data?.data || [];
        const filterNotCompleted = data.filter(
          (el) => el.status !== "completed"
        );
        let revData = filterNotCompleted.reverse();
        setFixedReq(revData);
        setRequests(revData);
      } else {
        console.log("Error on getting requests");
      }
    } catch (error) {
      console.log("Error on getting requests", error);
    }
  };

  const checkFreelancerAlreadyRespondToARequest = (reqDetails) => {
    let responses = reqDetails?.freelancerResponses || [];
    let isAlreadyResponded = false;
    responses.forEach((res) => {
      if (res.freelancerId === userId) {
        isAlreadyResponded = true;
      }
    });
    return isAlreadyResponded;
  };

  const handleInterestClick = (obj) => {
    setIsInterestClicked(!isInterestClicked);
    setClickedRequest(obj);
  };
  const sendFreelancerResponse = (id) => {
    if (!id) {
      console.log("Request id is required");
      return;
    }
    if (!freelancerResponse.message || !freelancerResponse.freelancerId) {
      toast.error("Please write a message");
      console.log("freelancer response", freelancerResponse);
      return;
    }
    sendResponseToServer(id);
  };
  const sendResponseToServer = async (id) => {
    try {
      let res = await axiosInstance.post(
        `/workRequestFreelancerResponse/${id}`,
        freelancerResponse
      );
      if (res.status === 200) {
        toast.success("Response sent successfully");
        setFreelancerResponse({ ...freelancerResponse, message: "" });
        setIsInterestClicked(false);
        getRequestsData();
        setClickedRequest(null);
      }
      console.log("response from server", res);
    } catch (error) {
      console.log("Error on send freelancer response to server", error);
    }
  };
  const viewRequestStatus = (req) => {
    navigate("/freelancer-my-works");
  };
  const searchWorkReq = (e) => {
    const value = e.target.value;
    if (value) {
      let filteredData = fixedReq.filter((el) => {
        return el.title.toLowerCase().includes(value.toLowerCase());
      });
      setRequests(filteredData);
    } else {
      setRequests(fixedReq);
    }
  };

  const filterWorkReqs = (e) => {
    const category = e.target.value;
    if (category) {
      let filteredData = fixedReq.filter((el) => {
        return el.category === category;
      });
      setRequests(filteredData);
    } else {
      setRequests(fixedReq);
    }
  };

  const navigateToReqDetails = (id) => {
    navigate("/view-request/" + id);
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "500px" }}>
        <Container>
          <h3 className="table-heading text-dark m-5 text-center mt-5">
            Users Work Requests
          </h3>
          <div className="d-flex justify-content-between align-items-center ">
            <InputGroup style={{ width: "35%", height: "42px" }}>
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search work here.."
                type="text"
                onChange={searchWorkReq}
              />
            </InputGroup>

            <Form.Select
              name="category"
              onChange={filterWorkReqs}
              style={{ width: "35%", height: "42px" }}
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
          <Table striped bordered hover className="mt-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Client Name</th>
                <th>Work Title</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>Send a message</th>
                <th>View More</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {requests.map((req, index) => {
                console.log("req u", req);
                let isAlreadyResponsed =
                  checkFreelancerAlreadyRespondToARequest(req);
                return (
                  <tr key={req._id}>
                    <td>{index + 1} </td>
                    <td>{req?.userId?.firstName}</td>
                    <td>{req?.title}</td>
                    <td>{req?.category}</td>
                    <td>{req?.budget}</td>
                    <td>{req?.deadline?.substring(0, 10)}</td>
                    {req?._id === clickedRequest?._id ? (
                      <td>
                        <input
                          onChange={(e) => {
                            setFreelancerResponse({
                              ...freelancerResponse,
                              message: e.target.value,
                            });
                          }}
                          value={freelancerResponse.message}
                          type="text"
                          placeholder="Enter your message"
                        />
                        <Button
                          onClick={() => {
                            sendFreelancerResponse(req?._id);
                          }}
                          variant="success"
                          className="ms-3"
                        >
                          {" "}
                          Send
                        </Button>
                      </td>
                    ) : (
                      <td>
                        {!isAlreadyResponsed ? (
                          <Button
                            onClick={() => {
                              handleInterestClick(req);
                            }}
                            variant="success"
                          >
                            Send a Message
                          </Button>
                        ) : (
                          <span>Already responded</span>
                        )}
                      </td>
                    )}
                    <td>
                      <Button
                        onClick={() => {
                          navigateToReqDetails(req._id);
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
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default ViewAllUsersRequests;

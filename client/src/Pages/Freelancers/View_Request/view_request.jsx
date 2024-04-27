import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./view_request.css";

function ViewAllUsersRequests() {
  const [requests, setRequests] = useState([]);
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
      alert("Please login again..");
      setTimeout(() => {
        navigate("../freelancer-login");
      }, 0);
    }
    getRequestsData();
  }, []);
  const getRequestsData = async () => {
    try {
      const res = await axiosInstance.get("/getAllWorkRequest");
      if (res.status === 200) {
        let data = res.data?.data || [];
        setRequests(data);
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
      alert("Please write a message");
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
        alert("Response sent successfully");
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
    navigate('/view-request/'+req._id)

  }
  console.log("is clicked", clickedRequest);
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "0" }}>
        <Container>
          <h1 className="table-heading text-dark m-5 text-center mt-5">
            Users Work Requests
          </h1>
          <Table striped bordered hover >
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Work Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>Send a message</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {requests.map((req, index) => {
                console.log("req u", req)
                let isAlreadyResponsed =
                  checkFreelancerAlreadyRespondToARequest(req);
                return (
                  <tr key={req._id}>
                    <td>{index + 1} </td>
                    <td>{req?.userId?.firstName}</td>
                    <td>{req?.title}</td>
                    <td>{req?.description}</td>
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
                          <Button
                            onClick={() => {
                              viewRequestStatus(req)
                            }}
                            variant="warning"
                          >
                            View Status
                          </Button>
                        )}
                      </td>
                    )}
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

export default ViewAllUsersRequests;

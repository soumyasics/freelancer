import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./my_request.css";
import { toast } from "react-hot-toast";
function MyRequests() {
  const [requests, setRequests] = useState([]);
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
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light">
        <Container>
          <h1 className="table-heading text-dark m-5 text-center mt-5">
            My Work Requests
          </h1>
          <Table striped bordered hover className="m-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Title</th>

                <th>Category</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>Description</th>
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

                    <td
                      style={{
                        overflowY: "auto",
                        maxWidth: "200px",
                        maxHeight: "200px",
                      }}
                    >
                      {req.description}
                    </td>
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

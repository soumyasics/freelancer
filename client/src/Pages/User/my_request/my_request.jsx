import React, {useState, useEffect} from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import "./my_request.css";
function MyRequests() {
  
  const [requests, setRequests] = useState([]);
  const {userId} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      getRequestsData(userId);
    }

  }, []);
  const getRequestsData = async (userId) => {
    try {
      const res = await axiosInstance.get("/getWorkRequestsByUserId/"+userId);
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
    navigate("/view-responses/"+id);
  }
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light">
        <Container>
          <h1 className="table-heading text-dark m-5 text-center mt-5">My Work Requests</h1>
          <Table striped bordered hover className="m-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>View Responses</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {requests.map((req, index) => {
                console.log("req details", req)
                return (
                  <tr key={req._id}>
                    <td>{index+1} </td>
                    <td>{req.title}</td>
                    <td>{req.description}</td>
                    <td>{req.category}</td>
                    <td>{req.budget}</td>
                    <td>{req.deadline?.substring(0, 10) }</td>
                    <td>
                      <Button variant="success" onClick={() => {
                        redirectToViewResponses(req._id)
                      }}>View Responses</Button>
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

export default MyRequests;

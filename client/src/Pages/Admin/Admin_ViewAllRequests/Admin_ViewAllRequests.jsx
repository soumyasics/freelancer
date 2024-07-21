import React, { useState, useEffect } from "react";
import "./Admin_ViewAllRequests.css";
import { Table, Container, Pagination } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
function Admin_ViewAllRequests() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/getAllWorkRequest");
      if (res.status === 200) {
        let data = res.data?.data || [];
        setUsers(data);
      } else {
        console.log("Error on getting all users");
      }
    } catch (error) {
      console.log("Error on getting all users", error);
    }
  };
  return (
    <Container className="mt-4"  style={{ minHeight: "400px" }}>
      <h3 className=" text-center">All work requests</h3>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Budget</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((request, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{request.title}</td>
              <td>{request.description}</td>
              <td>{request.category}</td>
              <td>{request.budget}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Admin_ViewAllRequests;

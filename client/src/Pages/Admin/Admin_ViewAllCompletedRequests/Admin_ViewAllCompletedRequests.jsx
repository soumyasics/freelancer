import React, { useState, useEffect } from "react";
import "./Admin_ViewAllRequests.css";
import { Table, Container, Pagination } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
export const Admin_ViewAllCompletedRequests = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/getAllWorkRequest");
      if (res.status === 200) {
        let data = res.data?.data || [];
        let completedWorks = data?.filter(
          (item) => item.status === "completed"
        );
        completedWorks.reverse();
        setUsers(completedWorks);
      } else {
        console.log("Error on getting all users");
      }
    } catch (error) {
      console.log("Error on getting all users", error);
    }
  };
  return (
    <Container className="mt-4" style={{ minHeight: "400px" }}>
      <h3 className=" text-center">All completed works</h3>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Category</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Budget</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((request, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{request.title}</td>
              <td>{request.category}</td>
              <td>
                {request.userId?.firstName} {request.userId?.lastName}
              </td>
              <td>{request.userId?.email}</td>
              <td>{request.budget}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

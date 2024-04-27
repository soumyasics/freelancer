import React, { useState, useEffect } from "react";

import { Table, Container } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";

function Admin_ViewAllFreelancers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/getAllFreelancers");
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
  console.log("users", users);
  return (
    <Container className="mt-4">
      <h1 className="text-white text-center">All Freelancers</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Qualification</th>
            <th>Job Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((freelancer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{freelancer.name}</td>
              <td>{freelancer.contact}</td>
              <td>{freelancer.email}</td>
              <td>{freelancer.qualification}</td>
              <td>{freelancer.jobrole}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Admin_ViewAllFreelancers;

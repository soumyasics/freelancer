import React, { useState, useEffect } from "react";

import { Table, Container } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";

export function AdminViewAllConsultancy() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/getAllApprovedConsultancies");
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
      <h1 className="text-white text-center">All Consultancies</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>License Id</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((cons, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{cons.name}</td>
              <td>{cons.contact}</td>
              <td>{cons.email}</td>
              <td>{cons.licenseId}</td>
              <td>{cons.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}


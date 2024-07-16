import React, { useState, useEffect } from "react";

import { Table, Container, Button } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
import {toast} from "react-hot-toast";

export function AdminViewAllPendingConsultancy() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const approveReq = async (id) => {
    try {
      let res = await axiosInstance.patch(`approveConsultancyById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("Consultancy approved successfully");
        getData();
      } else {
        console.log("Error on approve consultancies");
      }
    } catch (error) {
      console.log("Error on deactivating user", error);
    }
  };
  const rejectReq = async (id) => {
    try {
      let res = await axiosInstance.patch(`rejectConsultancyById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("Consultancy rejected successfully");
        getData();
      } else {
        console.log("Error on reject user");
      }
    } catch (error) {
      console.log("Error on reject user", error);
    }
  };

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/getAllPendingConsultancies");
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
      <h1 className="text-white text-center">Consultancies request</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>License Id</th>
            <th>Address</th>
            <th>Approve</th>
            <th>Reject</th>
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
              <td>
                <Button
                  onClick={() => approveReq(cons._id)}
                  variant="success"
                >
                  Approve
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => rejectReq(cons._id)}
                  variant="danger"
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

import React, { useState, useEffect } from "react";

import { Table, Container, Button } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
import {toast} from "react-hot-toast";

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
  const activateUserById = async (id) => {
    try {
      let res = await axiosInstance.patch(`activateConsultancyById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("Consultancy activated successfully");
        getData();
      } else {
        console.log("Error on activating consultancy");
      }
    } catch (error) {
      console.log("Error on ACTIVATING user", error);
    }
  };

  const deActivateUserById = async (id) => {
    try {
      let res = await axiosInstance.patch(`deactivateConsultancyById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("Consultancy deactivated successfully");
        getData();
      } else {
        console.log("Error on deactivating consultancy");
      }
    } catch (error) {
      console.log("Error on deactivating user", error);
    }
  };
  console.log("users", users);
  return (
    <Container className="mt-4">
      <h1 className=" text-center">All Consultancies</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>License Id</th>
            <th>Address</th>
            <th>Current Status</th>
            <th className="text-center">Active / Inactive</th>
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
              <td>{cons.isActive ? "Active" : "Inactive"}</td>
              <td className="d-flex justify-content-around">
                {cons.isActive ? (
                  <Button
                    onClick={() => {
                      deActivateUserById(cons._id);
                    }}
                    variant="danger"
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      activateUserById(cons._id);
                    }}
                    variant="success"
                  >
                    Activate
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}


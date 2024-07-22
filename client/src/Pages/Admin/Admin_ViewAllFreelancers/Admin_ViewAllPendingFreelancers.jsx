import React, { useState, useEffect } from "react";

import { Table, Container, Button } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";

export const Admin_ViewAllPendingFreelancers = ({
  title = "Freelancers requests",
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/getAllPendingFreelancers");
      if (res.status === 200) {
        let data = res.data?.data || [];
        console.log("pending", data);
        setUsers(data);
      } else {
        console.log("Error on getting all users");
      }
    } catch (error) {
      console.log("Error on getting all users", error);
    }
  };
  const approveReq = async (id) => {
    try {
      let res = await axiosInstance.patch(`approveFreelancerById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("Freelancer approved successfully");
        getData();
      } else {
        console.log("Error on deactivating user");
      }
    } catch (error) {
      console.log("Error on deactivating user", error);
    }
  };
  const rejectReq = async (id) => {
    try {
      let res = await axiosInstance.patch(`rejectFreelancerById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("Freelancer reject successfully");
        getData();
      } else {
        console.log("Error on reject user");
      }
    } catch (error) {
      console.log("Error on reject user", error);
    }
  };
  console.log("users", users);
  return (
    <Container className="mt-4" style={{ minHeight: "400px" }}>
      <h3 className=" text-center">{title}</h3>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Qualification</th>
            <th>Job Role</th>
            <th>Approve</th>
            <th>Reject</th>
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
              <td>
                <Button
                  onClick={() => approveReq(freelancer._id)}
                  variant="success"
                >
                  Approve
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => rejectReq(freelancer._id)}
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
};

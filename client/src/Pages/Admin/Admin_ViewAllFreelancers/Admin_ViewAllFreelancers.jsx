import React, { useState, useEffect } from "react";

import { Table, Container , Button} from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";
function Admin_ViewAllFreelancers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const activateUserById = async (id) => {
    try {
      let res = await axiosInstance.patch(`activateFreelancerById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("User activated successfully");
        getData();
      } else {
        console.log("Error on activating user");
      }
    } catch (error) {
      console.log("Error on ACTIVATING user", error);
    }
  }

  const deActivateUserById = async (id) => {
    try {
      let res = await axiosInstance.patch(`deactivateFreelancerById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("Freelancer deactivated successfully");
        getData();
      } else {
        console.log("Error on deactivating user");
      }
    } catch (error) {
      console.log("Error on deactivating user", error);
    }
  }

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/getAllApprovedFreelancers");
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
            <th>Current Status</th>
            <th className="text-center">Active / Inactive</th>
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
              <td>{freelancer.isActive ? "Active" : "Inactive"}</td>
              <td className="d-flex justify-content-around">
                {freelancer.isActive ? (
                  <Button
                    onClick={() => {
                      deActivateUserById(freelancer._id);
                    }}
                    variant="danger"
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      activateUserById(freelancer._id);
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

export default Admin_ViewAllFreelancers;

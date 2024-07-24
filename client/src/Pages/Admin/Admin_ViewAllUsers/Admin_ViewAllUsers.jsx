import "./Admin_ViewAllUsers.css";
import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  InputGroup,
  FormControl,
  Pagination,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { axiosInstance } from "../../../apis/axiosInstance";
import {toast} from "react-hot-toast";

function Admin_ViewAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const activateUserById = async (id) => {
    try {
      let res = await axiosInstance.patch(`activateUserById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("User deactivated successfully");
        getData();
      } else {
        console.log("Error on deactivating user");
      }
    } catch (error) {
      console.log("Error on deactivating user", error);
    }
  }

  const deActivateUserById = async (id) => {
    try {
      let res = await axiosInstance.patch(`deactivateUserById/${id}`);
      console.log("repon", res);
      if (res.status === 200) {
        toast.success("User deactivated successfully");
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
      let res = await axiosInstance.post("getAllUsers");
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

 
  console.log(users);
  return (
    <Container className="mt-4" style={{minHeight: "400px"}}>
      <h3 className=" text-center">All Users</h3>

      <Table striped bordered hover > 
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Current Status</th>
            <th className="text-center">Active / Inactive</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.isActive ? "Active" : "Inactive"}</td>
              <td className="d-flex justify-content-around">
                {user.isActive ? (
                  <Button
                    onClick={() => {
                      deActivateUserById(user._id);
                    }}
                    variant="danger"
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      activateUserById(user._id);
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

export default Admin_ViewAllUsers;

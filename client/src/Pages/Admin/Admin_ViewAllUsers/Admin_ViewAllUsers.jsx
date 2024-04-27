import "./Admin_ViewAllUsers.css";
import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { axiosInstance } from "../../../apis/axiosInstance";

function Admin_ViewAllUsers() {
  const [users, setUsers] = useState([]);

  const [usersPerPage] = useState(5);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.post("/getAllUsers");
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
    <Container className="mt-4">
      <h1 className="text-white text-center">All Users</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>Active</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Admin_ViewAllUsers;

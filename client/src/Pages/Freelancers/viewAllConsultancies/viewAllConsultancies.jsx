import React, { useState, useEffect } from "react";

import { Table, Container, InputGroup, Form } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
import Navbar from "../../Common/Navbar/navbar";
import { FaSearch } from "react-icons/fa";

export function FreelancerViewAllConsultancy() {
  const [users, setUsers] = useState([]);
  const [fixedUser, setFixedUser] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/getAllConsultancy");
      if (res.status === 200) {
        let data = res.data?.data || [];
        setUsers(data);
        setFixedUser(data);
      } else {
        console.log("Error on getting all users");
      }
    } catch (error) {
      console.log("Error on getting all users", error);
    }
  };
  const searchConsultancies = (e) => {
    const value = e.target.value;
    if (value) {
      let filteredData = fixedUser.filter((el) => {
        return el.name.toLowerCase().includes(value.toLowerCase());
      });
      setUsers(filteredData);
    } else {
      setUsers(fixedUser);
    }
  };
  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        <h1 className="text-white text-center">All Consultancies</h1>

        <hr />
        <div>
          <InputGroup className="mb-3 w-50 mx-auto">
            <InputGroup.Text id="basic-addon1">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search consultancies here.."
              type="text"
              onChange={searchConsultancies}
            />
          </InputGroup>
        </div>
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
                <td>{cons?.name}</td>
                <td>{cons?.contact}</td>
                <td>{cons?.email}</td>
                <td>{cons?.licenseId}</td>
                <td>{cons?.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

import React, { useState, useEffect } from "react";

import { Table, Container } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
export const Admin_ViewAllFreelancersReviews = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.get("getAllRating");
      if (res.status === 200) {
        let data = res.data?.data || [];
        data.reverse()
        setComplaints(data);
      } else {
        console.log("Error on getting all users");
      }
    } catch (error) {
      console.log("Error on getting all users", error);
    }
  };
  return (
    <Container className="mt-4" style={{ minHeight: "400px" }}>
      <h3 className=" text-center">All freelancers reviews</h3>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>No</th>
            <th>Reviewer name</th>
            <th>Reviewer email</th>
            <th>Freelancer name</th>
            <th>Freelancer email</th>
            <th>Review</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{c?.userId?.firstName}</td>
              <td>{c?.userId?.email}</td>
              <td>{c?.freelancerId?.name}</td>
              <td>{c?.freelancerId?.email}</td>
              <td>{c.review}</td>
              <td>{c.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

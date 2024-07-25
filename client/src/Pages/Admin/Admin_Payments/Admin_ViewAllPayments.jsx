import React, { useState, useEffect } from "react";
import { Table, Container, Pagination } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
export const Admin_ViewAllPayments = () => {
  const [payments, setpayments] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axiosInstance.get("/viewAllPayments");
      if (res.status === 200) {
        let data = res.data?.data || [];

        data.reverse();
        setpayments(data);
      } else {
        console.log("Error on getting all payments");
      }
    } catch (error) {
      console.log("Error on getting all payments", error);
    }
  };
  console.log("payments", payments);
  return (
    <Container className="mt-4" style={{ minHeight: "400px" }}>
      <h3 className=" text-center">All successful payments</h3>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>User Name</th>
            <th>Freelancer Name</th>
            <th>Work Title</th>
            <th>Payment Amount</th>
            <th>Card Number</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((request, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {request.userId?.firstName}
                {request.userId?.lastName}
              </td>
              <td>{request.freelancerId?.name}</td>
              <td>{request?.workId?.title}</td>
              <td>{request.amount}</td>
              <td>{request.cardNumber}</td>
              <td>{request.date?.substring(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

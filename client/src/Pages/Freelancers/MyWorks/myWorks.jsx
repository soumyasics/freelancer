import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./myWorks.css";

export function MyWorks() {
  const { userId } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userId) {
      getAllPaymentsByFreelancerId(userId)
    }
  }, [])

  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const getAllPaymentsByFreelancerId = async (userId) => {
    try {
      const res = await axiosInstance.get("/viewAllPaymentsByFreelancerId/"+userId);
      if (res.status === 200) {
        let data = res.data?.data || [];
        let revData = data.reverse();
        setPayments(revData);
      } else {
        console.log("Error on getting requests");
      }
    } catch (error) {
      console.log("Error on getting requests", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "0" }}>
        <Container>
          <h1 className="table-heading text-dark m-5 text-center mt-5">
            My Accepted Works
          </h1>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Client Name</th>
                <th>Client Email</th>
                <th>Work Title</th>
                <th>Amount Received</th>
                <th>Deadline</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {payments.map((payment, index) => {
                console.log("req u", payment);
                console.log("req u", payment?.workId.title);
                return (
                  <tr key={payment._id}>
                    <td>{index + 1} </td>

                    <td>{payment?.userId?.firstName}</td>
                    <td>{payment?.userId?.email}</td>
                    <td>{payment?.workId?.title}</td>
                    <td>{payment?.workId?.budget}</td>
                    <td>{payment?.workId?.deadline.substring(0, 10)}</td>
                    <td>{payment?.workId?.category}</td>
                    <td>{payment?.workId?.description.substring(0, 20)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
      <div style={{ position: "relative", top: "400px" }}>
        <Footer />
      </div>
    </>
  );
}

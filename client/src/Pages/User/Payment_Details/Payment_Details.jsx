import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Payment_Details() {
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!userId) {
      alert("Please login again..");
      setTimeout(() => {
        navigate("../login");
      }, 0);
    } else {
      getPaymentDetails();
    }
  }, [userId]);

  const getPaymentDetails = async () => {
    try {
      const res = await axiosInstance.get(`/paymentDetails/${userId}`);
      if (res.status === 200) {
        setPayments(res.data);
      } else {
        console.log("Error fetching payment details");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1 className='text-white'>Payment Details</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.transactionId}>
                <td>{index + 1}</td>
                <td>{payment.transactionId}</td>
                <td>₹{payment.amount}</td>
                <td>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default Payment_Details;

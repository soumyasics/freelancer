import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './MyOrders.css';
import {toast} from "react-hot-toast";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userId) {
      toast.error("Please login again..");
      setTimeout(() => {
        navigate("../user-login");
      }, 0);
    } else {
      getOrdersData();
    }
  }, []);

  const getOrdersData = async () => {
    try {
      const res = await axiosInstance.get(`/getOrdersByUserId/${userId}`);
      if (res.status === 200) {
        const data = res.data?.data || [];
        setOrders(data);
      } else {
        console.log("Error fetching orders");
      }
    } catch (error) {
      console.log("Error fetching orders", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "0" }}>
        <Container>
          <h1 className="table-heading text-dark m-5 text-center mt-5">
            My Orders
          </h1>
          {orders.length === 0 ? (
            <p className="text-center">No Orders</p>
          ) : (
            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>No</th>
                  <th>Freelancer Username</th>
                  <th>Payment Amount</th>
                  <th>Work Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.freelancerId.username}</td>
                    <td>{order.amount}</td>
                    <td>{order.workId.title}</td>
                    <td>{order.workId.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </div>
      <div style={{ position: "relative", top: "400px" }}>
        <Footer />
      </div>
    </>
  );
}

export default MyOrders;

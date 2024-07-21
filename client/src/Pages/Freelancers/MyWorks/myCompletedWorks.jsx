import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, InputGroup } from "react-bootstrap";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./myWorks.css";
import { FaSearch } from "react-icons/fa";

export function MyCompletedWorks() {
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  useEffect(() => {
    if (userId) {
      getAllPaymentsByFreelancerId(userId);
    }
  }, []);

  const [payments, setPayments] = useState([]);
  const [fixedPayments, setFixedPayments] = useState([]);
  const getAllPaymentsByFreelancerId = async (userId) => {
    try {
      const res = await axiosInstance.get(
        "viewAllPaymentsByFreelancerId/" + userId
      );
      if (res.status === 200) {
        let data = res.data?.data || [];

        const filterCompletedWorks = data.filter(
          (item) => item.workId?.status === "completed"
        );
        let revData = filterCompletedWorks.reverse();
        setFixedPayments(revData);
        setPayments(revData);
      } else {
        console.log("Error on getting requests");
      }
    } catch (error) {
      console.log("Error on getting requests", error);
    }
  };

  console.log("Payments,", payments);

  const searchWorkReq = (e) => {
    const value = e.target.value;
    if (value) {
      let filteredData = fixedPayments.filter((el) => {
        return el.workId?.title?.toLowerCase().includes(value.toLowerCase());
      });
      setPayments(filteredData);
    } else {
      setPayments(fixedPayments);
    }
  };
  const searchClientName = (e) => {
    const value = e.target.value;
    if (value) {
      let filteredData = fixedPayments.filter((el) => {
        return el.userId?.firstName?.toLowerCase().includes(value.toLowerCase());
      });
      setPayments(filteredData);
    } else {
      setPayments(fixedPayments);
    }
  };

  const filterWorkReqs = (e) => {
    const category = e.target.value;
    if (category) {
      let filteredData = fixedPayments.filter((el) => {
        return el.workId?.category === category;
      });
      setPayments(filteredData);
    } else {
      setPayments(fixedPayments);
    }
  };

  const navigateToWorkStatus = (id) => {
    navigate('/freelancer-view-work-status/' + id)
  }
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light" style={{ minHeight: "500px" }}>
        <Container>
          <h3 className="table-heading text-dark m-5 text-center mt-5">
            My Completed Works
          </h3>

          <div className="d-flex justify-content-between align-items-center ">
            <InputGroup style={{ width: "30%", height: "42px" }}>
              <InputGroup.Text >
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search client.."
                type="text"
                onChange={searchClientName}
              />
            </InputGroup>
            <InputGroup style={{ width: "30%", height: "42px" }}>
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search work here.."
                type="text"
                onChange={searchWorkReq}
              />
            </InputGroup>

            <Form.Select
              name="category"
              onChange={filterWorkReqs}
              style={{ width: "30%", height: "42px" }}
            >
              <option value="">Filter work request by category</option>
              <option value="Website Creation">Website Creation</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="SEO Services">SEO Services</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Social Media Management">
                Social Media Management
              </option>
              <option value="Translation Services">Translation Services</option>
              <option value="Virtual Assistance">Virtual Assistance</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Data Entry">Data Entry</option>
              <option value="Photography">Photography</option>
              <option value="Illustration">Illustration</option>
              <option value="Copywriting">Copywriting</option>
              <option value="UX/UI Design">UX/UI Design</option>
              <option value="IT Support">IT Support</option>
              <option value="Project Management">Project Management</option>
              <option value="Other">Other</option>
            </Form.Select>
          </div>
          <Table striped bordered hover className="mt-5">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Client Name</th>
                <th>Client Email</th>
                <th>Work Title</th>
                <th>Amount Received</th>
                <th>Deadline</th>
                <th>Category</th>
                <th>View More</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {payments.map((payment, index) => {
                return (
                  <tr key={payment._id}>
                    <td>{index + 1} </td>

                    <td>{payment?.userId?.firstName}</td>
                    <td>{payment?.userId?.email}</td>
                    <td>{payment?.workId?.title}</td>
                    <td>{payment?.workId?.budget}</td>
                    <td>{payment?.workId?.deadline?.substring(0, 10)}</td>
                    <td>{payment?.workId?.category}</td>
                    <td>
                      <Button onClick={() => {
                        navigateToWorkStatus(payment?.workId?._id)
                      }}>View More</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

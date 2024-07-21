import React, { useState, useEffect } from "react";

import { Table, Container } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";
export const Admin_ViewAllFreelancersCompliants = () => {
  const [complaints, setComplaints] = useState([]);

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
  };

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
  };

  const getData = async () => {
    try {
      let res = await axiosInstance.get("getAllCompliants");
      if (res.status === 200) {
        let data = res.data?.data || [];
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
      <h3 className=" text-center">All freelancers compliants</h3>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>No</th>
            <th>Complainor name</th>
            <th>Freelancer name</th>
            <th>Complaint</th>
            <th>Freelancer email</th>
            <th>Freelancer status</th>
            <th>Take Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{c?.userId?.firstName}</td>
              <td>{c?.freelancerId?.name}</td>
              <td>{c.complaint}</td>
              <td>{c.freelancerId?.email}</td>
              <td>{c.freelancerId?.isActive ? "Active" : "Inactive"}</td>
              <td>
                {c.freelancerId?.isActive ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => deActivateUserById(c.freelancerId._id)}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => activateUserById(c.freelancerId._id)}
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

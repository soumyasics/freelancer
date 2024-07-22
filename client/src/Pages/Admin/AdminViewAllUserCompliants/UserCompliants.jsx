import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { axiosInstance } from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";
export const AdminViewAllUsersCompliants = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const activateUserById = async (id) => {
    try {
      let res = await axiosInstance.patch(`activateUserById/${id}`);
      if (res.status === 200) {
        toast.success("User deactivated successfully");
        getData();
      } else {
        console.log("Error on deactivating user");
      }
    } catch (error) {
      console.log("Error on deactivating user", error);
    }
  };

  const deActivateUserById = async (id) => {
    try {
      let res = await axiosInstance.patch(`deactivateUserById/${id}`);
      if (res.status === 200) {
        toast.success("User deactivated successfully");
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
      let res = await axiosInstance.get("user-getAllCompliants");
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
      <h3 className=" text-center">All user compliants</h3>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>No</th>
            <th>Complainor name (freelancer)</th>
            <th>User name</th>
            <th>Complaint</th>
            <th>User email</th>
            <th>User status</th>
            <th>Take Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{c?.freelancerId?.name}</td>
              <td>{c?.userId?.firstName}</td>
              <td>{c.complaint}</td>
              <td>{c.userId?.email}</td>
              <td>{c.userId?.isActive ? "Active" : "Inactive"}</td>
              <td>
                {c.userId?.isActive ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => deActivateUserById(c.userId?._id)}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => activateUserById(c.userId?._id)}
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

import "./adminOverview.css";
import { PieChart } from "../charts/PieChart/pieChart";
import { DoughnutChart } from "../charts/Doughnut/doughnut";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import { Admin_ViewAllPendingFreelancers } from "../Admin_ViewAllFreelancers/Admin_ViewAllPendingFreelancers";
const AdminOverview = () => {
  const [users, setUsers] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [consultancies, setConsultancies] = useState([]);
  const [workReqCount, setWorkReqCount] = useState([0, 0]);
  const [allUsersDataLength, setAllUsersDataLength] = useState([0, 0, 0]);
  const [dataSet, setDataSet] = useState({
    labels: ["Users", "Freelancers", "Consultancies"],
    datasets: [
      {
        label: "Total Users",
        data: allUsersDataLength,
      },
    ],
    hoverOffset: 3,
    backgroundColor: ["#6366f1", "#f79009", "#10b981"],
  });
  const [workDataSet, setWorkDataSet] = useState({
    labels: ["pending", "completed"],
    datasets: [
      {
        label: "Work status",
        data: workReqCount,
      },
    ],
    backgroundColor: ["red", "green"],
  });

  useEffect(() => {
    getAllUsers();
    getAllFreelancers();
    getAllConsultancies();
    getAllWorkRequest();
  }, []);

  const getAllWorkRequest = async () => {
    try {
      let res = await axiosInstance.get("getAllWorkRequest");
      if (res.status === 200) {
        let data = res.data?.data || [];
        const pendingWorks = data.filter((item) => item.status === "pending");
        const totalWorkReqCount = data.length;
        const pendingWorksReqCount = pendingWorks.length;
        const completedWorksReqCount = totalWorkReqCount - pendingWorksReqCount;
        setWorkReqCount([pendingWorksReqCount, completedWorksReqCount]);
      } else {
        console.log("Error on getting all users");
      }
    } catch (error) {
      console.log("Error on getting all users", error);
    }
  };

  useEffect(() => {
    setAllUsersDataLength([
      users.length,
      freelancers.length,
      consultancies.length,
    ]);
  }, [users, freelancers, consultancies]);

  useEffect(() => {
    setDataSet({
      labels: ["Users", "Freelancers", "Consultancies"],
      datasets: [
        {
          label: "Total Users",
          data: allUsersDataLength,
          backgroundColor: ["#6366f1", "#f79009", "#10b981"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [allUsersDataLength]);

  useEffect(() => {
    setWorkDataSet({
      labels: ["pending", "completed"],
      datasets: [
        {
          label: "Work status",
          data: workReqCount,
        },
      ],
      backgroundColor: ["red", "green"],
    });
  }, [workReqCount]);

  const getAllUsers = async () => {
    try {
      let res = await axiosInstance.post("getAllUsers");
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

  const getAllFreelancers = async () => {
    try {
      let res = await axiosInstance.get("/getAllApprovedFreelancers");
      if (res.status === 200) {
        let data = res.data?.data || [];
        setFreelancers(data);
      } else {
        console.log("Error on getting all users");
      }
    } catch (error) {
      console.log("Error on getting all users", error);
    }
  };
  const getAllConsultancies = async () => {
    try {
      let res = await axiosInstance.get("getAllApprovedConsultancies");
      if (res.status === 200) {
        let data = res.data?.data || [];
        setConsultancies(data);
      } else {
        console.log("Error on getting all users");
      }
    } catch (error) {
      console.log("Error on getting all users", error);
    }
  };

  const totalWorkRequest = () => {
    return workReqCount[0] + workReqCount[1];
  };
  const totalUsers = () => {
    return (
      allUsersDataLength[0] + allUsersDataLength[1] + allUsersDataLength[2]
    );
  };
  return (
    <>
      <div className="d-flex justify-content-center ">
        <h3 className="ml-4"> Admin overview</h3>
      </div>

      <div className="d-flex gap-5 justify-content-around mt-5">
        <div
          style={{ width: "35%" }}
          className="admin-overview-barchart-container"
        >
          <h3> Active Users</h3>
          <p className="mb-5">Total active users {totalUsers()} </p>
          <DoughnutChart chartData={dataSet} />
        </div>
        <div
          style={{ width: "35%" }}
          className="admin-overview-barchart-container "
        >
          <h3> Total freelance works</h3>
          <p>Total work requests are {totalWorkRequest()} </p>
          <PieChart chartData={workDataSet} />
        </div>
      </div>

      <Admin_ViewAllPendingFreelancers title="Recent freelancers requests"/>
    </>
  );
};
export default AdminOverview;

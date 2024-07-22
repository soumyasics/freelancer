import "./adminOverview.css";
import { PieChart } from "../charts/PieChart/pieChart";
import { DoughnutChart } from "../charts/Doughnut/doughnut";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
const AdminOverview = () => {
  const [users, setUsers] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [consultancies, setConsultancies] = useState([]);
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
  useEffect(() => {
    getAllUsers();
    getAllFreelancers();
    getAllConsultancies();
  }, []);

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

  const donationDataSet = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const totalWorkRequest = () => {
    return 0;
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
          <h2> Total Active Users</h2>
          <p className="mb-5">Total Users {totalUsers()} </p>
          <DoughnutChart chartData={dataSet} />
        </div>
        <div
          style={{ width: "35%" }}
          className="admin-overview-barchart-container "
        >
          <h2> Donations Pending & Fullfilled</h2>
          <p>Total work requests are {totalWorkRequest()} </p>
          <PieChart chartData={donationDataSet} />
        </div>
      </div>
    </>
  );
};
export default AdminOverview;

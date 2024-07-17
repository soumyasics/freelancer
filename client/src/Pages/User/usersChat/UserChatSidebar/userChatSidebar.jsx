// import axiosInstance from "../../../../apis/axiosInstance";
// import { BASE_URL } from "../../../../apis/baseURL";
import { useEffect, useState } from "react";
import "./userChatSidebar.css";
import { axiosInstance } from "../../../../apis/axiosInstance";
export const UserChatSidebar = ({ selectingUser }) => {
  const [data, setData] = useState([{ profile: { filename: "" } }]);
  const [selectedUserid, setSelectedUserid] = useState("");
  const [fixedFreelancers, setFixedFreelancers] = useState([]);
  const getData = async () => {
    try {
      const res = await axiosInstance.get("getAllFreelancers");
      console.log(res);
      if (res.status == 200) {
        const users = res.data?.data || [];
        setFixedFreelancers(users);
        setData(users);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value == "") {
      setData(fixedFreelancers);
    } else {
      const filteredData = fixedFreelancers.filter((e) => {
        return e.name.toLowerCase().includes(value.toLowerCase());
      });
      setData(filteredData);
    }
  };

  return (
    <div className="chatSidebar-body">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search freelancers.."
        className="chatSidebar-search"
      />
      {data.map((e) => {
        return (
          <div
            onClick={() => {
              selectingUser(e._id, e.name);
              setSelectedUserid(e._id);
            }}
            className={`chatSidebar-view-users d-flex align-items-center ${
              selectedUserid == e._id ? "selected-user-boreder" : ""
            }`}
          >
            {/* <img src={`${BASE_URL}${e?.profile?.filename}`} alt="" /> */}
            <p className="fs-4">{e.name}</p>
          </div>
        );
      })}
    </div>
  );
};

// import axiosInstance from "../../../../apis/axiosInstance";
// import { BASE_URL } from "../../../../apis/baseURL";
import { useEffect, useState } from "react";
import "./userChatSidebar.css";
import { axiosInstance } from "../../../../apis/axiosInstance";
export const UserChatSidebar = ({ selectingUser }) => {
  const [data, setData] = useState([{ profile: { filename: "" } }]);
  const [fixedUsers, setFixedUsers] = useState([]);
  const getData = async () => {
    try {
      const res = await axiosInstance.post("getAllUsers");
      console.log(res);
      if (res.status == 200) {
        const users = res.data?.data || [];
        setFixedUsers(users);
        setData(users);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("data", data);

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value == "") {
      setData(fixedUsers);
    } else {
      const filteredData = fixedUsers.filter((e) => {
        return e.firstName.toLowerCase().includes(value.toLowerCase());
      });
      setData(filteredData);
    }
  };

  return (
    <div className="chatSidebar-body">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search users.."
        className="chatSidebar-search"
      />
      {data.map((e) => {
        return (
          <div
            onClick={() => {
              selectingUser(e._id);
            }}
            className="chatSidebar-view-users d-flex align-items-center"
          >
            {/* <img src={`${BASE_URL}${e?.profile?.filename}`} alt="" /> */}
            <p className="fs-4">{e.firstName}</p>
          </div>
        );
      })}
    </div>
  );
};

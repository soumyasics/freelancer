import { useNavigate } from "react-router-dom";
import "./userChatNavBar.css";
import { FaArrowLeft } from "react-icons/fa";
export const UserChatNavbar = ({ selectedUserName }) => {
  const Navigate = useNavigate();
  return (
    <div className="userChatNavbar-body d-flex justify-content-between">
      <FaArrowLeft
        style={{ cursor: "pointer" }}
        className="userChatNavbar-left-arrow"
        onClick={() => {
          Navigate(-1);
        }}
      />
      <div
        style={{width: "10%"}}
        className="d-flex align-items-center  "
      >
        <p className="text-light fs-4 m-0">{selectedUserName}</p>
      </div>
    </div>
  );
};

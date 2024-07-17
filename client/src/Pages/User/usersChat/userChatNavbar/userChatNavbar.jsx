import { useNavigate } from "react-router-dom";
import "./userChatNavBar.css";
import { FaArrowLeft } from "react-icons/fa";
export const UserChatNavbar = () => {
  const Navigate = useNavigate();
  return (
    <div className="userChatNavbar-body">
      <FaArrowLeft
      style={{cursor: "pointer"}}
        className="userChatNavbar-left-arrow"
        onClick={() => {
          Navigate("/");
        }}
      />
    </div>
  );
};

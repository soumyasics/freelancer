import { useEffect, useState } from "react";
import { UserChatSidebar } from "../UserChatSidebar/userChatSidebar";
import { NoUserSelected } from "../noUserSelected/noUserSelected";
import { UserchatInterFace } from "../userChatInterface/userChatInterface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserChatNavbar } from "../userChatNavbar/userChatNavbar";
import { UserChatFooter } from "../userNavbarFooter/userChatFooter";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export const UserChatDashboardWithId = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const { userId } = useSelector((state) => state.auth);
  const { id, name } = useParams();

  useEffect(() => {
    setSelectedUser(id)
    setSelectedUserName(name)
  }, [id, name])
  const selectingUser = (value, selectedUserName) => {
    setSelectedUser(value);
    setSelectedUserName(selectedUserName);
  };

  return (
    <div className="bg-light text-dark " style={{position: "sticky", top: "0"}}>
      <UserChatNavbar selectedUserName={selectedUserName} />
      <div className="row">
        <div className="col-4">
          <UserChatSidebar selectingUser={selectingUser} />
        </div>
        {selectedUser ? (
          <div className="col-8">
            <UserchatInterFace userId={userId} receiverId={selectedUser} />
          </div>
        ) : (
          <div className="col-8">
            <NoUserSelected />
          </div>
        )}
      </div>
    </div>
  );
};

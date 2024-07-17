import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./userChatInterface.css";
import { toast } from "react-hot-toast";
import { Form, InputGroup } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import { axiosInstance } from "../../../../apis/axiosInstance";

export const UserchatInterFace = ({ receiverId, freelancerId }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (receiverId && freelancerId) {
      getAllMessages();
    }
  }, [receiverId, freelancerId]);
  const getAllMessages = async () => {
    try {
      const res = await axiosInstance.post(`getUserMessages`, {
        freelancerId,
        userId: receiverId,
      });
      if (res.status === 200) {
        setAllMessages(res.data.data);
      }
    } catch (error) {
      console.log("Error on getting messages,", error);
    }
  };
  useLayoutEffect(() => {
    scrollToBottom();
  }, [allMessages]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      toast.error("Type message");
      return;
    }
    if (!freelancerId || !receiverId) {
      console.log("ids", freelancerId, receiverId);
      return;
    }

    const obj = {
      message,
      freelancerId,
      userId: receiverId,
      msgSenderType: "freelancer",
    };
    sendDataToServer(obj);
  };
  const sendDataToServer = async (data) => {
    try {
      const res = await axiosInstance.post("sendMessageToUser", data);
      if (res.status === 200) {
        console.log("respon", res);
      }
    } catch (error) {
      console.log("Error on sending message,", error);
    } finally {
      setMessage("");
      getAllMessages();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="userChatInterface-body">
      <div id="display-user-messages">
        {allMessages.map((msg) => {
          if (msg.msgSenderType == "freelancer") {
            return (
              <div key={msg._id} className="userChatInterface-chat2">
                <p>{msg.message}</p>
              </div>
            );
          } else {
            return (
              <div key={msg._id} className="userChatInterface-chat1">
                <p>{msg.message} </p>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="d-flex userChatInterface-input"
        style={{ width: "64%" }}
        onSubmit={handleSubmit}
      >
        <InputGroup className="mb-3 ">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type message"
          />
          <InputGroup.Text>
            <IoMdSend />
          </InputGroup.Text>
        </InputGroup>
      </form>
    </div>
  );
};

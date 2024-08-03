import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../apis/axiosInstance";
export const ComplaintUser = ({ userId }) => {
  const { userId : freelancerId} = useSelector((state) => state.auth);
  const [complaintData, setComplaintData] = useState({
    complaint: "",
    userId: "",
    freelancerId: "",
  });

  console.log("complaint data", complaintData)

  useEffect(() => {
    setComplaintData({
      ...complaintData,
      userId,
      freelancerId,
    });
  }, [userId, freelancerId]);
  const changeReview = (e) => {
    const { name, value } = e.target;
    setComplaintData({ ...complaintData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaintData.complaint !== "") {
      sendDataToServer();
    } else {
      toast.error("Please enter your complaint");
    }
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post(
        "userComplaint",
        complaintData
      );
      if (res.status === 200) {
        toast.success("Complaint sent successfully. We will resolve it soon");
        setComplaintData({ ...complaintData, complaint: "" });
      } else {
        throw new Error("Couldn't complaint. Try again later");
      }
    } catch (error) {
      toast.error("Couldn't add review");
    }
  };
  return (
    <div className="">
      <div
        className="mt-3 mx-auto p-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "200px",
        }}
      >
        <div>
          <h5 className="text-center ">Write your complaint here </h5>
        </div>

        <form
          className="d-flex justify-content-center align-items-center mt-4"
          onSubmit={handleSubmit}
        >
          <input
            as="textarea"
            rows="3"
            style={{ height: "43px", width: "75%" }}
            value={complaintData.complaint}
            id="review"
            name="complaint"
            onChange={changeReview}
            placeholder="Write your complaint"
            className="form-control"
          />

          <button
            className="button-50 ms-3"
            style={{ backgroundColor: "#ed1616", width: "125px", height: "50px" }}
            role="button"
            type="submit"
          >
            Send 
          </button>

          {/* <button type="submit" className="btn ms-5 btn-danger ">
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};

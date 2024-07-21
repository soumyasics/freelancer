import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../apis/axiosInstance";
export const FreelancerRating = ({ freelancerId }) => {
  const { userId } = useSelector((state) => state.auth);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: "",
    userId: "",
    freelancerId: "",
  });

  useEffect(() => {
    setReviewData({
      ...reviewData,
      userId,
      freelancerId,
    });
  }, [userId, freelancerId]);

  console.log("review ", reviewData)
  const changeReview = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const ratingChanged = (newRating) => {
    setReviewData({ ...reviewData, rating: newRating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewData.review !== "" && reviewData.rating !== 0) {
      console.log("review dat", reviewData);
      sendDataToServer();
    } else {
      toast.error("Please provide a review and rating");
    }
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("addRating", reviewData);
      if (res.status === 200) {
        toast.success("Review added successfully");
        setReviewData({ ...reviewData, review: "", rating: 0 });
      } else {
        throw new Error("Couldn't add review");
      }
    } catch (error) {
      toast.error("Couldn't add review");
    }
  };
  return (
    <div>
      <div
        className="mt-3 mx-auto shadow p-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "200px",
        }}
      >
        <div>
          <h5 className="text-center ">Review your experience </h5>
        </div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={30}
          activeColor="#ffd700"
        />
        <form
          className="d-flex justify-content-center align-items-center mt-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            style={{ height: "33px", width: "75%" }}
            value={reviewData.review}
            id="review"
            name="review"
            onChange={changeReview}
            placeholder="Write a review"
            className="form-control"
          />
          <button type="submit" className="btn ms-5 btn-success ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

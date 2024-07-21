import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../apis/axiosInstance";

export const ReviewModal = ({ show, id, handleClose }) => {
  const [review, setReviews] = useState([]);
  useEffect(() => {
    if (!id) {
      handleClose();
      return;
    }
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`getAllRatingByFreelancerId/${id}`);
      if (res.status === 200) {
        const data = res?.data?.data || [];
        setReviews(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Check your network connection!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} style={{maxHeight: "400px", overflow: "auto"}}>
      <Modal.Header closeButton>
        <Modal.Title>Reviews and ratings</Modal.Title>
      </Modal.Header>

      {review.length === 0 ? (
        <Modal.Body>
          <p className="text-center text-primary">No Reviews found</p>
        </Modal.Body>
      ) : (
        <Modal.Body>
          <Table
            responsive
            className="my-subscriptions-table mt-5"
            bordered
            striped
            hover
          >
            <thead>
              <tr>
                <th>Reviewer name</th>
                <th>Rating</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {review.map((rev) => (
                <tr>
                  <td>{rev?.userId?.firstName}</td>
                  <td>{rev?.rating}</td>
                  <td>{rev?.review}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      )}
    </Modal>
  );
};

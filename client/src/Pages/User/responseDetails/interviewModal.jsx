import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../apis/axiosInstance";

export const InterviewScheduleModal = ({
  show,
  handleClose,
  vacencyId,
  freelancerId,
}) => {
  const { userId } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    consultancyId: "",
    vacencyId: "",
    freelancerId: "",
    interviewDate: "",
    interviewMode: "Online",
    phoneNumber: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userId && vacencyId && freelancerId) {
      setFormData({
        ...formData,
        consultancyId: userId,
        vacencyId: vacencyId,
        freelancerId: freelancerId,
      });
    }
  }, [userId, vacencyId, freelancerId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.interviewDate ||
      !formData.interviewMode ||
      !formData.phoneNumber ||
      !formData.description
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // Validate phone number
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (
      formData.phoneNumber.length !== 10 ||
      !phoneNumberPattern.test(formData.phoneNumber)
    ) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (
      !formData.vacencyId ||
      !formData.freelancerId ||
      !formData.consultancyId
    ) {
      toast.error("Network issue, please login again.");
      return;
    }
    // Handle form submission logic here
    sendDataToServer();
    console.log("Form Data:", formData);
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("scheduleInterview", formData);
      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        const msg = error?.response?.data?.message || "Please check your email and try again";
        toast.error(msg);
      } else {
        toast.error("Internal Server Error");
      }
    } finally {
    //   resetFields();
      handleClose();
    }
  };

  const resetFields = () => {
    setFormData({
        ...formData,
      interviewDate: "",
      interviewMode: "Online",
      phoneNumber: "",
      description: "",
    });
  }
  const getTodayDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const todayDateTime = getTodayDateTime();

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="interviewDate">
              <Form.Label>Interview Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="interviewDate"
                min={todayDateTime}
                value={formData.interviewDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="interviewMode">
              <Form.Label>Interview Mode</Form.Label>
              <Form.Control
                as="select"
                name="interviewMode"
                value={formData.interviewMode}
                onChange={handleChange}
                required
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter 10 digit phone number"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                minLength="10"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>More information about the interview</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Please provide meet link if its online interview, or location if its offline interview"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="dark" type="submit">
                Schedule
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

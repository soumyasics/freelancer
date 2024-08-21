import Navbar from "../../Common/Navbar/navbar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Footer from "../../Common/Footer/footer";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";
import "./userRequest.css";
const UserRequest = () => {
  const [validated, setValidated] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const state = useSelector((state) => state);
  const [today] = useState(new Date().toISOString().split("T")[0]);

  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    userId: "",
    title: "",
    description: "",
    budget: "",
    category: "",
    deadline: "",
  });

  useEffect(() => {
    if (userId) {
      setRequestData({ ...requestData, userId });
    } else {
      toast.error("Please login again..");
      setTimeout(() => {
        navigate("../user-login");
      }, 0);
    }
  }, []);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (
      !requestData.userId ||
      !requestData.title ||
      !requestData.description ||
      !requestData.budget ||
      !requestData.category ||
      !requestData.deadline
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (requestData.budget < 0 || requestData.budget > 100000000) {
      toast.error("Budget should be between 0 to 100000000");
      return;
    }

    if (requestData.description.length < 50) {
      toast.error("Description should be at least 50 characters");
      return;
    }
    
    if (!/^[a-zA-Z ]+$/.test(requestData.title)) {
      toast.error("Title should not contain numbers and special characters");
      return;
    }

    sendDataToServer();
  };
  const sendDataToServer = async () => {
    try {
      let res = await axiosInstance.post("/createWorkRequest", requestData);
      if (res.status == 201) {
        toast.success("Request sent successfully.");
        navigate("/user-myrequests");
      }
    } catch (err) {
      let status = err.response?.status || null;
      if (status === 401) {
        let warningMsg = err?.response?.data?.message || null;
        if (warningMsg) {
          toast.error(warningMsg);
          return;
        }
      }
      toast.error("Server Error");
    }
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setRequestData({
      ...requestData,
      [name]: value,
    });
  };


  return (
    <>
      <div>
        <Navbar />
        <h2 className="text-center mt-3 mb-3 fw-bold">Request Work</h2>
        <Form
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
          className="w-50 p-4 mx-auto "
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={requestData.title}
                onChange={handleChanges}
                placeholder="Title"
                required
              />
              <Form.Control.Feedback type="invalid" className="">
                Please provide a valid title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                placeholder="Deadline"
                name="deadline"
                min={today}
                value={requestData.deadline}
                onChange={handleChanges}
                required
              />
              <Form.Control.Feedback type="invalid" className="">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 mt-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Category</Form.Label>

              <Form.Select name="category" onChange={handleChanges} required>
                <option value="">Choose work category</option>
                <option value="Website Creation">Website Creation</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="SEO Services">SEO Services</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Social Media Management">
                  Social Media Management
                </option>
                <option value="Translation Services">
                  Translation Services
                </option>
                <option value="Virtual Assistance">Virtual Assistance</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Data Entry">Data Entry</option>
                <option value="Photography">Photography</option>
                <option value="Illustration">Illustration</option>
                <option value="Copywriting">Copywriting</option>
                <option value="UX/UI Design">UX/UI Design</option>
                <option value="IT Support">IT Support</option>
                <option value="Project Management">Project Management</option>
                <option value="Other">Other (Specify in description)</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid" className="">
                Please provide a valid Categor.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Your Budget</Form.Label>
              <Form.Control
                as="input"
                name="budget"
                value={requestData.budget}
                onChange={handleChanges}
                type="number"
                placeholder="Budget"
                required
                min="0"
                max="100000000"
              />
              <Form.Control.Feedback type="invalid" className="">
                Please provide your maximum budget for this work.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                row={3}
                minLength={50}
                name="description"
                value={requestData.description}
                onChange={handleChanges}
                placeholder="Tell us more about your work request."
                required
              />
              <Form.Control.Feedback type="invalid" className="">
                Tell us more about your work. (minimum 50 characters)
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center mt-3">
            <Button className="mx-auto w-25" type="submit">
              Request Work
            </Button>
          </div>
        </Form>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
};
export default UserRequest;

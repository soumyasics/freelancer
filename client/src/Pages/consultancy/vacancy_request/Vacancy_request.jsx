import Navbar from "../../Common/Navbar/navbar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Footer from "../../Common/Footer/footer";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import "./Vacancy_request.css";
import { toast } from "react-hot-toast";

const Vacancy_request = () => {
  const [validated, setValidated] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const [today] = useState(new Date().toISOString().split("T")[0]);
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    conId: "",
    title: "",
    description: "",
    budget: "",
    category: "",
    deadline: "",
    consultancyPhoneNumber: "", // New field for consultancy phone number
  });

  useEffect(() => {
    if (userId) {
      setRequestData({ ...requestData, conId: userId });
    } else {
      toast.error("Please login again..");
      setTimeout(() => {
        navigate("../consultancy-login");
      }, 0);
    }
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (
      !requestData.conId ||
      !requestData.title ||
      !requestData.description ||
      !requestData.budget ||
      !requestData.category ||
      !requestData.deadline ||
      !requestData.consultancyPhoneNumber
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    // Regular expression for a 10-digit phone number
    const phoneNumberPattern = /^[0-9]{10}$/;

    // Check if the phone number is valid
    if (!phoneNumberPattern.test(requestData.consultancyPhoneNumber)) {
      toast.error("Please provide a valid phone number");
      return;
    }

    // here check a regex if requestData.consultancyPhoneNumber is valid
    if (requestData.budget < 0 || requestData.budget > 100000000) {
      toast.error("Salary should be between 0 to 100000000");
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(requestData.title)) {
      toast.error("Title should not contain numbers or special characters");
      return;
    }

    if (requestData.description.length < 50) {
      toast.error("Description should be at least 50 characters");
      return;
    }

    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      let res = await axiosInstance.post("/con-createWorkRequest", requestData); // Assuming this endpoint exists
      console.log("respo", res);
      if (res.status == 201) {
        toast.success("Request sent successfully.");
        setTimeout(() => {
          navigate("/consultancy-my-vacancies");
        }, 1000);
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
        <h2 className="text-center mt-3  mb-3 fw-bold">Add Vacancy </h2>
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
                min={today}
                placeholder="Deadline"
                name="deadline"
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
              <Form.Control
                type="text"
                placeholder="Category"
                name="category"
                value={requestData.category}
                onChange={handleChanges}
                required
              />

              <Form.Control.Feedback type="invalid" className="">
                Please provide a valid Category.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                as="input"
                name="budget"
                value={requestData.budget}
                onChange={handleChanges}
                type="number"
                placeholder="Salary"
                required
                min="0"
                max="100000000"
              />
              <Form.Control.Feedback type="invalid" className="">
                Please provide salary for this work.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Consultancy Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Consultancy Phone Number"
                name="consultancyPhoneNumber"
                pattern="[0-9]{10}"
                maxLength="10"
                minLength="10"
                value={requestData.consultancyPhoneNumber}
                onChange={handleChanges}
                required
              />
              <Form.Control.Feedback type="invalid" className="">
                Please provide a valid phone number.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Form.Group as={Col} md="12">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  minLength={50}
                  value={requestData.description}
                  onChange={handleChanges}
                  placeholder="Description"
                  required
                />
                <Form.Control.Feedback type="invalid" className="">
                Tell us more about your vacancy. (minimum 50 characters)
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Row>

          <div className="d-flex justify-content-center">
            <Button className="mx-auto w-25" type="submit">
              Add Vacancy
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

export default Vacancy_request;

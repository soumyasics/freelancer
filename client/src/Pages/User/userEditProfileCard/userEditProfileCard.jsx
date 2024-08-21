import { useEffect, useState } from "react";
import "./userEditProfileCard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { axiosInstance } from "../../../apis/axiosInstance";

export const UsereditProfileCard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { userData, userId } = useSelector((state) => state.auth);

  const [edit, setEdit] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    if (userData) {
      setEdit({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    }
  }, [userData]);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const checkValidate = () => {
    const { firstName, lastName, email } = edit;
    if (!firstName) {
      toast.error("First name field can't be empty");
      return false;
    }
    if (!lastName) {
      toast.error("Lastname name field can't be empty");
      return false;
    }
    
    if (!/^[a-zA-Z ]+$/.test(firstName)) {
      toast.error("First name should not contain numbers and special characters");
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(lastName)) {
      toast.error("Last name should not contain numbers and special characters");
      return;
    }
    if (!email) {
      toast.error("Email field can't be empty");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }


    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Please login again");
      return;
    }

    if (!checkValidate()) {
      return;
    }
    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.patch(`edituserById/${userId}`, edit);
      if (res.status === 200) {
        console.log("res daa", res.data.data);
        let data = res?.data?.data || null;
        if (data && data._id) {
          let obj = {
            userData: data,
            userId: data._id,
            userType: "user",
          };
          dispatch(loginSuccess(obj));
          localStorage.setItem("freelancerData", JSON.stringify(obj));
        }

        // navigate("/user");

        toast.success("Update successfull");
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404) {
        toast.error("Please login again");
      } else {
        toast.error("Network error");
      }
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <div className="d-flex w-100 justify-content-center">
        <Button
          variant="primary"
          onClick={handleShow}
          className="userEditProfile-base-button"
        >
          Edit Profile
        </Button>
      </div>
      <div className="editProfile-card-body">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="userEditProfileCard-header">
            <Modal.Title className="EditProfileCard-heading d-flex">
              <FaArrowLeft
                className="userEditProfile-left-arrow"
                onClick={handleClose}
              />
              <p> Edit profile</p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="editProfileCard-Label">
                  First name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your First name"
                  autoFocus
                  className="editProfileCard-input"
                  name="firstName"
                  value={edit.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="editProfileCard-Label">
                  Last name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your First name"
                  autoFocus
                  className="editProfileCard-input"
                  name="lastName"
                  value={edit.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">Email</Form.Label>
                <Form.Control
                  type="email"
                  className="editProfileCard-input"
                  placeholder="Enter your email"
                  name="email"
                  value={edit.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" className="EditProfileCard-button">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

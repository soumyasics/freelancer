import { useEffect, useState } from "react";
import "./userEditProfileCard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { axiosInstance } from "../../../apis/axiosInstance";
import { isPhoneNumberValid } from "../../../utils/validations/emailValidation";

export const ConsultancyeditProfileCard = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { userData, userId } = useSelector((state) => state.auth);

  const [edit, setEdit] = useState({
    name: "",
    contact: "",
    email: "",
    licenseId: "",
    address: "",
  });
  useEffect(() => {
    if (userData) {
      setEdit({
        name: userData.name,
        contact: userData.contact,
        email: userData.email,
        address: userData.address,
        licenseId: userData.licenseId,
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
    const { name, email, contact, address, licenseId } = edit;

    if (!email) {
      toast.error("Email field can't be empty");
      return false;
    }

    if (!name) {
      toast.error("Name field can't be empty");
      return false;
    }

    if (!contact) {
      toast.error("Contact field can't be empty");
      return false;
    }

    if (!isPhoneNumberValid(contact)) {
      toast.error("Please Enter Valid Phone Number");
      return false;
    }

    if (!address) {
      toast.error("Address field can't be empty");
      return false;
    }

    if (!licenseId) {
      toast.error("License field can't be empty");
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
      const res = await axiosInstance.patch(
        `editConsultancyById/${userId}`,
        edit
      );
      if (res.status === 200) {
        console.log("res daa", res.data.data);
        let data = res?.data?.data || null;
        if (data && data._id) {
          let obj = {
            userData: data,
            userId: data._id,
            userType: "consultancy",
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
          Edit
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
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">Name</Form.Label>
                <Form.Control
                  type="text"
                  className="editProfileCard-input"
                  placeholder="Enter your name"
                  name="name"
                  value={edit.name}
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">
                  Contact
                </Form.Label>
                <Form.Control
                  type="text"
                  className="editProfileCard-input"
                  placeholder="Enter your contact"
                  name="contact"
                  value={edit.contact}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">
                  Address
                </Form.Label>
                <Form.Control
                  type="text"
                  className="editProfileCard-input"
                  placeholder="Enter your address"
                  name="address"
                  value={edit.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">
                  License Id
                </Form.Label>
                <Form.Control
                  type="text"
                  className="editProfileCard-input"
                  placeholder="Enter your license id"
                  name="licenseId"
                  value={edit.licenseId}
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

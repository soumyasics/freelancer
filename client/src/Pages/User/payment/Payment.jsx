import React, { useState } from "react";
import "./Payment.css";
import Navbar from "../../Common/Navbar/navbar";
import { Container, Form, Row, Col, Image, Button } from "react-bootstrap";
import creditCard from "../../../Assets/credit-card.png";
import paypal from "../../../Assets/paypal.png";
import amazonPay from "../../../Assets/amazonpay.png";
import { useSelector } from "react-redux";
import Footer from "../../Common/Footer/footer";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
function Payment() {
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { workId, freelancerId, amount } = useSelector(
    (state) => state.payment
  );

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    accHolderName: "",
    cvc: "",
    expYear: "",
    expMonth: "",
    amount: amount,
    userId: userId,
    workId: workId,
    freelancerId: freelancerId,
  });

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setPaymentDetails((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  // console.log("workid", workId, "freelancerId", freelancerId);
  const handleSubmit = (event) => {
    console.log('evv', event)
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    console.log("111")
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.accHolderName ||
      !paymentDetails.cvc ||
      !paymentDetails.expYear ||
      !paymentDetails.expMonth ||
      !paymentDetails.amount ||
      !paymentDetails.userId ||
      !paymentDetails.workId ||
      !paymentDetails.freelancerId
    ) {
      alert("All fields are required");
      return;
    }
    sendDataToServer()
  };
  const sendDataToServer = async () => {
    console.log("sdnd")
    try {
      let res = await axiosInstance.post("/addPayment", paymentDetails);
      if (res.status === 201) {
        alert("Payment added successfully");
        //TODO navigate to my acitivy page.
      }
    } catch (err) {
      console.log("Error on get request data", err);

      alert("Something went wrong");
    }
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-color rounded">
        {
          (userId && amount && workId,
          freelancerId ? (
            <Container fluid>
              <Row className="mx-5">
                <h1 className="text-white m-5 text-center">Payment</h1>
              </Row>
              <Row className="justify-content-center mx-5">
                <h5 className="text-white mx-5">Choose payment method below</h5>
                <Col xl={4} className="text-center">
                  <Image
                    src={creditCard}
                    rounded
                    fluid
                    className="m-5 "
                    style={{ maxWidth: "300px" }}
                  />
                </Col>
                <Col xl={4} className="text-center">
                  <Image
                    src={paypal}
                    rounded
                    fluid
                    className="m-5"
                    style={{ maxWidth: "300px" }}
                  />
                </Col>
                <Col xl={4} className="text-center">
                  <Image
                    src={amazonPay}
                    rounded
                    fluid
                    className="m-5"
                    style={{ maxWidth: "300px" }}
                  />
                </Col>
              </Row>
              <Row className="mx-5">
                <Col>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group controlId="cardholdersName">
                      <Form.Label className="text-white m-3">
                        Cardholder's Name
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter cardholder's name"
                        className="m-3"
                        name="accHolderName"
                        value={paymentDetails.accHolderName}
                        onChange={handleChanges}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="m-3 bg-light w-25 p-2"
                      >
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="cardNumber">
                      <Form.Label className="text-white m-3">
                        Card Number
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Enter card number"
                        className="m-3"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handleChanges}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="m-3 bg-light w-25 p-2"
                      >
                        Please provide a valid card number.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group controlId="expMonth">
                          <Form.Label className="text-white m-3">
                            Exp Month
                          </Form.Label>
                          <Form.Control
                            required
                            type="number"
                            name="expMonth"
                            placeholder="MM"
                            
                            className="m-3"
                            value={paymentDetails.expMonth}
                            onChange={handleChanges}
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className="m-3 bg-light  p-2"
                          >
                            Please provide a valid expiration month.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="expYear">
                          <Form.Label className="text-white m-3">
                            Exp Year
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="YYYY"
                            maxLength="4"
                            minLength="4"
                            className="m-3"
                            name="expYear"
                            value={paymentDetails.expYear}
                            onChange={handleChanges}
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className="m-3 bg-light  p-2"
                          >
                            Please provide a valid expiration year.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="cvc">
                          <Form.Label className="text-white m-3">
                            CVC Number
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter CVC"
                            name="cvc"
                            maxLength="3"
                            minLength="3"
                            value={paymentDetails.cvc}
                            onChange={handleChanges}
                            className="m-3"
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className="m-3 bg-light  p-2"
                          >
                            Please provide a valid CVC number.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center d-grid gap-2">
                        <Button
                          variant="outline-light"
                          type="submit"
                          className="m-5"
                          size="lg"
                          
                        >
                          Pay ₹{amount}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          ) : (
            <div
              style={{ minHeight: "300px" }}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h1 className="text-center text-white"> Payment Failed. </h1>
              <div className="text-center">
                <Button
                  variant="warning"
                  onClick={() => {
                    navigate("/user-myrequests");
                  }}
                >
                  {" "}
                  Go Back{" "}
                </Button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default Payment;

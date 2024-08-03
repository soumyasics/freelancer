import React, { useEffect, useState } from "react";
import "./Payment.css";
import Navbar from "../../Common/Navbar/navbar";
import { Container, Form, Row, Col, Image, Button } from "react-bootstrap";
import creditCard from "../../../Assets/credit-card.png";
import paypal from "../../../Assets/paypal.png";
import amazonPay from "../../../Assets/amazonpay.png";
import { useSelector } from "react-redux";
import Footer from "../../Common/Footer/footer";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";
export const PendingPayment = () => {
  const { userId } = useSelector((state) => state.auth);
  const [today] = useState(new Date().toISOString().split("T")[0]);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    accHolderName: "",
    cvc: "",
    expDate: "",
    totalAmount: 0,
    pendingAmount: 0,
    lossOfPay: 0,
    extraDays: 0,
    amountPaid: 0,
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getPaymentData();
    }
  }, [id]);
  const getPaymentData = async () => {
    try {
      const res = await axiosInstance.get("getPaymentDataByWorkId/" + id);
      if (res.status === 200) {
        const data = res?.data?.data;
        const totalAmount = data?.amount;
        const amouontPaid = data?.amountPaid;
        const lossOfPay = data.lossOfPay;
        const pendingAmount = totalAmount - (amouontPaid + lossOfPay);
        const extraDays = data.extraDays;
        setPaymentDetails((prevData) => {
          return {
            ...prevData,
            totalAmount: totalAmount,
            pendingAmount: pendingAmount,
            lossOfPay: lossOfPay,
            extraDays: extraDays,
            amountPaid: amouontPaid,
          };
        });
        setPaymentData(data);
      }
    } catch (error) {
      console.log("Error on get payment data", error);
    }
  };
  const handleChanges = (event) => {
    const { name, value } = event.target;
    setPaymentDetails((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (
      !paymentDetails.cvc ||
      !paymentDetails.expDate ||
      !paymentDetails.cardNumber ||
      !paymentDetails.accHolderName
    ) {
      toast.error("All fields are required");
      return;
    }

    const cardNumberPattern = /^[0-9]{16}$/;
    const cvcPattern = /^[0-9]{3}$/;

    if (!cardNumberPattern.test(paymentDetails.cardNumber)) {
      toast.error("Card number should be 16 digits");
      return;
    }
    if (!cvcPattern.test(paymentDetails.cvc)) {
      toast.error("CVC should be 3 digits");
      return;
    }

    if (paymentDetails.cvc.length !== 3) {
      toast.error("CVC should be 3 digits");
      return;
    }

    sendDataToServer();
  };
  const sendDataToServer = async () => {
    try {
      let res = await axiosInstance.post(`/pendingPayment/${paymentData._id}`, {
        pendingAmount: paymentDetails.pendingAmount,
      });
      if (res.status === 200) {
        toast.success("Payment successfull");
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 400 || status === 403) {
        toast.error(err?.response?.data?.message);
        return;
      } else {
        toast.error("Something went wrong");
      }
      console.log("Error on get request data", err);
    } finally {
      navigate(`/user-view-work-status/${id}`);
    }
  };
  const sendDataToServer2 = async () => {
    try {
      let res = await axiosInstance.post(`/pendingPayment/${paymentData._id}`, {
        pendingAmount: paymentDetails.pendingAmount,
      });
      if (res.status === 200) {
        // toast.success("Payment successfull");
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 400 || status === 403) {
        toast.error(err?.response?.data?.message);
        return;
      } else {
        toast.error("Something went wrong");
      }
      console.log("Error on get request data", err);
    } finally {
      navigate(`/user-view-work-status/${id}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-color rounded">
        {paymentDetails.pendingAmount > 0 ? (
          <Container fluid>
            <Row className="mx-5">
              <h1 className="text-white mt-5 text-center">Payment</h1>
            </Row>
            <Row className="justify-content-center mx-5">
              {/* <h5 className="text-white mx-5">Please provide your payment details here.</h5> */}

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
                  src={creditCard}
                  rounded
                  fluid
                  className="m-5 "
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
                  className="px-5"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <Form.Group controlId="cardholdersName">
                    <Form.Label className="text-white ms-3">
                      Cardholder's Name
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter cardholder's name"
                      className="ms-3 "
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
                    <Form.Label className="text-white ms-3 mt-3">
                      Card Number
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter card number"
                      className="ms-3"
                      maxLength={16}
                      minLength={16}
                      pattern="[0-9]{16}"
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
                  <Row className="mt-3">
                    <Col>
                      <Form.Group>
                        <Form.Label className="text-white ms-3">
                          Expiry Date
                        </Form.Label>
                        <Form.Control
                          required
                          type="date"
                          className="ms-3"
                          min={today}
                          name="expDate"
                          value={paymentDetails.expDate}
                          onChange={handleChanges}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className="m-3 bg-light  p-2"
                        >
                          Please provide a valid expiry date.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="cvc">
                        <Form.Label className="text-white ms-3">
                          CVC Number
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter CVC"
                          name="cvc"
                          maxLength={3}
                          minLength={3}
                          pattern="[0-9]{3}"
                          value={paymentDetails.cvc}
                          onChange={handleChanges}
                          className="ms-3"
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
                        className="my-5 mx-auto"
                        size="lg"
                      >
                        Pay ₹ {paymentDetails.pendingAmount}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    {}
                    <p className="text-white text-center">
                      {paymentDetails.lossOfPay === 0 ? (
                        <p>
                          {" "}
                          The total amount for this work is{" "}
                          {paymentDetails.totalAmount} rupees. 50% of the
                          payment, which is {paymentDetails.amountPaid} rupees,
                          has already you paid. The unsettled amount is{" "}
                          {paymentDetails.pendingAmount} rupees. The freelancer
                          completed the work within the deadline, so you should
                          pay the remaining {paymentDetails.pendingAmount}{" "}
                          rupees
                        </p>
                      ) : (
                        <p>
                          The total amount for this work is{" "}
                          {paymentDetails.totalAmount} rupees. 50% of the
                          payment, which is {paymentDetails.amountPaid} rupees,
                          has already you paid. The unsettled amount is{" "}
                          {paymentDetails.totalAmount -
                            paymentDetails.amountPaid}{" "}
                          rupees. The freelancer has not completed the work
                          within the deadline and took{" "}
                          {paymentDetails.extraDays} extra days. The penalty
                          amount is {paymentDetails.lossOfPay} rupees, so you
                          should pay the remaining{" "}
                          {paymentDetails.pendingAmount} rupees.
                        </p>
                      )}
                    </p>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        ) : (
          <div
            style={{ minHeight: "300px" }}
            className="d-flex justify-content-center align-items-center flex-column px-5"
          >
            <h1 className="text-center text-white"> No payment required. </h1>

            <p className="text-light mt-4 text-center">
              The total amount for this work is {paymentDetails.totalAmount}{" "}
              rupees. 50% of the payment, which is {paymentDetails.amountPaid}{" "}
              rupees, has already been paid. The unsettled amount is{" "}
              {paymentDetails.totalAmount - paymentDetails.amountPaid} rupees.
              The freelancer has not completed the work within the deadline and
              took {paymentDetails.extraDays} extra days. The penalty amount is{" "}
              {paymentDetails.lossOfPay} rupees, so you shouldn't pay any
              additional money.
            </p>

            <div className="text-center">
              <Button
                className="mt-3"
                variant="warning"
                onClick={() => {
                  sendDataToServer2();
                }}
              >
                {" "}
                Go Back{" "}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

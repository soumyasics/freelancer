import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../apis/axiosInstance";
import { Col, Row } from "react-bootstrap";
import moment from "moment-timezone";
import paymentIllusImage from "../../../Assets/new/payment-illus.png";
const PaymentPaidDetails = ({ workId }) => {
  const [paymentData, setPaymentData] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [unsettledPayment, setUnsettledPayment] = useState(0);

  useEffect(() => {
    getPaymentData();
  }, [workId]);

  useEffect(() => {
    if (paymentData?.amountPaid) {
      setUnsettledPayment(paymentData?.amount - paymentData?.amountPaid);
    }
  }, [paymentData]);
  const getPaymentData = async () => {
    try {
      const res = await axiosInstance.get("getPaymentDataByWorkId/" + workId);
      if (res.status === 200) {
        const data = res?.data?.data;
        setPaymentData(data);
        if (data?.date) {
          const date = moment(data.date).tz("Asia/Kolkata");
          setFormattedDate(date.format("YYYY-MM-DD"));
          setFormattedTime(date.format("HH:mm:ss"));
        }
      }
    } catch (error) {
      console.log("Error on get payment data", error);
      const status = error?.response?.status;
      if (status === 500 || status === 400 || status === 404) {
        toast.error(error?.response?.data?.message);
        return;
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <Row className="mt-5">
      <div className="text-center">
        <h3>Payment Details</h3>
      </div>

      <Row
        style={{ minHeight: "300px", width: "90%" }}
        className="shadow mx-auto"
      >
        <Col>
          <p>
            <span className="fs-6 fw-bold">Card Number: </span>{" "}
            {paymentData?.cardNumber || "..."}
          </p>
          <p>
            <span className="fs-6 fw-bold">Account Holder Name: </span>
            {paymentData?.accHolderName || "..."}
          </p>
          <p>
            <span className="fs-6 fw-bold">Total Work Amount: </span> ₹{" "}
            {paymentData?.amount || 0}
          </p>
          <p>
            <span className="fs-6 fw-bold">Amount Received: </span> ₹{" "}
            {paymentData?.amountPaid || 0}
          </p>
          <p>
            <span className="fs-6 fw-bold">Late penalty: </span> ₹{" "}
            {paymentData?.lossOfPay === 0 ? "0" : paymentData?.lossOfPay || 0}
          </p>
          <p>
            <span className="fs-6 fw-bold">Unsettled payment: </span> ₹{" "}
            {unsettledPayment || 0}
          </p>
        </Col>
        <Col>
          <img className="w-50 " src={paymentIllusImage} alt="payment" />
        </Col>
      </Row>
    </Row>
  );
};
export default PaymentPaidDetails;

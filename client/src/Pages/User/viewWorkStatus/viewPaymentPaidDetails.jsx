import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../apis/axiosInstance";
import { Col, Row } from "react-bootstrap";
import paymentIllusImage from "../../../Assets/new/payment-illus.png";
const PaymentPaidDetails = ({ workId }) => {
  const [paymentData, setPaymentData] = useState({});
  useEffect(() => {
    getPaymentData();
  }, [workId]);

  console.log("paymerb", paymentData);
  const getPaymentData = async () => {
    try {
      const res = await axiosInstance.get("getPaymentDataByWorkId/" + workId);
      if (res.status === 200) {
        setPaymentData(res?.data?.data);
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
        <h3>Transaction Details</h3>
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
            <span className="fs-6 fw-bold">Account Holder Name </span> ₹{" "}
            {paymentData?.accHolderName || "..."}
          </p>
          <p>
            <span className="fs-6 fw-bold">Amount </span> ₹{" "}
            {paymentData?.amount || "..."}
          </p>

          <p>
            <span className="fs-6 fw-bold"> Date of payment</span>{" "}
            {paymentData?.date?.substring(0, 10) || "..."}
          </p>
          <p>
            <span className="fs-6 fw-bold"> Transaction time</span>{" "}
            {paymentData?.date?.substring(11, 19) || "..."}
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

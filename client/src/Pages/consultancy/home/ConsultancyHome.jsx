import * as React from "react";
import { useNavigate } from "react-router-dom";
import consultancyImage from "../../../Assets/strategic-consulting-concept-illustration_114360-8994.avif";
import SatisfiedClient from "../../../Assets/consultative-sales-concept-illustration_114360-7388.avif";
import "./ConsultancyHome.css";
import Navbar from "../../Common/Navbar/navbar";
import Footer from "../../Common/Footer/footer";

function ConsultancyHome() {
  const navigate = useNavigate();

  const redirectConsultancy = () => {
    navigate("/consultancy");
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="m-5">
          <p className="hero-legend justify-content-center pt-5 ">
            Welcome to MarketPlace CONNECT
          </p>
        </div>
        <div>
          <p className="home-inner justify-content-center">
            A Platform to Empower Consultancy Services
          </p>
        </div>
        <div className="connect justify-content-center p-5 m-5">
          <span>Connect</span>
          <i className="bi bi-gear-wide-connected mx-3"></i>
        </div>
        <div className="home-inner2 p-5 ">
          <p className="m-3 p-3">"Empower your consultancy business. Grow your network."</p>
          <p className="home-inner3 mt-4 p-3">
            Join Marketplace CONNECT, the trusted network for freelancers and consultancy professionals
          </p>
          <button
            className="btn btn-outline-info btn-lg px-5 py-4 m-5"
            id="btn1"
            onClick={redirectConsultancy}
          >
            Connect Now <i className="bi bi-gear-wide-connected mx-3"></i>
          </button>
        </div>
        <div className="consultancy-home-banner mb-5 p-5">
          <div className="consultancy-home-banner-inner m-5 p-5">
            <p className="home-banner-inner1 ">
              Welcome to the world of consultancy—a vibrant ecosystem where expertise knows no boundaries and innovation knows no limits.
            </p>
          </div>
          <p className="consultancy-home-banner-inner2 m-5 p-5">Effective Solutions</p>
        </div>
        <div className="home-banner-targeted text-center p-5">
          <p className="home-targeted-search p-3">Tailored Services</p>
          <p className="home-targeted-search-body p-3">
            Experience personalized consultancy services with our tailored solutions, simplifying complex problems for effective solutions.
          </p>
        </div>
        <div className="home-banner-inner m-5 text-center d-flex">
          <div className="consultancy-home-banner-secure m-5 align-items-center justify-content-center">
            <p className="home-banner-secure-inner">Secure Communication</p>
            <p className="home-banner-secure-inner1">
              Join Marketplace CONNECT, the trusted network for consultancy professionals
            </p>
          </div>
        </div>
        <div className="container home-banner-inner m-5">
          <div className="row">
            <div className="col-md-6">
              <div className="p-3 text-center">
                <p className="home-banner-community p-3">Community-Driven</p>
                <p className="home-banner-community-inner p-3">
                  Join CONNECT, the trusted network for consultancy professionals
                </p>
                <button
                  className="btn btn-outline-info btn-lg px-5 pt-3 my-3"
                  id="btn2"
                  onClick={redirectConsultancy}
                >
                  GROW <i className="bi bi-gear-wide-connected mx-1"></i>
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src={consultancyImage}
                alt="consultancy"
                className="img-fluid  p-3"
              />
            </div>
          </div>
        </div>
        <div className="home-banner-ipad text-center  m-4 ">
          <button className="btn btn-info btn-lg " id="btn3" onClick={redirectConsultancy}>
            CONNECT TO NETWORK{" "}
            <i className="bi bi-gear-wide-connected mx-3"></i>
          </button>
        </div>
        <div className="home-banner-inner text-center p-4 m-5">
          <p className="home-banner-testimonial m-5">Testimonials</p>
          <p className="home-banner-quoteblock m-5">
            " Marketplace Connect revolutionized how we approach complex problems. Their consultancy services were instrumental in guiding our business through challenging times. "
          </p>
          <img src={SatisfiedClient} alt="consultancy" className="mx-auto m-5" />
          <p className="home-banner-end">Satisfied Client</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ConsultancyHome;

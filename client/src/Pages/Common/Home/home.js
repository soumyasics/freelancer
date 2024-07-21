import * as React from "react";
import "./home.css";
import notification from "../../../Assets/notification.png";
import laptop from "../../../Assets/laptop.png";
import side_fig from "../../../Assets/side_fig.png";
import beauty from "../../../Assets/Beauty.png";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { useNavigate } from "react-router-dom";
import { HomeCarousel } from "../../User/carousel/carousel";
function Home(props) {
  const navigate = useNavigate();
  const redirectFreelancer = () => {
    navigate("/freelancer");
  };
  return (
    <>
      <Navbar />
      <HomeCarousel />
      <div className="container-fluid p-0 mt-5" style={{ color: "black" }}>
        <div className="home-banner mb-5 p-5">
          <div className="home-banner-inner m-5 p-5">
            <img
              src={notification}
              alt="notification"
              className="ms-auto float-end"
            />
            <p className="home-banner-inner1 ">
              Welcome to the world of freelancing—a vibrant ecosystem where
              talent knows no boundaries and innovation knows no limits.
            </p>
          </div>
          <p className="home-banner-inner2 m-5 p-5">Simplified Reporting</p>
        </div>
        <div className="home-banner-targeted text-center p-5">
          <img src={laptop} alt="laptop" className="mx-auto p-5" />
          <p className="home-targeted-search p-3">Easy Payment</p>
          <p className="home-targeted-search-body p-3">
            Experience seamless transactions with our easy payment feature,
            simplifying the process for hassle-free transactions.
          </p>
        </div>
        <div className="home-banner-inner m-5">
          <div className="home-banner-secure m-5">
            <p className="home-banner-secure-inner">Secure Communication</p>
            <p className="home-banner-secure-inner1">
              Join Marketplace CONNECT, the trusted network for freelancing
              professionals
            </p>
          </div>
        </div>
        <div className="container home-banner-inner m-5">
          <div className="row">
            <div className="col-md-6">
              <div className="p-3 text-center">
                <p className="home-banner-community p-3">Community-Driven</p>
                <p className="home-banner-community-inner p-3">
                  Join CONNECT, the trusted network for freelancing
                  professionals
                </p>
                <button
                  className="btn btn-outline-info btn-lg justify-content-center align-items-center d-flex mx-auto"
                  id="btn2"
                  onClick={redirectFreelancer}
                >
                  GROW <i className="bi bi-gear-wide-connected mx-1"></i>
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src={side_fig}
                alt="side figure"
                className="img-fluid  p-3"
              />
            </div>
          </div>
        </div>
        <div className="home-banner-ipad text-center  m-4 ">
          <button
            className="btn btn-info btn-lg "
            id="btn3"
            onClick={redirectFreelancer}
          >
            CONNECT TO NETWORK{" "}
            <i className="bi bi-gear-wide-connected mx-3"></i>
          </button>
        </div>
        <div className="home-banner-inner text-center p-4 m-5">
          <p className="home-banner-testimonial m-5">Testimonials</p>
          <p className="home-banner-quoteblock m-5">
            " Marketplace Connect restored my faith in the freelance community.
            My Code went missing after a shoot, and within days, a fellow Coder
            messaged me through the platform to return it! Amazing! "
          </p>
          <img src={beauty} alt="beauty" className="mx-auto m-5" />
          <p className="home-banner-end">Amazing Coder</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

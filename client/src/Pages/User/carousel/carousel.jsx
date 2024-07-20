import Carousel from "react-bootstrap/Carousel";
import { Container, Image } from "react-bootstrap";
import car1Img from "../../../Assets/carousel/car-1.jpg"
import car2Img from "../../../Assets/carousel/car-2.jpg"
import car3Img from "../../../Assets/carousel/car-3.jpg"

export const HomeCarousel = () => {
  return (
    <Carousel className="rounded w-100 mx-auto">
      <Carousel.Item>
        <Container
          style={{ height: "700px" }}
          fluid
          className="w-100 p-0 d-flex justify-content-center"
        >
          <Image
            style={{ height: "600px" }}
            className="h-100 w-100"
            src={car2Img}
            alt="First slide"
          />
        </Container>
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ color: '#ffffff' }}>Find the Perfect Freelancers</h3>
          <p style={{ color: '#ffffff' }}>
            Post your project and connect with talented freelancers to get your work done efficiently.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Container
          style={{ height: "700px" }}
          fluid
          className="w-100 p-0 d-flex justify-content-center"
        >
          <Image className="h-100 w-100" src={car1Img} alt="Second slide" />
        </Container>
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ color: '#ffffff' }}>Showcase Your Skills</h3>
          <p style={{ color: '#ffffff' }}>
            Freelancers can create profiles and showcase their skills to attract potential clients.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Container
          style={{ height: "700px" }}
          fluid
          className="w-100 p-0 d-flex justify-content-center"
        >
          <Image className="h-100 w-100" src={car3Img} alt="Third slide" />
        </Container>
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ color: '#ffffff' }}>Easy Payment and Support</h3>
          <p style={{ color: '#ffffff' }}>
            Secure payment systems and ongoing support ensure smooth transactions and project management.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

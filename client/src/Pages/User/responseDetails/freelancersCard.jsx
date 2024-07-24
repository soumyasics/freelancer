import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BASE_URL } from "../../../apis/baseUrl";
import placeholderImg from "../../../Assets/user-placeholder-img.jpg";
import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export const FreelancersCard = ({ data, num }) => {
  const navigate = useNavigate();
  let filename = data?.freelancerId?.profilepic?.filename || null;
  let profilePicUrl = placeholderImg;
  if (filename) {
    profilePicUrl = BASE_URL + filename;
  }

  const formattedDate = useMemo(() => {
    return formatDistanceToNow(new Date(data.appliedAt), { addSuffix: true });
  }, [data.appliedAt]);
  const navigateToViewFreelancer = () => {
    const id = data?.freelancerId?._id;
    if (id) {
      navigate(`/freelancer/${data?.freelancerId?._id}`);
    } else {
      toast.error("Freelancer not active");
    }
  };
  console.log("data frr", data);

  const viewResume = () => {
    const resumePath = data?.resume || null;
    if (resumePath) {
      const resumeURL = BASE_URL + resumePath;
      window.open(resumeURL, "_blank");
    } else {
      toast.error("Resume not available");
    }
  };

  return (
    <div>
      <Card className="text-center">
        <Card.Header>Applicant {num}</Card.Header>
        <div className="w-100">
          <Card.Img
            style={{ height: "200px", width: "200px", borderRadius: "50%" }}
            variant="top"
            src={profilePicUrl}
          />
        </div>
        <Card.Body>
          <Card.Title>{data?.freelancerId?.name}</Card.Title>
          <Card.Text>Email: {data?.freelancerId?.email}</Card.Text>
          <div className="d-flex justify-content-center gap-5">
            <Button variant="success" onClick={viewResume}>
              View Resume
            </Button>
            <Button variant="dark">Schedule Interview </Button>
            <Button variant="primary" onClick={navigateToViewFreelancer}>
              View Details{" "}
            </Button>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          Appled on: {formattedDate}{" "}
        </Card.Footer>
      </Card>
    </div>
  );
};

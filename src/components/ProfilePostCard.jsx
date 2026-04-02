import { Button, Col, Image, Row } from "react-bootstrap";
import PROFILE_IMG from "../assets/profile.jpg";
import { useEffect, useState } from "react";

export default function ProfilePostCard({ content, post_id }) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetch(
      `https://e7945ea0-aff2-46b2-83a6-9d226964b9a9-00-3u8ccvscbgxqb.janeway.replit.dev/likes/post/${post_id}`,
    )
      .then((response) => response.json())
      .then((data) => setLikes(data.length))
      .catch((error) => console.error(error));
  });

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={PROFILE_IMG} fluid roundedCircle />
      </Col>
      <Col>
        <strong>Adam</strong>
        <span>@adam.filchoir · Mar 26</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-heart">{likes}</i>
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
        </div>
      </Col>
    </Row>
  );
}

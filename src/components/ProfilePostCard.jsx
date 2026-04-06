import { Button, Col, Image, Row } from "react-bootstrap";
import PROFILE_IMG from "../assets/profile.jpg";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { likePost, removeLikePost } from "../features/posts/postsSlice";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({ post }) {
  const { content, id: postId, imageUrl } = post;
  const [likes, setLikes] = useState(post.likes || []);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  const [showUpdatemodal, setShowUpdateModal] = useState(false);

  const isLiked = likes.includes(userId);

  const addToLike = () => {
    setLikes([...likes, userId]);
    dispatch(likePost({ userId, postId }));
  };

  const removeFromLike = () => {
    setLikes(likes.filter((id) => id !== userId));
    dispatch(removeLikePost({ userId, postId }));
  };

  const handleLike = () => (isLiked ? removeFromLike() : addToLike());

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
        <Image src={imageUrl} style={{ width: 150 }} />
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked ? (
              <i className="bi bi-heart text-danger"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
            {likes.length}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
          <Button variant="light" onClick={() => setShowUpdateModal(true)}>
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-trash"></i>
          </Button>
          <UpdatePostModal
            show={showUpdatemodal}
            handleClose={() => setShowUpdateModal(false)}
            postId={postId}
            originalPostContent={content}
          />
        </div>
      </Col>
    </Row>
  );
}

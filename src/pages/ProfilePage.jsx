import { useContext, useEffect } from "react";
import { Navbar, Container, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";
import { useLocalStorage } from "usehooks-ts";
import { AuthContext } from "../components/AuthProvider";
import { getAuth } from "firebase/auth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const auth = getAuth()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirect to login if no auth token is present
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    auth.signOut()
  };

  return (
    <>
        <Container>
            <Row>
                <ProfileSideBar handleLogout={handleLogout} />
                <ProfileMidBody />
            </Row>
        </Container>
    </>
  );
}

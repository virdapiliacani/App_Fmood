import { Outlet } from "react-router";
import MainNavbar from "../../layout/front/MainNavbar";
import { Container, Row, Col } from "reactstrap";
import ProfileSidebar from "../../layout/front/profile/ProfileSidebar";
import Footer from "../../layout/front/Footer";
function UserProfile() {
  console.log(window.history.state.prevUrl);
  return (
    <div className="position-relative  lh-base">
      <MainNavbar />
      <Container className="p-3">
        <Row className="my-3">
          <Col sm="3">
            <ProfileSidebar />
          </Col>
          <Col sm="9" className="position-relative px-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
export default UserProfile;

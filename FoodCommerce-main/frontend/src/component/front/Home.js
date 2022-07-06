import MainNavbar from "../../layout/front/MainNavbar";
import { Col, Container, Row } from "reactstrap";
import SlidePromo from "./home/SlidePromo";
import ChoosenCategory from "./home/ChoosenCategory";
import NewProducts from "./home/NewProducts";
import DiscountProducts from "./home/DiscountProducts";
import CheapProducts from "./home/CheapProduct";
import Footer from "../../layout/front/Footer";
function Home() {
  return (
    <div className="position-relative  lh-base">
      <MainNavbar />
      <Container className="p-3">
        <Row className="my-3">
          <Col sm="12">
            <SlidePromo />
          </Col>
        </Row>
        <Row className="my-3">
          <Col sm="12">
            <ChoosenCategory />
          </Col>
        </Row>
        <Row className="my-3">
          <Col sm="12">
            <NewProducts />
          </Col>
        </Row>
        <Row className="my-3">
          <Col sm="12">
            <DiscountProducts />
          </Col>
        </Row>
        <Row className="my-3">
          <Col sm="12">
            <CheapProducts />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
export default Home;

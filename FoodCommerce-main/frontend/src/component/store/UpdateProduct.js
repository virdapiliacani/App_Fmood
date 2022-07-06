import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";
import classnames from "classnames";
import { useEffect, useState } from "react";
import "../../assets/general/css/custom-button.css";
import "../../assets/store/css/form-input.css";
import FormMedia from "./forms/FormMedia";
import FormCategories from "./forms/FormCategories";
import FormOthers from "./forms/FormOthers";
import FormProductData from "./forms/FormProductData";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import FormCategoriesCache from "./forms/FormCategoriesCache";
import LoadingPage from "../front/LoadingPage";

function UpdateProduct() {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get("/api/get-store-product/" + productId).then((response) => {
      if (response.status === 200) {
        setProduct(response.data);
      }
      setLoading(false);
    });
  }, []);
  const navigate = useNavigate();
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [dataCollection, setDataCollection] = useState({
    productData: {},
    media: {},
    category: {},
    others: {},
  });

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  const productDataCourier = (data) => {
    setDataCollection({ ...dataCollection, productData: data });
  };
  const mediaCourier = (data) => {
    setDataCollection({ ...dataCollection, media: data });
  };
  const categoryCourier = (data) => {
    setDataCollection({ ...dataCollection, category: data });
  };
  const othersCourier = (data) => {
    setDataCollection({ ...dataCollection, others: data });
  };
  function updateProduct() {
    const formData = new FormData();
    // append all data collection to formData
    Object.values(dataCollection).forEach((data) => {
      Object.entries(data).forEach((properties) => {
        formData.append(properties[0], properties[1]);
      });
    });
    axios.post("/api/update-product/" + productId, formData).then((res) => {
      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Update produk berhasil",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/store/organize-product");
      } else if (res.data.status === 422) {
        Swal.fire({
          icon: "warning",
          title: "Gagal update",
          text: "Cek kembali data yang di input",
          showConfirmButton: true,
        });
      } else {
        console.log(res);
      }
    });
  }
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Update Produk</h1>
      <Row>
        <Col sm="12" className="mx-auto align-self-center">
          <Form>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "1",
                  })}
                >
                  Produk
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "2",
                  })}
                >
                  Media
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "3",
                  })}
                >
                  Kategori
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "4",
                  })}
                >
                  Lainnya
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={currentActiveTab}>
              <TabPane tabId="1">
                <Card className="mb-4">
                  {/* Data Utama Produk */}
                  <CardBody>
                    <FormProductData
                      dataCourier={productDataCourier}
                      toggle={toggle}
                      product={product}
                    />
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="2">
                <Card className="mb-4">
                  <CardBody>
                    {/* Media */}
                    <FormMedia
                      dataCourier={mediaCourier}
                      toggle={toggle}
                      product={product}
                    />
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="3">
                <Card className="mb-4">
                  <CardBody>
                    {/* Category */}
                    <FormCategoriesCache
                      dataCourier={categoryCourier}
                      toggle={toggle}
                      product={product}
                    />
                    {/* <FormCategoriesCache
                        dataCourier={categoryCourier}
                        toggle={toggle}
                      /> */}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="4">
                <Card className="mb-4">
                  {/* Others */}
                  <CardBody>
                    <FormOthers
                      dataCourier={othersCourier}
                      toggle={toggle}
                      addProduct={updateProduct}
                      product={product}
                    />
                  </CardBody>
                </Card>
              </TabPane>
            </TabContent>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
export default UpdateProduct;

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import CartList from "./cart/CartList";
import MainNavbar from "../../layout/front/MainNavbar";
import Swal from "sweetalert2";
import LoadingPage from "./LoadingPage";
import { useNavigate } from "react-router";
import Footer from "../../layout/front/Footer";
function Cart() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadPage, setLoadPage] = useState(false);
  const [carts, setCarts] = useState([]);
  const [order, setOrder] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    axios
      .get("/api/get-cart/")
      .then((response) => {
        if (response.data.status === 200) {
          setCarts(response.data.carts);
          setLoading(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Terjadi Kesalahan",
            text: "Pastikan koneksi internet mu stabil",
            showConfirmButton: true,
            showCancelButton: true,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [loadPage]);
  useEffect(() => {
    countTotalPrice();
  }, [order]);
  let viewCartList = () => {
    return <LoadingPage />;
  };
  if (loading) {
    return <LoadingPage />;
  } else if (carts.length === 0) {
    Swal.fire({
      title: "Keranjang Kosong",
      text: "yuk belanja dulu",
      icon: "info",
      backdrop: "#fff",
    }).then((e) => {
      window.location.href = "/";
    });
  } else {
    const arrCarts = Object.values(carts);
    viewCartList = arrCarts.map((cart) => {
      const store = {
        storeId: cart[0].store_id,
        storeName: cart[0].store_name,
        storeCity: cart[0].store_city,
      };
      const products = cart;
      return (
        <CartList
          store={store}
          products={products}
          key={store.storeId}
          loadPage={loadPage}
          setLoadPage={setLoadPage}
          orderHandler={orderHandler}
        />
      );
    });
  }
  function orderHandler(product, action) {
    if (action === "add") {
      setOrder({ ...order, [product.product_id]: product });
      countTotalPrice();
      console.log(order);
    } else if (action === "remove") {
      delete order[product.product_id];
      countTotalPrice();
    } else if (action === "increase") {
      if (order.hasOwnProperty(product.product_id)) {
        order[product.product_id].quantity =
          order[product.product_id].quantity + 1;
        countTotalPrice();
      }
    } else if (action === "decrease") {
      if (order.hasOwnProperty(product.product_id)) {
        order[product.product_id].quantity =
          order[product.product_id].quantity - 1;
        countTotalPrice();
      }
    } else {
      console.log("action not found");
    }
  }
  function countTotalPrice() {
    let total = 0;
    Object.values(order).forEach((product) => {
      total += product.sell_price * product.quantity;
    });
    setTotalPrice(total);
  }
  function checkout() {
    localStorage.setItem("checkout_products", JSON.stringify(order));
    navigate("/checkout");
  }

  return (
    <div className="position-relative  lh-base">
      <MainNavbar />
      <Container className="p-3">
        <Row className="my-2">
          <Col sm="9">
            <p className="fs-5 fw-bold">Keranjang</p>
            <div className="d-flex justify-content-between">
              <FormGroup check inline>
                <Input type="checkbox" />
                <Label check>Pilih Semua</Label>
              </FormGroup>
              <p className="fw-bold text-orange">Hapus</p>
            </div>
            {viewCartList}
          </Col>
          <Col sm="3" className="position-relative px-4">
            <div className="position-fixed overflow-hidden">
              <Card className="shadow-sm w-100">
                <CardBody className="p-4">
                  <p className="fs-6 fw-bold mb-3">Ringkasan belanja</p>
                  <div className="d-flex justify-content-between">
                    <p className="fs-6 me-2">Total Harga</p>
                    <p className="fs-6 fw-bold">
                      Rp. {totalPrice.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Button
                      className="w-100 mb-2 orange-button fw-bold"
                      onClick={(e) => checkout()}
                    >
                      Beli ({Object.keys(order).length})
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
export default Cart;

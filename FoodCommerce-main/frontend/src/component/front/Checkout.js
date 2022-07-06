import MainNavbar from "../../layout/front/MainNavbar";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import CartCheckout from "./cart/CartCheckout";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import AddAddress from "./profile/AddAddress";
import LoadingPage from "./LoadingPage";
import Footer from "../../layout/front/Footer";
// import { faTrashRestoreAlt } from "@fortawesome/free-solid-svg-icons";
function Checkout() {
  const [loading, setLoading] = useState(true);
  const checkoutProducts = JSON.parse(
    localStorage.getItem("checkout_products")
  );
  const [userAddresses, setUserAddresses] = useState([]);
  const [fmoodPay, setFmoodPay] = useState({ balance: 7890000 });
  const [payment, setPayment] = useState({
    method: "",
    totalCost: 0,
    change: 0,
    status: "unpaid",
  });
  const [userActiveAddress, setUserActiveAddress] = useState({
    receiver: "",
    phone_number: "",
    address: "",
    zip_code: "",
    province: "",
    city: "",
  });
  const [groupBystore, setGroupByStore] = useState({});
  const [total, setTotal] = useState({
    totalProduct: 0,
    totalProductCost: 0,
    totalShipment: 0,
    totalCost: 0,
  });
  const addAddressSwal = withReactContent(Swal);
  let viewCheckoutList = "Kamu belum membuat pesanan";
  useEffect(() => {
    axios
      .get("/api/get-user-address")
      .then((response) => {
        if (response.data.length !== 0) {
          setUserAddresses(response.data);
          setUserActiveAddress(
            response.data.find((address) => {
              return address.active === 1;
            })
          );
          setLoading(false);
        } else {
          addAddressSwal
            .fire({
              title: (
                <div>
                  <span className="fs-5 text-orange">
                    Yaah, kamu belum punya alamat untuk checkout
                  </span>
                  <br />
                  <span className="fs-6">
                    Isi form dibawah untuk menambahkan alamat
                  </span>
                </div>
              ),
              html: <AddAddress />,
              showConfirmButton: false,
            })
            .then((e) => {
              window.location.reload();
            });
        }
      })
      .catch((e) => {
        Swal.fire("Terjadi Kesalahan", "Gagal mengambil alamat", "error");
      });
    axios.get("/api/get-fmood-pay-balance").then((response) => {
      setFmoodPay({ ...fmoodPay, balance: response.data });
    });
    if (checkoutProducts) {
      Object.values(checkoutProducts).forEach((product) => {
        total.totalProduct += product.quantity;
        total.totalProductCost += product.sell_price * product.quantity;
        if (groupBystore[product.store_id]) {
          groupBystore[product.store_id].products.push(product);
          groupBystore[product.store_id].productCost +=
            product.sell_price * product.quantity;
        } else {
          groupBystore[product.store_id] = {
            storeId: product.store_id,
            storeName: product.store_name,
            storeCityName: product.store_city,
            storeCityId: product.store_city_id,
            products: [],
            productCost: product.sell_price * product.quantity,
            shipmentCost: 0,
            shipmentService: "REG",
          };
          groupBystore[product.store_id].products.push(product);
        }
      });
    }
  }, []);
  useEffect(() => {}, [total]);
  if (!loading && Object.values(groupBystore).length !== 0) {
    viewCheckoutList = Object.values(groupBystore).map((data) => {
      const store = {
        storeId: data.storeId,
        storeName: data.storeName,
        storeCityName: data.storeCityName,
        storeCityId: data.storeCityId,
      };
      const products = data.products;
      return (
        <CartCheckout
          store={store}
          products={products}
          address={userActiveAddress}
          key={store.storeId}
          countTotalCost={countTotalCost}
        />
      );
    });
    // } else if (Object.values(groupBystore).length === 0) {
    //   Swal.fire({
    //     title: "Belum ada produk",
    //     text: "yuk belanja dulu",
    //     icon: "info",
    //     backdrop: "#fff",
    //   }).then((e) => {
    //     window.location.href = "/";
    //   });
  } else {
    return <LoadingPage />;
  }

  function countTotalCost(storeId, service, value) {
    groupBystore[storeId].shipmentCost = value;
    groupBystore[storeId].shipmentService = service;
    let shipment = 0;
    Object.values(groupBystore).forEach((data) => {
      shipment += data.shipmentCost;
    });
    setTotal({
      ...total,
      totalShipment: shipment,
      totalCost: total.totalProductCost + shipment,
    });
  }

  //payment
  const viewPayment = (
    <div className="text-start p-3">
      <FormGroup
        tag="fieldset"
        onChange={(e) => {
          inputHandler(e);
        }}
      >
        <FormGroup check>
          <Input
            name="paymentType"
            type="radio"
            data-payment="FmoodPay"
            onClick={(e) => {}}
          />{" "}
          <Label check>
            <Card>
              <CardBody className="d-flex">
                <p className="text-orange fw-bold fs-5 mb-5">FmoodPay</p>
                <small className="align-self-end">
                  Saldo{" "}
                  <span className="text-green fw-bold">
                    Rp.{fmoodPay.balance.toLocaleString("id-ID")}
                  </span>
                </small>
              </CardBody>
            </Card>
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input name="paymentType" data-payment="BankTransfer" type="radio" />{" "}
          <Label check>
            <Card className="w-100">
              <CardBody>
                <p>Transfer Bank</p>
              </CardBody>
            </Card>
          </Label>
        </FormGroup>
      </FormGroup>
    </div>
  );
  function selectPayment() {
    const paymentSwal = withReactContent(Swal);
    paymentSwal
      .fire({
        title: "Pilih pembayaran",
        html: viewPayment,
      })
      .then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          confirmPayment();
        }
      });
  }
  // if fmood pay selected
  function inputHandler(e) {
    if (e.target.dataset.payment === "FmoodPay") {
      payment.method = "FmoodPay";
      console.log("payment method is FmoodPay");
    } else if (e.target.dataset.payment === "BankTransfer") {
      payment.method = "BankTransfer";
    }
  }
  //confirm payment
  function confirmPayment() {
    if (payment.method === "FmoodPay") {
      const confirmSwal = withReactContent(Swal);
      payment.totalCost = total.totalCost;
      payment.change = fmoodPay.balance - total.totalCost;
      payment.status = "paid";
      confirmSwal
        .fire({
          html: (
            <div>
              <h2 className="text-orange fw-bold">FmoodPay</h2>
              <div className="d-flex justify-content-between">
                <p>Saldo</p>
                <p>Rp.{fmoodPay.balance.toLocaleString("id-ID")}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Total Tagihan</p>
                <p className="text-danger">
                  - Rp.{total.totalCost.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="d-flex justify-content-between border-top">
                <p>Sisa Saldo</p>
                <p className="text-success">
                  Rp.
                  {(fmoodPay.balance - total.totalCost).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ),
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Bayar Sekarang",
          cancelButtonText: "Batalkan",
        })
        .then((result) => {
          console.log(result);
          if (result.isConfirmed) {
            processOrder();
          }
        });
    } else {
      Swal.fire("Pembayaran belum di pilih", "", "error");
    }
  }
  function processOrder() {
    Object.values(groupBystore).forEach((data) => {
      let address =
        userActiveAddress.receiver +
        "<br/>" +
        userActiveAddress.phone_number +
        " <br/>" +
        userActiveAddress.address +
        "<br/>" +
        userActiveAddress.city +
        "," +
        userActiveAddress.zip_code +
        "<br/>" +
        userActiveAddress.province;
      let orderData = {
        totalCost: data.productCost + data.shipmentCost,
        shipmentCost: data.shipmentCost,
        shipmentService: data.shipmentService,
        productCost: data.productCost,
        status: payment.status,
        storeId: data.storeId,
        userAddress: address,
        products: data.products.map((product) => {
          return { productId: product.product_id, quantity: product.quantity };
        }),
      };
      axios
        .post("/api/create-order", orderData)
        .then((response) => {
          if (response.data.status === 200) {
            Swal.fire(
              "Pembayaran Berhasil",
              "Mengalihkan mu ke halaman pemesanan",
              "success"
            ).then((e) => {
              window.location.href = "/profile/transaction";
            });
          } else {
            Swal.fire(
              "Terjadi kesalahan",
              "Pesanan mu gagal , coba lagi nanti ",
              "warning"
            );
          }
        })
        .catch((e) => {
          Swal.fire("Terjadi kesalahan", "Cek koneksi internet mu ", "error");
        });
    });
  }

  return (
    <div className="position-relative  lh-base">
      <MainNavbar />
      <Container className="p-3">
        <Row className="my-2">
          <Col sm="9">
            <p className="fs-5 fw-bold">Checkout</p>
            <p className="fs-6 fw-bold">Alamat Pengiriman</p>
            <div className="border-top border-bottom p-2">
              <p className="fw-bold mb-1">{userActiveAddress.receiver}</p>
              <span>{userActiveAddress.phone_number}</span>
              <p>
                {userActiveAddress.address}
                <br />
                Kota/Kabupaten {userActiveAddress.city},{" "}
                {userActiveAddress.zip_code}
                <br />
                Provinsi {userActiveAddress.province}
              </p>
            </div>
            <Button className="my-3" outline>
              Pilih Alamat Lain
            </Button>
            <div>{viewCheckoutList}</div>
          </Col>
          <Col sm="3" className="position-relative px-4">
            <div className="position-fixed overflow-hidden">
              <Card className="shadow-sm w-100">
                <CardBody className="p-4">
                  <p className="fs-6 fw-bold mb-3">Ringkasan belanja</p>
                  <div className="d-flex justify-content-between">
                    <p className="fs-6 me-3">
                      Total Harga ({total.totalProduct} Produk)
                    </p>
                    <p className="fs-6">
                      Rp.{total.totalProductCost.toLocaleString("id-ID")}{" "}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fs-6 me-3">Total Ongkos Kirim</p>
                    <p className="fs-6">
                      Rp.{total.totalShipment.toLocaleString("id-ID")}{" "}
                    </p>
                  </div>
                  <div className="mt-3 border-top d-flex justify-content-between">
                    <p className="fs-6 fw-bold">Total Tagihan</p>
                    <p className="fs-5 text-green fw-bold">
                      Rp.{total.totalCost.toLocaleString("id-ID")}{" "}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Button
                      className="w-100 mb-2 orange-button fw-bold"
                      onClick={(e) => selectPayment()}
                    >
                      Pilih Pembayaran
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
export default Checkout;

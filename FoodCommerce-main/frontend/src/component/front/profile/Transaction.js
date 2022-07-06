import MainNavbar from "../../../layout/front/MainNavbar";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupText,
  FormGroup,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CartTransaction from "../cart/CartTransaction";
function Transaction() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("/api/get-orders")
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          Swal.fire("Terjadi Kesalahan", "Coba beberapa saat lagi", "error");
        }
        setLoading(false);
      })
      .catch((e) => {
        Swal.fire("Terjadi Keasalahna", "Cek koneksi internet mu", "error");
      });
  }, []);
  let viewCart = <div>Belum ada transaksi</div>;
  if (!loading) {
    console.log(orders);
    viewCart = Object.values(orders)
      .reverse()
      .map((order) => {
        return (
          <CartTransaction
            products={order.products}
            store={order.store}
            detail={order.detail}
          />
        );
      });
  }
  return (
    <div className="position-relative  lh-base">
      <p className="fs-5 fw-bold">Daftar Transaksi</p>
      <Card>
        <CardBody className="p-3">
          <div className="d-flex justify-content-around">
            <InputGroup className="input-search">
              <Input
                bsSize="sm"
                placeholder="Cari transaksi mu di sini"
                // onChange={(e) => handleInput(e)}
              />
              <InputGroupText>
                <Link
                  to={{
                    pathname: "/find",
                    // search: searchKeyword,
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} />{" "}
                </Link>
              </InputGroupText>
            </InputGroup>
            <InputGroup className="input-search">
              <Input
                bsSize="sm"
                type="date"
                name="transaction-date"
                placeholder="Pilih tanggal transaksi"
                // onChange={(e) => handleInput(e)}
              />
              <InputGroupText>
                <FontAwesomeIcon icon={faCalendar} />{" "}
              </InputGroupText>
            </InputGroup>
          </div>
          <div className="d-flex me-auto mt-3">
            <p className="me-3 align-self-center">Status</p>
            <FormGroup>
              <Button
                color="secondary"
                outline
                size="sm"
                className="mx-1 my-1"
                active
              >
                Semua
              </Button>
              <Button color="secondary" outline size="sm" className="mx-1 my-1">
                Sedang di proses
              </Button>
              <Button color="secondary" outline size="sm" className="mx-1 my-1">
                Dalam Perjalanan
              </Button>
              <Button color="secondary" outline size="sm" className="mx-1 my-1">
                Berhasil
              </Button>
              <Button color="secondary" outline size="sm" className="mx-1 my-1">
                Dibatalkan
              </Button>
            </FormGroup>
          </div>
          <div>{viewCart}</div>
        </CardBody>
      </Card>
    </div>
  );
}
export default Transaction;

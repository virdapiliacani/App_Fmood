import axios from "axios";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import serverUrls from "../../serverUrls";
import Swal from "sweetalert2";
import LoadingPage from "../front/LoadingPage";
function NewOrders() {
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    pages: [],
    totalItem: 0,
  });
  useEffect(() => {
    getOrders(1);
  }, [load]);

  function getOrders(page) {
    axios
      .get("/api/get-store-orders/" + "paid" + "?page=" + page)
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data.data);
          let arrPages = [];
          for (let i = 1; i <= response.data.last_page; i++) {
            arrPages.push(i);
          }
          setPagination({
            currentPage: response.data.current_page,
            lastPage: response.data.last_page,
            pages: arrPages,
            totalItem: response.data.total,
          });
        } else {
          Swal.fire("Terjadi Kesalahan", "coba beberapa saat lagi", "error");
        }
        setLoading(false);
      })
      .catch((e) => {
        Swal.fire("Terjadi Kesalahan", "cek koneksi internet mu", "error");
      });
  }
  function processOrder(orderId) {
    axios
      .get("/api/process-order/" + orderId)
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire(
            "Berhasil",
            "status pesanan di ubah ke 'onprocess'",
            "success"
          );
          setLoad(!load);
        } else {
          Swal.fire("Terjadi Kesalahan", "coba beberapa saat lagi", "error");
        }
      })
      .catch((e) => {
        Swal.fire("Terjadi Kesalahan", "cek koneksi internet mu", "error");
      });
  }
  let viewOrders = "";
  let viewPagination = "";
  if (loading) {
    return <LoadingPage />;
  } else if (pagination.totalItem === 0) {
    return <h2 className="text-center">Belum ada pesanan baru</h2>;
  } else {
    viewOrders = Object.values(orders).map((order) => {
      return (
        <tr>
          <td>{order.detail.order_id}</td>
          <td>
            {order.products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="mt-1 border-bottom border-1 pb-3"
                >
                  <div className="product d-flex mt-3">
                    <img
                      src={serverUrls.storage + "/" + product.img_main}
                      className="rounded float-start me-2"
                      height="64px"
                      alt="product"
                    />
                    <div>
                      <p className="my-1">{product.name}</p>
                      <p className="fw-bold">Kuantitas : {product.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </td>
          <td>{order.detail.created_at}</td>
          <td>{order.detail.shipment_service}</td>
          <td
            dangerouslySetInnerHTML={{ __html: order.detail.user_address }}
          ></td>
          <td>
            {order.user.name} <br /> ({order.user.email})
          </td>
          <td>
            <div className="d-flex">
              <Button
                color="primary"
                className="mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  processOrder(order.detail.order_id);
                }}
              >
                Proses
              </Button>
              <Button color="danger" className="mx-2">
                Tolak
              </Button>
            </div>
          </td>
        </tr>
      );
    });
    //  show pagination
    viewPagination = function () {
      return (
        <Pagination>
          <PaginationItem>
            <PaginationLink first onClick={() => goToFirstPage()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous onClick={() => prevPage()} />
          </PaginationItem>
          {pagination.pages.map((item) => {
            return (
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    goToPage(item);
                  }}
                  style={
                    pagination.currentPage === item
                      ? { color: "#ff3d00" }
                      : { color: "#0d6efd" }
                  }
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationLink next onClick={() => nextPage()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={() => goToLastPage()} />
          </PaginationItem>
        </Pagination>
      );
    };
  }

  //pagination functions
  function goToPage(number) {
    getOrders(number);
  }
  function nextPage() {
    let number =
      pagination.currentPage !== pagination.lastPage
        ? pagination.currentPage + 1
        : pagination.currentPage;
    if (pagination.lastPage !== 0) getOrders(number);
  }
  function prevPage() {
    let number = pagination.currentPage !== 1 ? pagination.currentPage - 1 : 1;
    if (pagination.lastPage !== 0) getOrders(number);
  }
  function goToLastPage() {
    let number = pagination.lastPage;
    if (pagination.lastPage !== 0) getOrders(number);
  }
  function goToFirstPage() {
    let number = 1;
    if (pagination.lastPage !== 0) getOrders(number);
  }
  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Pesanan Baru</h1>
      <Row>
        <Col className="sm-12">
          <Table
            bordered
            responsive
            style={{ fontSize: "0.8rem" }}
            className="overflow-visible"
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Info Produk</th>
                <th>Tanggal Pemesanan</th>
                <th>Jasa Pengiriman</th>
                <th>Alamat Pengiriman</th>
                <th>Pelanggan</th>
                <th>Tindakan </th>
              </tr>
            </thead>
            <tbody className="text-black">{viewOrders}</tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="d-flex justify-content-center">
          {pagination.totalItem > 10 ? viewPagination() : ""}
        </Col>
      </Row>
    </div>
  );
}
export default NewOrders;

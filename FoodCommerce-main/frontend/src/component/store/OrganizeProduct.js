import axios from "axios";
import serverUrls from "../../serverUrls";
import LoadingPage from "../front/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import {
  faPenAlt,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function OrganizeProduct() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    pages: [],
    totalItem: 0,
  });
  const userId = localStorage.getItem("auth_id");
  useEffect(() => {
    getProducts(1);
  }, []);
  function getProducts(page) {
    setLoading(true);
    axios.get("/api/get-products/all" + "?page=" + page).then((res) => {
      if (res.data.status === 200) {
        setProducts(res.data.products.data);
        let arrPages = [];
        for (let i = 1; i <= res.data.products.last_page; i++) {
          arrPages.push(i);
        }
        setPagination({
          currentPage: res.data.products.current_page,
          lastPage: res.data.products.last_page,
          pages: arrPages,
          totalItem: res.data.products.total,
        });
        setLoading(false);
      }
    });
  }
  let viewProduct = "";
  let viewPagination = "";
  if (loading) {
    return <LoadingPage />;
  } else if (pagination.totalItem === 0) {
    return <h2 className="text-center">Belum ada produk</h2>;
  } else {
    //show products
    viewProduct = products.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <img
              src={serverUrls.storage + "/" + item.img_main}
              height="96px"
              className="rounded float-start mx-2"
              alt="product"
            />
            {item.name}
          </td>
          <td>Statistik data...</td>
          <td>
            <Input
              name="price"
              type="number"
              value={item.price}
              onChange={(e) => {
                handleInput(e);
              }}
              bsSize="sm"
            />
          </td>
          <td className="text-center">
            <Input name="active" type="checkbox" />
          </td>
          <td>
            <Input
              name="discountPrice"
              bsSize="sm"
              type="number"
              value={item.discount_price}
              onChange={(e) => {
                handleInput(e);
              }}
            />
          </td>
          <td>
            <Input
              name="stock"
              type="number"
              bsSize="sm"
              value={item.stock}
              onChange={(e) => {
                handleInput(e);
              }}
            />
          </td>
          <td className="text-center">
            <Input
              name="active"
              type="checkbox"
              onChange={(e) => {
                handleInput(e);
              }}
            />
          </td>
          <td>
            <div className="mb-2">
              <Link to={{ pathname: "/store/update-product/" + item.id }}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="text-primary pe-none"
                />{" "}
                Ubah Data
              </Link>
            </div>
            <div className="mb-2" onClick={removeProduct(item.id)}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="text-danger pe-none"
              />{" "}
              Hapus
            </div>
          </td>
        </tr>
      );
    });
    ///  show pagination
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

  //handle form
  function handleInput(e) {
    console.log(e.target.name);
  }
  //pagination function
  function goToPage(number) {
    getProducts(number);
  }
  function nextPage() {
    let number =
      pagination.currentPage !== pagination.lastPage
        ? pagination.currentPage + 1
        : pagination.currentPage;
    if (pagination.lastPage !== 0) getProducts(number);
  }
  function prevPage() {
    let number = pagination.currentPage !== 1 ? pagination.currentPage - 1 : 1;
    if (pagination.lastPage !== 0) getProducts(number);
  }
  function goToLastPage() {
    let number = pagination.lastPage;
    if (pagination.lastPage !== 0) getProducts(number);
  }
  function goToFirstPage() {
    let number = 1;
    if (pagination.lastPage !== 0) getProducts(number);
  }

  //action functions
  function removeProduct(product_id) {}
  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Kelola Produk</h1>
      <Row>
        <Col sm="12" className="mx-auto align-self-center"></Col>
        <Table
          bordered
          hover
          responsive
          striped
          style={{ fontSize: "0.8rem" }}
          className="overflow-visible"
        >
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Info Produk</th>
              <th style={{ width: "15%" }}>Statistik</th>
              <th style={{ width: "auto" }}>Harga</th>
              <th style={{ width: "5%" }}>Diskon</th>
              <th style={{ width: "auto" }}>Harga Diskon</th>
              <th style={{ width: "auto" }}>Stok</th>
              <th style={{ width: "5%" }}>Aktif</th>
              <th style={{ width: "10%" }}>Tindakan</th>
            </tr>
          </thead>
          <tbody>{viewProduct}</tbody>
        </Table>
      </Row>
      <Row>
        <Col sm="12" className="d-flex justify-content-center">
          {pagination.totalItem > 10 ? viewPagination() : ""}
        </Col>
      </Row>
    </div>
  );
}
export default OrganizeProduct;

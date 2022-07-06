import MainNavbar from "../../layout/front/MainNavbar";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Filter from "./find/Filter";
import { useEffect, useState } from "react";
import LoadingPage from "../front/LoadingPage";
import axios from "axios";
import ProductCard from "../front/product/ProductCard";
import { useLocation } from "react-router-dom";
import Footer from "../../layout/front/Footer";
function Find() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    pages: [],
    totalItem: 0,
  });
  let productsView = () => {
    "";
  };
  let viewPagination = () => {};
  const url = new URL(window.location.href);
  const searchKeyword = url.search.substring(1);
  useEffect(() => {
    searchProductByName(searchKeyword, 1);
  }, [location]);

  function searchProductByName(key, page) {
    setLoading(true);
    axios
      .get("/api/find-product-by-name?keyword=" + key + "&page=" + page)
      .then((res) => {
        setProducts(res.data.products);
        let paginationObj = res.data.pagination;
        let arrPages = [];
        for (let i = 1; i <= paginationObj.last_page; i++) {
          arrPages.push(i);
        }
        setPagination({
          currentPage: paginationObj.current_page,
          pages: arrPages,
          lastPage: paginationObj.last_page,
          totalItem: paginationObj.total,
        });
        setLoading(false);
      });
  }

  if (loading) {
    productsView = () => {
      return <LoadingPage />;
    };
  } else if (products.length === 0) {
    productsView = () => {
      return (
        <div className="d-flex flex-wrap justify-content-center align-content-center mt-5">
          <h4>Makan tidak di temukan</h4>
        </div>
      );
    };
  } else {
    productsView = () => {
      return (
        <div className="d-flex flex-wrap">
          {products.map((product) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      );
    };
    viewPagination = () => {
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
    searchProductByName(searchKeyword, number);
  }
  function nextPage() {
    let number =
      pagination.currentPage !== pagination.lastPage
        ? pagination.currentPage + 1
        : pagination.currentPage;
    if (pagination.lastPage !== 0) searchProductByName(searchKeyword, number);
  }
  function prevPage() {
    let number = pagination.currentPage !== 1 ? pagination.currentPage - 1 : 1;
    if (pagination.lastPage !== 0) searchProductByName(searchKeyword, number);
  }
  function goToLastPage() {
    let number = pagination.lastPage;
    if (pagination.lastPage !== 0) searchProductByName(searchKeyword, number);
  }
  function goToFirstPage() {
    let number = 1;
    if (pagination.lastPage !== 0) searchProductByName(searchKeyword, number);
  }
  return (
    <div className="position-relative  lh-base">
      <MainNavbar />
      <Container className="p-3">
        <Row className="my-3">
          <Col sm="3">
            <h6>Filter</h6>
            <Filter />
          </Col>
          <Col sm="9">
            {productsView()}
            <div className="d-flex justify-content-center my-3">
              {viewPagination()}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
export default Find;

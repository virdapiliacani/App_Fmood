import axios from "axios";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import serverUrls from "../../../serverUrls";
import LoadingPage from "../LoadingPage";
function ProductReview(props) {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    pages: [],
    totalItem: 0,
  });
  let viewReview = "Mengambil Penilaian....";
  let viewPagination = "";
  useEffect(() => {
    getReviews(1);
  }, []);
  function getReviews(index) {
    axios
      .get("api/get-reviews/" + props.productId + "?page=" + index)
      .then((response) => {
        if (response.data.status === 200) {
          setReviews(response.data.data);
          let paginationObj = response.data.pagination;
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
        } else if (response.data.status === 204) {
          viewReview = "Belum ada Penilaian";
        } else {
          viewReview = "Gagal mengambil penilaian :(";
        }
      })
      .catch((e) => {
        viewReview = "Gagal mengambil penilaian :( . Cek koneksi internet mu";
      })
      .finally(() => {
        setLoading(false);
      });
  }
  //pagination functions
  function goToPage(number) {
    getReviews(number);
  }
  function nextPage() {
    let number =
      pagination.currentPage !== pagination.lastPage
        ? pagination.currentPage + 1
        : pagination.currentPage;
    if (pagination.lastPage !== 0) getReviews(number);
  }
  function prevPage() {
    let number = pagination.currentPage !== 1 ? pagination.currentPage - 1 : 1;
    if (pagination.lastPage !== 0) getReviews(number);
  }
  function goToLastPage() {
    let number = pagination.lastPage;
    if (pagination.lastPage !== 0) getReviews(number);
  }
  function goToFirstPage() {
    let number = 1;
    if (pagination.lastPage !== 0) getReviews(number);
  }
  //end of pagination functions
  if (loading) {
    return <LoadingPage />;
  } else if (reviews.length !== 0) {
    viewReview = reviews.map((review) => {
      return (
        <div className="d-flex flex-column border-bottom p-3">
          <Row>
            <Col sm="3">
              <img
                src={serverUrls.storage + "/" + review.profile_picture}
                width="62px"
                className="rounded-circle border border-2 float-start me-2"
                alt="user"
              />
              <p className="fs-6 fw-bold mb-0">{review.name}</p>
              <small className="text-secondary">
                {review.updated_at.substring(0, 10)}
              </small>
            </Col>
            <Col sm="9">
              <div>
                <img
                  src={"/images/stars/" + review.rating + "star.png"}
                  width="auto"
                  height="16px"
                />
                <p className="text-secondary">{review.review}</p>
              </div>
            </Col>
          </Row>
        </div>
      );
    });
    viewPagination = (
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
  } else if (loading) {
    return <LoadingPage />;
  } else {
    viewReview = "Belum ada Penilaian";
  }
  return (
    <div>
      <p className="fs-6 fw-bold">Penilaian ({reviews.length})</p>
      {viewReview}
      {reviews.length >= 15 ? viewPagination : ""}
    </div>
  );
}
export default ProductReview;

import { Button, FormGroup, Input, Label } from "reactstrap";
import serverUrls from "../../../serverUrls";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
function ReviewProduct(props) {
  const [reviews, setReviews] = useState([]);
  const starHandler = function (e, index) {
    let parent = e.target.parentElement;
    let countStar = parseInt(e.target.dataset.star);
    reviews[index].rating = countStar;
    for (let i = 1; i <= 5; i++) {
      if (i <= countStar) {
        let star = document.createElement("img");
        star.src = "/images/star.png";
        star.classList.add("pe-none");
        star.classList.add("star");
        star.alt = "star";
        let box = parent.querySelector("#star" + i);
        while (box.firstChild) {
          box.removeChild(box.firstChild);
        }
        box.appendChild(star);
      } else {
        let starPlaceHolder = document.createElement("img");
        starPlaceHolder.src = "/images/starplaceholder.png";
        starPlaceHolder.classList.add("star-placeholder");
        starPlaceHolder.classList.add("pe-none");
        let box = parent.querySelector("#star" + i);
        while (box.firstChild) {
          box.removeChild(box.firstChild);
        }
        box.appendChild(starPlaceHolder);
      }
    }
  };
  function sendReviewes() {
    reviews.forEach((review) => {
      axios
        .post("/api/add-review", review)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire(
              "Berhasil",
              "Terimaksih sudah memberikan penilaian",
              "success"
            ).then((res) => {
              window.location.href = "/profile/transaction";
            });
          } else {
            Swal.fire("Terjadi Kesalahan", "Coba beberapa saat lagi", "error");
          }
        })
        .catch((e) =>
          Swal.fire("Terjadi Kesalahan", "Cek koneksi kamu", "error")
        );
    });
  }
  const viewProducts = props.products.map((product, index) => {
    reviews[index] = {
      orderId: props.orderId,
      productId: product.id,
      rating: 5,
      review: "",
    };
    return (
      <div key={product.id} className="text-start border-bottom pb-2">
        <div className="mt-3">
          <img
            src={serverUrls.storage + "/" + product.img_main}
            className="rounded float-start me-2"
            height="64px"
            alt="product"
          />
          <div>
            <p className="my-1">{product.name}</p>
            <div className="d-flex position-relative">
              <div
                id="star1"
                className="star-box"
                data-star="1"
                onClick={(e) => {
                  starHandler(e, index);
                }}
              >
                <img
                  src="/images/starplaceholder.png"
                  width="24px"
                  height="24px"
                  className="star-placeholder pe-none"
                />
                <img
                  src="/images/star.png"
                  width="24px"
                  height="24px"
                  className="star pe-none"
                  alt="star1"
                />
              </div>
              <div
                id="star2"
                className="star-box"
                onClick={(e) => {
                  starHandler(e, index);
                }}
                data-star="2"
              >
                <img
                  src="/images/starplaceholder.png"
                  width="24px"
                  height="24px"
                  className="star-placeholder pe-none"
                />
              </div>
              <div
                id="star3"
                className="star-box"
                onClick={(e) => {
                  starHandler(e, index);
                }}
                data-star="3"
              >
                <img
                  src="/images/starplaceholder.png"
                  width="24px"
                  height="24px"
                  className="star-placeholder pe-none"
                />
              </div>
              <div
                id="star4"
                className="star-box"
                onClick={(e) => {
                  starHandler(e, index);
                }}
                data-star="4"
              >
                <img
                  src="/images/starplaceholder.png"
                  width="24px"
                  height="24px"
                  className="star-placeholder pe-none"
                />
              </div>
              <div
                id="star5"
                className="star-box"
                onClick={(e) => {
                  starHandler(e, index);
                }}
                data-star="5"
              >
                <img
                  src="/images/starplaceholder.png"
                  width="24px"
                  height="24px"
                  className="star-placeholder pe-none"
                />
              </div>
            </div>
          </div>
          <FormGroup floating className="mt-3">
            <Input
              id="review"
              name="review"
              placeholder="Tulis penilaian mu di sini"
              type="textarea"
              onChange={(e) => {
                reviews[index].review = e.target.value;
              }}
            />
            {/* <FormFeedback>{loginInput.error_list.email}</FormFeedback> */}
            <Label for="exampleEmail">Penilaian</Label>
          </FormGroup>{" "}
        </div>
      </div>
    );
  });
  return (
    <div>
      {viewProducts}
      <Button onClick={() => sendReviewes()} className="my-3 orange-button">
        Berikan penilaian
      </Button>
    </div>
  );
}
export default ReviewProduct;

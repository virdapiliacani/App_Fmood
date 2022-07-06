import { faTrashAlt, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormGroup, Input, InputGroup, Button } from "reactstrap";
import Swal from "sweetalert2";
import serverUrls from "../../../serverUrls";
function CartList(props) {
  const store = props.store;
  const products = props.products;
  const [load, setLoad] = useState(false);
  useEffect(() => {}, [load]);
  function handelInput(e, product) {
    let newVal = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
    if (newVal == "") newVal = 1;
    if (newVal <= product.stock) {
      product.quantity = newVal;
    }
  }
  function increaseQuantity(index) {
    let product = products[index];
    if (product.quantity < product.stock) {
      props.orderHandler(product, "increase");
      // product.quantity = parseInt(product.quantity) + 1;
      setLoad(!load);
    }
  }
  function decreaseQuantity(index) {
    let product = products[index];
    if (product.quantity > 1) {
      props.orderHandler(product, "decrease");
      // product.quantity = parseInt(product.quantity) - 1;
      setLoad(!load);
    }
  }
  function removeProduct(e, product_id, product_name) {
    Swal.fire("Hapus produk dari keranjang ?", product_name, "info").then(
      (e) => {
        if (e.isConfirmed) {
          axios
            .delete("/api/remove-cart-item/" + product_id)
            .then((response) => {
              props.setLoadPage(!props.loadPage);
            });
        }
      }
    );
  }
  function handleInputCheck(e, product) {
    let action = e.target.checked ? "add" : "remove";
    props.orderHandler(product, action);
  }
  const viewProducts = products.map((product, index) => {
    return (
      <div key={product.product_id}>
        <div className="product d-flex mt-3">
          <FormGroup check inline>
            <Input
              type="checkbox"
              onChange={(e) => handleInputCheck(e, product)}
            />
          </FormGroup>
          <img
            src={serverUrls.storage + "/" + product.img_main}
            className="rounded float-start me-2"
            height="64px"
            alt="product"
          />
          <div>
            <p className="my-1">{product.product_name}</p>
            <span className="fw-bold">
              Rp. {product.sell_price.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
        <div className="actions d-flex justify-content-between mt-3 border-bottom border-1 pb-3">
          <span className="text-orange">Tulis Catatan</span>
          <div className="d-flex align-items-center justify-content-around">
            <div className="text-secondary "> Pindah ke whislist</div>
            <span className="vertical-divider">&nbsp; </span>
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={(e) =>
                removeProduct(e, product.product_id, product.product_name)
              }
            />
            <InputGroup style={{ width: "35%" }}>
              <Button
                size="sm"
                outline
                onClick={() => {
                  decreaseQuantity(index);
                }}
              >
                <FontAwesomeIcon
                  icon={faMinus}
                  color="#ff3d00 "
                  className="pe-none"
                />
              </Button>
              <Input
                type="text"
                name={"quantity-" + product.product_id}
                bsSize="sm"
                placeholder="1"
                className="text-center"
                value={products[index].quantity}
                onChange={(e) => {
                  handelInput(e, product);
                }}
              />
              <Button
                size="sm"
                outline
                onClick={(e) => {
                  increaseQuantity(index);
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  color="#ff3d00 "
                  className="pe-none"
                />
              </Button>
            </InputGroup>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className=" d-flex flex-column border-top border-4">
      <div className="store my-2 p-1">
        <img
          src="/store-default.png"
          className="rounded-circle float-start me-2"
          height="24px"
          alt="store"
        />
        <span className="">
          {store.storeName}
          <br />
          <small>{store.storeCity}</small>
        </span>
      </div>
      {viewProducts}
    </div>
  );
}
export default CartList;

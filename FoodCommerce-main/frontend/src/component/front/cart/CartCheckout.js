// import { faTrashAlt, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import serverUrls from "../../../serverUrls";
function CartCheckout(props) {
  const store = props.store;
  const products = props.products;
  const address = props.address;
  let weightTotal = 0;
  const [load, setLoad] = useState(true);
  const [isShipmentOpen, setIsShipmentOpen] = useState(false);
  const [isShipmentLoaded, setIsShipmentLoaded] = useState(false);
  const [shipmentChoices, setShipmentChoices] = useState(
    <DropdownItem>Loading pengiriman ...</DropdownItem>
  );

  const toggleShipment = () => {
    setIsShipmentOpen((prevState) => !prevState);
  };
  function getShipmentCost() {
    if (!isShipmentLoaded) {
      let shipmentForm = {
        origin: store.storeCityId,
        destination: address.city_id,
        weight: weightTotal,
        courier: "tiki",
      };
      axios.post("/api/get-shipment-cost", shipmentForm).then((response) => {
        setShipmentChoices(
          response.data.map((cost) => {
            return (
              <DropdownItem
                key={cost.service}
                onClick={(e) => {
                  selectShipmentCost(cost.service, cost.cost[0].value);
                }}
              >
                <div className="fs-6 border-bottom py-1 my-1 pe-none">
                  <div className="d-flex justify-content-between">
                    <span>{cost.service}</span>
                    <span>{"Rp. " + cost.cost[0].value}</span>
                  </div>
                  <small className="text-secondary">
                    Estimasi tiba {cost.cost[0].etd} hari
                  </small>
                </div>
              </DropdownItem>
            );
          })
        );
        setIsShipmentLoaded(true);
      });
    }
  }
  useEffect(() => {
    console.log("pageLoad");
  }, [load]);
  const viewProducts = products.map((product, index) => {
    weightTotal +=
      parseInt(product.product_weight) * parseInt(product.quantity);
    return (
      <div
        key={product.product_id}
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
            <p className="my-1">{product.product_name}</p>
            <span className="fw-bold">Rp. {product.sell_price}</span>
            <br />
            <small className="text-secondary">
              kuantitas : {product.quantity} (
              {product.quantity * product.product_weight} gram)
            </small>
          </div>
        </div>
      </div>
    );
  });
  const selectShipmentCost = function (service, value) {
    let toggleInner = document.querySelector("#drop" + store.storeId);
    toggleInner.innerHTML =
      service + " (Rp. " + value.toLocaleString("id-ID") + " )";
    props.countTotalCost(store.storeId, service, value);
  };
  return (
    <div className=" d-flex flex-column border-top border-4">
      <div className="store mt-2 p-1">
        <img
          src="/store-default.png"
          className="rounded-circle float-start me-2"
          height="24px"
          alt="store"
        />
        <span className="">
          {store.storeName}
          <br />
          <small>{store.storeCityName}</small>
        </span>
      </div>
      <div className="d-flex justify-content-between">
        <div>{viewProducts}</div>
        <Dropdown
          size="sm"
          isOpen={isShipmentOpen}
          toggle={toggleShipment}
          onClick={() => getShipmentCost()}
        >
          <DropdownToggle
            id={"drop" + store.storeId}
            className="orange-button"
            style={{ width: "15rem" }}
          >
            Pilih Pengiriman
          </DropdownToggle>
          <DropdownMenu style={{ width: "15rem" }}>
            {shipmentChoices}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
export default CartCheckout;

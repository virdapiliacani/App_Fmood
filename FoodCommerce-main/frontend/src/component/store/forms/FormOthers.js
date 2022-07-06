import { useEffect, useRef, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
function FormOthers(props) {
  const [othersData, setOthersData] = useState({
    expired: "2022-01-01",
    durability: "",
    preorder: 0,
    discount: 0,
    discountPrice: "",
    hide: 0,
    regCode: "",
  });
  const [isChecked, setIsChecked] = useState({
    preorder: false,
    hide: false,
    discount: false,
  });
  const inputDiscountRef = useRef();
  useEffect(() => {
    if (props.product) {
      if (props.product.expired !== null)
        othersData.expired = props.product.expired.slice(0, 10);
      if (props.product.durability !== null)
        othersData.durability = props.product.durability;
      if (props.product.preorder !== null)
        othersData.preorder = props.product.preorder;
      if (props.product.discount !== null)
        othersData.discount = props.product.discount;
      if (props.product.discount_price !== null)
        othersData.discountPrice = props.product.discount_price;
      if (props.product.hide !== null) othersData.hide = props.product.hide;
      if (props.product.reg_code !== null)
        othersData.regCode = props.product.reg_code;

      isChecked.preorder = props.product.preorder === 1;
      isChecked.hide = props.product.hide === 1;
      isChecked.discount = props.product.discount === 1;
      if (props.product.discount === 1)
        document.querySelector("#input-discount").style.display = "block";
    }
  }, []);
  function handleInput(e) {
    setOthersData({ ...othersData, [e.target.name]: e.target.value });
  }
  function handleChecked(e) {
    setIsChecked({ ...isChecked, [e.target.name]: !isChecked[e.target.name] });
  }
  return (
    <>
      <FormGroup className="mb-3">
        <Label>BPOM/PIRT</Label>
        <Input
          type="text"
          name="regCode"
          value={othersData.regCode}
          onChange={(e) => handleInput(e)}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <Label>Kadaluarsa</Label>
        <Flatpickr
          className="form-control"
          value={othersData.expired}
          onChange={([date]) => {
            othersData.expired = date.toJSON().slice(0, 10);
          }}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <InputGroup>
          <Input
            type="number"
            placeholder="Ketahanan Produk"
            name="durability"
            value={othersData.durability}
            onChange={(e) => handleInput(e)}
          />
          <InputGroupText>Hari</InputGroupText>
        </InputGroup>
      </FormGroup>
      <FormGroup check inline>
        <Input
          type="checkbox"
          name="preorder"
          checked={isChecked.preorder}
          onChange={(e) => handleInput(e)}
          onClick={(e) => {
            e.target.value = e.target.checked ? 1 : 0;
            handleChecked(e);
          }}
        />
        <Label check>Preorder</Label>
      </FormGroup>{" "}
      <FormGroup check inline>
        <Input
          type="checkbox"
          name="hide"
          checked={isChecked.hide}
          onChange={(e) => handleInput(e)}
          onClick={(e) => {
            e.target.value = e.target.checked ? 1 : 0;
            handleChecked(e);
          }}
        />
        <Label check>Sembunyikan Produk</Label>
      </FormGroup>{" "}
      <FormGroup check inline>
        <Input
          type="checkbox"
          name="discount"
          checked={isChecked.discount}
          onChange={(e) => handleInput(e)}
          onClick={(e) => {
            e.target.value = e.target.checked ? 1 : 0;
            handleChecked(e);
            if (e.target.checked === true) {
              document.querySelector("#input-discount").style.display = "block";
            } else {
              document.querySelector("#input-discount").style.display = "none";
            }
          }}
        />
        <Label check>Diskon</Label>
      </FormGroup>
      <FormGroup
        className="mb-3 mt-3"
        style={{ display: "none" }}
        id="input-discount"
      >
        <InputGroup>
          <InputGroupText>Rp. </InputGroupText>
          <Input
            type="number"
            placeholder="Harga diskon"
            value={othersData.discountPrice}
            name="discountPrice"
            onChange={(e) => handleInput(e)}
          />
        </InputGroup>
      </FormGroup>
      <div className="d-flex justify-content-between mt-3">
        {" "}
        <Button
          variant="primary"
          className="orange-button outline"
          onClick={() => {
            props.toggle("3");
          }}
        >
          {"<< "}Kembali
        </Button>
        <Button
          variant="primary"
          className="orange-button "
          onMouseOver={() => {
            props.dataCourier(othersData);
          }}
          onClick={() => {
            props.addProduct();
          }}
        >
          Simpan
        </Button>
      </div>
    </>
  );
}
export default FormOthers;

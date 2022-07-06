import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  FormFeedback,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import axios from "axios";
function FormProductData(props) {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    weight: 0,
    stock: 0,
    description: "",
  });
  const [isValid, setIsValid] = useState({
    name: false,
    price: false,
    weight: false,
    stock: false,
    description: false,
  });
  useEffect(() => {
    if (props.product) {
      productData.name = props.product.name;
      productData.price = props.product.price;
      productData.weight = props.product.weight;
      productData.stock = props.product.stock;
      productData.description = props.product.description;
      isValid.name = true;
      isValid.price = true;
      isValid.weight = true;
      isValid.stock = true;
      isValid.description = true;
    }
  }, []);

  function handleInput(e) {
    e.persist();
    setProductData({ ...productData, [e.target.name]: e.target.value });
  }
  function validateInput(e) {
    const element = e.target;
    //rules
    const R_MORE_5 = element.value.length >= 5;
    const R_MORE_1 = element.value.length >= 1 && element.value > 0;
    switch (element.name) {
      case "name":
        validateElement(element, R_MORE_5);
        break;
      case "price":
        validateElement(element, R_MORE_1);
        break;
      case "weight":
        validateElement(element, R_MORE_1);
        break;
      case "stock":
        validateElement(element, R_MORE_1);
        break;
      default:
    }
  }
  function validateElement(element, rule) {
    if (!rule) {
      element.classList.add("is-invalid");
      setIsValid({ ...isValid, [element.name]: false });
    } else {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
      setIsValid({ ...isValid, [element.name]: true });
    }
  }
  function areValid() {
    return (
      isValid.name &&
      isValid.price &&
      isValid.stock &&
      isValid.weight &&
      isValid.description
    );
  }
  return (
    <>
      <FormGroup className="mb-3">
        <Input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={productData.name}
          onChange={handleInput}
          onBlur={(e) => validateInput(e)}
        />
        <FormFeedback>
          Nama produk terlalu singkat (Min:5 karakater)
        </FormFeedback>
      </FormGroup>
      <FormGroup className="mb-3">
        <InputGroup>
          <InputGroupText>Rp. </InputGroupText>
          <Input
            type="number"
            name="price"
            placeholder="Harga"
            value={productData.price}
            onChange={(e) => handleInput(e)}
            onBlur={(e) => validateInput(e)}
          />
          <FormFeedback>Harga kurang dari Rp.1 (min:Rp.1)</FormFeedback>
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <InputGroup>
          <Input
            type="number"
            name="weight"
            placeholder="Berat"
            value={productData.weight}
            onChange={(e) => handleInput(e)}
            onBlur={(e) => validateInput(e)}
          />
          <InputGroupText>gram</InputGroupText>
          <FormFeedback>Berat kurang dari 1 gram (min: 1 gram)</FormFeedback>
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <Input
          type="number"
          name="stock"
          value={productData.stock}
          placeholder="Stok Tersedia"
          onChange={(e) => handleInput(e)}
          onBlur={(e) => validateInput(e)}
        ></Input>
        <FormFeedback>Stock kurang dari 1 (min: 1 )</FormFeedback>
      </FormGroup>
      <FormGroup className="mb-3">
        <CKEditor
          editor={ClassicEditor}
          name="description"
          value={productData.description}
          data="Tulis deskripsi"
          config={{
            removePlugins: [
              "CKFinder",
              "EasyImage",
              "Image",
              "ImageCaption",
              "ImageStyle",
              "ImageToolbar",
              "ImageUpload",
              "MediaEmbed",
              "Link",
              "CKFinderUploadAdapter",
            ],
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            editor.setData(productData.description);
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "min-height",
                "200px",
                editor.editing.view.document.getRoot()
              );
              writer.setStyle(
                "max-height",
                "720px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setProductData({ ...productData, description: data });
          }}
          onBlur={(event, editor) => {
            if (editor.getData().length > 50) {
              isValid.description = true;
              document.querySelector(".text-danger").style.display = "none";
            } else {
              isValid.description = false;
              document.querySelector(".text-danger").style.display = "block";
            }
          }}
          onFocus={(event, editor) => {}}
        />
        <small className="text-danger" style={{ display: "none" }}>
          Deskripsi kurang dari 50 karakater
        </small>
      </FormGroup>
      <div className="d-flex flex-row-reverse">
        <Button
          id="btnNextForm"
          variant="primary"
          className="orange-button outline"
          onClick={(e) => {
            if (areValid()) {
              props.toggle("2");
              props.dataCourier(productData);
            }
          }}
        >
          Selanjutnya {" >>"}
        </Button>
      </div>
    </>
  );
}
export default FormProductData;

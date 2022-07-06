import React from "react";
import { Button, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function FormCategories(props) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState({
    mainCategory: "",
    subCategory: [],
  });
  useEffect(() => {
    axios.get("/api/category").then((response) => {
      if (response.status === 200) {
        setCategories(Object.values(response.data));
      }
      setLoading(false);
    });
  }, []);
  let viewCategory_button = "";
  let viewSubCat_button = "";
  //loading till get categories form database
  if (loading) {
    viewCategory_button = "Loading...";
  } else {
    viewCategory_button = categories.map((category) => {
      return (
        <Button
          outline
          color="secondary"
          className="mx-1 my-1"
          onClick={(e) => {
            setSubCategories(category.children);
            if (e.target.innerText !== categoriesData.mainCategory)
              setCategoriesData({
                mainCategory: e.target.innerText,
                subCategory: [],
              });
          }}
        >
          {category.name}
        </Button>
      );
    });
  }
  //load subcategories when subCategories been set
  if (subCategories !== []) {
    viewSubCat_button = subCategories.map((subcat) => {
      return (
        <Button
          color="secondary"
          outline
          size="sm"
          className="mx-1 my-1"
          key={subcat.name}
          onClick={(e) => {
            handleInput(e);
          }}
        >
          {subcat.name}
        </Button>
      );
    });
  }

  function handleInput(e) {
    e.preventDefault();
    e.target.classList.toggle("selected-subcat");
    if (e.target.classList.contains("selected-subcat")) {
      categoriesData.subCategory.push(e.target.innerText);
    } else {
      let selectedCat = categoriesData.subCategory.filter((element) => {
        return element !== e.target.innerText;
      });
      setCategoriesData({ ...categoriesData, subCategory: selectedCat });
    }
  }
  return (
    <>
      <FormGroup id="catMain" className="bordered">
        <Label className="mb-2">Pilih Kategori</Label>
        <br />
        {viewCategory_button}
        <br />
        <small id="cat-invalid" className="text-danger d-none">
          Kategori belum di pilih
        </small>
      </FormGroup>
      <FormGroup id="catSub" className="bordered">
        <Label className="mb-2">Pilih Sub Kategori</Label>
        <br />
        {viewSubCat_button}
      </FormGroup>
      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          className="orange-button outline"
          onClick={() => {
            props.toggle("2");
          }}
        >
          {"<< "}Kembali
        </Button>
        <Button
          variant="primary"
          className="orange-button outline"
          onClick={() => {
            if (categoriesData.mainCategory !== "") {
              props.toggle("4");
              props.dataCourier(categoriesData);
              document.querySelector("#cat-invalid").classList.add("d-none");
            } else {
              document.querySelector("#cat-invalid").classList.remove("d-none");
            }
          }}
        >
          Selanjutnya {" >>"}
        </Button>
      </div>
    </>
  );
}
export default FormCategories;

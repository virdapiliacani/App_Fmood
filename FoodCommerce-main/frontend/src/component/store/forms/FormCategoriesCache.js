import React, { useEffect } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { useState } from "react";
import Categories from "../../../cache/Categories";
function FormCategoriesCache(props) {
  const [subCategories, setSubCategories] = useState([]);
  const [loadState, setLoadState] = useState(true);
  const [categoriesData, setCategoriesData] = useState({
    mainCategory: "",
    subCategory: "",
  });
  useEffect(() => {
    if (props.product) {
      categoriesData.mainCategory = props.product.main_category;
      categoriesData.subCategory = props.product.sub_category;
    }
    console.log(props.product);
  }, []);

  let viewCategory_button = "";
  let viewSubCat_button = "";
  viewCategory_button = Categories.map((category) => {
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
              subCategory: "",
            });
        }}
      >
        {category.name}
      </Button>
    );
  });
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
    setCategoriesData({ ...categoriesData, subCategory: e.target.innerText });
    // if (e.target.classList.contains("selected-subcat")) {
    //   categoriesData.subCategory.push(e.target.innerText);
    //   setLoadState(!loadState);
    // } else {
    //   let selectedCat = categoriesData.subCategory.filter((element) => {
    //     return element !== e.target.innerText;
    //   });
    //   setCategoriesData({ ...categoriesData, subCategory: selectedCat });
    // }
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
      <FormGroup id="catSub" className="bordered text-primary">
        <span className="fs-6">
          Kategori :{" "}
          {categoriesData.mainCategory +
            (categoriesData.subCategory ? " >> " : "") +
            categoriesData.subCategory}{" "}
        </span>
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
export default FormCategoriesCache;

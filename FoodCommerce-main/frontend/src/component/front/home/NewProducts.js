import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../LoadingPage";
import ProductCard from "../product/ProductCard";
function NewProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/get-new-products")
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
          setLoading(false);
          console.log(response.data);
        }
      })
      .catch((e) => {});
  }, []);
  let viewProducts = "";
  if (!loading) {
    viewProducts = products.map((data) => {
      return <ProductCard data={data} key={data.id} />;
    });
  } else {
    return <LoadingPage />;
  }
  return (
    <div className="mt-3">
      <h3>New Comers</h3>
      <div className="d-flex justify-content-around flex-wrap border-top mt-3 py-2">
        {viewProducts}
      </div>
    </div>
  );
}
export default NewProducts;

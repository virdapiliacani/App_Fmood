import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import MainStore from "./layout/store/Main";
import Dashboard from "./component/store/Dashboard";
import StoreProfile from "./component/store/StoreProfile";
import Home from "./component/front/Home";
import Login from "./component/front/auth/Login";
import Register from "./component/front/auth/Register";
import axios from "axios";
import serverUrls from "./serverUrls";
import StoreRoute from "./routes/StoreRoute";
import AddProduct from "./component/store/AddProduct";
import OrganizeProduct from "./component/store/OrganizeProduct";
import Store from "./component/store/Store";
import TestPage from "./component/front/TestPage";
import Find from "./component/front/Find";
import ProductDetail from "./component/front/ProductDetail";
import UserRoute from "./routes/UserRoute";
import Cart from "./component/front/Cart";
import Checkout from "./component/front/Checkout";
import UserProfile from "./component/front/UserProfile";
import Transaction from "./component/front/profile/Transaction";
import UserAddress from "./component/front/profile/UserAddress";
import NewOrders from "./component/store/NewOrders";
import OnProcessOrders from "./component/store/OnProcessOrders";
import OnDeliveryOrders from "./component/store/OnDeliveryOrders";
import SuccessOrders from "./component/store/SuccessOrders";
import { useEffect } from "react";
import Biodata from "./component/front/profile/Biodata";
import UpdateProduct from "./component/store/UpdateProduct";
axios.defaults.baseURL = serverUrls.backend;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  // const [title, setTitle] = useState("Fmood : Food For Your Mood");
  const title = "Fmood : Food For Your Mood";
  useEffect(
    (e) => {
      document.title = title;
    },
    [title]
  );
  let isLogin = localStorage.getItem("auth_token") ? true : false;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isLogin ? <Home /> : <Login />} />
          <Route path="/register" element={isLogin ? <Home /> : <Register />} />
          <Route path="/find" element={<Find />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<UserRoute Cmp={Cart} />} />
          <Route path="/checkout" element={<UserRoute Cmp={Checkout} />} />
          <Route path="/store" element={<StoreRoute Cmp={Store} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<StoreProfile />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route
              path="update-product/:productId"
              element={<UpdateProduct />}
            />
            <Route path="organize-product" element={<OrganizeProduct />} />
            <Route path="new-orders" element={<NewOrders />} />
            <Route path="onprocess-orders" element={<OnProcessOrders />} />
            <Route path="ondelivery-orders" element={<OnDeliveryOrders />} />
            <Route path="success-orders" element={<SuccessOrders />} />
          </Route>
          <Route path="/profile/" element={<UserRoute Cmp={UserProfile} />}>
            <Route path="transaction" element={<Transaction />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="biodata" element={<Biodata />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

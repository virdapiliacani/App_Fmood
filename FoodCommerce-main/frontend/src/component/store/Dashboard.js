import {
  faBoxOpen,
  faMoneyBillWaveAlt,
  faPeopleCarry,
  faShippingFast,
  faSignInAlt,
  faStar,
  faTimesCircle,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import LoadingPage from "../front/LoadingPage";
function Dashboard() {
  const [orderCounted, setOrderCounted] = useState({
    new: 0,
    onProcess: 0,
    onDelivery: 0,
    success: 0,
    cancelled: 0,
  });

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [storeRating, setStoreRating] = useState(0);
  const [storeIncome, setStoreIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/count-orders").then((response) => {
      setOrderCounted({ ...response.data });
      setLoading(false);
    });
    axios.get("/api/count-total-customers").then((response) => {
      setTotalCustomers(response.data.totalCustomers);
    });
    axios.get("/api/count-store-rating").then((response) => {
      setStoreRating(response.data.storeRating);
    });
    axios.get("/api/count-store-income").then((response) => {
      setStoreIncome(response.data.storeIncome);
    });
  }, []);
  if (loading) {
    return <LoadingPage />;
  } else {
    console.log(storeRating);
  }
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-3 text-gray-800">Dashboard</h1>
      <Row>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Pesanan Baru
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {orderCounted.new}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    className="fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-secondary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                    Sedang di Proses
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {orderCounted.onProcess}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faPeopleCarry}
                    className="fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Dalam Pengiriman
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {orderCounted.onDelivery}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faShippingFast}
                    className="fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Pesanan Selesai
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {orderCounted.success}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                    Pesanan di Batalkan
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {orderCounted.cancelled}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-dark shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                    Pelanggan
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {totalCustomers}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faUserAlt}
                    className="fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Penilaian Rata-Rata
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {storeRating}/5
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Pendapatan bulan ini
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    Rp. {storeIncome.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faMoneyBillWaveAlt}
                    className="fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}
export default Dashboard;

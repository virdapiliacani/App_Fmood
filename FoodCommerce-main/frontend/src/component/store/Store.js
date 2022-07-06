// import Styles from "../../assets/store/css/sb-admin-2.module.css";
import { Helmet } from "react-helmet";
import Sidebar from "../../layout/store/Sidebar";
import TopBar from "../../layout/store/TopBar";
import Footer from "../../layout/store/Footer";
import { Outlet } from "react-router";

function Store() {
  return (
    <div id="wrapper" className="overflow-hidden">
      <Helmet>
        <link rel="stylesheet" href="/sb-admin-2.css" />
      </Helmet>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="">
          <TopBar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" className="min-vh-100">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default Store;

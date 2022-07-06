import { Link } from "react-router-dom";
import {
  faPlusSquare,
  faTachometerAlt,
  faStore,
  faArchive,
  faSignInAlt,
  faPeopleCarry,
  faShippingFast,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Sidebar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar text-light sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon">
          <img src="/logo-fmood-white-64.png" width="64px" alt="Fmood" />
        </div>
        <div className="sidebar-brand-text mr-5 ml-1">
          Fmood <sup>Store</sup>
        </div>
      </a>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <a className="nav-link" href="/store/dashboard">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span className="ml-2">Dashboard</span>
        </a>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/store/profile">
          <FontAwesomeIcon icon={faStore} />
          <span className="ml-2">Profile Toko</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading">Produk</div>
      <li className="nav-item ">
        <Link className="nav-link" to="/store/add-product">
          <FontAwesomeIcon icon={faPlusSquare} />
          <span className="ml-2">Tambah Produk</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/store/organize-product">
          <FontAwesomeIcon icon={faArchive} />
          <span className="ml-2">Kelola Produk</span>
        </Link>
      </li>
      <div className="sidebar-heading">Pesanan</div>
      <li className="nav-item ">
        <Link className="nav-link" to="/store/new-orders">
          <FontAwesomeIcon icon={faSignInAlt} />
          <span className="ml-2">Pesanan Baru</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/store/onprocess-orders">
          <FontAwesomeIcon icon={faPeopleCarry} />
          <span className="ml-2">Sedang diproses</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/store/ondelivery-orders">
          <FontAwesomeIcon icon={faShippingFast} />
          <span className="ml-2">Dalam Pengiriman</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/store/success-orders">
          <FontAwesomeIcon icon={faBoxOpen} />
          <span className="ml-2">Pesanan Selesai</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}

      {/* <!-- Nav Item - Utilities Collapse Menu --> */}

      {/* <!-- Divider --> */}

      {/* <!-- Heading --> */}

      {/* <!-- Nav Item - Pages Collapse Menu --> */}

      {/* <!-- Nav Item - Charts --> */}
      {/* <!-- Nav Item - Tables --> */}

      {/* <!-- Divider --> */}

      {/* <!-- Sidebar Toggler (Sidebar) --> */}

      {/* <!-- Sidebar Message --> */}
    </ul>
  );
};
export default Sidebar;

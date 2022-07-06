import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function TopBar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* <!-- Sidebar Toggle (Topbar) --> */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* <!-- Topbar Search --> */}

      {/* <!-- Topbar Navbar --> */}
      <ul className="navbar-nav ml-auto">
        {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}

        {/* <!-- Nav Item - Alerts --> */}

        {/* <!-- Nav Item - Messages --> */}

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* <!-- Nav Item - User Information --> */}
      </ul>
    </nav>
  );
}
export default TopBar;

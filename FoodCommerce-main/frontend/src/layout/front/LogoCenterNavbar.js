import { Navbar, NavbarBrand } from "reactstrap";
import "../../assets/front/css/logo-center-navbar.css";
function LogoCenterNavbar() {
  return (
    <Navbar color="light" expand="md" light className="justify-content-center">
      <NavbarBrand href="/">
        <img src="/logo-reg-fmood.png" alt="Fmood" className="logo" />
        <span className="brand-text">Fmood</span>
      </NavbarBrand>
    </Navbar>
  );
}
export default LogoCenterNavbar;

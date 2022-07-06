import {
  faAirFreshener,
  faBiohazard,
  faEnvelope,
  faFill,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className="bg-light p-3 mt-5">
      <div className="container text-start text-md-left mt-5">
        <div className="row">
          <div className="col-md-4 mx-auto mb-4">
            <h6 className="font-weight-bold">Food Commerce</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "350px",
                height: "2px",
                backgroundColor: "rgb(255, 61, 0)",
              }}
            />
            <p className="mt-2">
              Food commerce merupakan wadah bagi para UKM makanan dan oleh-oleh
              di seluruh Indonesia untuk menjual produk-produk mereka secara
              online.
            </p>
          </div>

          <div className="col-md-4 mx-auto mb-4">
            <h6 className="font-weight-bold">Hubungi Kami</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "330px",
                height: "2px",
                backgroundColor: "rgb(255, 61, 0)",
              }}
            />

            <ul className="list-unstyled">
              <li className="mt-2">
                <FontAwesomeIcon icon={faMapMarker} /> Food Commerce Jl.Tomang
                Raya No.11 Jakarta Barat-11440
              </li>
              <li className="mt-2">
                <FontAwesomeIcon icon={faEnvelope} />
                foodcommerce@gmail.co.id/ customercare@foodcommerce.co.id
              </li>
            </ul>
          </div>

          <div className="col-md-2 mx-auto mb-4">
            <h6 className="font-weight-bold">Ikuti Kami</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "200px",
                height: "2px",
                backgroundColor: "rgb(255, 61, 0)",
              }}
            />

            <ul className="list-unstyled">
              <li className="mt-2">
                <FontAwesomeIcon icon={faFill} /> foodCommerce
              </li>
              <li className="mt-2">
                <FontAwesomeIcon icon={faBiohazard} /> @foodCommerce
              </li>
              <li className="mt-2">
                <FontAwesomeIcon icon={faAirFreshener} /> @foodCommerce
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="footer"
        style={{
          height: "40px",
          backgroundColor: "rgb(255, 61, 0)",
          padding: "auto",
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center fw-bold">
          <p className="text-light mt-2">Syarat | Ketentuan | Bantuan</p>
          <p>2021@Food Commerce</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

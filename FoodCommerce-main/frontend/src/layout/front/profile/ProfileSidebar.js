import { Card, CardHeader, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import serverUrls from "../../../serverUrls";
function ProfileSidebar() {
  return (
    <Card>
      <CardHeader>
        {" "}
        <div className="d-flex align-items-center">
          <img
            src={
              serverUrls.storage +
              "/" +
              localStorage.getItem("auth_profile_picture")
            }
            width="62px"
            height="62px"
            className="rounded-circle border border-2"
            alt="user"
          />
          <span className="fs-6 fw-bold mx-2">
            {localStorage.getItem("auth_username").slice(0, 15)}
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <div className="d-flex flex-column">
          <Link to="/profile/biodata" className="my-3">
            <FontAwesomeIcon icon={faUser} className="mx-2" />
            <span>Biodata</span>
          </Link>
          <Link to="/profile/address" className="my-3">
            <FontAwesomeIcon icon={faHome} className="mx-2" />
            <span>Alamat</span>
          </Link>
          <Link to="/profile/transaction" className="my-3">
            <FontAwesomeIcon icon={faArchive} className="mx-2" />
            <span>Transaksi</span>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
export default ProfileSidebar;

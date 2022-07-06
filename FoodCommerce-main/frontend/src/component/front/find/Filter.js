import { Card, Collapse, CardHeader, CardBody } from "reactstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Filter() {
  const [isAccOpen, setIsAccOpen] = useState({
    accCategory: false,
    accLocation: false,
    accPrice: false,
    accRating: false,
    accOther: false,
  });
  function toggle(e) {
    const acc = e.target.id;
    let preveState = "";
    switch (acc) {
      case "accCategory":
        preveState = isAccOpen.accCategory;
        setIsAccOpen({ ...isAccOpen, [acc]: !preveState });
        break;
      case "accLocation":
        preveState = isAccOpen.accLocation;
        setIsAccOpen({ ...isAccOpen, [acc]: !preveState });
        break;
      case "accPrice":
        preveState = isAccOpen.accPrice;
        setIsAccOpen({ ...isAccOpen, [acc]: !preveState });
        break;
      case "accRating":
        preveState = isAccOpen.accRating;
        setIsAccOpen({ ...isAccOpen, [acc]: !preveState });
        break;
      case "accOther":
        preveState = isAccOpen.accOther;
        setIsAccOpen({ ...isAccOpen, [acc]: !preveState });
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Card>
        <CardHeader id="accCategory" onClick={(e) => toggle(e)}>
          <div className="d-flex justify-content-between pe-none">
            <span className="font-weight-bold">Kategori</span>
            <span>
              <FontAwesomeIcon
                icon={isAccOpen.accCategory ? faChevronUp : faChevronDown}
              />
            </span>
          </div>
        </CardHeader>
        <Collapse isOpen={isAccOpen.accCategory}>
          <CardBody>Example</CardBody>
        </Collapse>
      </Card>
      <Card>
        <CardHeader id="accLocation" onClick={(e) => toggle(e)}>
          <div className="d-flex justify-content-between pe-none">
            <span className="font-weight-bold">Lokasi</span>
            <span>
              <FontAwesomeIcon
                icon={isAccOpen.accLocation ? faChevronUp : faChevronDown}
              />
            </span>
          </div>
        </CardHeader>
        <Collapse isOpen={isAccOpen.accLocation}>
          <CardBody>Lokasi</CardBody>
        </Collapse>
      </Card>
      <Card>
        <CardHeader id="accPrice" onClick={(e) => toggle(e)}>
          <div className="d-flex justify-content-between pe-none">
            <span className="font-weight-bold">Harga</span>
            <span>
              <FontAwesomeIcon
                icon={isAccOpen.accPrice ? faChevronUp : faChevronDown}
              />
            </span>
          </div>
        </CardHeader>
        <Collapse isOpen={isAccOpen.accPrice}>
          <CardBody>Harga</CardBody>
        </Collapse>
      </Card>
      <Card>
        <CardHeader id="accRating" onClick={(e) => toggle(e)}>
          <div className="d-flex justify-content-between pe-none">
            <span className="font-weight-bold">Rating</span>
            <span>
              <FontAwesomeIcon
                icon={isAccOpen.accRating ? faChevronUp : faChevronDown}
              />
            </span>
          </div>
        </CardHeader>
        <Collapse isOpen={isAccOpen.accRating}>
          <CardBody>Rating</CardBody>
        </Collapse>
      </Card>
      <Card>
        <CardHeader id="accOther" onClick={(e) => toggle(e)}>
          <div className="d-flex justify-content-between pe-none">
            <span className="font-weight-bold">Lainnya</span>
            <span>
              <FontAwesomeIcon
                icon={isAccOpen.accOther ? faChevronUp : faChevronDown}
              />
            </span>
          </div>
        </CardHeader>
        <Collapse isOpen={isAccOpen.accOther}>
          <CardBody>Harga</CardBody>
        </Collapse>
      </Card>
    </>
  );
}
export default Filter;

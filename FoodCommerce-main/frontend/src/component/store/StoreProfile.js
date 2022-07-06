import React, { useEffect, useState } from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import axios from "axios";

function StoreProfile() {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-3 text-gray-800">Profile Toko</h1>
      <Card>
        <CardBody>
          <Row>
            <Col md="2">
              <Card>
                <img
                  className="card-img-top"
                  src="/store-default.png"
                  alt="profile image"
                  width="128px"
                />
                <CardBody>
                  <p className="fs-5 text-dark w-100 text-center">
                    Store Name Here
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md="8"></Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
export default StoreProfile;

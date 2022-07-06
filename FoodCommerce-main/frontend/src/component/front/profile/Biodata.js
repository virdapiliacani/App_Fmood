import React, { useEffect, useState } from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import axios from "axios";
import serverUrls from "../../../serverUrls";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import LoadingPage from "../LoadingPage";
function Biodata() {
  const imageInput = React.useRef(null);
  const profilePicture = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadPage, setLoadPage] = useState(true);
  const [biodata, setBiodata] = useState({
    name: "",
    dob: "2002-12-01",
    gender: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });

  useEffect(() => {
    axios
      .get("/api/get-user-profile")
      .then((response) => {
        if (response.status === 200) {
          biodata.phoneNumber = response.data[0].phone_number;
          biodata.profilePicture = response.data[0].profile_picture;
          setBiodata({ ...biodata, ...response.data[0] });
          setLoading(false);
          console.log(biodata);
        }
      })
      .catch((e) => {
        Swal.fire("Gagal", "Gagal terhubung. Coba beberapa saat lagi", "error");
      });
  }, [loadPage]);
  if (loading) return <LoadingPage />;
  function updateProfilePicture() {
    const selectedImage = imageInput.current;
    if (selectedImage.files.length != 0) {
      let file = selectedImage.files[0];
      let imgUrl = URL.createObjectURL(file);
      let img = new Image();
      img.src = imgUrl;
      img.onload = function () {
        if (file.size <= 2621440) {
          if (img.width >= 300 && img.height >= 300) {
            profilePicture.current.src = imgUrl;
            const formData = new FormData();
            formData.append("userPicture", file);
            axios
              .post("/api/update-user-picture?_method=PATCH", formData)
              .then((response) => {
                if (response.data.status === 200) {
                  localStorage.setItem(
                    "auth_profile_picture",
                    response.data.profile_picture
                  );
                  Swal.fire({
                    title: "Berhasil",
                    text: "Foto berhasil di rubah. Muat ulang halaman untuk melihat perubahan",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "Muat ulang halaman",
                    cancelButtonText: "Muat nanti",
                  }).then((e) => {
                    if (e.isConfirmed) {
                      window.location.href = "/profile/biodata";
                    }
                  });
                } else {
                  Swal.fire(
                    "Gagal",
                    "Terjadi kesalahan coba beberapa saat lagi",
                    "error"
                  );
                }
              })
              .catch((e) => {
                Swal.fire(
                  "Gagal",
                  "Gagal terhubung. Cek koneksi internet mu",
                  "error"
                );
              });
          } else {
            Swal.fire(
              "Resolusi foto terlalu kecil",
              "Resolusi minimal 300x300px",
              "error"
            );
          }
        } else {
          Swal.fire(
            "Ukuran file terlalu besar",
            "ukuran maksimal 2.5MB",
            "error"
          );
        }
      };
    }
  }
  function updateBiodata(e) {
    let property = e.target.id;
    let propName = e.target.dataset.name;
    let propType = e.target.dataset.type;
    let inputOptions = {};

    if (property === "gender")
      inputOptions = {
        "laki-laki": "laki-laki",
        perempuan: "perempuan",
      };
    Swal.fire({
      title: "<h5>Ubah " + propName + "</h5>",
      input: propType,
      inputValue: "",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (value.length <= 5) {
          return propName + " harus lebih dari 5 karakter";
        }
        if (property === "phoneNumber") {
          if (isNaN(value)) return propName + " hanya boleh memuat angka";
        }
      },
    }).then((e) => {
      if (e.isConfirmed) {
        biodata[property] = e.value;
        axios
          .post("/api/update-user-" + property + "?_method=PATCH", {
            [property]: biodata[property],
          })
          .then((response) => {
            console.log(biodata.name);
            if (response.status === 200) {
              if (property === "name") {
                localStorage.setItem("auth_username", biodata.name);
                Swal.fire({
                  title: "Berhasil",
                  text: "Nama berhasil di rubah. Muat ulang halaman untuk melihat perubahan",
                  icon: "success",
                  showCancelButton: true,
                  confirmButtonText: "Muat ulang halaman",
                  cancelButtonText: "Muat nanti",
                }).then((e) => {
                  if (e.isConfirmed) {
                    window.location.href = "/profile/biodata";
                  }
                });
              } else {
                Swal.fire(
                  "Berhasil",
                  propName + " berhasil di ubah",
                  "success"
                );
              }
              setLoadPage(!loadPage);
            } else {
              Swal.fire(
                "Gagal",
                "Terjadi kesalahan coba beberapa saat lagi",
                "error"
              );
            }
          });
      }
    });
  }
  //seperate dob update because Swal not officially support date input
  const dateSwal = withReactContent(Swal);
  function updateDOB() {
    dateSwal
      .fire({
        title: "<h6>Ubah Tanggal Lahir</h6>",
        html: (
          <Flatpickr
            className="swal2-input"
            value={biodata.dob}
            onChange={([date]) => {
              biodata.dob = date.toJSON().slice(0, 10);
            }}
          />
        ),
        customClass: "overflow-show",
      })
      .then((e) => {
        if (e.isConfirmed) {
          axios
            .post("/api/update-user-dob?_method=PATCH", {
              dob: biodata.dob,
            })
            .then((response) => {
              if (response.status === 200) {
                Swal.fire(
                  "Berhasil",
                  "Tanggal lahir berhasil di ubah",
                  "success"
                );
                setLoadPage(!loadPage);
              } else {
                Swal.fire(
                  "Gagal",
                  "Terjadi kesalahan coba beberapa saat lagi",
                  "error"
                );
              }
            });
        }
      });
  }

  return (
    <div className="position-relative  lh-base">
      <p className="fs-5 fw-bold">Biodata</p>
      <Card>
        <CardBody>
          <Row>
            <Col sm="4">
              <Card className="mb-3">
                <img
                  className="card-img-top"
                  src={serverUrls.storage + "/" + biodata.profilePicture}
                  alt="profile image"
                  ref={profilePicture}
                />
                <CardBody>
                  <input
                    id="image-input"
                    type="file"
                    accept=".jpg,jpeg,.png"
                    className="d-none"
                    ref={imageInput}
                    onChange={updateProfilePicture}
                  />
                  <Button
                    className="w-100"
                    color="light"
                    onClick={(e) => {
                      imageInput.current.click();
                    }}
                  >
                    Pilih Foto
                  </Button>
                  <small className="text-secondary">
                    Besar file: mak 2.5 Megabytes.
                    <br />
                    Resolusi min : 300x300 px.
                    <br />
                    Ekstensi : .JPG .JPEG .PNG
                  </small>
                </CardBody>
              </Card>
              <Button className="w-100" color="dark">
                <FontAwesomeIcon icon={faLock} /> Ubah Password
              </Button>
            </Col>
            <Col sm="8">
              <p className="fs-6 ps-2 mb-0 fw-bold text-secondary">
                Ubah Biodata
              </p>
              <table className="text-secondary">
                <tr>
                  <td className="p-2">Nama</td>
                  <td className="p-2">{biodata.name}</td>
                  <td className="p-1">
                    <small
                      id="name"
                      onClick={updateBiodata}
                      className="text-orange"
                      data-name="Nama"
                      data-type="text"
                    >
                      Ubah
                    </small>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Tanggal Lahir</td>
                  <td className="p-2">
                    {biodata.dob ? biodata.dob : "Belum di tambahkan"}
                  </td>
                  <td className="p-1">
                    <small
                      id="dob"
                      onClick={updateDOB}
                      className="text-orange"
                      data-name="Tanggal Lahir"
                      data-type="range"
                    >
                      Ubah
                    </small>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Jenis Kelamin</td>
                  <td className="p-2">
                    {biodata.gender ? biodata.gender : "Belum di tambahkan"}
                  </td>
                  <td className="p-1">
                    <small
                      className="text-orange"
                      id="gender"
                      onClick={updateBiodata}
                      className="text-orange"
                      data-name="Jenis Kelamin"
                      data-type="radio"
                    >
                      Ubah
                    </small>
                  </td>
                </tr>
              </table>
              <p className="fs-6 ps-2 mt-3 mb-0 fw-bold text-secondary">
                Ubah Kontak
              </p>
              <table className="text-secondary">
                <tr>
                  <td className="p-2">Email</td>
                  <td className="p-2">{biodata.email}</td>
                  <td className="p-1">
                    <small
                      className="text-orange"
                      id="email"
                      onClick={updateBiodata}
                      className="text-orange"
                      data-name="Email"
                      data-type="email"
                    >
                      Ubah
                    </small>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Nomer Telpon</td>
                  <td className="p-2">
                    {biodata.phoneNumber
                      ? biodata.phoneNumber
                      : "Belum di tambahkan"}
                  </td>
                  <td className="p-1">
                    <small
                      className="text-orange"
                      id="phoneNumber"
                      onClick={updateBiodata}
                      className="text-orange"
                      data-name="Nomer Telpon"
                      data-type="text"
                    >
                      Ubah
                    </small>
                  </td>
                </tr>
              </table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
export default Biodata;

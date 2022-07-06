import { useEffect, useState } from "react";
import { Form, Col, Row, Button, FormGroup, Input, Label } from "reactstrap";
import provinces from "../../../cache/provinces";
import cities from "../../../cache/cities";
import Swal from "sweetalert2";
import axios from "axios";
function AddAddress() {
  const [newAddress, setNewAddress] = useState({
    receiver: "",
    phoneNumber: "",
    lable: "",
    provinceId: 0,
    provinceName: "",
    cityId: 0,
    cityName: "",
    zipCode: 0,
    address: "",
  });
  const [citiesInProvince, setCityInProvince] = useState(<option></option>);
  const viewProvinces = provinces.map((province) => {
    return (
      <option value={province.province_id} key={province.province_id}>
        {province.province}
      </option>
    );
  });

  function setCities(provinceId, provinceName) {
    newAddress.provinceId = provinceId;
    newAddress.provinceName = provinceName;
    newAddress.cityId = 0;
    let viewCities = cities
      .filter((city) => {
        return city.province_id === provinceId;
      })
      .map((city) => {
        if (newAddress.cityId === 0)
          setNewAddress({
            ...newAddress,
            cityId: city.city_id,
            cityName: city.city_name,
          });
        return (
          <option
            value={city.city_id}
            onClick={(e) => {
              setNewAddress({
                ...newAddress,
                cityName: city.city_name,
                cityId: city.city_id,
              });
            }}
            key={city.city_id}
          >
            {city.city_name}
          </option>
        );
      });
    setCityInProvince(viewCities);
  }
  function onProvinceChange(e) {
    let provinceIndex = e.target.selectedIndex;
    let province = provinces.find((prov, index) => {
      return index === provinceIndex;
    });
    setCities(province.province_id, province.province);
  }
  function inputHandler(e) {
    e.persist();
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  }
  function saveAddress(e) {
    e.preventDefault();
    axios
      .post("/api/create-user-address", newAddress)
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire("Berhasil", "Alamat sudah di tambahkan", "success").then(
            (e) => {
              if (e.isConfirmed) {
                window.location.reload();
              } else {
                window.location.reload();
              }
            }
          );
        } else {
          Swal.fire("Terjadi Kesalahan", "Coba lagi nanti", "error");
        }
      })
      .catch((e) => {
        Swal.fire("Terjadi Kesalahan", "Periksa koneksi internet mu", "error");
      });
  }
  return (
    <div className="text-start px-3">
      <Form>
        <FormGroup>
          <Label for="receciver">Nama Penerima</Label>
          <Input
            id="receiver"
            name="receiver"
            type="text"
            value={newAddress.receiver}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Nomor HP</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            value={newAddress.phoneNumber}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lable">Label Alamat</Label>
          <Input
            id="lable"
            name="lable"
            type="text"
            placeholder="rumah/kantor/apartment/kos"
            value={newAddress.lable}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="province">Provinsi</Label>
          <Input
            id="provinceId"
            name="provinceId"
            type="select"
            placeholder="pilih provinsi"
            onChange={(e) => {
              onProvinceChange(e);
            }}
          >
            {viewProvinces}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="city">Kota</Label>
          <Input
            id="cityId"
            name="cityId"
            type="select"
            placeholder="pilih kota"
          >
            {citiesInProvince};
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Kode Pos</Label>
          <Input
            id="zipCode"
            name="zipCode"
            type="number"
            value={newAddress.zipCode}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="address">Alamat Lengkap</Label>
          <Input
            id="address"
            name="address"
            type="textarea"
            placeholder="Masukan Alamat seperti jalan,nama,nomer gedung dan lain-lain"
            value={newAddress.address}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup check>
          <Input
            id="active"
            name="active"
            type="checkbox"
            onChange={inputHandler}
            onClick={(e) => {
              e.target.value = e.target.checked ? 1 : 0;
            }}
          />
          <Label check>Jadikan alamat aktiv</Label>
        </FormGroup>
        <div className="d-flex justify-content-center w-100 mt-2">
          <Button color="primary" onClick={(e) => saveAddress(e)}>
            Simpan
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default AddAddress;

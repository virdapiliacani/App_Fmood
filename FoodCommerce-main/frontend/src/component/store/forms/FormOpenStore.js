import { useState } from "react";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import provinces from "../../../cache/provinces";
import cities from "../../../cache/cities";
import Swal from "sweetalert2";
import axios from "axios";
function FormOpenStore() {
  const [newStore, setNewStore] = useState({
    name: "",
    phoneNumber: "",
    description: "",
    provinceId: 0,
    provinceName: "",
    cityId: 0,
    cityName: "",
    zipCode: 0,
    address: "",
  });
  const [citiesInProvince, setCityInProvince] = useState("");
  const viewProvinces = provinces.map((province) => {
    return (
      <option value={province.province_id} key={province.province_id}>
        {province.province}
      </option>
    );
  });
  function setCities(provinceId, provinceName) {
    newStore.provinceId = provinceId;
    newStore.provinceName = provinceName;
    newStore.cityId = 0;
    let viewCities = cities
      .filter((city) => {
        return city.province_id === provinceId;
      })
      .map((city) => {
        if (newStore.cityId === 0)
          setNewStore({
            ...newStore,
            cityId: city.city_id,
            cityName: city.city_name,
          });
        return (
          <option
            value={city.city_id}
            onClick={(e) => {
              setNewStore({
                ...newStore,
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
  function inputHandler(e) {
    e.persist();
    setNewStore({ ...newStore, [e.target.name]: e.target.value });
  }
  function onProvinceChange(e) {
    let provinceIndex = e.target.selectedIndex;
    let province = provinces.find((prov, index) => {
      return index === provinceIndex;
    });
    setCities(province.province_id, province.province);
  }
  function saveStore(e) {
    e.preventDefault();
    axios
      .post("/api/create-store-profile", newStore)
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            title: "Berhasil",
            text: "Toko kamu berhasil di buka",
            icon: "success",
            confirmButtonText: "Tambahkan produk sekarang ",
          }).then((e) => {
            if (e.isConfirmed) {
              window.location.href = "/store/add-product";
            } else {
              window.location.reload();
            }
          });
        } else {
          Swal.fire("Terjadi Kesalahan", "Coba lagi nanti", "error");
        }
      })
      .catch((e) => {
        Swal.fire("Terjadi Kesalahan", "Periksa koneksi internet mu", "error");
      });
  }
  return (
    <div className="text-start">
      <Form>
        <div className="border-bottom border-top p-1 mt-3 text-center w-100">
          Tentang Toko
        </div>
        <FormGroup>
          <Label for="receciver">Nama Toko</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={newStore.name}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Nomor Telpon/HP</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            value={newStore.phoneNumber}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Keterangan Toko</Label>
          <Input
            id="description"
            name="description"
            type="textarea"
            placeholder="keterangan tentang toko, contoh: jenis makanan yang di jual, sejarah toko dan lain-lain."
            value={newStore.description}
            onChange={inputHandler}
          />
        </FormGroup>
        <div className="border-bottom border-top p-1 mt-3 text-center w-100">
          Alamat Toko
        </div>
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
            value={newStore.zipCode}
            onChange={inputHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="address">Alamat Lengkap</Label>
          <Input
            id="address"
            name="address"
            type="textarea"
            placeholder="Masukan Alamat toko fisik mu jika ada atau isi kan alamat gudang/alamat pribadi mu."
            value={newStore.address}
            onChange={inputHandler}
          />
        </FormGroup>
        <div className="d-flex justify-content-center w-100 mt-2">
          <Button color="primary" onClick={(e) => saveStore(e)}>
            Buka Toko Sekarang
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default FormOpenStore;

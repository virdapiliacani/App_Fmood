import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import LogoCenterNavbar from "../../../layout/front/LogoCenterNavbar";
import "../../../assets/front/css/register.css";
import "../../../assets/general/css/custom-button.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

function Register() {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    error_list: { name: "", email: "", password: "", repassword: "" },
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const userdata = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
      repassword: registerInput.repassword,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, userdata).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_username", res.data.username);
          localStorage.setItem(
            "auth_profile_picture",
            "profile-pictures/0/user-default.png"
          );
          Swal.fire({
            icon: "success",
            title: "Selamat kamu sudah terdaftar",
            text: "Mengalihkan mu ke halaman utama",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };
  return (
    <div className="position-relative  lh-base">
      <LogoCenterNavbar />
      <div className="centerize">
        <Container fluid="md">
          <Row md="2" sm="1" xs="1">
            <Col className="mr-3">
              <div className="register-picture mb-4">
                <img
                  src="/logo-circle-fmood.png"
                  width="256px"
                  alt="Food For Your Mood"
                ></img>
              </div>
            </Col>
            <Col>
              <h4 className="text-center mt-4 mb-3">Daftar Sekarang</h4>
              <h6 className="text-center mb-4">
                Sudah punya akun Fmood?{" "}
                <a href="/login" className="text-orange">
                  Masuk
                </a>
              </h6>
              <Form inline onSubmit={registerSubmit}>
                <FormGroup floating>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Masukan Nama Kamu"
                    type="text"
                    onChange={handleInput}
                    value={registerInput.name}
                    invalid={registerInput.error_list.name}
                    required
                  />
                  <FormFeedback>{registerInput.error_list.name}</FormFeedback>
                  <Label for="fullname">Nama Kamu</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={handleInput}
                    value={registerInput.email}
                    invalid={registerInput.error_list.email}
                    required
                  />
                  <FormFeedback>{registerInput.error_list.email}</FormFeedback>
                  <Label for="exampleEmail">Email</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleInput}
                    value={registerInput.password}
                    invalid={registerInput.error_list.password}
                    required
                  />
                  <FormFeedback>
                    {registerInput.error_list.password}
                  </FormFeedback>
                  <Label for="examplePassword">Password</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                  <Input
                    id="repassword"
                    name="repassword"
                    placeholder="Ulangi Password"
                    type="password"
                    onChange={handleInput}
                    value={registerInput.repassword}
                    invalid={registerInput.error_list.repassword}
                    required
                  />
                  <FormFeedback>
                    {registerInput.error_list.repassword}
                  </FormFeedback>
                  <Label for="rePassword">Ulangi Password</Label>
                </FormGroup>{" "}
                <Button block className="orange-button mt-4">
                  Daftar
                </Button>
              </Form>
              <p style={{ fontSize: "0.6rem" }} className="mt-2 text-center">
                Dengan mendaftar, saya menyetujui Syarat dan Ketentuan serta
                Kebijakan Privasi
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Register;

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
import LogoCenterNavbar from "../../../layout/front/LogoCenterNavbar";
import "../../../assets/front/css/register.css";
import "../../../assets/general/css/custom-button.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: {},
  });
  const inputHandler = (e) => {
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/login", data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_username", res.data.username);
          localStorage.setItem(
            "auth_profile_picture",
            res.data.profile_picture
          );
          Swal.fire({
            icon: "success",
            title: "Kamu berhasil masuk",
            text: "Mengalihkan mu ke halaman utama",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else if (res.data.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Email atau password salah",
            text: "Silahkan periksa kembali",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setLogin({
            ...loginInput,
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
              <h4 className="text-center mt-4 mb-3">Masuk</h4>
              <h6 className="text-center mb-4">
                Belum punya akun Fmood?{" "}
                <a href="/register" className="text-orange">
                  Daftar sekarang
                </a>
              </h6>
              <Form inline onSubmit={loginSubmit}>
                <FormGroup floating>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={loginInput.email}
                    onChange={inputHandler}
                    invalid={loginInput.error_list.email ? true : false}
                  />
                  <FormFeedback>{loginInput.error_list.email}</FormFeedback>
                  <Label for="exampleEmail">Email</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={loginInput.password}
                    onChange={inputHandler}
                    invalid={loginInput.error_list.password ? true : false}
                  />
                  <FormFeedback>{loginInput.error_list.password}</FormFeedback>
                  <Label for="password">Password</Label>
                </FormGroup>{" "}
                <Button block className="orange-button mt-4">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Login;

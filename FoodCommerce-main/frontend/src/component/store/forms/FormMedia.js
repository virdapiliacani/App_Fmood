import {
  faSortAlphaDownAlt,
  faTimesCircle,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, FormGroup, Label, Progress, Spinner } from "reactstrap";
import serverUrls from "../../../serverUrls";
import Swal from "sweetalert2";
function FormMedia(props) {
  const [mediaData, setMediaData] = useState({
    imgMain: "",
    imgFront: "",
    imgTop: "",
    imgSide: "",
    imgOther: "",
    video: "",
  });
  const [imgMainUpState, setImgMainUpstate] = useState("0");
  const [imgFrontUpState, setImgFrontUpstate] = useState("0");
  const [imgTopUpState, setImgTopUpstate] = useState("0");
  const [imgSideUpState, setImgSideUpstate] = useState("0");
  const [imgOtherUpState, setImgOtherUpstate] = useState("0");
  const [videoUpState, setVideoUpstate] = useState("0");

  const imgMainRef = useRef();
  const imgFrontRef = useRef();
  const imgTopRef = useRef();
  const imgSideRef = useRef();
  const imgOtherRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (props.product) {
      if (props.product.img_main !== null) {
        imgMainRef.current.style.backgroundImage = `url(${
          serverUrls.storage + "/" + props.product.img_main
        })`;
        mediaData.imgMain = props.product.img_main;
      }
      if (props.product.img_front !== null) {
        imgFrontRef.current.style.backgroundImage = `url(${
          serverUrls.storage + "/" + props.product.img_front
        })`;
        mediaData.imgFront = props.product.img_front;
      }
      if (props.product.img_top !== null) {
        imgTopRef.current.style.backgroundImage = `url(${
          serverUrls.storage + "/" + props.product.img_top
        })`;
        mediaData.imgTop = props.product.img_top;
      }
      if (props.product.img_side !== null) {
        imgSideRef.current.style.backgroundImage = `url(${
          serverUrls.storage + "/" + props.product.img_side
        })`;
        mediaData.imgSide = props.product.img_side;
      }
      if (props.product.img_other !== null) {
        imgOtherRef.current.style.backgroundImage = `url(${
          serverUrls.storage + "/" + props.product.img_other
        })`;
        mediaData.imgOther = props.product.img_other;
      }
      if (props.product.video !== null) {
        const viewVideo = videoRef.current.querySelector("#view-video");
        const videoWrapper = videoRef.current.querySelector(
          "#input-video-wrapper"
        );
        const videoTitle = videoWrapper.querySelector(".input-video-title");
        viewVideo.src = serverUrls.storage + "/" + props.product.video;
        videoWrapper.style.display = "block";
        mediaData.video = props.product.video;
      }
    }
  }, []);

  //Image input views
  let ImageInputView = function (imgRef, name, state, setState) {
    return (
      <div id="input-image-group">
        <label
          ref={imgRef}
          className={"input-image " + name}
          onMouseEnter={(e) => showImageHeader(e)}
          onMouseLeave={(e) => closeImageHeader(e)}
        >
          <input
            type="file"
            name={name}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              inputImages(imgRef.current, setState);
            }}
          />
          <div className="input-image-header">
            <span className="input-image-title">{name}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeImage(imgRef.current);
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
          <div
            className="input-image-uploading"
            onClick={(e) => e.preventDefault()}
          >
            <Spinner color="warning" type="grow">
              Loading...
            </Spinner>
            <small>Sedang Upload</small>
            <small className="percentage">{state}%</small>
            <small className="cancel">
              <FontAwesomeIcon icon={faTimesCircle} className="pe-none" />{" "}
              Batalkan
            </small>
          </div>
        </label>
      </div>
    );
  };
  //Image input functions
  function inputImages(imgLabelHolder, setState) {
    let label = imgLabelHolder;
    let imgTitle = label.querySelector(".input-image-title");
    //get images form files input
    const file = label.children[0].files[0];
    let imageUrl = URL.createObjectURL(file);
    //create image object
    const image = new Image();
    image.src = imageUrl;
    image.onload = function () {
      //check image size, max file size 2621440 bytes equal to 2.5MB
      if (file.size <= 2621440) {
        //check image resolution, min resolution 350px*350px
        if (image.width >= 350 && image.height >= 350) {
          // setMediaData({ ...mediaData, [e.target.name]: file });
          label.style.backgroundImage = `url(${image.src})`;
          uploadMedia(label, file, setState);
          //load file name
          if (file.name.length > 20) {
            imgTitle.innerText =
              file.name.slice(0, 15) +
              "..." +
              file.name.slice(file.name.length - 5);
          } else {
            imgTitle.innerText = file.name;
          }
        } else {
          alert("Resoulusi foro kurang dari batas minimal(512px * 512px)");
        }
      } else {
        alert("Ukuran foto melebihi 2.5MB");
      }
    };
  }
  const showImageHeader = function (e) {
    const header = e.target.querySelector(".input-image-header");
    if (header != null && e.target.style.backgroundImage !== "") {
      header.style.display = "flex";
    }
  };
  const closeImageHeader = function (e) {
    const header = e.target.querySelector(".input-image-header");
    if (header != null) {
      header.style.display = "none";
    }
  };
  const removeImage = function (imgLabelHolder) {
    const label = imgLabelHolder;
    const inputName = label.querySelector("input").name;
    const header = label.querySelector(".input-image-header");
    // let imgName =
    //   inputName.slice(0, 3) + "_" + inputName.slice(3).toLowerCase();
    if (inputName === "imgMain") {
      Swal.fire(
        "Foto utama tidak bisa di hapus",
        "Klik foto jika ingin mengganti foto",
        "info"
      );
      return undefined;
    }
    axios
      .post("api/remove-product-media/", {
        imgPath: mediaData[inputName],
        productId: props.product ? props.product.id : "",
        imgName: inputName,
      })
      .then((response) => {
        if (response.status === 200) {
          setMediaData({ ...mediaData, [inputName]: "" });
          header.style.display = "none";
          label.style.backgroundImage = "";
        }
      })
      .catch((e) => {
        Swal.fire(
          "Gagal",
          "Foto gagal di hapus, cek koneksi internet mu",
          "error"
        );
      });
  };
  function uploadMedia(label, file, setState) {
    let uploadHolder = label.children[2];
    let imgName = label.children[0].name;
    let cancelToken = axios.CancelToken;
    let cancelSource = cancelToken.source();
    let cancelButton = label.children[2].children[3].addEventListener(
      "click",
      () => {
        cancelUpload(cancelSource);
      }
    );
    let data = new FormData();
    data.append("image", file);
    const config = {
      onUploadProgress: function (progressEvent) {
        uploadHolder.children[2].innerHtml = setState(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
      cancelToken: cancelSource.token,
    };
    uploadHolder.style.display = "flex";
    axios
      .post("/api/upload-product-media", data, config)
      .then((response) => {
        if (response.data.status === 200) {
          setMediaData({ ...mediaData, [imgName]: response.data.path });
        }
      })
      .catch((e) => {
        label.style.backgroundImage = "";
      })
      .finally(() => {
        uploadHolder.style.display = "none";
      });
  }
  function cancelUpload(cancelSource) {
    Swal.fire("Batalkan Upload ?", "", "question").then((e) => {
      if (e.isConfirmed) {
        cancelSource.cancel("Upload di batalkann");
      }
    });
  }
  // End of image input function

  // Video input functions
  function inputVideo(e) {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    const viewVideo = e.target.parentElement.querySelector("#view-video");
    let videoWrapper = document.querySelector("#input-video-wrapper");
    const videoTitle = videoWrapper.querySelector(".input-video-title");
    const inputError = document.querySelector(".input-error");
    //max file size 10MB
    if (file.size <= 10485760) {
      viewVideo.src = fileUrl;
      videoWrapper.style.display = "block";
      inputError.style.display = "none";
      uploadMedia(videoRef.current, file, setVideoUpstate);
      if (file.name.length > 60) {
        videoTitle.innerText =
          file.name.slice(0, 55) +
          "..." +
          file.name.slice(file.name.length - 5);
      } else {
        videoTitle.innerText = file.name;
      }
    } else {
      inputError.innerText = "Ukuran video melebihi batas maksimal(10MB)";
      inputError.style.display = "block";
      videoWrapper.style.display = "none";
    }
  }
  function removeVideo(e) {
    e.preventDefault();
    const viewVideo = document.querySelector("#view-video");
    const inputError = document.querySelector(".input-error");
    let videoWrapper = document.querySelector("#input-video-wrapper");

    axios
      .post("api/remove-product-media/", {
        imgPath: mediaData.video,
        productId: props.product ? props.product.id : "",
        imgName: "video",
      })
      .then((response) => {
        if (response.status === 200) {
          videoWrapper.style.display = "none";
          inputError.style.display = "none";
          viewVideo.src = "";
          setMediaData({ ...mediaData, video: null });
        }
      })
      .catch((e) => {
        Swal.fire(
          "Gagal",
          "Video gagal di hapus, cek koneksi internet mu",
          "error"
        );
      });
  }
  return (
    <>
      <FormGroup className="bordered">
        <Label>Tambahkan Foto</Label>
        <br />
        <small id="img-main-invalid" className="text-danger d-none">
          Foto utama belum di tambahkan
        </small>
        <div className="d-flex flex-wrap">
          {ImageInputView(
            imgMainRef,
            "imgMain",
            imgMainUpState,
            setImgMainUpstate
          )}
          {ImageInputView(
            imgFrontRef,
            "imgFront",
            imgFrontUpState,
            setImgFrontUpstate
          )}
          {ImageInputView(imgTopRef, "imgTop", imgTopUpState, setImgTopUpstate)}
          {ImageInputView(
            imgSideRef,
            "imgSide",
            imgSideUpState,
            setImgSideUpstate
          )}
          {ImageInputView(
            imgOtherRef,
            "imgOther",
            imgOtherUpState,
            setImgOtherUpstate
          )}
        </div>
      </FormGroup>

      {/* Input Video Form */}
      <FormGroup className="bordered">
        <Label>Tambahkan Video</Label>
        <br />
        <label htmlFor="video" className="me-5 m-3">
          <Button color="primary" size="sm" style={{ pointerEvents: "none" }}>
            <FontAwesomeIcon icon={faVideo} className="me-3" />
            Pilih Video
          </Button>
          <span className="input-error"></span>
        </label>
        <div ref={videoRef} className="position-relative">
          <input
            id="video"
            name="video"
            className="video"
            style={{ visibility: "hidden" }}
            type="file"
            accept=".mp4"
            placeholder="pilih video"
            onChange={(e) => {
              inputVideo(e);
            }}
          />
          <div id="input-video-wrapper">
            <div className="input-video-header">
              <span className="input-video-title"></span>
              <button>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  onClick={(e) => {
                    removeVideo(e);
                  }}
                  // onMouseOver={(e) => {
                  // }}
                />
              </button>
            </div>
            <video id="view-video" width="360" controls></video>
          </div>
          <div
            className="input-image-uploading"
            style={{ width: "360px" }}
            onClick={(e) => e.preventDefault()}
          >
            <Spinner color="warning" type="grow">
              Loading...
            </Spinner>
            <small>Sedang Upload</small>
            <small className="percentage">{videoUpState}%</small>
            <small className="cancel">
              <FontAwesomeIcon icon={faTimesCircle} className="pe-none" />{" "}
              Batalkan
            </small>
          </div>
        </div>
      </FormGroup>
      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          className="orange-button outline"
          onClick={() => {
            props.toggle("1");
          }}
        >
          {"<< "}Kembali
        </Button>
        <Button
          variant="primary"
          className="orange-button outline"
          onClick={() => {
            if (mediaData.imgMain !== "" || props.product) {
              document
                .querySelector("#img-main-invalid")
                .classList.add("d-none");
              props.toggle("3");
              props.dataCourier(mediaData);
            } else {
              document
                .querySelector("#img-main-invalid")
                .classList.remove("d-none");
            }
          }}
        >
          Selanjutnya {" >>"}
        </Button>
      </div>
    </>
  );
}
export default FormMedia;

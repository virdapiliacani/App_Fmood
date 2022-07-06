import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormProductImage() {
  // const [images, setImages] = useState([]);
  const arrImages = [];
  function inputImages(e, i) {
    let label = document.querySelector("#show-img-" + i);
    let imgTitle = label.querySelector(".input-image-title");
    //get images form files input
    const file = e.target.files[0];
    let imageUrl = URL.createObjectURL(file);
    //create image object
    const image = new Image();
    image.src = imageUrl;
    image.onload = function () {
      //check image size, max file size 2621440 bytes equal to 2.5MB
      if (file.size <= 2621440) {
        //check image resolution, min resolution 512px*512px
        if (image.width >= 512 && image.height >= 512) {
          arrImages[i] = file;
          label.style.backgroundImage = `url(${image.src})`;
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
  const ShowImageHeader = function (e) {
    const header = e.target.querySelector(".input-image-header");
    if (header != null && e.target.style.backgroundImage !== "") {
      header.style.display = "flex";
    }
  };
  const CloseImageHeader = function (e) {
    const header = e.target.querySelector(".input-image-header");
    if (header != null) {
      header.style.display = "none";
    }
  };
  const removeImage = function (e, i) {
    e.preventDefault();
    const label = document.querySelector("#show-img-" + i);
    const header = label.querySelector(".input-image-header");
    header.style.display = "none";
    label.style.backgroundImage = "";
    arrImages[i] = null;
  };
  return (
    <>
      <div id="input-image-group">
        <label
          id="show-img-0"
          className="input-image"
          onMouseEnter={(e) => ShowImageHeader(e)}
          onMouseLeave={(e) => CloseImageHeader(e)}
        >
          <input
            type="file"
            accept=".jpg,jpeg,.png"
            style={{ display: "none" }}
            onChange={(e) => {
              inputImages(e, 0);
            }}
          />
          <div className="input-image-header">
            <span className="input-image-title">Image name</span>
            <button
              onClick={(e) => {
                removeImage(e, 0);
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
        </label>
        <label
          id="show-img-1"
          className="input-image"
          onMouseEnter={(e) => ShowImageHeader(e)}
          onMouseLeave={(e) => CloseImageHeader(e)}
        >
          <input
            type="file"
            accept=".jpg,jpeg,.png"
            style={{ display: "none" }}
            onChange={(e) => {
              inputImages(e, 1);
            }}
          />
          <div className="input-image-header">
            <span className="input-image-title">Image name</span>
            <button
              onClick={(e) => {
                removeImage(e, 1);
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
        </label>
        <label
          id="show-img-2"
          className="input-image"
          onMouseEnter={(e) => ShowImageHeader(e)}
          onMouseLeave={(e) => CloseImageHeader(e)}
        >
          <input
            type="file"
            accept=".jpg,jpeg,.png"
            style={{ display: "none" }}
            onChange={(e) => {
              inputImages(e, 2);
            }}
          />
          <div className="input-image-header">
            <span className="input-image-title">Image name</span>
            <button
              onClick={(e) => {
                removeImage(e, 2);
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
        </label>
        <label
          id="show-img-3"
          className="input-image"
          onMouseEnter={(e) => ShowImageHeader(e)}
          onMouseLeave={(e) => CloseImageHeader(e)}
        >
          <input
            type="file"
            accept=".jpg,jpeg,.png"
            style={{ display: "none" }}
            onChange={(e) => {
              inputImages(e, 3);
            }}
          />
          <div className="input-image-header">
            <span className="input-image-title">Image name</span>
            <button
              onClick={(e) => {
                removeImage(e, 3);
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
        </label>
        <label
          id="show-img-4"
          className="input-image"
          onMouseEnter={(e) => ShowImageHeader(e)}
          onMouseLeave={(e) => CloseImageHeader(e)}
        >
          <input
            type="file"
            accept=".jpg,jpeg,.png"
            style={{ display: "none" }}
            onChange={(e) => {
              inputImages(e, 4);
            }}
          />
          <div className="input-image-header">
            <span className="input-image-title">Image name</span>
            <button
              onClick={(e) => {
                removeImage(e, 4);
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
        </label>
      </div>
    </>
  );
}
export default FormProductImage;

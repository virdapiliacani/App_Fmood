// requires a loader
import { Carousel } from "react-responsive-carousel";
function SlidePromo() {
  return (
    <div>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval="3000"
        infiniteLoop={true}
      >
        <div>
          <img src="/images/slide1.png" className="rounded" alt="slide 1" />
        </div>
        <div>
          <img src="/images/pembayaran.png" className="rounded" alt="slide 2" />
        </div>
        <div>
          <img src="/images/slide3.png" className="rounded" alt="slide 3" />
        </div>
      </Carousel>
    </div>
  );
}
export default SlidePromo;

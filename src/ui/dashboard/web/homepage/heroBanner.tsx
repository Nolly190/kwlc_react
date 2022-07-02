import { useMemo } from "react";
import AltHomePageHeader from "./AltHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroBanner({ slides }) {
  const data = slides || [];

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 6000,
      cssEase: "linear",
      pauseOnHover: false,
    }),
    []
  );

  return data && data.length > 0 ? (
    <div>
      <AltHomePageHeader homePosition />
      <Slider {...settings}>
        {data.map((image, i) => {
          return (
            <div key={i}>
              <section
                className="hero-banner-area "
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
                key={i}
              >
                <div className="banner_content">
                  <div
                    className="slide"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  ></div>
                </div>
              </section>
            </div>
          );
        })}
      </Slider>
    </div>
  ) : (
    <section className="hero-banner-area">
      <AltHomePageHeader />
      <div className="banner_content">
        <div
          className="slide"
          style={{ display: "flex", justifyContent: "space-between" }}
        ></div>
      </div>
    </section>
  );
}

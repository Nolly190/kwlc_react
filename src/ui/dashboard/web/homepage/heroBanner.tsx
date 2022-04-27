import { useState } from "react";
import AltHomePageHeader from "./AltHeader";

export default function HeroBanner({ slides }) {
  const [slideState, setSlideState] = useState(0);

  const data = slides || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const moveToTheNextSlide = (event) => {
    event.preventDefault();
    console.log("It works");
    console.log("earlydev");
    setCurrentIndex((state) => state + 1);
    setSlideState((prev) => {
      if (prev === 0) {
        return (prev = prev + 100 / slides.length - 10);
      } else if (prev > (100 / slides.length - 10) * slides.length - 1) {
        return 0;
      } else {
        return (prev = prev + 100 / slides.length - 10);
      }
    });
  };

  const moveToTheBackSlide = () => {
    console.log("It works");
    setSlideState((prev) => {
      if (prev === 0) {
        return 67;
      } else if (prev > 0) {
        return prev - 100 / slides.length - 10;
      }
    });

    setCurrentIndex((state) => (state - 1 < 0 ? data.length - 1 : state - 1));
  };

  return (
    <section
      className="hero-banner-area"
      style={{
        backgroundImage: `url(${data[currentIndex % data.length]?.url})`,
      }}
    >
      <AltHomePageHeader />
      <div className="banner_content">
        <div
          className="slide"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button onClick={moveToTheBackSlide} className="button-none">
            &#x2190;
          </button>
          {/* <div className="slideshow">
            <div
              className="sliders"
              style={{
                transition: "all .3s ease-in-out",
                transform: `translateX(-${slideState}%)`,
              }}
            >
              {data.map((item) => (
                <div className="flex">
                  <div className="content">
                    <p className="italic_txt">Living Church</p>
                   
                    <p className="banner_text">{item.text}</p>
                    <a href="#" className="button">
                      See More
                    </a>
                  </div>
                </div>
              ))}

               <div className="flex">
                <div className="content">
                  <p className="italic_txt">Living Church</p>
                  <h1>Join the prayer today</h1>
                  <p className="banner_text">
                    Visit your local church and become a part of the flock by
                    contributing to the community in anyway you possibly can
                  </p>
                  <a href="#" className="button">
                    See More
                  </a>
                </div>
              </div>

              <div className="flex">
                <div className="content">
                  <p className="italic_txt">Living Church</p>
                  <h1>Join the prayer today</h1>
                  <p className="banner_text">
                    Visit your local church and become a part of the flock by
                    contributing to the community in anyway you possibly can
                  </p>
                  <a href="#" className="button">
                    See More
                  </a>
                </div>
              </div> 
            </div>
          </div> */}

          <button onClick={moveToTheNextSlide} className="button-none">
            &#x2192;
          </button>
        </div>
      </div>
    </section>
  );
}

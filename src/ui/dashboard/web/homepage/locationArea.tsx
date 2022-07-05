import Image from "next/image";
import Img from "../../../../../public/images/Location.png";

export default function LocationArea() {
  return (
    <section className="location-area">
      <div className="row">
        <div className="map_col">
          <div className="map-left">
            <p>where to find us</p>
            <h3>Where’s your location?</h3>
            <img className="" src="/images/maps.png" alt="Map Image" />
          </div>
        </div>
        <div className="address_col">
          <div className="address-right">
            <Image
              src={Img}
              alt="Location Image"
              width="318px"
              height="176px"
            />
            <h2>
              Kingdom Ways Living <br /> Church Headquarters
            </h2>
            <p>
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor
              incididunt ut labore et dolore magna aliqua.{" "}
            </p>
            <p>
              <i className="fas fa-phone-square-alt"></i> + 234 70 433 2832
            </p>
            <p>
              {" "}
              <i className="fas fa-location"></i>24 Prince Ibrahim Eletu Avenue,
              Shoprite Circle Mall Road Jakande Bus Stop, Osapa London,Lagos
            </p>
            <p>
              {" "}
              <i className="fas fa-massage"></i>info@kwlchq.org
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

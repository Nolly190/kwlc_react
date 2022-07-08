import Image from "next/image";
import Link from "next/link";
import DonatePic from "../../../../../public/images/donate.png";

export default function HomeDonate() {
  return (
    // <!-- donate_area-start -->
    <section className="donate_area">
      <div className="row">
        <div className="donate_img" style={{ height: "100%" }}>
          <Image
            style={{
              width: "100%",
              objectFit: "cover",
              borderRadius: 24,
            }}
            height={1150}
            src={DonatePic}
            alt="Donate Image"
            placeholder="blur"
            blurDataURL=""
          />
        </div>

        <div className="donate_right">
          <p>
            <em>Join the community of givers today</em>
          </p>
          <h2>Make a Donation</h2>
          <p>
            Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse.{" "}
          </p>

          <div className="donote-button">
            <Link href={"/web/donations"}>
              <button className="btn">Read More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function HomeDonate() {
  return (
    // <!-- donate_area-start -->
    <section className="donate_area">
      <div className="row" style={{ height: 400 }}>
        <div className="donate_img" style={{ height: "100%" }}>
          <img
            className=""
            style={{
              width: "100%",
              objectFit: "cover",
              height: "100%",
              borderRadius: 24,
            }}
            src="images/donate.png"
            alt="Donate Image"
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

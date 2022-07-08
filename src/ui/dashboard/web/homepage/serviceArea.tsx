import Link from "next/link";

export default function HomeServiceArea() {
  return (
    // <!-- service-area-start -->
    <section className="service_area">
      <div className="service_posts row">
        <Link href={"/web/livestream"} passHref>
          <div className="service_col bg1">
            {/* <img  src="/images/service-1.png" alt="Service Image" /> */}
            <h4 className="service_text">Live Stream</h4>
          </div>
        </Link>

        <Link href={"/web/events"} passHref>
          <div className="service_col bg2">
            {/* <img src="/images/service-2.png" alt="Service Image"/> */}
            <h4 className="service_text">Out Reach</h4>
            <h4 className="service_text"></h4>
          </div>
        </Link>
        <Link href={"/web/events"} passHref>
          <div className="service_col bg3">
            {/* <img src="/images/service-3.png" alt="Service Image"/> */}
            <h4 className="service_text">Events</h4>
          </div>
        </Link>
      </div>
      {/* <!-- service-area-end --> */}
    </section>
  );
}

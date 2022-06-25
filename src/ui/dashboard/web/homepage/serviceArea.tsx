export default function HomeServiceArea() {
  return (
    // <!-- service-area-start -->
    <section className="service_area">
      <div className="service_posts row">
        <div className="service_col bg1">
          {/* <img  src="/images/service-1.png" alt="Service Image" /> */}
          <h4 className="service_text">Live service</h4>
        </div>

        <div className="service_col bg2">
          {/* <img src="/images/service-2.png" alt="Service Image"/> */}
          <h4 className="service_text">Church</h4>
          <h4 className="service_text">weddings</h4>
        </div>

        <div className="service_col bg3">
          {/* <img src="/images/service-3.png" alt="Service Image"/> */}
          <h4 className="service_text">Special Event</h4>
        </div>
      </div>
      {/* <!-- service-area-end --> */}
    </section>
  );
}

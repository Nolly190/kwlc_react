import Link from "next/link";
import React, { useEffect, useState } from "react";
import ListMenuIcon from "../../../../components/list-menu-icon";
import { loadDonations } from "../../../../controller/donation.controller";
import DonateItemDTO from "../../../../dto/Donate.dto";
import { DonationsModel } from "../../../../testModel";
import { fakeModel } from "../../../../utils";
import Layout from "../layout";

export default function DonationIntro() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    loadDonations(setItems, items);
  }, []);

  console.log("items", items);
  return (
    <>
      <Layout
        externalStyles={["/styles/css/donation.css"]}
        navbar={"web"}
        title="Donate"
        withFooter={true}
        withSideBar={false}
      >
        <div className="hero-banner-area">
          <img src="/images/donation-hero-banner.png" alt="" />
          <div className="hero-banner-area-text">
            <h2>
              “A gift opens the way and ushers the giver into the presence of
              the great.”
            </h2>
            <span>Proverbs 18:16 </span>
          </div>
        </div>
        <section className="content">
          <nav>
            <h3>LATEST DONATION</h3>
            <ListMenuIcon onClick={() => console.log("eeee")} />
          </nav>

          <div className="content-container row">
            {
              items.length > 0 &&
                items.map((x, index) => {
                  const element = (
                    <RenderDonationItem
                      key={index}
                      img={x.image}
                      title={x.title}
                      description={x.description?.substring(0, 100)}
                      href={`/web/donate?id=${x.id}`}
                    />
                  );
                  return element;
                })
              // : undefined
            }
          </div>
        </section>
      </Layout>
    </>
  );
}

const RenderDonationItem = ({ img, title, description, href }) => {
  return (
    <div className="col">
      <div className="image">
        <img src={img} alt="" srcSet="" />
      </div>
      <div className="main-content">
        <h5>{title}</h5>
        <p>{description}...</p>
        <Link href={href}>
          <a className="btn">See more</a>
        </Link>
      </div>
    </div>
  );
};

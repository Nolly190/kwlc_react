import React, { useEffect, useState } from "react";
import DonateBtn from "../../../../components/donate-btn";
import { getParam } from "../../../../utils";
import DonateItemDTO from "../../../../dto/Donate.dto";
import { loadSingleDonation } from "../../../../controller/donation.controller";
import { useRouter } from "next/router";

export let DonationsModel: DonateItemDTO[] = [
  {
    title: "Build church school",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/build-church-schools.jpg",
    id: 1,
    images: [
      "/images/project-1.jpg",
      "/images/project-2.jpg",
      "/images/project-2.jpg",
      "/images/project-1.jpg",
    ],
    raised: 2300000,
    target: 4300000,
  },
  {
    title: "Church building project",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/build-church-schools.jpg",
    id: 2,
    images: [
      "/images/project-1.jpg",
      "/images/project-2.jpg",
      "/images/project-2.jpg",
      "/images/project-1.jpg",
    ],
    target: 2300000,
    raised: 4300000,
  },
  {
    title: "Hospital building project",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/church-building.jpg",
    id: 3,
    images: [
      "/images/project-1.jpg",
      "/images/project-2.jpg",
      "/images/project-2.jpg",
      "/images/project-1.jpg",
    ],
    target: 2300000,
    raised: 5000000,
  },
];

export default function DonateContent() {
  const [item, setItem] = useState(new DonateItemDTO());
  const router = useRouter();

  useEffect(() => {
    const id: string = getParam("id");
    if (!id) {
      router.push("/web/");
    } else {
      loadSingleDonation(setItem, id);
    }
  }, []);

  const latestDonations: DonateItemDTO[] = DonationsModel;

  return (
    <>
      <section className="content">
        <div className="grid">
          <div className="col image">
            <img src={item.image} alt="" srcSet="" />
          </div>
          <div className="col main-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="btn-container">
              <DonateBtn
                className={"button"}
                style={{ color: "white" }}
                labelStyle={{ color: "white" }}
                onClick={() => alert("clicked, do seomthing")}
              />
              <DonateBtn
                className={"btn"}
                label="Share"
                labelStyle={{ color: "black" }}
                withImg={false}
                onClick={() => alert("clicked, do seomthing")}
              />
            </div>
          </div>
        </div>

        <div className="project_container">
          <h4>Pictures from the project</h4>
          <div className="project row">
            {item.images.length > 0
              ? item.images.map((x, index) => {
                  return <img key={index} src={x} alt="" />;
                })
              : undefined}
          </div>
        </div>
      </section>
      <section className="latest_container">
        <h3>LATEST DONATION</h3>
        <div className="latest_donation">
          {latestDonations.length > 0
            ? latestDonations
                .reverse()
                .slice(0, 2)
                .map((x, index) => {
                  return (
                    <DonantionItem
                      key={index}
                      img={x.image}
                      title={x.title}
                      target={x.target}
                      raised={x.raised}
                    />
                  );
                })
            : undefined}
        </div>
      </section>
    </>
  );
}

export const DonantionItem = ({ img, title, target, raised }) => {
  return (
    <div className="latest_card">
      <div className="image">
        <img src={img} alt="" />
      </div>

      <div className="project_content">
        <h3>{title}</h3>

        <div className="row">
          <h4>Target:</h4>
          <span style={{ fontSize: 16 }}>
            <p>N {target}</p>
          </span>
        </div>

        <div className="row">
          <h4>Target:</h4>
          <span style={{ fontSize: 16 }}>
            <p>N {target}</p>
          </span>
        </div>

        <div className="row">
          <h4>Raised:</h4>
          <span style={{ fontSize: 16 }}>
            <p>N {raised}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

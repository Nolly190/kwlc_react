import React, { useCallback, useEffect, useState } from "react";
import { getSocialLinks } from "../../../../api/branch.api";
import DonateBtn from "../../../../components/donate-btn";
import { NavMenu } from "../navbar";
import Hamburger from "./HamburgerMenu";

export default function AltHomePageHeader({
  homePosition,
}: {
  homePosition?: boolean;
}) {
  const [mediaLinks, setMediaLinks] = useState([]);

  const getMediaLink = useCallback(async () => {
    const res = await getSocialLinks();

    const socialLinks = await res.data;

    setMediaLinks(socialLinks);
  }, []);

  useEffect(() => {
    getMediaLink();
  }, []);

  const renderLinks = (media) => {
    switch (media.name.toLowerCase()) {
      case "twitter":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
        );
      case "facebook":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
        );
      case "instagram":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </a>
        );
      case "youtube":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-youtube" aria-hidden="true"></i>
          </a>
        );
      case "linkedln":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-linkedln" aria-hidden="true"></i>
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <header
      className={`header_wrap ${homePosition && "home_position"}`}
      id="header"
    >
      <div className="top_navbar">
        <div className="top_right">
          <p>
            Follow us
            {mediaLinks.map((item) => renderLinks(item))}
          </p>
        </div>
        <div className="top_left">
          <p>Call us: +234 70 433 2832</p>
        </div>
      </div>
      <hr className="divider" />

      <nav className="nav_bar nav_alt">
        <div className="nav_menu" id="nav-menu">
          <NavMenu alt={true} />
        </div>
        <div className="mobileMenu">
          <a href={"/web/"} className="nav_link">
            <img src="/images/KWLClogo.svg" alt="KWLC Logo" />
          </a>
          <Hamburger />
        </div>
      </nav>
    </header>
  );
}

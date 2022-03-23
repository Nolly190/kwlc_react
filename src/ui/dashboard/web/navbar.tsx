import Link from "next/link";
import React, { useRef } from "react";
import DonateBtn from "../../../components/donate-btn";

export default function NavBar() {
  let hamburgerMenuRef = useRef(false);
  const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId);

    if (toggle && nav) {
      nav.classList.toggle("show-menu");
    }
  };

  const onClickMenu = () => {
    showMenu("nav-toggle", "nav-menu");
    document.getElementById("nav-toggle").classList.toggle("change");
  };

  const handleClickOutside = (e: any) => {
    console.log(e);
    console.log(hamburgerMenuRef);

    if (hamburgerMenuRef) {
      alert("You clicked outside of me!");
    }
  };

  return (
    <header className="header_wrap" id="header">
      {/* <!-- navigation menu --> */}
      <nav className="nav_bar">
        <a href="#" className="nav_logo">
          <img src="/images/KWLClogo.svg" alt="KWLC Logo" />
        </a>

        {/* <!----------Navigation Links---------> */}
        <div className="nav_menu" id="nav-menu">
          {/* {<ul className="nav_list">
                            <li className="nav_item">
                                <a href={"/web"} className="nav_link">Home</a>
                            </li>
                            <li className="nav_item">
                                <a href={"/web/payment"} className="nav_link">Payments</a>
                            </li>
                            <li className="nav_item">
                                <a href={"/web/donations"} className="nav_link">Donations</a>
                            </li>
                            <li className="nav_item">
                                <a href={"/web/events"} className="nav_link">Events</a>
                            </li>
                            <li className="nav_item">
                                <a href={"/web/blog"} className="nav_link">Blog</a>
                            </li>
                            <li className="nav_item">
                                <a href={"/web/shop"} className="nav_link">Shop</a>
                            </li>
                            <li className="nav_item">
                                <a href={"/web/404"} className="nav_link">
                                    <i className="icofont-shopping-cart"></i>
                                </a>
                            </li>
                                <div className="dropdown">
                                    <div className="nav_tog">
                                        <div className="bar b1" id="bar1"></div>
                                        <div className="bar b2" id="bar2"></div>
                                        <div className="bar b3" id="bar3"></div>
                                    </div>
                                    <ul className="dropdown_contents">
                                        <li className="dropdown_menu"><a href="about.html" className="nav_link">About us</a></li>
                                        <li className="dropdown_menu"><a href="#" className="nav_link">Our Team</a></li>
                                        <li className="dropdown_menu"><a href="#" className="nav_link">Our Beliefs</a></li>
                                        <li className="dropdown_menu"><a href="#" className="nav_link">Our Community</a></li>
                                        <li className="dropdown_menu"><a href="#" className="nav_link">Branches</a></li>
                                        <li className="dropdown_menu"><a href="#" className="nav_link">Payment page</a></li>
                                    </ul>
                                </div>
                        </ul>} */}
          <NavMenu />
        </div>

        {/* <!-------Menu bars--------> */}
        <div
          className="nav_toggle"
          onClick={() => onClickMenu()}
          onMouseUp={() => console.log("mouse up")}
          id="nav-toggle"
        >
          <div className="bar b1" id="bar1"></div>
          <div className="bar b2" id="bar2"></div>
          <div className="bar b3" id="bar3"></div>
        </div>
      </nav>
    </header>
  );
}

export const NavMenu = ({ alt = false }) => {
  return (
    <ul className="nav_list nav-list">
      {alt && (
        <li className="nav_item">
          {/* <a href="indexDonate.html" className="nav_link"><button className="btn"> <i className="fa fa-gift" aria-hidden="true"></i>Donate</button></a> */}
          <DonateBtn />
        </li>
      )}
      <Link href={"/web/"} passHref>
        <li className="nav_item">
          <a className="nav_link">Home</a>
        </li>
      </Link>
      <Link href={"/web/payment"} passHref>
        <li className="nav_item">
          <a className="nav_link">Payment</a>
        </li>
      </Link>
      <Link href={"/web/donations"} passHref>
        <li className="nav_item">
          <a className="nav_link">Donations</a>
        </li>
      </Link>
      {alt && (
        <Link href={"/web/"} passHref>
          <li className="nav_item">
            <a className="nav_link">
              <img src="/images/KWLClogo.svg" alt="KWLC Logo" />
            </a>
          </li>
        </Link>
      )}
      {/* <li className="nav_item">
                <a href={"/web/events"} className="nav_link">Events</a>
            </li> */}
      <Link href={"/web/stream"} passHref>
        <li className="nav_item">
          <a className="nav_link">Stream</a>
        </li>
      </Link>
      <Link href={"/web/blog"} passHref>
        <li className="nav_item">
          <a className="nav_link">Blog</a>
        </li>
      </Link>
      <Link href={"/web/shop"} passHref>
        <li className="nav_item">
          <a className="nav_link">Shop</a>
        </li>
      </Link>
      {/* <!-------Dropdown menu-------> */}
      <div className="dropdown">
        <div className="nav_tog">
          <div className="bar b1" id="bar1"></div>
          <div className="bar b2" id="bar2"></div>
          <div className="bar b3" id="bar3"></div>
        </div>
        <ul className="dropdown_contents">
          <Link href={"/web/404"} passHref>
            <li className="nav_item">
              <a className="nav_link">About us</a>
            </li>
          </Link>
          <Link href={"#"} passHref>
            <li className="nav_item">
              <a className="nav_link"> Our Team</a>
            </li>
          </Link>
          <Link href={"/web/branches"} passHref>
            <li className="nav_item">
              <a className="nav_link">Branches</a>
            </li>
          </Link>
        </ul>
      </div>
      <Link href={"search"} passHref>
        <li className="nav_item">
          <a className={"nav_link " + (alt ? "txt_white" : "txt_black")}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
        </li>
      </Link>
      {alt && (
        <Link href={"checkout.html"} passHref>
          <li className="nav_item">
            <a className="nav_link">
              <i className="icofont-shopping-cart"></i>
            </a>
          </li>
        </Link>
      )}
    </ul>
  );
};

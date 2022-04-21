
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Hamburger from "./homepage/HamburgerMenu";
import Link from "next/link";

const HeaderMenu = ({ alt = false }) => {
  return (
    <div className="nav_bar ">
      <div className="menuLeft">
        <Link href={"/web/"}>
          <a className="nav_link">
            <img src="/images/KWLClogo.svg" alt="KWLC Logo" />
          </a>
        </Link>
      </div>

      <div className="menuRight">
        <ul className="nav_list nav-list">
          <li className="nav_item">
            <Link href={"/web/"}>
              <a className="nav_link">Home</a>
            </Link>
          </li>
          <li className="nav_item">
            <Link href={"/web/branches"}>
              <a className="nav_link">Branches</a>
            </Link>
          </li>
          <li className="nav_item">
            <Link href={"/web/donations"}>
              <a className="nav_link">Donations</a>
            </Link>
          </li>

          <li className="nav_item">
            <Link href={"/web/events"}>
              <a className="nav_link">Events</a>
            </Link>
          </li>
          <li className="nav_item">
            <Link href={"/web/blog"}>
              <a className="nav_link">Blog</a>
            </Link>
          </li>
          <li className="nav_item">
            <Link href={"/web/shop"}>
              <a className="nav_link">Shop</a>
            </Link>
          </li>

          {/* <!-------Dropdown menu-------> */}
          <li className="nav_item">
            <Menu>
              <MenuButton>
                <HamburgerIcon color={"black"} />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <li className="dropdown_menu">
                    <Link href={"/web/404/"}>
                      <a className="nav_link">About Us</a>
                    </Link>
                  </li>
                </MenuItem>
                <MenuItem>
                  <li className="dropdown_menu">
                    <Link href={"/web/payment"}>
                      <a className="nav_link">Payment</a>
                    </Link>
                  </li>
                </MenuItem>
                <MenuItem>
                  <li className="dropdown_menu">
                    <Link href="#">
                      <a className="nav_link">Our Team</a>
                    </Link>
                  </li>
                </MenuItem>
              </MenuList>
            </Menu>
          </li>
          {alt && (
            <li className="nav_item">
              <Link href={"/web/livestream/"}>
                <a className="nav_link">Stream</a>
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="mobileHead">
        <Hamburger />
      </div>
    </div>
  );
};

export default HeaderMenu;

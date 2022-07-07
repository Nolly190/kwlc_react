import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { AiFillGift } from "react-icons/ai";
import Link from "next/link";
import Logo from "../../../../public/images/KWLClogo.svg";
import Image from "next/image";
import { MiniWrapper } from "../../../../public/styles/css/trying";

export const NavMenu = ({ alt = false }) => {
  return (
    <ul className="nav_list nav-list">
      {alt && (
        <li className="nav_item">
          <Link href="/web/donations">
            <a className="nav_link">
              <Button
                leftIcon={<Icon as={AiFillGift} />}
                color="white"
                variant="outline"
                className="donate_btn"
              >
                Donate
              </Button>
            </a>
          </Link>
        </li>
      )}
      <li className="nav_item">
        <Link href="/web/">
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
      {alt && (
        <li className="nav_item">
          <Link href={"/web/"}>
            <a className="nav_link">
              <Image src={Logo} alt="KWLC Logo" />
            </a>
          </Link>
        </li>
      )}
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
      <li className="nav_item">
        <Link href={"/web/livestream/"}>
          <a className="nav_link">Live Stream</a>
        </Link>
      </li>
      {/* <!-------Dropdown menu-------> */}
      <li className="nav_item">
        <Menu>
          <MenuButton>
            <HamburgerIcon color={"white"} />
          </MenuButton>
          <MiniWrapper>
            <MenuList className="list">
              <MenuItem className="menu-item">
                <li className="dropdown_menu">
                  <Link href={"/web/payment"}>
                    <a className="nav_link">Payment</a>
                  </Link>
                </li>
              </MenuItem>
              <MenuItem className="menu-item">
                <li className="dropdown_menu">
                  <Link href={"/web/404/"}>
                    <a className="nav_link">About Us </a>
                  </Link>
                </li>
              </MenuItem>
              <MenuItem className="menu-item">
                <li className="dropdown_menu">
                  <Link href="#">
                    <a className="nav_link">Our Team</a>
                  </Link>
                </li>
              </MenuItem>
            </MenuList>
          </MiniWrapper>
        </Menu>
      </li>
    </ul>
  );
};

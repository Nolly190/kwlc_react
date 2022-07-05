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
              <img src="/images/KWLClogo.svg" alt="KWLC Logo" />
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
          <MenuList>
            <MenuItem>
              <li className="dropdown_menu">
                <Link href={"/web/Payment"}>
                  <a className="nav_link">Payment</a>
                </Link>
              </li>
            </MenuItem>
            <MenuItem>
              <li className="dropdown_menu">
                <Link href={"/web/404/"}>
                  <a className="nav_link">About Us </a>
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
    </ul>
  );
};

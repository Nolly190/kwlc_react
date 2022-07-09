import React from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { AiFillGift } from "react-icons/ai";
import { Nav_item } from "../../../../../public/styles/css/homepageStyle";

export default function Hamburger() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div className="hamburgerMenu">
      <Button ref={btnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <ul className="nav_list nav-list">
              <Nav_item>
                <a href={"/web/"} className="nav_link">
                  Home
                </a>
              </Nav_item>
              <Nav_item>
                <a href={"/web/branches"} className="nav_link">
                  Branches
                </a>
              </Nav_item>
              <Nav_item>
                <a href={"/web/donations"} className="nav_link">
                  Donations
                </a>
              </Nav_item>
              <Nav_item>
                <a href={"/web/events"} className="nav_link">
                  Events
                </a>
              </Nav_item>
              <Nav_item>
                <a href={"/web/blog"} className="nav_link">
                  Blog
                </a>
              </Nav_item>
              <Nav_item>
                <a href={"/web/shop"} className="nav_link">
                  Shop
                </a>
              </Nav_item>
              <Nav_item>
                <Menu>
                  <MenuButton>
                    <HamburgerIcon color={"black"} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <li className="dropdown_menu">
                        <a href={"/web/404/"} className="nav_link">
                          About Us
                        </a>
                      </li>
                    </MenuItem>
                    <MenuItem>
                      <li className="dropdown_menu">
                        <a href={"/web/livestream/"} className="nav_link">
                          Live stream
                        </a>
                      </li>
                    </MenuItem>
                    <MenuItem>
                      <li className="dropdown_menu">
                        <a href="#" className="nav_link">
                          Our Team
                        </a>
                      </li>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Nav_item>
              <Nav_item>
                <a href={"/web/payment"} className="nav_link">
                  Payment
                </a>
              </Nav_item>
              <Nav_item>
                <a href={"/web/donations"} className="nav_link">
                  <Button
                    leftIcon={<Icon as={AiFillGift} />}
                    colorScheme="white"
                    variant="outline"
                    className="hamburger_donate-btn"
                  >
                    Donate
                  </Button>
                </a>
              </Nav_item>
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

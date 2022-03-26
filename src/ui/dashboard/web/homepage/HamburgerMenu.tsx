import React from 'react';
import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerBody,
 DrawerCloseButton, useDisclosure, DrawerHeader,
 Menu, MenuButton, MenuList, MenuItem, Icon} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {AiFillGift} from "react-icons/ai";

export default function Hamburger() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <div className='hamburgerMenu'>
      <Button ref={btnRef} onClick={onOpen}>
        <HamburgerIcon/>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Menu
          </DrawerHeader>

          <DrawerBody>
            <ul className="nav_list nav-list">
              <li className="nav_item">
                <a href={"/web/"} className="nav_link">Home</a></li>
              <li className="nav_item">
                <a href={"/web/branches"} className="nav_link">Branches</a>
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
                <Menu>
                    <MenuButton><HamburgerIcon color={"black"}/></MenuButton>
                    <MenuList>
                        <MenuItem>
                        <li className="dropdown_menu"><a href={"/web/404/"}className="nav_link">About Us</a></li>
                        </MenuItem>
                        <MenuItem>
                        <li className="dropdown_menu"><a href={"/web/livestream/"}className="nav_link">Live stream</a></li>
                        </MenuItem>
                        <MenuItem>
                        <li className="dropdown_menu"><a href="#" className="nav_link">Our Team</a></li>
                        </MenuItem>
                        <MenuItem>
                        <li className="dropdown_menu"><a href={"/web/payment"} className="nav_link">Payment</a></li>
                        </MenuItem>
                    </MenuList>
                </Menu>   
              </li>
              <li className="nav_item"><a href={"/web/checkout"} className="nav_link"><i className="icofont-shopping-cart"></i></a></li>
              <li className="nav_item"><a href={"/web/donations"} className="nav_link">
                <Button leftIcon={<Icon as= {AiFillGift} />} colorScheme='white' variant='outline'>
                  Donate
                </Button>  
              </a></li>
            </ul>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </div>
  )
}
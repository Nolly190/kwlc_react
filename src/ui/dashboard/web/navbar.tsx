import React from "react";
import {Menu, MenuButton, MenuList, MenuItem, Button, Icon} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons'; 
import {AiFillGift} from "react-icons/ai"

export const NavMenu = ({alt=false}) => {
    return (
        <ul className="nav_list nav-list">
            {alt &&
                <li className="nav_item">
                    <a href="/web/donations" className="nav_link">
                        <Button leftIcon={<Icon as= {AiFillGift} />} colorScheme='white' variant='outline'>
                            Donate
                        </Button>
                    </a>
                </li>
            }
            <li className="nav_item">
                <a href={"/web/"} className="nav_link">Home</a></li>
            <li className="nav_item">
                <a href={"/web/payment"} className="nav_link">About</a>
            </li>
            <li className="nav_item">
                <a href={"/web/donations"} className="nav_link">Donations</a>
            </li>
            {
                alt &&
                <li className="nav_item">
                    <a href={"/web/"} className="nav_link">
                        <img src="/images/KWLClogo.svg" alt="KWLC Logo"/>
                    </a>
                </li>
            }
            <li className="nav_item">
                <a href={"/web/livestream"} className="nav_link">Events</a>
            </li>
            <li className="nav_item">
                <a href={"/web/blog"} className="nav_link">Blog</a>
            </li>
            <li className="nav_item">
                <a href={"/web/shop"} className="nav_link">Shop</a>
            </li>

            {/* <!-------Dropdown menu-------> */}
            <li className="nav_item">
                <Menu>
                    <MenuButton><HamburgerIcon color={"white"}/></MenuButton>
                    <MenuList>
                        <MenuItem>
                        <li className="dropdown_menu"><a href={"/web/404/"}className="nav_link">Branches</a></li>
                        </MenuItem>
                        <MenuItem>
                        <li className="dropdown_menu"><a href={"/web/404/"}className="nav_link">Stream</a></li>
                        </MenuItem>
                        <MenuItem>
                        <li className="dropdown_menu"><a href="#" className="nav_link">Our Team</a></li>
                        </MenuItem>
                        <MenuItem>
                        <li className="dropdown_menu"><a href={"/web/branches"} className="nav_link">Payment</a></li>
                        </MenuItem>
                    </MenuList>
                </Menu>   
            </li>
           {
            alt && 
                <li className="nav_item"><a href="checkout.html" className="nav_link"><i className="icofont-shopping-cart"></i></a></li>
            }
        </ul>
    );
}
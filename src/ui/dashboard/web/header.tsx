import {Menu, MenuButton, MenuList, MenuItem, Button, Icon} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons'; 
import Hamburger from "./homepage/HamburgerMenu";

const HeaderMenu = ({alt=false}) => {
    return (
        <div className="nav_bar ">
            <div className="menuLeft">
                <a href={"/web/"} className="nav_link">
                    <img src="/images/KWLClogo.svg" alt="KWLC Logo"/>
                </a>
            </div>

            <div className="menuRight">
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

                    {/* <!-------Dropdown menu-------> */}
                    <li className="nav_item">
                        <Menu>
                        <MenuButton><HamburgerIcon color={"black"}/></MenuButton>
                            <MenuList>
                                <MenuItem>
                                <li className="dropdown_menu"><a href={"/web/404/"}className="nav_link">About Us</a></li>
                                </MenuItem>
                                <MenuItem>
                                <li className="dropdown_menu"><a href={"/web/livestream/"}className="nav_link">Stream</a></li>
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
                {
                    alt && 
                        <li className="nav_item"><a href="checkout.html" className="nav_link"><i className="icofont-shopping-cart"></i></a></li>
                    }
                </ul>
            </div>
            
            <div className="mobileHead">
                <Hamburger/>
            </div>
        </div>

    )
}

export default HeaderMenu;
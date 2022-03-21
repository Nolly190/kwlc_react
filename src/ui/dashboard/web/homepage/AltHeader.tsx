import React, {useEffect} from 'react';
import DonateBtn from '../../../../components/donate-btn';
import { NavMenu } from '../navbar';
import Hamburger from './HamburgerMenu';

export default function AltHomePageHeader() {

    return (
        <header className="header_wrap" id="header">
                <div className="top_navbar">
                    <div className="top_right">
                        <p>Follow us
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                            <i className="fa fa-facebook-f" aria-hidden="true"></i>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </p>
                    </div>
                    <div className="top_left">
                        <p>Call us: +234 70 433 2832</p>
                    </div>
                </div>
                <hr className='divider'/>
                
                <nav className="nav_bar nav_alt">

                    <div className="nav_menu" id="nav-menu">
                        <NavMenu alt={true} />
                    </div>
                <div className='mobileMenu'>
                  <a href={"/web/"} className="nav_link">
                      <img src="/images/KWLClogo.svg" alt="KWLC Logo"/>
                  </a>
                  <Hamburger/>
                </div>
                </nav>
            </header>
    );
}
import React, {useEffect} from 'react';
import DonateBtn from "../../../../components/donate-btn";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function PaymentContent({}) {

    let btn = undefined;
    let closeBtn = undefined;
    let closeBtnModal = undefined;
    let modal = undefined;
    let overlay = undefined;
    let successModal = undefined;
    let submitDonation = undefined;
    let mainContent = undefined;

    //form
    let form = undefined;
    let payForm = undefined;
    
    useEffect(() => {
        btn = document.getElementById('donate');
        closeBtn = document.getElementById('close');
        closeBtnModal = document.getElementById('close-modal');
        modal = document.getElementById('modal');
        overlay = document.getElementById('overlay');
        successModal = document.getElementById('success__modal');
        submitDonation = document.getElementById('submit-donation');
        mainContent = document.getElementById('main-content');

        payForm = document.getElementById('pay-form');
        form = document.getElementById('form');

        // show Modal
        btn.addEventListener('click', () => {
            modal.style.display = "block"
            overlay.style.display = "block"
        });

        // hide Modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none"
            overlay.style.display = "none"
        });

        // success Modal
        submitDonation.addEventListener('click', () => {
            mainContent.style.display = "none"
            successModal.style.display = "block"
        });

        // hide Modal using continue button
        closeBtnModal.addEventListener('click', () => {
            modal.style.display = "none"
            overlay.style.display = "none"
            mainContent.style.display = "block"
            successModal.style.display = "none"
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })

        payForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });
    
    return (
        <>
            <section className="content">
                <h3>PAY FOR YOUR TITHE AND OFFERINGS EASILY</h3>
                <form id="pay-form">
                    <div className="row w-100">
                        <div className="col row">
                            <Menu>
                                <MenuButton 
                                    as={Button} 
                                    rightIcon={<ChevronDownIcon color="blackAlpha"/>}
                                    px={8}
                                    py={8}
                                    >
                                    <h3>Select payment</h3>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        Offering
                                    </MenuItem>
                                    <MenuItem>
                                        Tithe
                                    </MenuItem>
                                    <MenuItem>
                                        Donation
                                    </MenuItem>
                                    <MenuItem>
                                        Product
                                    </MenuItem>
                                    <MenuItem>
                                        Ticket
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                        <div className="col row">
                            <Menu>
                                <MenuButton 
                                    as={Button} 
                                    rightIcon={<ChevronDownIcon color="blackAlpha"/>}
                                    px={8}
                                    py={8}
                                    >
                                    <h3>Payment option</h3>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        Offline
                                    </MenuItem>
                                    <MenuItem>
                                        Online
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>

                    <div className="row w-100">
                        <div className="input col">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>

                        <div className="input col">
                            <div className="payment row">
                                <div className="mr-2 span-first">
                                    <input type="text" style={{background: "#fff"}} placeholder="Amount" />
                                </div>
                                <div style={{background: "#f1f1f1", padding: 15}} className="row span-last">
                                    <span>#</span><span>1,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="btn-container">
                        <button type="button" id="donate" className="button">
                            <i className="fa fa-gift" aria-hidden="true" style={{marginRight: ".5rem"}}></i>
                            Pay
                        </button>
                    </div>
                </form>
            </section>
            
            <div className="modal" id="modal">
                <form id="form" className="mb-0">
                    <div id="main-content">
                        <div id="">
                            <header className="row justify-space-between">
                                <div className="payment">
                                    <span>#</span> <span>1,000</span>
                                </div>
                                <i className="fa fa-times" aria-hidden="true" id="close"></i>
                            </header>
                            <h3>Select Payment Method</h3>
                            <div className="row radio--container justify-space-between">
                                <div className="input">
                                    <input type="radio" name="payment-method" id="flutter" />
                                    <label htmlFor="flutter">
                                        <div className="custom-radio"></div>
                                        Flutter wave
                                    </label>
                                </div>

                                <div className="input">
                                    <input type="radio" name="payment-method" id="payOffline" />
                                    <label htmlFor="payOffline">
                                        <div className="custom-radio"></div>
                                        Pay Offline
                                    </label>
                                </div>
                            </div>

                            <h3>Personal Info</h3>
                            <div className="row form-info">
                                <div className="input">
                                    <label htmlFor="fname">First Name </label>
                                    <input type="text" name="fname" id="" placeholder="First Name" />
                                </div>
                                <div className="input">
                                    <label htmlFor="lname">Last Name </label>
                                    <input type="text" name="fname" id="" placeholder="Last Name" />
                                </div>
                            </div>
                        {/* <!-- </div> --> */}
                            <div className="input email-input">
                                <label htmlFor="email">Email Address </label>
                                <input type="text" name="email" id="" placeholder="Email Address" />
                            </div>

                            <div className="row mt-2 justify-flex-end">
                                <div className="payment-amount">
                                    <input 
                                        type="" 
                                        placeholder="Donation Amount" 
                                        style={{padding: 0}} 
                                    />
                                    <span>{/* Donation Amount */} :</span> 
                                    <span>#1,000</span>
                                </div>
                            </div>

                            <div className="btn-container">
                                <button id="submit-donation" className="button">
                                    <i className="fa fa-gift" aria-hidden="true"></i>
                                        Donate
                                </button>
                            </div>

                        </div>

                        <div id="success__modal" className="success__modal">
                            <div className="image">
                                <img src="/images/donation-thanks.png" alt="" srcSet="" />
                            </div>
                            <h5>We Thank You For Donation </h5>
                            <p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse. 
                            </p>
                            <div className="btn-container mt-2">
                                <button id="close-modal">            
                                    <span>
                                        Continue
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="overlay" id="overlay"></div>
        </>
    );
}


        
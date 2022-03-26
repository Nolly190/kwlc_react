import { Button, ButtonGroup } from '@chakra-ui/react';

export default function HomeFamilySection() {
    // <!-- family-section-start -->
        return (
            <section className="family_section_area pr">
            <div className="shape-1">
                <svg width="222" height="202" viewBox="0 0 222 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M185.516 27.5409C204.782 40.0469 222.189 58.2989 221.175 76.2129C219.992 94.2959 200.219 111.872 187.037 131.983C173.686 152.094 167.095 174.909 150.871 188.598C134.478 202.287 108.283 207.019 93.4111 195.358C78.5391 183.528 74.9901 155.474 57.0761 131.983C39.1621 108.492 7.05212 89.5639 1.64412 67.5939C-3.76387 45.6239 17.5301 20.6119 42.3731 9.11993C67.2161 -2.37207 95.6081 -0.344072 120.282 4.04993C145.125 8.44393 166.081 15.0349 185.516 27.5409Z"
                        fill="#77B6D5" fill-opacity="0.1" />
                </svg>
            </div>
            <div className="shape-2">
                <svg width="406" height="432" viewBox="0 0 406 432" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M140.77 21.3265C189.741 0.540493 247.336 -9.23182 280.416 15.9247C313.601 41.6246 321.727 102.359 343.26 153.723C364.573 205.412 399.837 247.626 405.098 296.51C410.141 345.719 385.287 402.142 343.631 415.586C301.65 428.812 243.19 399.279 174.88 403.237C106.57 407.195 28.6274 444.319 -20.5597 426.238C-69.7468 408.156 -90.1788 334.867 -80.0554 272.282C-69.932 209.696 -29.2533 157.814 11.1508 116.135C51.7739 74.1312 91.579 42.437 140.77 21.3265Z"
                        fill="#77B6D5" fill-opacity="0.1" />
                </svg>
            </div>
            <h2>Join the family</h2>
            <div className="service_posts row justify_one">
                <div className="service_image">
                    <img className="family_img family-left" src="/images/prayer.png" alt="Family Image" />
                </div>

                <div className="right_text">
                    <h3>Fellowship with us in any <br/> of our branches </h3>
                    <Button
                    size='md'
                    height='3.2rem'
                    width='8rem'
                    fontSize='14px'
                    padding='.75rem'
                    margin='1rem 0'
                    border='1px'
                    outline='#000'
                    background='transparent'
                    color='#000'
                    borderRadius='1.675rem'
                    borderColor='black.500'
                    
                    >
                    Learn more
                    </Button>
                </div>
            </div>
            <div className="service_posts row justify_two">
                <div className="service_image">
                    <img className="family_img" src="/images/book.png" alt="Book Image"/>
                </div>
                <div className="right_text">
                    <h3>Join our bible classes today </h3>
                    <Button
                    size='md'
                    height='3.2rem'
                    width='8rem'
                    fontSize='14px'
                    padding='.75rem'
                    margin='1rem 0'
                    border='1px'
                    outline='#000'
                    background='transparent'
                    color='#000'
                    borderRadius='1.675rem'
                    borderColor='black.500'
                    
                    >
                    Learn more
                    </Button>
                </div>
            </div>
        </section>
    );
}
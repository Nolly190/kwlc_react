import {useState} from 'react';
import AltHomePageHeader from './AltHeader';

export default function HeroBanner() {
    const [slideState, setSlideState] = useState(0);

    const moveToTheNextSlide = (event) => {
        event.preventDefault();
        console.log("It works")
        console.log("earlydev")
        setSlideState(prev => {
            if(prev === 0) {
                return prev = prev + 33.5;
            }else if(prev > 66){
                return 0;                    
            }else{
                return prev = prev + 33.5;
            }
        });
    }

    const moveToTheBackSlide = () => {
        console.log("It works")
        setSlideState(prev => {
            if(prev === 0) {
                return 67;
            }else if(prev > 0){
                return prev - 33.5;                  
            }
        });
    }
    return (
        <section className="hero-banner-area">
            <AltHomePageHeader/>
            <div className="banner_content">
                <div className="slide">
                    <button onClick={moveToTheBackSlide} className="button-none">&#x2190;</button>
                     <div className="slideshow">
                    <div className="sliders" style={{
                        transition: "all .3s ease-in-out",
                        transform: `translateX(-${slideState}%)`
                    }}>
                        <div className="flex">
                        <div className="content">
                            <p className="italic_txt">Living Church</p>
                            <h1>Join the prayer today</h1>
                            <p className="banner_text">Visit your local church and become a part of the flock by contributing to the community in anyway you possibly can</p>
                            <a href="#" className="button">See More</a>                
                        </div>
                    </div>

                    <div className="flex">
                        <div className="content">
                            <p className="italic_txt">Living Church</p>
                            <h1>Join the prayer today</h1>
                            <p className="banner_text">Visit your local church and become a part of the flock by contributing to the community in anyway you possibly can</p>
                            <a href="#" className="button">See More</a>                
                        </div>
                    </div>

                    <div className="flex">
                        <div className="content">
                            <p className="italic_txt">Living Church</p>
                            <h1>Join the prayer today</h1>
                            <p className="banner_text">Visit your local church and become a part of the flock by contributing to the community in anyway you possibly can</p>
                            <a href="#" className="button">See More</a>                
                        </div>
                    </div>
                    </div>             
                    </div>
                                      
                    <button onClick={moveToTheNextSlide} className="button-none">&#x2192;</button>
                </div>
            </div>
        </section>
    );
}
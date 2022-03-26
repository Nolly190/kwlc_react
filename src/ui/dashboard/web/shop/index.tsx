import Layout from "../layout";
import ShopRightSection from "./RightSection";
import ShopLeftSection from "./LeftSection";
import { ShopProvider } from "../../../../context-providers/ShopContext.provider";
import styled from "styled-components";

export default function Shop() {
    
    return (
        <>
            <Layout 
                externalStyles={["/styles/css/donation.css"]}
                navbar={"web"}
                title={"Shop"}
                withFooter={true} 
                withSideBar={false}                
            >
                <ShopWrap>
                    <div className="shopNow">
                        <h3>Shop Now</h3>
                        <div className="shopDot"></div>
                    </div>
                    <section className="productLanding">
                        {/* <ShopFilter />
                        <ShopContent /> */}
                        {/* <ShopProvider>
                            <ShopRightSection onFilter={(minNo, maxNo) => {
                                console.log("filtered", minNo, maxNo);
                            }} />
                            <ShopLeftSection />
                        </ShopProvider>*/}

                        <ShopLeftSection />
                        <ShopRightSection onFilter={(minNo, maxNo) => {
                            console.log("filtered", minNo, maxNo);
                        }} />
                        </section>
                    
                </ShopWrap>
            </Layout>
        </>
    );
}

const ShopWrap = styled.div`
    width: 100%;
    margin: 2rem 0;
`



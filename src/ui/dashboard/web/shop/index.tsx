import Layout from "../layout";
import ShopRightSection from "./RightSection";
import ShopLeftSection from "./LeftSection";
import { ShopProvider } from "../../../../context-providers/ShopContext.provider";

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
                <div className="shop">
                    <div className="shopNow">Shop Now</div>
                    <div className="row">
                        {/* <ShopFilter />
                        <ShopContent /> */}
                        <ShopProvider>
                            <ShopRightSection onFilter={(minNo, maxNo) => {
                                console.log("filtered", minNo, maxNo);
                            }} />
                            <ShopLeftSection />
                        </ShopProvider>                        
                    </div>
                    
                </div>
            </Layout>
        </>
    );
}
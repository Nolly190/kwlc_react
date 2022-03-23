import Layout from "../layout";
import DonateBanner from "./Banner";
import DonateContent from "./Content";
// import BranchContent from "./Content";

export default function Donate() {
    return (
        <Layout
            externalStyles={["/styles/css/donation.css", "/styles/css/icofont/icofont.min.css", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css", "/font-awesome/css/font-awesome.min.css"]}
            navbar={"web"}
            title="Donate"
            withFooter={true}
        >
            <div className="donate">
                <DonateBanner />
                <DonateContent />
                {/* <BranchContent /> */}
            </div>
        </Layout>
    );
}
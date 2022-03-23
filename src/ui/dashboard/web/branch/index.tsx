import HomePageFooter from "../footer";
import Layout from "../layout";
import BranchBanner from "./Banner";
import BranchContent from "./Content";
import BranchSearch from "./Search";

export default function Branches() {
  return (
    <Layout
      externalStyles={["/styles/css/donation.css"]}
      navbar={"web"}
      title="Church Branches"
      withFooter={false}
    >
      <div className="branch">
        <div className="main_container">
          <BranchBanner />
          {/* <BranchSearch location={"Lagos"} /> */}
          <BranchContent />
          <HomePageFooter />
        </div>
      </div>
    </Layout>
  );
}

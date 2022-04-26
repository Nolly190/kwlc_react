import { getLiveStreamsApi } from "../../../../api/livestream";
import Layout from "../layout";
import LiveStreamBanner from "./Banner";
import LiveStreamContent from "./Content";
import PreviousLiveStreamContent from "./PrevContent";

export default function LiveStreamIndex({ data }) {
  return (
    <>
      <Layout
        externalStyles={["/styles/css/style.css"]}
        navbar={"false"}
        title={"Live Events"}
        withFooter={true}
      >
        <div className="live">
          <LiveStreamBanner />
          <LiveStreamContent data={data} />
          <PreviousLiveStreamContent data={data} />
        </div>
      </Layout>
    </>
  );
}

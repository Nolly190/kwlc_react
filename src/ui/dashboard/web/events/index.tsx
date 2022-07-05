import Layout from "../layout";
import EventFinder from "./eventFinder";
import EventList from "./list";
import HomePageFooter from "../footer";
import EventBanner from "./Banner";

export default function Events({ data, totalPages }) {
  return (
    <>
      <Layout
        externalStyles={["/styles/css/donation.css"]}
        navbar={"web"}
        title={"Events"}
        withFooter={false}
      >
        <div className="main_container">
          <EventBanner />
          <EventFinder datetime={new Date()} />
          <EventList
            datetimeCurrentRange={new Date()}
            list={data}
            totalPages={totalPages}
          />
          <HomePageFooter />
        </div>
      </Layout>
    </>
  );
}

import Layout from "../layout";
import EventFinder from "./eventFinder";
import Head from 'next/head'
import EventList from "./list";
import { SingleEventItem } from "../../../../components/event-item";
import HomePageFooter from "../footer";
import { fakeModel } from "../../../../utils";
import EventBanner from "./Banner";
import { EventData } from "../../../../testModel";

export default function Events() {
    const testData: SingleEventItem[] = EventData;
    const prodData = [];
    
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
                        list={!fakeModel ? prodData : testData}
                        />
                    <HomePageFooter />
                </div>
                
            </Layout>
        </>
    );
}
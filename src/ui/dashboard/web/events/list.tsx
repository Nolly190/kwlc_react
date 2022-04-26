import moment from "moment";
import { FC } from "react";
import EventItem, { SingleEventItem } from "../../../../components/event-item";
import EventFinder from "./eventFinder";

interface EventListItem {
  datetimeCurrentRange: Date;
  list: SingleEventItem[];
}

const EventList: FC<EventListItem> = ({ datetimeCurrentRange, list }) => {
  const formattedDate = moment(datetimeCurrentRange).format("hh:mm a");
  return (
    // <!-- Container -->
    <>
      <section className="event_list" style={{ padding: 20 }}>
        <div className="intro">
          <strong>VIEW AS :</strong>
          <h5>
            <span>List</span>
          </h5>
          <h5>
            <span>Months</span>
          </h5>
          <h5>Day</h5>
        </div>

        <div className="event_time my-5">
          <h3 className="section_subtitle">{formattedDate}</h3>
        </div>

        <div className="event_list">
          {list.length > 0 ? (
            list.map((x, index) => {
              return <EventItem key={index} {...x} />;
            })
          ) : (
            <div className="no_events">
              <p className="no_events_text">
                {`No events scheduled for ${formattedDate}.. Please try another day.`}
              </p>
            </div>
          )}
        </div>
      </section>
      {list.length > 0 && (
        <div className="pages_button">
          <a href="#" className="next">
            <h5>Next Page</h5>
          </a>
        </div>
      )}
    </>
  );
};

export default EventList;

import moment from "moment";
import Head from "next/head";
import { FC } from "react";

interface EventFinderItem {
  datetime: Date;
}

const EventFinder: FC<EventFinderItem> = ({ datetime }) => {
  return (
    <div>
      <h2 className="section_title">
        Events For {moment(datetime).format("DD.MM.yy")}
      </h2>

      {/* <!-- Event Searcher --> */}
      <div className="event_search">
        <div className="search">
          <label>DAY OF</label>
          <input
            className="event_searcher"
            type="datetime"
            name="date"
            id="date"
          />
        </div>
        <div className="search">
          <label>Search</label>
          <input
            className="event_searcher"
            type="search"
            name="search"
            id="search"
          />
        </div>

        <a className="button mx-4" href="#" onClick={() => {}}>
          Find Event
        </a>
      </div>
    </div>
  );
};

export default EventFinder;

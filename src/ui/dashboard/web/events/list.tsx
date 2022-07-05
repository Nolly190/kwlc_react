import moment from "moment";
import { FC, useState } from "react";
import { getEventsApi } from "../../../../api/event.api";
import EventItem, { SingleEventItem } from "../../../../components/event-item";
import EventFinder from "./eventFinder";
import { toast } from "react-toastify";
import DualRing from "../../../../components/loader";
import { Flex } from "@chakra-ui/react";
interface EventListItem {
  datetimeCurrentRange: Date;
  list: SingleEventItem[];
  totalPages: number;
}

const EventList: FC<EventListItem> = ({
  datetimeCurrentRange,
  list,
  totalPages,
}) => {
  const formattedDate = moment(datetimeCurrentRange).format("hh:mm a");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(list);
  const [loading, setLoading] = useState(false);

  const onNextPage = async () => {
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const res = await getEventsApi(nextPage);
      setCurrentItem(res.data.data);
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      toast.error("An error occured please try again later");
      setLoading(false);
    }
  };

  const onPrevPage = async () => {
    try {
      setLoading(true);
      const nextPage = currentPage - 1;
      const res = await getEventsApi(nextPage);
      setCurrentItem(res.data.data);
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      toast.error("An error occured please try again later");
      setLoading(false);
    }
  };
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

        {loading ? (
          <Flex justifyContent={"center"}>
            <DualRing color="black" />
          </Flex>
        ) : (
          <div className="event_list">
            {currentItem.length > 0 ? (
              currentItem.map((x, index) => {
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
        )}
      </section>
      {list.length > 0 && (
        <Flex
          justifyContent={currentPage > 1 ? "space-between" : "flex-end"}
          padding="20px"
        >
          {currentPage > 1 && (
            <button onClick={onPrevPage} className="next">
              <h5>Prev Page</h5>
            </button>
          )}
          {currentPage !== totalPages && (
            <button onClick={onNextPage} className="next">
              <h5>Next Page</h5>
            </button>
          )}
        </Flex>
      )}
    </>
  );
};

export default EventList;

import { FC } from "react";
import moment from "moment";

export interface SingleEventItem {
  id: number;
  streamUrl: string;
  name: string;
  description: string;
  date: Date;
  branchId: number;
  isActive: true;
  eventType: number;
  eventName: string;
  address: string;
  phone: string;
  location: string;
  branchName: string;
  event_Images: [
    {
      id: number;
      imageUrl: string;
    }
  ];
}

const EventItem: FC<SingleEventItem> = (data: SingleEventItem) => {
  const { event_Images, date, description, location, name, id, address } = data;

  return (
    <div className="list_col grid">
      <div
        className="post_col"
        style={{
          backgroundImage: `url('${
            event_Images[0]?.imageUrl || "/images/pexels-luis.png"
          }')`,
          backgroundSize: "cover",
          borderRadius: "10px",
        }}
      >
        <h5>
          <span className="content_date">Price: Free</span>
        </h5>
      </div>

      <div className="list_text">
        <h3 className="section_subtitle">{name}</h3>

        <div className="col">
          <span>
            <i className="fa fa-calendar" aria-hidden="true"></i>
          </span>
          <p>{moment(date).format("DD.MM.yy")}.</p>
        </div>
        <div className="col">
          <span>
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </span>
          <p>
            {moment(date).format("hh:mm a")} - {moment(date).format("hh:mm a")}
          </p>
        </div>
        <div className="col">
          <span>
            <i className="fa fa-home" aria-hidden="true"></i>
          </span>
          <p style={{ textTransform: "uppercase" }}>
            Kingdom Ways Living Church
          </p>
        </div>
        <div className="col">
          <span>
            <i className="fa fa-map-marker" aria-hidden="true"></i>
          </span>
          <p>{address + ". " + location}</p>
        </div>
        <div className="col">
          <p>{description}</p>
        </div>
        <div className="col">
          <div className="read_more">
            <div className="line_bar"></div>
            <a href={`/web/events/${id}`}>
              <h5>Read More</h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventItem;

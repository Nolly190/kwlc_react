import moment from "moment";
import { EventDTO } from "../../../../dto/Event.dto";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS_OF_YEAR = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function HomeTimer({ data }) {
  const nextEvent: EventDTO = data || {};
  const dateObj = moment(nextEvent.date);

  const dayInMonth = moment(nextEvent.date).format("DD");

  const getSuffice = (dayNumber) => {
    if (dayNumber % 10 === 1) return "st";
    else if (dayNumber % 10 === 2) return "nd";
    else if (dayNumber % 10 === 3) return "rd";
    else return "th";
  };
  const year = dateObj.year();

  console.log(dateObj.day());
  return (
    // <!-- Timer column -->
    <section className="timer_column">
      <div className="event pd-top">
        <p>
          {" "}
          Our next Live service would be on <br />
          <strong>
            {DAYS_OF_WEEK[dateObj.day()]} {dayInMonth}
            {getSuffice(+dayInMonth)} {MONTHS_OF_YEAR[dateObj.month()]}
          </strong>
        </p>
      </div>
      <div className="time_stamp pd-top">
        <p>Time:</p>{" "}
        <span className="timer_bd">
          {dateObj.hour() < 10 ? `0${dateObj.hour()}` : dateObj.hour()}
        </span>{" "}
        :{" "}
        <span className="timer_bd">
          {dateObj.minute() < 10 ? `0${dateObj.minute()}` : dateObj.minute()}
        </span>{" "}
        <span className="timer">
          {dateObj.hour() >= 0 && dateObj.hour() < 12 ? "AM" : "PM"}
        </span>
      </div>
      <div className="chosen_date pd-top">
        <p>Date:</p> <span className="timer_bd">{dayInMonth}</span> /{" "}
        <span className="timer_bd">
          {dateObj.month() + 1 < 10
            ? `0${dateObj.month() + 1}`
            : dateObj.month() + 1}
        </span>{" "}
        / <span className="timer_bd">22</span>
      </div>
    </section>
    // <!-- Timer column End-->
  );
}

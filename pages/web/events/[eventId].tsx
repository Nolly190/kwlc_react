import React from "react";
import { getEventsApi, getSingleEventApi } from "../../../src/api/event.api";
import SingleEventPage from "../../../src/ui/dashboard/web/events/SingleEventPage";

const SingleEvent = (props) => {
  return <SingleEventPage data={props.data} />;
};

export default SingleEvent;

export async function getStaticPaths() {
  const res = await getEventsApi();
  const data = res.data.data;

  return {
    paths: data.map((ev) => ({ params: { eventId: ev.id.toString() } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const res = await getSingleEventApi(eventId);
  const data = res.data.data;

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}
